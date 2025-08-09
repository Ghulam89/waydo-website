import FormInput from "@components/app/form-input"
import { DataPayloadRenderFieldConfigI, FieldConfig } from "@components/app/form-input/form-input.interface"
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { DeepPartial } from "@interfaces/common"
import { CircularProgress } from "@mui/material"
import { useAppDispatch, useAppSelector } from "@redux/hooks"
import { useGetBrandsCarQuery, useGetModelsByBrandCarQuery, useGetYearsCarQuery, useLazyGetAutonomyQuery, useLazyGetBatteryCapacityQuery, useLazyGetBodiesQuery, useLazyGetCabinTypeQuery, useLazyGetChargingTimeQuery, useLazyGetColorsQuery, useLazyGetCylindersQuery, useLazyGetDoorsQuery, useLazyGetDrivetrainsQuery, useLazyGetExtrasQuery, useLazyGetFuelsQuery, useLazyGetHeavyVehicleQuery, useLazyGetHorsepowersQuery, useLazyGetSeatingsQuery, useLazyGetSoftTopTypeQuery, useLazyGetStatusesQuery, useLazyGetTransmissionsQuery, useLazyGetTruckTypeQuery, useLazyGetTypeUseQuery, useLazyGetVersionsCarQuery } from "@redux/rtk/server/v1/car"
import { useGetCurrenciesQuery } from "@redux/rtk/server/v1/currency"
import { useCreatePostMutation } from "@redux/rtk/server/v1/post"
import { addFileDataCreatePostForm, removeFileDataCreatePostForm, updateDataCreatePostForm, updateDataExtraCreatePostForm, updateStepCreatePostForm } from "@redux/slices/post"
import { DataCreateFormPostI, IFile } from "@redux/slices/post/post.interface"
import { orderArray } from "@utils/object/object.util"
import { ErrorFormatterIntoObject } from "@utils/validation/errorFormatter"
import formValidation from "@utils/validation/formValidation"
import { CreatePostLastFormValidationSchema, CreatePostLastPayloadEmpty, RulesCreatePostLastFormValidationI } from "@validators/form/post/create.validator"
import {
    AdvancedMarker,
    Map,
    useAdvancedMarkerRef,
    useMap,
    useMapsLibrary
} from '@vis.gl/react-google-maps'
import classNames from "classnames"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { toast } from "react-toastify"
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar"
import RadioButtonBodyTypeForm from "../../select-item/body-type"
import CheckButtonForm from "../../select-item/check"
import RadioButtonColorForm from "../../select-item/color"
import { DataRadioButtonFormPropsI } from "../../select-item/color/color.interface"
import RadioButtonHeavyVehicleForm from "../../select-item/heavy-vehicle"
import RadioButtonForm from "../../select-item/plain"
import RadioButtonTruckTypeForm from "../../select-item/truck-type"
import BoxRadioButton from "./box-radio-button"
import { LastFormPostPropsI, MarkerPositionI } from "./last-form.inteface"
import style from "./last-form.module.css"

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

export default function LastFormPost({ show = false }: LastFormPostPropsI) {
    const router = useRouter();
    const geocoderRef = useRef<HTMLInputElement>(null)
    const loadingRef = useRef<LoadingBarRef>(null)
    const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    const places = useMapsLibrary('places');
    const [markerRef, marker] = useAdvancedMarkerRef();

    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>()

    const dispatch = useAppDispatch()
    const { data } = useAppSelector((s) => s.post.createForm)

    const [errors, setErrors] = useState<Record<keyof DataCreateFormPostI, any> | null>()

    const { data: responseBrand } = useGetBrandsCarQuery({})
    const { data: responseModel } = useGetModelsByBrandCarQuery({ brandUUID: data?.brandUUID })
    const { data: responseYear } = useGetYearsCarQuery({ brandUUID: data?.brandUUID, modelUUID: data?.modelUUID })
    const { data: responseCurrency } = useGetCurrenciesQuery({ filters: { isDigital: false } })

    const [requestCreatePost, { isLoading: isLoadingCreatePost }] = useCreatePostMutation()

    const [getStatusCar, { isLoading: isLoadingStatusCar, data: respStatusCar }] = useLazyGetStatusesQuery()
    const [getSoftTopType, { isLoading: isLoadingSoftTopType, data: respSoftTopType }] = useLazyGetSoftTopTypeQuery()
    const [getCabinType, { isLoading: isLoadingCabinType, data: respCabinType }] = useLazyGetCabinTypeQuery()
    const [getTypeUse, { isLoading: isLoadingTypeUse, data: respTypeUse }] = useLazyGetTypeUseQuery()
    const [getColorCar, { isLoading: isLoadingColorCar, data: respColorCar }] = useLazyGetColorsQuery()
    const [getFuels, { isLoading: isLoadingFuelCar, data: respFuelCar }] = useLazyGetFuelsQuery()
    const [getTransmissions, { isLoading: isLoadingTransmissionCar, data: respTransmissionCar }] = useLazyGetTransmissionsQuery()
    const [getDrivetrains, { isLoading: isLoadingDrivetrainCar, data: respDrivetrainCar }] = useLazyGetDrivetrainsQuery()
    const [getDoors, { isLoading: isLoadingDoorCar, data: respDoorCar }] = useLazyGetDoorsQuery()
    const [getSeatings, { isLoading: isLoadingSeatingCar, data: respSeatingCar }] = useLazyGetSeatingsQuery()
    const [getCylinders, { isLoading: isLoadingCylinderCar, data: respCylinderCar }] = useLazyGetCylindersQuery()
    const [getHorsepowers, { isLoading: isLoadingHorsepowerCar, data: respHorsepowerCar }] = useLazyGetHorsepowersQuery()
    const [getExtras, { isLoading: isLoadingExtra, data: respExtra }] = useLazyGetExtrasQuery()
    const [getBodies, { isLoading: isLoadingBody, data: respBody }] = useLazyGetBodiesQuery()
    const [getVersions, { isLoading: isLoadingVersion, data: respVersion }] = useLazyGetVersionsCarQuery()
    const [getBatteryCapacities, { isLoading: isLoadingBatteryCapacity, data: respBatteryCapacity }] = useLazyGetBatteryCapacityQuery()
    const [getChargingTimes, { isLoading: isLoadingChargingTime, data: respChargingTime }] = useLazyGetChargingTimeQuery()
    const [getAutonomies, { isLoading: isLoadingAutonomy, data: respAutonomy }] = useLazyGetAutonomyQuery()
    const [getHeavyVehicles, { isLoading: isLoadingHeavyVehicle, data: respHeavyVehicle }] = useLazyGetHeavyVehicleQuery()
    const [getTruckTypes, { isLoading: isLoadingTruckType, data: respTruckType }] = useLazyGetTruckTypeQuery()

    const brand = useMemo(() => (Array.from(responseBrand?.data || []).find((b) => b.uuid === data.brandUUID)), [responseBrand?.data, data.brandUUID])
    const model = useMemo(() => (Array.from(responseModel?.data || []).find((b) => b.uuid === data.modelUUID)), [responseModel?.data, data.modelUUID])
    const year = useMemo(() => (Array.from(responseYear?.data || []).find((b) => b.uuid === data.yearUUID)), [responseYear?.data, data.yearUUID])
    const version = useMemo(() => (Array.from(respVersion?.data || []).find((b) => b.uuid === data.versionUUID)), [respVersion?.data, data.versionUUID])
    const currency = useMemo(() => (Array.from(responseCurrency?.data || []).find((b) => b.uuid === data.currencyUUID)), [responseCurrency?.data, data.currencyUUID])

    const loading = useMemo(() => (
        isLoadingStatusCar || isLoadingColorCar ||
        isLoadingFuelCar || isLoadingTransmissionCar ||
        isLoadingDrivetrainCar || isLoadingDoorCar ||
        isLoadingSeatingCar || isLoadingCylinderCar ||
        isLoadingHorsepowerCar || isLoadingExtra ||
        isLoadingBody || isLoadingVersion ||
        isLoadingBatteryCapacity || isLoadingChargingTime ||
        isLoadingAutonomy || isLoadingSoftTopType ||
        isLoadingCabinType || isLoadingTypeUse ||
        isLoadingHeavyVehicle || isLoadingTruckType
    ), [
        isLoadingStatusCar, isLoadingColorCar,
        isLoadingFuelCar, isLoadingTransmissionCar,
        isLoadingDrivetrainCar, isLoadingDoorCar,
        isLoadingSeatingCar, isLoadingCylinderCar,
        isLoadingHorsepowerCar, isLoadingExtra,
        isLoadingBody, isLoadingVersion,
        isLoadingBatteryCapacity, isLoadingChargingTime,
        isLoadingAutonomy, isLoadingSoftTopType,
        isLoadingCabinType, isLoadingTypeUse,
        isLoadingHeavyVehicle, isLoadingTruckType
    ])

    const optionsBody = useMemo(() => (Array.from(respBody?.data || []).map(data => ({
        label: data.name,
        key: data.uuid,
        data
    }))), [respBody?.data])

    const optionsHeavyVehicle = useMemo(() => (Array.from(respHeavyVehicle?.data || []).map(data => ({
        label: data.name,
        key: data.uuid,
        data
    }))), [respHeavyVehicle?.data])

    const optionsTruckType = useMemo(() => (Array.from(respTruckType?.data || []).map(data => ({
        label: data.name,
        key: data.uuid,
        data
    }))), [respTruckType?.data])

    const dataRenderCarStatus = useMemo(() => (Array.from(respStatusCar?.data || []).map(d => ({
        label: d.name,
        key: d.uuid
    }))), [respStatusCar?.data])

    const dataRenderSoftTopType = useMemo(() => (Array.from(respSoftTopType?.data || []).map(d => ({
        label: d.name,
        key: d.uuid
    }))), [respSoftTopType?.data])

    const dataRenderCarFuel = useMemo(() => (Array.from(respFuelCar?.data || []).map(d => ({
        label: d.name,
        key: d.uuid
    }))), [respFuelCar?.data])

    const dataRenderCarExtra = useMemo(() => (Array.from(respExtra?.data || []).map(d => ({
        label: d.name,
        key: d.uuid
    }))), [respExtra?.data])

    const dataRenderCarTransmission = useMemo(() => (Array.from(respTransmissionCar?.data || []).map(d => ({
        label: d.name,
        key: d.uuid
    }))), [respTransmissionCar?.data])

    const dataRenderCarDoor = useMemo(() => (Array.from(respDoorCar?.data || []).map(d => ({
        label: `${d.cant}`,
        key: d.uuid
    }))), [respDoorCar?.data])

    const dataRenderCarSeating = useMemo(() => (Array.from(respSeatingCar?.data || []).map(d => ({
        label: `${d.cant}`,
        key: d.uuid
    }))), [respSeatingCar?.data])

    const dataRenderCarCylinder = useMemo(() => (Array.from(respCylinderCar?.data || []).map(d => ({
        label: `${d.cant}`,
        key: d.uuid
    }))), [respCylinderCar?.data])

    const horsepowerData = useMemo(() => (Array.from(respHorsepowerCar?.data || []).map(d => ({
        label: d.name,
        key: d.uuid
    }))), [respHorsepowerCar?.data])

    const batteryCapacityData = useMemo(() => (Array.from(respBatteryCapacity?.data || []).map(d => ({
        label: d.name,
        key: d.uuid
    }))), [respBatteryCapacity?.data])

    const chargingTimeData = useMemo(() => (Array.from(respChargingTime?.data || []).map(d => ({
        label: d.name,
        key: d.uuid
    }))), [respChargingTime?.data])

    const autonomyData = useMemo(() => (Array.from(respAutonomy?.data || []).map(d => ({
        label: d.name,
        key: d.uuid
    }))), [respAutonomy?.data])

    const cabinTypeData = useMemo(() => (Array.from(respCabinType?.data || []).map(d => ({
        label: d.name,
        key: d.uuid
    }))), [respCabinType?.data])

    const typeUseData = useMemo(() => (Array.from(respTypeUse?.data || []).map(d => ({
        label: d.name,
        key: d.uuid
    }))), [respTypeUse?.data])

    const { dataRenderCarColorInterior, dataRenderCarColorExterior } = useMemo(() => (Array.from(respColorCar?.data || []).reduce((a, b) => {
        const data: DataPayloadRenderFieldConfigI = {
            label: b?.color?.name || "",
            key: b.uuid,
            color: b?.color.key,
            data: {
                color: b?.color?.hexadecimal
            }
        }

        if (b.exterior) {
            a.dataRenderCarColorExterior.push(data)
        }

        if (b.interior) {
            a.dataRenderCarColorInterior.push(data)
        }
        return a
    }, {
        dataRenderCarColorInterior: [] as DataPayloadRenderFieldConfigI[],
        dataRenderCarColorExterior: [] as DataPayloadRenderFieldConfigI[]
    })), [respColorCar?.data])

    const colorsInterior = useMemo(() => (orderArray("color", dataRenderCarColorInterior, [
        "black", "gray", "cream", "terracotta",
        "red", "white", "other"
    ])), [dataRenderCarColorInterior]) as DataPayloadRenderFieldConfigI[]

    const colorsExterior = useMemo(() => (orderArray("color", dataRenderCarColorExterior, [
        "white", "gray", "black", "silver",
        "blue", "red", "brown", "cream",
        "green", "yellow", "orange", "other"
    ])), [dataRenderCarColorExterior]) as DataPayloadRenderFieldConfigI[]

    const sourceInputStandardization = useMemo(() => ({
        "& label": {
            fontSize: "1em"
        },
        "& input": {
            fontSize: "1em"
        },
        "& textarea": {
            fontSize: "1em"
        }
    }), [])

    const isElectric = useMemo(() => (Array.from(respFuelCar?.data || []).find((f) => f.uuid === data.fuelTypeUUID)?.slug === "electric"), [data, respFuelCar?.data])
    const isTruckHeavyVehicle = useMemo(() => (Array.from(respHeavyVehicle?.data || []).find((f) => f.uuid === data.heavyVehicleUUID)?.slug === "trucks"), [data, respHeavyVehicle?.data])

    const { isConvertible, isMinivan, isTruck, isVan, isHeavyVehicle } = useMemo(() => (
        Array.from(respBody?.data || []).reduce((a, b) => {
            if (b.uuid != data.bodyUUID) return a;

            if (b.slug == "convertible") {
                a.isConvertible = true
            }

            if (b.slug == "minivan") {
                a.isMinivan = true
            }

            if (b.slug == "truck") {
                a.isTruck = true
            }

            if (b.slug == "van") {
                a.isVan = true
            }

            if (b.slug == "heavyvehicles") {
                a.isHeavyVehicle = true
            }

            return a
        }, {
            isConvertible: false,
            isTruck: false,
            isMinivan: false,
            isVan: false,
            isHeavyVehicle: false
        })
    ), [data.bodyUUID, respBody?.data])

    const drivetrains = useMemo(() => (orderArray("slug", Array.from(respDrivetrainCar?.data || []).filter((d) => {
        const includeTruck = ["six-wheel-drive"].includes(d.slug)
        if (includeTruck && isTruckHeavyVehicle) {
            return d
        } else if (includeTruck && !isTruckHeavyVehicle) {
            return null
        } else {
            return d
        }
    }), [
        "front-wheel-drive", "rear-wheel-drive", "four-wheel-drive",
        "all-wheel-drive", "four-wheel-drive-part-time",
        "six-wheel-drive", "other"
    ])), [respDrivetrainCar?.data, isTruckHeavyVehicle])

    const dataRenderCarDrivetrain = useMemo(() => (drivetrains.map(d => ({
        label: d.name,
        key: d.uuid,
        slug: d.slug
    }))), [drivetrains, isTruckHeavyVehicle])

    const carStatusUsedUUID = useMemo(() => (Array.from(respStatusCar?.data || []).find(d => d.type == "used")?.uuid), [respStatusCar?.data])

    const handleUpdateForm = useCallback((data: DeepPartial<DataCreateFormPostI>) => {
        dispatch(updateDataCreatePostForm(data))
    }, [])

    const handleBack = useCallback(() => {
        dispatch(updateStepCreatePostForm(1))
    }, [])

    const handleGetStatusesCar = useCallback(async () => {
        await getStatusCar({}).catch(error => {
            toast(`${error?.message || "Internal server error"}: Get statuses car`, {
                type: "error"
            })
        })
    }, [])

    const handleGetColorsCar = useCallback(async () => {
        await getColorCar({}).catch(error => {
            toast(`${error?.message || "Internal server error"}: Get colors car`, {
                type: "error"
            })
        })
    }, [])

    const handleGetFuelsCar = useCallback(async () => {
        await getFuels({
            sort: ["createdAt", "DESC"]
        }).catch(error => {
            toast(`${error?.message || "Internal server error"}: Get fuels car`, {
                type: "error"
            })
        })
    }, [])

    const handleGetTransmissionsCar = useCallback(async () => {
        await getTransmissions({
            sort: ["createdAt", "DESC"]
        }).catch(error => {
            toast(`${error?.message || "Internal server error"}: Get transmissions car`, {
                type: "error"
            })
        })
    }, [])

    const handleGetDrivetrainsCar = useCallback(async () => {
        await getDrivetrains({
            sort: ["id", "ASC"]
        }).catch(error => {
            toast(`${error?.message || "Internal server error"}: Get drivetrains car`, {
                type: "error"
            })
        })
    }, [])

    const handleGetDoorsCar = useCallback(async () => {
        await getDoors({}).catch(error => {
            toast(`${error?.message || "Internal server error"}: Get doors car`, {
                type: "error"
            })
        })
    }, [])

    const handleGetSeatingsCar = useCallback(async () => {
        await getSeatings({}).catch(error => {
            toast(`${error?.message || "Internal server error"}: Get seatings car`, {
                type: "error"
            })
        })
    }, [])

    const handleGetCylindersCar = useCallback(async () => {
        await getCylinders({}).catch(error => {
            toast(`${error?.message || "Internal server error"}: Get cylinders car`, {
                type: "error"
            })
        })
    }, [])

    const handleGetHorsepowersCar = useCallback(async () => {
        await getHorsepowers({}).catch(error => {
            toast(`${error?.message || "Internal server error"}: Get horsepowers car`, {
                type: "error"
            })
        })
    }, [])


    const handleGetExtras = useCallback(async () => {
        await getExtras({}).catch(error => {
            toast(`${error?.message || "Internal server error"}: Get extras`, {
                type: "error"
            })
        })
    }, [])

    const handleGetBodies = useCallback(async () => {
        await getBodies({}).catch(error => {
            toast(`${error?.message || "Internal server error"}: Get bodies`, {
                type: "error"
            })
        })
    }, [data])

    const handleGetVersions = useCallback(async () => {
        if (!data.brandUUID || !data.modelUUID) return;

        await getVersions({
            brandUUID: data.brandUUID || "-",
            modelUUID: data.modelUUID || "-"
        }).catch(error => {
            toast(`${error?.message || "Internal server error"}: Get bodies`, {
                type: "error"
            })
        })
    }, [data])

    const handleGetBatteryCapacities = useCallback(async () => {
        await getBatteryCapacities({}).catch(error => {
            toast(`${error?.message || "Internal server error"}: Get battery capacity`, {
                type: "error"
            })
        })
    }, [])

    const handleGetChargingTimes = useCallback(async () => {
        await getChargingTimes({}).catch(error => {
            toast(`${error?.message || "Internal server error"}: Get charging time`, {
                type: "error"
            })
        })
    }, [])

    const handleGetAutonomies = useCallback(async () => {
        await getAutonomies({}).catch(error => {
            toast(`${error?.message || "Internal server error"}: Get autonomy`, {
                type: "error"
            })
        })
    }, [])

    const handleGetSoftTopTypes = useCallback(async () => {
        await getSoftTopType({}).catch(error => {
            toast(`${error?.message || "Internal server error"}: Get soft top type`, {
                type: "error"
            })
        })
    }, [])

    const handleGetCabinType = useCallback(async () => {
        await getCabinType({}).catch(error => {
            toast(`${error?.message || "Internal server error"}: Get cabin type`, {
                type: "error"
            })
        })
    }, [])

    const handleGetTypeUse = useCallback(async () => {
        await getTypeUse({}).catch(error => {
            toast(`${error?.message || "Internal server error"}: Get type use`, {
                type: "error"
            })
        })
    }, [])

    const handleGetHeavyVehicle = useCallback(async () => {
        await getHeavyVehicles({}).catch(error => {
            toast(`${error?.message || "Internal server error"}: Get heavy vehicle`, {
                type: "error"
            })
        })
    }, [])

    const handleGetTruckType = useCallback(async () => {
        await getTruckTypes({}).catch(error => {
            toast(`${error?.message || "Internal server error"}: Get truck type`, {
                type: "error"
            })
        })
    }, [])

    const handleFormValidation = useCallback((dataForm: DataCreateFormPostI) => {
        const conditions: RulesCreatePostLastFormValidationI = { isConvertible, isMinivan, isTruck, isVan, isElectric, isTruckHeavyVehicle, isHeavyVehicle }

        dataForm =
            (JSON.stringify(dataForm) === '{}'
                ? CreatePostLastPayloadEmpty(conditions)
                : { ...CreatePostLastPayloadEmpty(conditions), ...dataForm }) as DataCreateFormPostI
        const { isValid, errors } = formValidation(dataForm, CreatePostLastFormValidationSchema(conditions))
        setErrors(ErrorFormatterIntoObject(errors) as Record<keyof DataCreateFormPostI, any>)
        return isValid
    }, [isElectric, isConvertible, isMinivan, isTruck, isVan, isTruckHeavyVehicle, isHeavyVehicle])

    const handleCreate = useCallback(() => {
        if (isLoadingCreatePost || !handleFormValidation(data)) return;
        const { pictures, ...form } = data

        requestCreatePost({
            ...form,
            type: "car",
            pictures: pictures.map(p => p.file)
        }).then(resp => {
            if (resp.error) {
                //@ts-ignore
                return toast(`${resp?.error?.message || "Internal server error"}`, {
                    type: "error"
                })
            }

            toast("The post has been successfully created", {
                type: "success",
                onClose: () => {
                    router.push(`/posts/v/${resp.data?.slug}`)
                }
            })

        }).catch(error => {
            toast(`${error?.message || "Internal server error"}`, {
                type: "error"
            })
        })
    }, [isLoadingCreatePost, data, isElectric, isConvertible, isMinivan, isTruck, isVan, isTruckHeavyVehicle, isHeavyVehicle])

    const handleGetData = useCallback(async () => {
        if (!loadingRef?.current || !show) return;

        loadingRef.current.continuousStart()

        await handleGetBodies()
        await handleGetStatusesCar()
        await handleGetColorsCar()
        await handleGetFuelsCar()
        await handleGetTransmissionsCar()
        await handleGetDrivetrainsCar()
        await handleGetDoorsCar()
        await handleGetSeatingsCar()
        await handleGetCylindersCar()
        await handleGetHorsepowersCar()
        await handleGetExtras()
        await handleGetVersions()
        await handleGetBatteryCapacities()
        await handleGetChargingTimes()
        await handleGetAutonomies()
        await handleGetSoftTopTypes()
        await handleGetCabinType()
        await handleGetTypeUse()
        await handleGetHeavyVehicle()
        await handleGetTruckType()

        loadingRef.current.complete()
    }, [show])

    const handleUpdateFiles = useCallback((file: IFile) => {
        dispatch(addFileDataCreatePostForm(file))
    }, [])

    const handleRemovePicture = useCallback((index: number) => {
        dispatch(removeFileDataCreatePostForm(index))
    }, [])

    const setAddressFromLatLng = useCallback((location: MarkerPositionI) => {

        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ location }, (results, status) => {
            if (status === 'OK' && results) {
                if (results[0]) {
                    const data = results[0]

                    handleUpdateForm({
                        location: {
                            address: data.formatted_address,
                            formattedAddress: data.formatted_address,
                            lat: location.lat,
                            lng: location.lng
                        }
                    })
                }
            }
        });
    }, [])

    useEffect(() => {
        let interval: NodeJS.Timeout;

        interval = setInterval(() => {
            if (!places || !geocoderRef.current) return;

            clearInterval(interval)
            setPlaceAutocomplete(new places.Autocomplete(geocoderRef.current, {
                fields: ['geometry', 'name', 'formatted_address']
            }));
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [places, geocoderRef]);

    useEffect(() => {
        if (!placeAutocomplete) return;

        placeAutocomplete.addListener('place_changed', () => {
            const place = placeAutocomplete.getPlace()

            setSelectedPlace(place)

            handleUpdateForm({
                location: {
                    address: place.name,
                    formattedAddress: place.formatted_address,
                    lat: place.geometry?.location?.lat() as number,
                    lng: place.geometry?.location?.lng() as number
                }
            })
        });
    }, [placeAutocomplete]);

    useEffect(() => {
        handleGetData()
    }, [show])

    useEffect(() => {
        handleUpdateForm({
            address: data?.location?.formattedAddress || data?.location?.address || ""
        })
    }, [data?.location?.address, data?.location?.formattedAddress])

    useEffect(() => {
        const now = new Date()

        if (year && year.year < now.getFullYear() && carStatusUsedUUID) {
            handleUpdateForm({
                carStatusUUID: carStatusUsedUUID
            })
        }
    }, [year?.year, carStatusUsedUUID])

    return (
        <div className={classNames(style.container, !show ? style.none : "")}>
            <div className={style.box}>
                <LoadingBar color='var(--primary-color)' ref={loadingRef} />
                {!loading && (
                    <React.Fragment>
                        <div>
                            <div className={style.boxInfo}>
                                <div>
                                    <FontAwesomeIcon icon={faCircleInfo} style={{ color: "#7B8385" }} />
                                </div>
                                <div className={style.info}>
                                    <p>Publicar varios vehículos en un anuncio o cambiar tu anuncio existente para anunciar otro dará como resultado un rechazo sin reembolso.</p>
                                    <p>¿Tienes preguntas? Consulta nuestras <Link href="#" className={style.linkInfo}>directrices de publicación</Link> o <Link href="#" className={style.linkInfo}>envíanos un correo electrónico.</Link></p>
                                </div>
                            </div>
                            <div className={style.contentInfo}>
                                <h2>¡Ya casi llegas!</h2>
                                <p>¡Incluye tantos detalles e imágenes como sea posible y establece el precio correcto!</p>
                            </div>
                        </div>
                        <div className={style.summaryBox}>
                            <div className={style.summaryHeader}>
                                <div>
                                    <h3>Resumen del listado</h3>
                                </div>
                                <div>
                                    <button onClick={handleBack}>Editar</button>
                                </div>
                            </div>
                            <div className={style.boxTable}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Marca y modelo</td>
                                            <td>{brand?.name || ""} {model?.name || ""}</td>
                                        </tr>
                                        <tr>
                                            <td>Version</td>
                                            <td>{version?.name || "-"}</td>
                                        </tr>
                                        <tr>
                                            <td>Año</td>
                                            <td>{year?.year || "-"}</td>
                                        </tr>
                                        <tr>
                                            <td>Kilometraje</td>
                                            <td>{parseFloat(`${data.mileage || "0"}`).toLocaleString(undefined, {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                            })}</td>
                                        </tr>
                                        <tr>
                                            <td>Moneda</td>
                                            <td>{currency?.iso3 || "-"}</td>
                                        </tr>
                                        <tr>
                                            <td>Precio</td>
                                            <td>{parseFloat(`${data.price || "0"}`).toLocaleString(undefined, {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                            })}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {Array.isArray(data.pictures) && data.pictures.length ? (
                            <div className={style.boxPhotos}>
                                {data.pictures.map((picture, i) => (
                                    <div className={style.boxPhoto} key={i}>
                                        <div className={style.boxClose} onClick={() => handleRemovePicture(i)}>
                                            <span>x</span>
                                        </div>
                                        <img src={picture.file.preview} alt={picture.file.name} />

                                        {picture.isMain && (
                                            <div className={style.mainPhoto}>
                                                <span>Principal</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : null}
                        <div>
                            <FormInput<DataCreateFormPostI>
                                isEditMode
                                spacing={3}
                                form={data}
                                setForm={(data) => handleUpdateForm(data as DataCreateFormPostI)}
                                fields={[
                                    {
                                        label: "Anadir imagenes",
                                        name: "pictures",
                                        type: "file",
                                        required: true,
                                        handleChange(file) {
                                            handleUpdateFiles(file)
                                        },
                                        responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 }
                                    },
                                    {
                                        label: "Titulo",
                                        name: "title",
                                        placeholder: "Ingresa el titulo del anuncio",
                                        required: true,
                                        type: "text",
                                        responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                        sx: sourceInputStandardization
                                    },
                                    {
                                        label: "Descripción",
                                        name: "description",
                                        placeholder: "Describe tu vehiculo",
                                        type: "textarea",
                                        required: true,
                                        style: { minHeight: 130 },
                                        responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                        sx: sourceInputStandardization
                                    },
                                    {
                                        label: "Tipo de carroceria",
                                        name: "bodyUUID",
                                        type: "radio",
                                        required: true,
                                        responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                        dataRender: optionsBody,
                                        render: (props) => {
                                            return (
                                                <RadioButtonBodyTypeForm {...props} data={props.data as any} />
                                            )
                                        }
                                    },
                                    ...(isHeavyVehicle ? [{
                                        label: "Tipo de vehiculos pesados",
                                        name: "heavyVehicleUUID",
                                        type: "radio",
                                        required: true,
                                        responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                        dataRender: optionsHeavyVehicle,
                                        render: (props) => {
                                            return (
                                                <RadioButtonHeavyVehicleForm {...props} data={props.data as any} />
                                            )
                                        }
                                    }] : []) as FieldConfig<DataCreateFormPostI>[],
                                    ...(isTruckHeavyVehicle ? [{
                                        label: "Tipo de camiones",
                                        name: "truckTypeUUID",
                                        type: "radio",
                                        required: true,
                                        responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                        dataRender: optionsTruckType,
                                        render: (props) => {
                                            return (
                                                <RadioButtonTruckTypeForm {...props} data={props.data as any} />
                                            )
                                        }
                                    }] : []) as FieldConfig<DataCreateFormPostI>[],
                                    ...(isConvertible ? [
                                        {
                                            label: "Tipo de capota",
                                            name: "softTopTypeUUID",
                                            type: "radio",
                                            required: true,
                                            responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                            dataRender: dataRenderSoftTopType,
                                            render: (props) => {
                                                return (
                                                    <RadioButtonForm {...props} />
                                                )
                                            }
                                        }
                                    ] : []) as FieldConfig<DataCreateFormPostI>[],
                                    ...(isTruck ? [
                                        {
                                            label: "Tipo de cabina",
                                            name: "cabinTypeUUID",
                                            type: "radio",
                                            required: true,
                                            responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                            dataRender: cabinTypeData,
                                            render: (props) => {
                                                return (
                                                    <RadioButtonForm {...props} />
                                                )
                                            }
                                        }
                                    ] : []) as FieldConfig<DataCreateFormPostI>[],
                                    ...(isVan || isMinivan ? [
                                        {
                                            label: "Tipo de uso",
                                            name: "typeUseUUID",
                                            type: "radio",
                                            required: true,
                                            responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                            dataRender: typeUseData,
                                            render: (props) => {
                                                return (
                                                    <RadioButtonForm {...props} />
                                                )
                                            }
                                        }
                                    ] : []) as FieldConfig<DataCreateFormPostI>[],
                                    {
                                        label: "Estado del vehículo",
                                        name: "carStatusUUID",
                                        type: "radio",
                                        required: true,
                                        responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                        dataRender: dataRenderCarStatus,
                                        render: (props) => {
                                            return (
                                                <RadioButtonForm {...props} />
                                            )
                                        }
                                    },
                                    {
                                        label: "Color exterior",
                                        name: "exteriorColorUUID",
                                        type: "radio",
                                        required: true,
                                        responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                        forceRenderWithoutContainer: true,
                                        forceRender: () => {
                                            return (
                                                <BoxRadioButton
                                                    title="Color exterior"
                                                    error={errors?.exteriorColorUUID}
                                                    data={colorsExterior}
                                                >
                                                    {({ item }) => (
                                                        <RadioButtonColorForm
                                                            execute
                                                            data={item.data as DataRadioButtonFormPropsI}
                                                            active={data.exteriorColorUUID == item.key}
                                                            label={item.label}
                                                            handleClick={() => {
                                                                handleUpdateForm({ exteriorColorUUID: item.key })
                                                            }}
                                                        />
                                                    )}
                                                </BoxRadioButton>
                                            )
                                        }
                                    },
                                    {
                                        label: "Color interior",
                                        name: "interiorColorUUID",
                                        type: "radio",
                                        required: true,
                                        responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                        dataRender: colorsInterior,
                                        render: (props) => {
                                            return (
                                                <RadioButtonColorForm {...{
                                                    ...props,
                                                    data: props.data as DataRadioButtonFormPropsI
                                                }} />
                                            )
                                        }
                                    },
                                    {
                                        label: "Tipo de combustible",
                                        name: "fuelTypeUUID",
                                        type: "radio",
                                        required: true,
                                        responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                        dataRender: dataRenderCarFuel,
                                        render: (props) => {
                                            return (
                                                <RadioButtonForm {...props} />
                                            )
                                        }
                                    },
                                    ...(!isElectric ? [
                                        {
                                            label: "Cantidad de cilindros",
                                            name: "cyliderUUID",
                                            type: "radio",
                                            required: true,
                                            responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                            dataRender: dataRenderCarCylinder,
                                            render: (props) => {
                                                return (
                                                    <RadioButtonForm {...props} />
                                                )
                                            }
                                        },

                                    ] : []) as FieldConfig<DataCreateFormPostI>[],
                                    {
                                        label: "Potencia",
                                        name: "horsepowerUUID",
                                        type: "radio",
                                        required: true,
                                        responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                        forceRenderWithoutContainer: true,
                                        forceRender: () => {
                                            return (
                                                <BoxRadioButton
                                                    title="Potencia"
                                                    error={errors?.horsepowerUUID}
                                                    data={horsepowerData}
                                                >
                                                    {({ item }) => (
                                                        <RadioButtonForm
                                                            execute
                                                            active={data.horsepowerUUID == item.key}
                                                            label={item.label}
                                                            handleClick={() => {
                                                                handleUpdateForm({ horsepowerUUID: item.key })
                                                            }}
                                                        />
                                                    )}
                                                </BoxRadioButton>
                                            )
                                        }
                                    },
                                    ...(isElectric ? [
                                        {
                                            label: "Capacidad de bateria",
                                            name: "batteryCapacityUUID",
                                            type: "radio",
                                            required: true,
                                            responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                            forceRenderWithoutContainer: true,
                                            forceRender: () => {
                                                return (
                                                    <BoxRadioButton
                                                        title="Capacidad de bateria"
                                                        error={errors?.batteryCapacityUUID}
                                                        data={batteryCapacityData}
                                                    >
                                                        {({ item }) => (
                                                            <RadioButtonForm
                                                                execute
                                                                active={data.batteryCapacityUUID == item.key}
                                                                label={item.label}
                                                                handleClick={() => {
                                                                    handleUpdateForm({ batteryCapacityUUID: item.key })
                                                                }}
                                                            />
                                                        )}
                                                    </BoxRadioButton>
                                                )
                                            }
                                        },
                                        {
                                            label: "Tiempo de carga",
                                            name: "chargingTimeUUID",
                                            type: "radio",
                                            required: true,
                                            responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                            forceRenderWithoutContainer: true,
                                            forceRender: () => {
                                                return (
                                                    <BoxRadioButton
                                                        title="Tiempo de carga"
                                                        error={errors?.chargingTimeUUID}
                                                        data={chargingTimeData}
                                                    >
                                                        {({ item }) => (
                                                            <RadioButtonForm
                                                                execute
                                                                active={data.chargingTimeUUID == item.key}
                                                                label={item.label}
                                                                handleClick={() => {
                                                                    handleUpdateForm({ chargingTimeUUID: item.key })
                                                                }}
                                                            />
                                                        )}
                                                    </BoxRadioButton>
                                                )
                                            }
                                        },
                                        {
                                            label: "Autonomia",
                                            name: "autonomyUUID",
                                            type: "radio",
                                            required: true,
                                            responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                            forceRenderWithoutContainer: true,
                                            forceRender: () => {
                                                return (
                                                    <BoxRadioButton
                                                        title="Autonomia"
                                                        error={errors?.autonomyUUID}
                                                        data={autonomyData}
                                                    >
                                                        {({ item }) => (
                                                            <RadioButtonForm
                                                                execute
                                                                active={data.autonomyUUID == item.key}
                                                                label={item.label}
                                                                handleClick={() => {
                                                                    handleUpdateForm({ autonomyUUID: item.key })
                                                                }}
                                                            />
                                                        )}
                                                    </BoxRadioButton>
                                                )
                                            }
                                        }
                                    ] : []) as FieldConfig<DataCreateFormPostI>[],
                                    {
                                        label: "Tipo de transmisión",
                                        name: "transmissionUUID",
                                        type: "radio",
                                        required: true,
                                        responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                        dataRender: dataRenderCarTransmission,
                                        render: (props) => {
                                            return (
                                                <RadioButtonForm {...props} />
                                            )
                                        }
                                    },
                                    {
                                        label: "Tipo de tracción",
                                        name: "drivetrainUUID",
                                        type: "radio",
                                        required: true,
                                        responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                        dataRender: dataRenderCarDrivetrain,
                                        render: (props) => {
                                            return (
                                                <RadioButtonForm {...props} />
                                            )
                                        }
                                    },
                                    {
                                        label: "Puertas",
                                        name: "doorUUID",
                                        type: "radio",
                                        required: true,
                                        responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                        dataRender: dataRenderCarDoor,
                                        render: (props) => {
                                            return (
                                                <RadioButtonForm {...props} />
                                            )
                                        }
                                    },
                                    {
                                        label: "Capacidad de asientos",
                                        name: "seatingUUID",
                                        type: "radio",
                                        required: true,
                                        responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                        dataRender: dataRenderCarSeating,
                                        render: (props) => {
                                            return (
                                                <RadioButtonForm {...props} />
                                            )
                                        }
                                    },
                                    {
                                        label: "Extras",
                                        name: "extras",
                                        type: "checkbox",
                                        required: true,
                                        responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                        forceRenderWithoutContainer: true,
                                        forceRender: () => {
                                            return (
                                                <BoxRadioButton
                                                    title="Extras"
                                                    data={dataRenderCarExtra}
                                                    showMore={{
                                                        position: "buttom",
                                                        totalItemNoActive: 8
                                                    }}
                                                    grid={{
                                                        gridTemplateColumns: "1fr 1fr"
                                                    }}
                                                >
                                                    {({ item }) => (
                                                        <CheckButtonForm
                                                            active={data.extras.includes(item.key)}
                                                            label={item.label}
                                                            handleClick={() => {
                                                                dispatch(updateDataExtraCreatePostForm(item.key))
                                                            }}
                                                        />
                                                    )}
                                                </BoxRadioButton>
                                            )
                                        }
                                    },
                                    {
                                        label: "Locacion",
                                        type: "divider",
                                        name: "divider",
                                        textAlign: "left",
                                        responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                    },
                                    {
                                        label: "Ubicacion",
                                        name: "address",
                                        placeholder: "Localiza tu vehiculo",
                                        type: "text",
                                        required: true,
                                        ref: geocoderRef,
                                        responsive: { lg: 12, md: 12, xl: 12, sm: 12, xs: 12 },
                                        sx: sourceInputStandardization
                                    },
                                ]}
                                errors={errors}
                            />
                        </div>
                        <div className={style.boxMap}>
                            <Map
                                mapId={'bf51a910020fa25a'}
                                defaultZoom={7}
                                defaultCenter={{ lat: 18.7357, lng: -70.1627 }}
                                gestureHandling={'greedy'}
                                disableDefaultUI={true}
                                onClick={(e) => {
                                    setAddressFromLatLng({
                                        lat: e.detail.latLng?.lat as number,
                                        lng: e.detail.latLng?.lng as number
                                    })
                                }}
                            >
                                <AdvancedMarker ref={markerRef} position={data?.location?.lat && data?.location?.lng ? { lat: data.location.lat, lng: data.location.lng } : null} draggable onDrag={(e) => {
                                    setAddressFromLatLng({
                                        lat: e.latLng?.lat() as number,
                                        lng: e.latLng?.lng() as number
                                    })
                                }} />
                            </Map>


                            <MapHandler place={selectedPlace as google.maps.places.PlaceResult} marker={marker} />
                        </div>
                        <div className={style.contentButton}>
                            <button className={classNames(style.button, isLoadingCreatePost ? style.buttonDisabled : "")} onClick={handleCreate}>
                                {isLoadingCreatePost ? (
                                    <CircularProgress color="info" size="1.1em" />
                                ) : (

                                    <React.Fragment>
                                        Crear anuncio
                                    </React.Fragment>
                                )}
                            </button>
                        </div>
                    </React.Fragment>
                )}
            </div>
        </div>
    )
}

