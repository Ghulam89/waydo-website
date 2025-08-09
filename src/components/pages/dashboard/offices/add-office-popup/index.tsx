'use client';

import Button from "@components/app/button/app";
import ModalZoom from "@components/app/modal/zoom";
import config from "@config";
import { Close } from "@mui/icons-material";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { TextField } from "@mui/material";
import {
  useCreateAddressV1Mutation,
  useUpdateAddressV1Mutation
} from "@redux/rtk/server/v1/me";
import PositionPoint from "@svg/PositionPoint.svg";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  useAdvancedMarkerRef
} from "@vis.gl/react-google-maps";
import { Suspense, useEffect, useRef, useState } from "react";
import { Rings } from "react-loader-spinner";
import styles from "./add-office-popup.module.css";

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

export default function AddOfficeForm({
  isOpen,
  onClose,
}: Props) {
  const defaulLatLng = {
    lat: 18.47658712766796,
    lng: -69.91721118746248
  }

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
    name: "",
    province: "",
    municipality: "",
    lat: defaulLatLng.lat,
    lng: defaulLatLng.lng,
    address: "",
  });

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
      clearInterval(interval);
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

  const setAddressFromLatLng = (location: MarkerPositionI) => {
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
  }

  return (
    <ModalZoom show={isOpen} onClose={handleClose}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.boxClose}>
            <Close onClick={handleClose} />
          </div>
          <div className={styles.newOfficeHeader}>
            <div className={styles.newOfficeHeaderIcon}>
              {/* <UserPlusCircleIcon /> */}
              <PositionPoint />
            </div>
            <div className={styles.newOfficeHeaderTitles}>
              <h3>Agrega tu sucursal</h3>
              <span>Localiza tu sucursal</span>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <form className={styles.form}>
            <div className={styles.field}>
              <TextField
                autoFocus
                ref={geocoderRef}
                variant="outlined"
                className={styles.textField}
                required
                name="address"
                id={"officeAddressField"}
                placeholder="Escribir una dirección"
                value={form.address}
                autoComplete="off"
                onChange={ev => setForm(prev => ({
                  ...prev,
                  address: ev.target.value
                }))}
              />
            </div>
            <div className={styles.map}>
              <div className={styles.mapContent}>
                <Suspense>
                  <APIProvider
                    solutionChannel='GMP_devsite_samples_v3_rgmautocomplete'
                    apiKey={config.googleMap.apiKey}
                    libraries={["places"]}
                  >
                    <Map
                      mapId={'bf51a910020fa25a_c'}
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
                    </Map>
                  </APIProvider>
                </Suspense>
              </div>
            </div>
            <div className={styles.captureInput}>
              <label htmlFor="newOfficeImageInput">
                <CameraAltIcon />
                <span>Sube una foto de tu sucursal</span>
              </label>
              <input type="hidden" id="newOfficeImageInput" />
            </div>
          </form>
        </div>
        <div className={styles.footer}>
          <Button
            size="small"
            disabled={true /*isLoading || isEditLoading || !!missingField.length*/}
            onClick={() => handleSUbmitAddress()}
            styles={{
              backgroundColor: "#15223f",
              fontSize: "0.813rem",
              fontWeight: "lighter",
            }}
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
              <span>Agregar</span>
            )}
          </Button>
        </div>
      </div>
    </ModalZoom>
  );
}