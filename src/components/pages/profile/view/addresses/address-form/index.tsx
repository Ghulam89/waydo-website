'use client';

import Button from "@components/app/button/app";
import ModalZoom from "@components/app/modal/zoom";
import config from "@config";
import { Close } from "@mui/icons-material";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import {
  useCreateAddressV1Mutation,
  useUpdateAddressV1Mutation
} from "@redux/rtk/server/v1/me";
import { UserAddressV1I } from "@redux/rtk/server/v1/me/me.interfaces";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  useAdvancedMarkerRef,
  useMap
} from "@vis.gl/react-google-maps";
import { Suspense, useEffect, useRef, useState } from "react";
import { Rings } from "react-loader-spinner";
import { toast } from "react-toastify";
import style from "./address-form.module.css";

export type AddressTag = "home" | "work" | "custom";

export interface MarkerPositionI {
  lat: number,
  lng: number
}

export type CreateAddressOption = {
  name: string;
  tag: AddressTag;
  active?: boolean;
};

type Props = {
  isOpen: boolean;
  addressTag: AddressTag;
  address?: UserAddressV1I;
  onClose?: () => void;
}

type AddressForm = {
  name: string;
  province: string;
  municipality: string;
  lat: number;
  lng: number;
  address: string;
  isDefaultAddress?: boolean;
}

interface MapHandlerProps {
  place: google.maps.places.PlaceResult | null;
  marker: google.maps.marker.AdvancedMarkerElement | null;
}

const MapHandler = ({ place, marker }: MapHandlerProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !place || !marker) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
    }
    marker.position = place.geometry?.location;
  }, [map, place, marker]);

  return null;
};

export default function AddressForm({
  addressTag,
  isOpen,
  onClose,
  address
}: Props) {
  const defaulLatLng = {
    lat: 18.47658712766796,
    lng: -69.91721118746248
  }

  const [selectedTag, setSelectedTag] = useState<AddressTag>("custom");
  const [createAddress, { isLoading }] = useCreateAddressV1Mutation();
  const [editAddress, { isLoading: isEditLoading }] = useUpdateAddressV1Mutation();
  const [
    placeAutocomplete,
    setPlaceAutocomplete
  ] = useState<google.maps.places.Autocomplete | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>();
  const [missingField, setMissingField] = useState<string[]>([]);
  const geocoderRef = useRef<HTMLInputElement>(null);
  const [markerRef, marker] = useAdvancedMarkerRef();

  const [form, setForm] = useState<AddressForm>({
    name: address?.name || "",
    province: address?.province || "",
    municipality: address?.municipality || "",
    lat: defaulLatLng.lat,
    lng: defaulLatLng.lng,
    address: address?.address || "",
    isDefaultAddress: !!address?.isDefaultAddress,
  });

  const addressTypes: CreateAddressOption[] = [
    {
      name: "Personalizado",
      tag: "custom"
    },
    {
      name: "Casa",
      tag: "home"
    },
    {
      name: "Trabajo",
      tag: "work"
    },
  ]

  useEffect(() => {
    setSelectedTag(addressTag);
  }, [addressTag]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    interval = setInterval(() => {
      const placesAPI = google?.maps?.places;

      if (!placesAPI || !geocoderRef.current) return;

      const input = geocoderRef.current.querySelector("input") as HTMLInputElement | undefined;

      clearInterval(interval);

      setPlaceAutocomplete(new placesAPI.Autocomplete(input!, {
        fields: ['geometry', 'name', 'formatted_address']
      }));
    }, 1000);

    return () => {
      clearInterval(interval)
    }
  }, [geocoderRef]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      const place = placeAutocomplete.getPlace();

      setSelectedPlace(place);

      setForm(prev => ({
        ...prev,
        address: place?.formatted_address || "",
        lat: place.geometry?.location?.lat() || 0,
        lng: place.geometry?.location?.lng() || 0
      }));
    });
  }, [placeAutocomplete]);

  useEffect(() => {
    const missingProps = Object.keys(form).filter(key => {
      const propValue = form[key as keyof AddressForm];

      if (['address', 'name'].includes(key) && !propValue) return true;
      else return false;
    });

    setMissingField(missingProps);
  }, [form]);

  const handleClose = () => {
    onClose?.();
  };

  const handleTagClick = (option: CreateAddressOption) => {
    setSelectedTag(option.tag);
  }

  const setAddressFromLatLng = (location: MarkerPositionI) => {

    console.log({ location })
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ location }, (results, status) => {
      if (status === 'OK' && results) {
        if (results[0]) {
          const data = results[0];

          setForm(prev => ({
            ...prev,
            address: data.formatted_address,
            lat: location.lat,
            lng: location.lng
          }));
        }
      }
    });
  };

  const handleReset = () => {
    setForm({
      name: "",
      province: "",
      municipality: "",
      lat: defaulLatLng.lat,
      lng: defaulLatLng.lng,
      address: "",
      isDefaultAddress: false,
    });
  }

  const handleSUbmitAddress = () => {
    const payload = {
      name: selectedTag === "custom" ? form.name : selectedTag,
      province: form.province,
      municipality: form.municipality,
      address: form.address,
      isDefaultAddress: form.isDefaultAddress,
      lat: form.lat,
      lng: form.lng,
    }

    createAddress(payload)
      .unwrap()
      .then(() => {
        toast("Dirección agregada", {
          type: "success",
          autoClose: 1500
        });

        !address && handleReset();
        handleClose();
      })
      .catch((error) => {
        toast(error?.data?.error?.message || "Error interno", {
          type: "error",
        });
      });
  }

  const handleSaveChanges = () => {
    const payload = {
      name: selectedTag === "custom" ? form.name : selectedTag,
      province: form.province,
      municipality: form.municipality,
      address: form.address,
      isDefaultAddress: form.isDefaultAddress,
      lat: form.lat,
      lng: form.lng,
      addressUUID: address?.uuid,
    }

    editAddress(payload)
      .unwrap()
      .then(() => {
        toast("Dirección actualizada", {
          type: "success",
          autoClose: 1500,
        });

        !address && handleReset();
        handleClose();
      })
      .catch((error) => {
        toast(error?.data?.error?.message || "Error interno", {
          type: "error",
        });
      });
  }

  return (
    <ModalZoom show={isOpen} onClose={handleClose}>
      <div className={style.container}>
        <div className={style.header}>
          <h3>Detalles de la ubicación</h3>
          <div className={style.boxClose} onClick={handleClose}>
            <Close />
          </div>
        </div>
        <div className={style.content}>
          <form className={style.form}>
            <div className={style.field}>
              <TextField
                autoFocus
                ref={geocoderRef}
                label={form.address ? '' : "Dirección"}
                variant="outlined"
                className={style.textField}
                required
                name="address"
                id={"userAddressField" + (address?.uuid || "")}
                type="text"
                value={form.address}
                autoComplete="off"
                onChange={ev => setForm(prev => ({
                  ...prev,
                  address: ev.target.value
                }))}
              />
            </div>
            <div className={style.map}>
              <div className={style.mapHeader}>
                <strong>¿El marcador está en la ubicación correcta?</strong>
                <p>Haz click y arrastra el marcador hasta el punto exacto. Los usuarios generalmente responden más rápido a publicaciones que estan ubicadas correctamente en el mapa.</p>
              </div>
              <div className={style.mapContent}>
                <Suspense>
                  <APIProvider
                    solutionChannel='GMP_devsite_samples_v3_rgmautocomplete'
                    apiKey={config.googleMap.apiKey}
                    libraries={["places"]}
                  >
                    <Map
                      mapId={'bf51a910020fa25a_b' + (address?.uuid || "")}
                      defaultZoom={14}
                      defaultCenter={{ lat: form.lat, lng: form.lng }}
                      disableDefaultUI
                      gestureHandling={'greedy'}
                      onClick={(e) => {
                        setAddressFromLatLng({
                          lat: e.detail.latLng?.lat || defaulLatLng.lat,
                          lng: e.detail.latLng?.lng || defaulLatLng.lng
                        })
                      }}
                    >
                      <AdvancedMarker
                        draggable
                        ref={markerRef}
                        position={{ lat: form.lat, lng: form.lng }}
                        onDragEnd={ev => setAddressFromLatLng({
                          lat: ev?.latLng?.lat() || defaulLatLng.lat,
                          lng: ev?.latLng?.lng() || defaulLatLng.lng
                        })}
                      />
                      {/* <MapHandler
                        place={selectedPlace as google.maps.places.PlaceResult}
                        marker={marker}
                      /> */}
                    </Map>
                  </APIProvider>
                </Suspense>
              </div>
            </div>
            <div className={style.addressTypeSelect}>
              <div className={style.addressTypeHeader}>
                <strong>Elige cómo quieres nombrar tu ubicación</strong>
                <span>(Requerido*)</span>
              </div>
              <div className={style.addressTypeOptions}>
                {addressTypes.map((option) => (
                  <button
                    key={'address-type-option-' + option.tag}
                    className={selectedTag === option.tag ? style.addressTypeOptionActive : ''}
                    onClick={() => handleTagClick(option)}
                  >
                    {option.name}
                  </button>
                ))}
              </div>

              {selectedTag === "custom" && (
                <div className={style.field} style={{ marginBottom: "16px" }}>
                  <TextField
                    label="Nombra esta ubicación"
                    variant="outlined"
                    className={style.textField}
                    required
                    value={form.name}
                    onChange={(ev) => setForm(prev => ({ ...prev, name: ev.target.value }))}
                  />
                </div>
              )}

              <div className={style.addressTypeAsDefault}>
                <FormControlLabel
                  control={<Switch
                    aria-label="is-default-address-in-form"
                    checked={form.isDefaultAddress}
                    onClick={() => setForm(prev => ({
                      ...prev,
                      isDefaultAddress: !form.isDefaultAddress
                    }))}
                  />}
                  label="Configurar como predeterminada"
                  sx={{ fontSize: "14px !important" }}
                />
              </div>
            </div>
          </form>
        </div>
        <div className={style.footer}>
          <Button
            disabled={isLoading || isEditLoading || !!missingField.length}
            onClick={() => address
              ? handleSaveChanges()
              : handleSUbmitAddress()
            }
          >
            {isLoading || isEditLoading && (
              <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <Rings
                  visible={true}
                  height="25"
                  width="25"
                  color="white"
                  ariaLabel="rings-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            )}

            {!isLoading && !isEditLoading && (
              <span>Guardar cambios</span>
            )}
          </Button>
        </div>
      </div>
    </ModalZoom>
  );
}