import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DataFilterI, PriceRangeFilterPropsI } from "./filters.interface";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, TextField } from "@mui/material";
import Tippy from "@tippyjs/react";
import classNames from "classnames";

import { DataPayloadRenderFieldConfigI } from "@components/app/form-input/form-input.interface";
import RadioButtonBodyTypeForm from "@components/pages/post/form/select-item/body-type";
import RadioButtonForm from "@components/pages/post/form/select-item/plain";
import { useLazyGetAutonomyQuery, useLazyGetBatteryCapacityQuery, useLazyGetBodiesQuery, useLazyGetCabinTypeQuery, useLazyGetChargingTimeQuery, useLazyGetColorsQuery, useLazyGetCylindersQuery, useLazyGetDoorsQuery, useLazyGetDrivetrainsQuery, useLazyGetExtrasQuery, useLazyGetFuelsQuery, useLazyGetHeavyVehicleQuery, useLazyGetHorsepowersQuery, useLazyGetSeatingsQuery, useLazyGetSoftTopTypeQuery, useLazyGetStatusesQuery, useLazyGetTransmissionsQuery, useLazyGetTruckTypeQuery, useLazyGetTypeUseQuery } from "@redux/rtk/server/v1/car";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { insertByCondition, orderArray, removeKeys } from "@utils/object/object.util";
import GroupFilter from "./group";

import { DataRadioButtonFormPropsI } from "@components/pages/post/form/select-item/body-type/body-type.interface";
import RadioButtonColorForm from "@components/pages/post/form/select-item/color";
import BoxRadioButton from "@components/pages/post/form/steps/last-form/box-radio-button";
import { useLazyCountPostsQuery } from "@redux/rtk/server/v1/post";
import { updateFilter } from "@redux/slices/filter";
import { dataAvanceFilter } from "@redux/slices/filter/filter.data";
import { generateUrlPost } from "@utils/filter";

import RadioButtonHeavyVehicleForm from "@components/pages/post/form/select-item/heavy-vehicle";
import RadioButtonTruckTypeForm from "@components/pages/post/form/select-item/truck-type";
import { RangeDateNotDinamyc } from "@utils/date/date.util";
import { useRouter } from "next/navigation";
import React from "react";
import styleFilter from "../../filter.module.css";
import styleItem from "../item.module.css";
import style from "./filter.module.css";

export default function AvanceFilter({ allowSearch }: PriceRangeFilterPropsI) {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const tippyInstance = useRef<any>();
    const [initial, setInitial] = useState(true)
    const [countPosts, { isLoading, data: count, isFetching }] = useLazyCountPostsQuery();
    const [getBodies, { isLoading: isLoadingBody, data: respBody }] = useLazyGetBodiesQuery()
    const [getStatusCar, { isLoading: isLoadingStatusCar, data: respStatusCar }] = useLazyGetStatusesQuery()
    const [getColorCar, { isLoading: isLoadingColorCar, data: respColorCar }] = useLazyGetColorsQuery()
    const [getFuels, { isLoading: isLoadingFuelCar, data: respFuelCar }] = useLazyGetFuelsQuery()
    const [getTransmissions, { isLoading: isLoadingTransmissionCar, data: respTransmissionCar }] = useLazyGetTransmissionsQuery()
    const [getDrivetrains, { isLoading: isLoadingDrivetrainCar, data: respDrivetrainCar }] = useLazyGetDrivetrainsQuery()
    const [getDoors, { isLoading: isLoadingDoorCar, data: respDoorCar }] = useLazyGetDoorsQuery()
    const [getSeatings, { isLoading: isLoadingSeatingCar, data: respSeatingCar }] = useLazyGetSeatingsQuery()
    const [getCylinders, { isLoading: isLoadingCylinderCar, data: respCylinderCar }] = useLazyGetCylindersQuery()
    const [getHorsepowers, { isLoading: isLoadingHorsepowerCar, data: respHorsepowerCar }] = useLazyGetHorsepowersQuery()
    const [getBatteryCapacities, { isLoading: isLoadingBatteryCapacity, data: respBatteryCapacity }] = useLazyGetBatteryCapacityQuery()
    const [getChargingTimes, { isLoading: isLoadingChargingTime, data: respChargingTime }] = useLazyGetChargingTimeQuery()
    const [getAutonomies, { isLoading: isLoadingAutonomy, data: respAutonomy }] = useLazyGetAutonomyQuery()
    const [getSoftTopType, { isLoading: isLoadingSoftTopType, data: respSoftTopType }] = useLazyGetSoftTopTypeQuery()
    const [getCabinType, { isLoading: isLoadingCabinType, data: respCabinType }] = useLazyGetCabinTypeQuery()
    const [getTypeUse, { isLoading: isLoadingTypeUse, data: respTypeUse }] = useLazyGetTypeUseQuery()
    const [getHeavyVehicles, { isLoading: isLoadingHeavyVehicle, data: respHeavyVehicle }] = useLazyGetHeavyVehicleQuery()
    const [getTruckTypes, { isLoading: isLoadingTruckType, data: respTruckType }] = useLazyGetTruckTypeQuery()
    const [getExtras, { isLoading: isLoadingExtra, data: respExtra }] = useLazyGetExtrasQuery()

    const filters = useAppSelector((s) => (s.filters))
    const { brandUUID, modelUUID, avanceFilterState } = filters
    const countFilterSelected = useMemo(() => (Object.keys(avanceFilterState).map(key => {
        //@ts-ignore
        return filters[key]
    }).filter(a => {
        if (Array.isArray(a)) {
            return a.length ? true : false
        } else {
            return a ? true : false
        }
    }).length), [avanceFilterState, filters])

    console.log("pp account include", { avanceFilterState: filters?.filterFormatted?.include })
    const dataFilter = useMemo(() => ({
        ...filters.filterFormatted,
        include: {
            ...(removeKeys(filters?.filterFormatted?.include || {}, [
                "car.body.slug", "car.extras.slug", "car.status.slug",
                "car.exteriorColor.color.key", "car.interiorColor.color.key",
                "car.fuelType.slug", "car.cylinder.slug", "car.horsepower.slug",
                "car.batteryCapacity.slug", "car.chargingTime.slug", "car.autonomy.slug",
                "car.transmissionType.slug", "car.drivetrainType.slug", "car.door.cant",
                "car.seating.cant", "car.softTopType.slug", "car.cabinType.slug",
                "car.typeUse.slug", "car.heavyVehicle.slug", "car.truckType.slug"

            ])),
            ...insertByCondition(Array.from(avanceFilterState.bodies || []).length ? true : false, {
                "car.body.slug": avanceFilterState.bodies
            }),
            ...insertByCondition(Array.from(avanceFilterState.extras || []).length ? true : false, {
                "car.extras.slug": avanceFilterState.extras
            }),
            ...insertByCondition(Array.from(avanceFilterState.statusCar || []).length ? true : false, {
                "car.status.slug": avanceFilterState.statusCar
            }),
            ...insertByCondition(Array.from(avanceFilterState.colorsExterior || []).length ? true : false, {
                "car.exteriorColor.color.key": avanceFilterState.colorsExterior
            }),
            ...insertByCondition(Array.from(avanceFilterState.colorsInterior || []).length ? true : false, {
                "car.interiorColor.color.key": avanceFilterState.colorsInterior
            }),
            ...insertByCondition(Array.from(avanceFilterState.fuels || []).length ? true : false, {
                "car.fuelType.slug": avanceFilterState.fuels
            }),
            ...insertByCondition(Array.from(avanceFilterState.cylinders || []).length ? true : false, {
                "car.cylinder.slug": avanceFilterState.cylinders
            }),
            ...insertByCondition(Array.from(avanceFilterState.horsepowers || []).length ? true : false, {
                "car.horsepower.slug": avanceFilterState.horsepowers
            }),
            ...insertByCondition(Array.from(avanceFilterState.batteryCapacities || []).length ? true : false, {
                "car.batteryCapacity.slug": avanceFilterState.batteryCapacities
            }),
            ...insertByCondition(Array.from(avanceFilterState.chargingTime || []).length ? true : false, {
                "car.chargingTime.slug": avanceFilterState.chargingTime
            }),
            ...insertByCondition(Array.from(avanceFilterState.autonomies || []).length ? true : false, {
                "car.autonomy.slug": avanceFilterState.autonomies
            }),
            ...insertByCondition(Array.from(avanceFilterState.transmissions || []).length ? true : false, {
                "car.transmissionType.slug": avanceFilterState.transmissions
            }),
            ...insertByCondition(Array.from(avanceFilterState.drivetrains || []).length ? true : false, {
                "car.drivetrainType.slug": avanceFilterState.drivetrains
            }),
            ...insertByCondition(Array.from(avanceFilterState.doors || []).length ? true : false, {
                "car.door.cant": Array.from(avanceFilterState.doors || []).map((door) => (parseInt(`${door}`)))
            }),
            ...insertByCondition(Array.from(avanceFilterState.seatings || []).length ? true : false, {
                "car.seating.cant": Array.from(avanceFilterState.seatings || []).map((seating) => (parseInt(`${seating}`)))
            }),
            ...insertByCondition(Array.from(avanceFilterState.softTopType || []).length ? true : false, {
                "car.softTopType.slug": Array.from(avanceFilterState.softTopType || []).map((softType) => (softType))
            }),
            ...insertByCondition(Array.from(avanceFilterState.cabinType || []).length ? true : false, {
                "car.cabinType.slug": Array.from(avanceFilterState.cabinType || []).map((cabin) => (cabin))
            }),
            ...insertByCondition(Array.from(avanceFilterState.typeUse || []).length ? true : false, {
                "car.typeUse.slug": Array.from(avanceFilterState.typeUse || []).map((typeUse) => (typeUse))
            }),
            ...insertByCondition(Array.from(avanceFilterState.heavyVehicles || []).length ? true : false, {
                "car.heavyVehicle.slug": avanceFilterState.heavyVehicles
            }),
            ...insertByCondition(Array.from(avanceFilterState.truckTypes || []).length ? true : false, {
                "car.truckType.slug": avanceFilterState.truckTypes
            })
        },
        ranges: {
            ...(removeKeys(filters?.filterFormatted?.ranges || {}, [
                "price", "createdAt"
            ])),
            ...insertByCondition(avanceFilterState.priceLte && avanceFilterState.priceGte, {
                price: {
                    from: avanceFilterState.priceLte,
                    to: avanceFilterState.priceGte
                }
            }),
            ...insertByCondition((avanceFilterState.date.length ? true : false) && RangeDateNotDinamyc()[avanceFilterState.date[0]], {
                createdAt: RangeDateNotDinamyc()[avanceFilterState.date[0]]
            })
        }
    }), [JSON.stringify(filters.filterFormatted), JSON.stringify(avanceFilterState)])

    const includeElectric = useMemo(() => (Array.from(avanceFilterState.fuels || []).includes("electric")), [avanceFilterState.fuels])
    const onlyElectric = useMemo(() => (Array.from(avanceFilterState.fuels || []).length === 1 && includeElectric), [includeElectric, avanceFilterState.fuels])

    const optionsDateRange = useMemo(() => ([
        {
            key: "today",
            label: "Hoy"
        },
        {
            key: "three_days_ago",
            label: "Hace tres días"
        },
        {
            key: "one_week_ago",
            label: "Hace una semana"
        },
        {
            key: "two_weeks_ago",
            label: "Hace dos semanas"
        },
        {
            key: "one_month_ago",
            label: "Hace un mes"
        }
    ]), [])

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
        key: d.uuid,
        slug: d.slug
    }))), [respStatusCar?.data])

    const dataRenderCarFuel = useMemo(() => (Array.from(respFuelCar?.data || []).map(d => ({
        label: d.name,
        key: d.uuid,
        slug: d.slug
    }))), [respFuelCar?.data])

    const dataRenderCarTransmission = useMemo(() => (Array.from(respTransmissionCar?.data || []).map(d => ({
        label: d.name,
        key: d.uuid,
        slug: d.slug
    }))), [respTransmissionCar?.data])


    const dataRenderCarDoor = useMemo(() => (Array.from(respDoorCar?.data || []).map(d => ({
        label: `${d.cant}`,
        key: d.uuid,
        cant: d.cant
    }))), [respDoorCar?.data])

    const dataRenderCarSeating = useMemo(() => (Array.from(respSeatingCar?.data || []).map(d => ({
        label: `${d.cant}`,
        key: d.uuid,
        cant: d.cant
    }))), [respSeatingCar?.data])

    const dataRenderCarCylinder = useMemo(() => (Array.from(respCylinderCar?.data || []).map(d => ({
        label: `${d.cant}`,
        key: d.uuid,
        slug: d.slug
    }))), [respCylinderCar?.data])

    const horsepowerData = useMemo(() => (Array.from(respHorsepowerCar?.data || []).map(d => ({
        label: d.name,
        key: d.uuid,
        slug: d.slug
    }))), [respHorsepowerCar?.data])

    const batteryCapacityData = useMemo(() => (Array.from(respBatteryCapacity?.data || []).map(d => ({
        label: d.name,
        key: d.uuid,
        slug: d.slug
    }))), [respBatteryCapacity?.data])

    const chargingTimeData = useMemo(() => (Array.from(respChargingTime?.data || []).map(d => ({
        label: d.name,
        key: d.uuid,
        slug: d.slug
    }))), [respChargingTime?.data])

    const autonomyData = useMemo(() => (Array.from(respAutonomy?.data || []).map(d => ({
        label: d.name,
        key: d.uuid,
        slug: d.slug
    }))), [respAutonomy?.data])

    const softTopTypeData = useMemo(() => (Array.from(respSoftTopType?.data || []).map(d => ({
        label: d.name,
        key: d.uuid,
        slug: d.slug
    }))), [respSoftTopType?.data])

    const cabinTypeData = useMemo(() => (Array.from(respCabinType?.data || []).map(d => ({
        label: d.name,
        key: d.uuid,
        slug: d.slug
    }))), [respCabinType?.data])

    const typeUseData = useMemo(() => (Array.from(respTypeUse?.data || []).map(d => ({
        label: d.name,
        key: d.uuid,
        slug: d.slug
    }))), [respTypeUse?.data])

    const extras = useMemo(() => (orderArray("slug", Array.from(respExtra?.data || []), [
        "threerowseats", "leatherseats",
        "electricseats", "sunroof",
        "panoramicroof", "360camera",
        "turbo", "biturbo", "imported", "from-the-house"
    ])), [respExtra?.data])

    const dataRenderCarExtra = useMemo(() => (extras.map(d => ({
        label: d.name,
        key: d.slug
    }))), [extras])


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

    const isOnlyTruckHeavyVehicle = useMemo(() => (Array.from(avanceFilterState.heavyVehicles || []).includes("trucks") && Array.from(avanceFilterState.heavyVehicles || []).length == 1), [avanceFilterState.heavyVehicles])

    const { isOnlyConvertible, isMinivan, isOnlyTruck, isVan, isOnlyHeavyVehicle } = useMemo(() => (
        avanceFilterState.bodies.reduce((a, body) => {
            const onlyOne = avanceFilterState.bodies.length === 1
            const onlyTwo = avanceFilterState.bodies.length === 2
            const includeVan = avanceFilterState.bodies.includes("van")
            const includeMiniVan = avanceFilterState.bodies.includes("minivan")

            if (body == "heavyvehicles" && onlyOne) {
                a.isOnlyHeavyVehicle = true
            }

            if (body == "convertible" && onlyOne) {
                a.isOnlyConvertible = true
            }

            if ((body == "minivan" && onlyTwo && includeVan) || (onlyOne && body == "minivan")) {
                a.isMinivan = true
            }

            if (body == "truck" && onlyOne) {
                a.isOnlyTruck = true
            }

            if ((body == "van" && onlyTwo && includeMiniVan) || (onlyOne && body == "van")) {
                a.isVan = true
            }

            return a
        }, {
            isOnlyHeavyVehicle: false,
            isOnlyConvertible: false,
            isOnlyTruck: false,
            isMinivan: false,
            isVan: false
        })
    ), [avanceFilterState.bodies])

    const drivetrains = useMemo(() => (orderArray("slug", Array.from(respDrivetrainCar?.data || []).filter((d) => {
        const includeTruck = ["six-wheel-drive"].includes(d.slug)
        if (includeTruck && isOnlyTruckHeavyVehicle) {
            return d
        } else if (includeTruck && !isOnlyTruckHeavyVehicle) {
            return null
        } else {
            return d
        }
    }), [
        "front-wheel-drive", "rear-wheel-drive", "four-wheel-drive",
        "all-wheel-drive", "four-wheel-drive-part-time",
        "six-wheel-drive", "other"
    ])), [respDrivetrainCar?.data, isOnlyTruckHeavyVehicle])

    const dataRenderCarDrivetrain = useMemo(() => (drivetrains.map(d => ({
        label: d.name,
        key: d.uuid,
        slug: d.slug
    }))), [drivetrains, isOnlyTruckHeavyVehicle])

    const handleUpdate = useCallback((key: keyof DataFilterI, value: any) => {
        setInitial(false)
        dispatch(updateFilter({
            avanceFilterState: {
                ...avanceFilterState,
                [key]: value
            }
        }));
    }, [avanceFilterState])

    const handleUpdateArray = useCallback((key: keyof DataFilterI, value: any, remove: any[] = []) => {
        setInitial(false)
        let array = avanceFilterState[key]

        if (!Array.isArray(array)) return;

        //@ts-ignore
        if (array.includes(value)) {
            //@ts-ignore
            array = array.filter((a) => a !== value);
        } else {
            array = [...array, value];
        }

        if (Array.isArray(array)) {
            //@ts-ignore
            array = array.filter((a) => (!remove.includes(a)))
        }

        dispatch(updateFilter({
            avanceFilterState: {
                ...avanceFilterState,
                [key]: array
            }
        }));
    }, [avanceFilterState])

    const handleUpdateArrayOne = useCallback((key: keyof DataFilterI, value: any) => {
        setInitial(false)
        let array = avanceFilterState[key]

        if (!Array.isArray(array)) return;

        //@ts-ignore
        if (array.includes(value)) {
            //@ts-ignore
            array = array.filter((a) => a !== value);
        } else {
            //@ts-ignore
            array = [value];
        }

        dispatch(updateFilter({
            avanceFilterState: {
                ...avanceFilterState,
                [key]: array
            }
        }));
    }, [avanceFilterState])

    const handleCloseFilter = useCallback(() => {
        if (!tippyInstance) return;
        tippyInstance.current.hide()
        setInitial(true)
    }, [tippyInstance])

    const handleClear = useCallback(() => {
        dispatch(updateFilter({
            avanceFilterState: dataAvanceFilter
        }))

        if (!allowSearch) {
            router.push(generateUrlPost({
                ...filters,
                ...dataAvanceFilter
            }))
        }

        handleCloseFilter()
    }, [allowSearch, filters, dataAvanceFilter])

    const handleApplyFilter = () => {
        if (isLoading) return;

        dispatch(updateFilter({
            ...avanceFilterState
        }))

        handleCloseFilter()

        if (!allowSearch) {
            const url = generateUrlPost({
                ...filters,
                ...avanceFilterState
            })

            router.push(url)
        }
    };

    const handleGetStatusesCar = useCallback(async () => {
        await getStatusCar({}).catch(() => { })
    }, [])

    const handleGetColorsCar = useCallback(async () => {
        await getColorCar({}).catch(() => { })
    }, [])

    const handleGetFuelsCar = useCallback(async () => {
        await getFuels({
            sort: ["createdAt", "DESC"]
        }).catch(() => { })
    }, [])

    const handleGetTransmissionsCar = useCallback(async () => {
        await getTransmissions({
            sort: ["createdAt", "DESC"]
        }).catch(() => { })
    }, [])

    const handleGetDrivetrainsCar = useCallback(async () => {
        await getDrivetrains({
            sort: ["id", "ASC"]
        }).catch(() => { })
    }, [])

    const handleGetDoorsCar = useCallback(async () => {
        await getDoors({}).catch(() => { })
    }, [])

    const handleGetSeatingsCar = useCallback(async () => {
        await getSeatings({}).catch(() => { })
    }, [])

    const handleGetCylindersCar = useCallback(async () => {
        await getCylinders({}).catch(() => { })
    }, [])

    const handleGetHorsepowersCar = useCallback(async () => {
        await getHorsepowers({}).catch(() => { })
    }, [])

    const handleGetBodies = useCallback(async () => {
        await getBodies({}).catch(() => { })
    }, [])

    const handleGetBatteryCapacities = useCallback(async () => {
        await getBatteryCapacities({}).catch(() => { })
    }, [])

    const handleGetChargingTimes = useCallback(async () => {
        await getChargingTimes({}).catch(() => { })
    }, [])

    const handleGetAutonomies = useCallback(async () => {
        await getAutonomies({}).catch(() => { })
    }, [])

    const handleGetSoftTopTypes = useCallback(async () => {
        await getSoftTopType({}).catch(() => { })
    }, [])

    const handleGetCabinType = useCallback(async () => {
        await getCabinType({}).catch(() => { })
    }, [])

    const handleGetTypeUse = useCallback(async () => {
        await getTypeUse({}).catch(() => { })
    }, [])

    const handleGetHeavyVehicle = useCallback(async () => {
        await getHeavyVehicles({}).catch(() => { })
    }, [])

    const handleGetTruckType = useCallback(async () => {
        await getTruckTypes({}).catch(() => { })
    }, [])

    const handleGetExtras = useCallback(async () => {
        await getExtras({
            include: {
                slug: [
                    "threerowseats", "leatherseats",
                    "electricseats", "sunroof",
                    "panoramicroof", "360camera",
                    "turbo", "biturbo", "imported", "from-the-house"
                ]
            }
        }).catch(() => { })
    }, [])


    const handleGetData = useCallback(async () => {

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
        await handleGetBatteryCapacities()
        await handleGetChargingTimes()
        await handleGetAutonomies()
        await handleGetSoftTopTypes()
        await handleGetCabinType()
        await handleGetTypeUse()
        await handleGetHeavyVehicle()
        await handleGetTruckType()
        await handleGetExtras()

    }, [])

    const getCount = useCallback(() => {
        console.log("pp account jei here", { dataFilter })
        countPosts(dataFilter);
    }, [dataFilter])

    useEffect(() => {
        if (!initial) {
            getCount()
        }
    }, [dataFilter, initial])

    useEffect(() => {
        handleGetData()
    }, [])

    return (
        <Tippy
            key={`model-filter`}
            interactive
            arrow={false}
            trigger="click"
            placement="bottom-end"
            animation="shift-away"
            maxWidth={"auto"}
            onCreate={(intance) => tippyInstance.current = intance}
            onClickOutside={() => {
                setInitial(true)
            }}
            content={
                <div className={style.container}>
                    <div className={style.boxList}>
                        {brandUUID && modelUUID ? (
                            <GroupFilter
                                title="Rango de Precios"
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Desde"
                                            variant="outlined"
                                            type="number"
                                            value={avanceFilterState.priceLte}
                                            onChange={(e) => handleUpdate("priceLte", parseFloat(`${e.currentTarget.value}`))}
                                            sx={{
                                                width: "100%"
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField
                                            label="Hasta"
                                            variant="outlined"
                                            type="number"
                                            value={avanceFilterState.priceGte}
                                            onChange={(e) => handleUpdate("priceGte", parseFloat(`${e.currentTarget.value}`))}
                                            sx={{
                                                width: "100%"
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </GroupFilter>
                        ) : null}

                        <GroupFilter
                            title="Tipo de carroceria"
                        >
                            <div className={classNames(style.boxBody, style.boxOptions)}>
                                {optionsBody.map((body, i) => (
                                    <div key={`body-${i}`} className={classNames(avanceFilterState.bodies.includes(body.data.slug) ? style.boxActive : "")}>
                                        <RadioButtonBodyTypeForm
                                            active={avanceFilterState.bodies.includes(body.data.slug)}
                                            data={body.data}
                                            label={body.label}
                                            handleClick={() => {
                                                if (body.data.slug === "heavyvehicles") {
                                                    return handleUpdateArrayOne("bodies", body.data.slug)
                                                }

                                                handleUpdateArray("bodies", body.data.slug)
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </GroupFilter>

                        {isOnlyHeavyVehicle && (

                            <GroupFilter
                                title="Tipo de vehiculos pesados"
                            >
                                <div className={classNames(style.boxBody, style.boxOptions)}>
                                    {optionsHeavyVehicle.map((heavyVehicle, i) => (
                                        <div key={`heavy-vehicle-${i}`} className={classNames(avanceFilterState.heavyVehicles.includes(heavyVehicle.data.slug) ? style.boxActive : "")}>
                                            <RadioButtonHeavyVehicleForm
                                                active={avanceFilterState.bodies.includes(heavyVehicle.data.slug)}
                                                data={heavyVehicle.data}
                                                label={heavyVehicle.label}
                                                handleClick={() => {
                                                    handleUpdateArray("heavyVehicles", heavyVehicle.data.slug)
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </GroupFilter>
                        )}

                        {isOnlyTruckHeavyVehicle && (
                            <GroupFilter
                                title="Tipo de camiones"
                            >
                                <div className={classNames(style.boxBody, style.boxOptions)}>
                                    {optionsTruckType.map((truckType, i) => (
                                        <div key={`truck-type-${i}`} className={classNames(avanceFilterState.truckTypes.includes(truckType.data.slug) ? style.boxActive : "")}>
                                            <RadioButtonTruckTypeForm
                                                active={avanceFilterState.truckTypes.includes(truckType.data.slug)}
                                                data={truckType.data}
                                                label={truckType.label}
                                                handleClick={() => {
                                                    handleUpdateArray("truckTypes", truckType.data.slug)
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </GroupFilter>
                        )}

                        {isOnlyConvertible && (
                            <GroupFilter
                                title="Tipo de capota"
                            >
                                <div className={classNames(style.boxOptions, style.boxStatus)}>
                                    {softTopTypeData.map((softTopType, i) => (
                                        <div key={`soft-top-type-${i}`} className={classNames(avanceFilterState.softTopType.includes(softTopType.slug) ? style.boxActive : "")}>
                                            <RadioButtonForm
                                                active
                                                label={softTopType.label}
                                                handleClick={() => {
                                                    handleUpdateArrayOne("softTopType", softTopType.slug)
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </GroupFilter>
                        )}

                        {isOnlyTruck && (
                            <GroupFilter
                                title="Tipo de cabina"
                            >
                                <div className={classNames(style.boxOptions, style.boxStatus)}>
                                    {cabinTypeData.map((cabin, i) => (
                                        <div key={`cabin-type-${i}`} className={classNames(avanceFilterState.cabinType.includes(cabin.slug) ? style.boxActive : "")}>
                                            <RadioButtonForm
                                                active
                                                label={cabin.label}
                                                handleClick={() => {
                                                    handleUpdateArray("cabinType", cabin.slug)
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </GroupFilter>
                        )}

                        {isVan || isMinivan ? (
                            <GroupFilter
                                title="Tipo de uso"
                            >
                                <div className={classNames(style.boxOptions, style.boxStatus)}>
                                    {typeUseData.map((typeUse, i) => (
                                        <div key={`type-use-${i}`} className={classNames(avanceFilterState.typeUse.includes(typeUse.slug) ? style.boxActive : "")}>
                                            <RadioButtonForm
                                                active
                                                label={typeUse.label}
                                                handleClick={() => {
                                                    handleUpdateArrayOne("typeUse", typeUse.slug)
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </GroupFilter>
                        ) : null}

                        <GroupFilter
                            title="Estado del vehículo"
                        >
                            <div className={classNames(style.boxOptions, style.boxStatus)}>
                                {dataRenderCarStatus.map((status, i) => (
                                    <div key={`status-car-${i}`} className={classNames(avanceFilterState.statusCar.includes(status.slug) ? style.boxActive : "")}>
                                        <RadioButtonForm
                                            active
                                            label={status.label}
                                            handleClick={() => {
                                                handleUpdateArrayOne("statusCar", status.slug)
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </GroupFilter>

                        <GroupFilter
                            title="Color exterior"
                        >
                            <BoxRadioButton
                                data={colorsExterior}
                            >
                                {({ item, }) => (
                                    <RadioButtonColorForm
                                        execute
                                        active={avanceFilterState.colorsExterior.includes(`${item.color}`)}
                                        //@ts-ignore
                                        data={item.data as DataRadioButtonFormPropsI}
                                        label={item.label}
                                        handleClick={() => {
                                            handleUpdateArray("colorsExterior", item.color as string)
                                        }}
                                    />
                                )}
                            </BoxRadioButton>
                        </GroupFilter>

                        <GroupFilter
                            title="Color interior"
                        >
                            <BoxRadioButton
                                data={colorsInterior}
                            >
                                {({ item }) => (
                                    <RadioButtonColorForm
                                        execute
                                        active={avanceFilterState.colorsInterior.includes(`${item.color}`)}
                                        //@ts-ignore
                                        data={item.data as DataRadioButtonFormPropsI}
                                        label={item.label}
                                        handleClick={() => {
                                            handleUpdateArray("colorsInterior", item.color as string)
                                        }}
                                    />
                                )}
                            </BoxRadioButton>
                        </GroupFilter>

                        <GroupFilter
                            title="Tipo de combustible"
                        >
                            <div className={classNames(style.boxOptions, style.boxStatus)}>
                                {dataRenderCarFuel.map((fuel, i) => (
                                    <div key={`fuel-car-${i}`} className={classNames(avanceFilterState.fuels.includes(fuel.slug) ? style.boxActive : "")}>
                                        <RadioButtonForm
                                            active
                                            label={fuel.label}
                                            handleClick={() => {
                                                handleUpdateArray("fuels", fuel.slug)
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </GroupFilter>

                        {!onlyElectric && (

                            <GroupFilter
                                title="Cantidad de cilindros"
                            >
                                <div className={classNames(style.boxOptions, style.boxStatus)}>
                                    {dataRenderCarCylinder.map((cylinder, i) => (
                                        <div key={`cylinder-car-${i}`} className={classNames(avanceFilterState.cylinders.includes(cylinder.slug) ? style.boxActive : "")}>
                                            <RadioButtonForm
                                                active
                                                label={cylinder.label}
                                                handleClick={() => {
                                                    handleUpdateArray("cylinders", cylinder.slug)
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </GroupFilter>
                        )}

                        <GroupFilter
                            title="Potencia"
                        >
                            <BoxRadioButton
                                data={horsepowerData}
                            >
                                {({ item }) => (
                                    <RadioButtonForm
                                        execute
                                        active={avanceFilterState.horsepowers.includes(item.slug)}
                                        label={item.label}
                                        handleClick={() => {
                                            handleUpdateArray("horsepowers", item.slug)
                                        }}
                                    />
                                )}
                            </BoxRadioButton>
                        </GroupFilter>

                        {includeElectric && (
                            <React.Fragment>
                                <GroupFilter
                                    title="Capacidad de bateria"
                                >
                                    <BoxRadioButton
                                        data={batteryCapacityData}
                                    >
                                        {({ item }) => (
                                            <RadioButtonForm
                                                execute
                                                label={item.label}
                                                active={avanceFilterState.batteryCapacities.includes(item.slug)}
                                                handleClick={() => {
                                                    handleUpdateArray("batteryCapacities", item.slug)
                                                }}
                                            />
                                        )}
                                    </BoxRadioButton>
                                </GroupFilter>

                                <GroupFilter
                                    title="Tiempo de carga"
                                >
                                    <BoxRadioButton
                                        data={chargingTimeData}
                                    >
                                        {({ item }) => (
                                            <RadioButtonForm
                                                execute
                                                label={item.label}
                                                active={avanceFilterState.chargingTime.includes(item.slug)}
                                                handleClick={() => {
                                                    handleUpdateArray("chargingTime", item.slug)
                                                }}
                                            />
                                        )}
                                    </BoxRadioButton>
                                </GroupFilter>

                                <GroupFilter
                                    title="Autonomia"
                                >
                                    <BoxRadioButton
                                        data={autonomyData}
                                    >
                                        {({ item }) => (
                                            <RadioButtonForm
                                                execute
                                                label={item.label}
                                                active={avanceFilterState.autonomies.includes(item.slug)}
                                                handleClick={() => {
                                                    handleUpdateArray("autonomies", item.slug)
                                                }}
                                            />
                                        )}
                                    </BoxRadioButton>
                                </GroupFilter>
                            </React.Fragment>
                        )}

                        <GroupFilter
                            title="Tipo de transmisión"
                        >
                            <div className={classNames(style.boxOptions)}>
                                {dataRenderCarTransmission.map((transmission, i) => (
                                    <div key={`transmission-car-${i}`} className={classNames(avanceFilterState.transmissions.includes(transmission.slug) ? style.boxActive : "")}>
                                        <RadioButtonForm
                                            active
                                            label={transmission.label}
                                            handleClick={() => {
                                                handleUpdateArray("transmissions", transmission.slug)
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </GroupFilter>

                        <GroupFilter
                            title="Tipo de tracción"
                        >
                            <div className={classNames(style.boxOptions)}>
                                {dataRenderCarDrivetrain.map((drivetrain, i) => (
                                    <div key={`drivetrain-car-${i}`} className={classNames(avanceFilterState.drivetrains.includes(drivetrain.slug) ? style.boxActive : "")}>
                                        <RadioButtonForm
                                            active
                                            label={drivetrain.label}
                                            handleClick={() => {
                                                handleUpdateArray("drivetrains", drivetrain.slug)
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </GroupFilter>

                        <GroupFilter
                            title="Puertas"
                        >
                            <div className={classNames(style.boxOptions)}>
                                {dataRenderCarDoor.map((door, i) => (
                                    <div key={`door-car-${i}`} className={classNames(avanceFilterState.doors.includes(door.cant) ? style.boxActive : "")}>
                                        <RadioButtonForm
                                            active
                                            label={door.label}
                                            handleClick={() => {
                                                handleUpdateArray("doors", door.cant)
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </GroupFilter>

                        <GroupFilter
                            title="Capacidad de asientos"
                        >
                            <div className={classNames(style.boxOptions)}>
                                {dataRenderCarSeating.map((seating, i) => (
                                    <div key={`seating-car-${i}`} className={classNames(avanceFilterState.seatings.includes(seating.cant) ? style.boxActive : "")}>
                                        <RadioButtonForm
                                            active
                                            label={seating.label}
                                            handleClick={() => {
                                                handleUpdateArray("seatings", seating.cant)
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </GroupFilter>

                        <GroupFilter
                            title="Extras"
                        >
                            <BoxRadioButton
                                showMore={{ totalItemNoActive: 5 }}
                                data={dataRenderCarExtra}
                                container={{
                                    style: {
                                        gap: ".5rem"
                                    }
                                }}
                            >
                                {({ item }) => (
                                    <RadioButtonForm
                                        execute
                                        active={avanceFilterState.extras.includes(item.key)}
                                        label={item.label}
                                        handleClick={() => {
                                            const remove: string[] = []

                                            if (item.key == "from-the-house") {
                                                remove.push("imported")
                                            } else if (item.key == "imported") {
                                                remove.push("from-the-house")
                                            }

                                            if (item.key == "sunroof") {
                                                remove.push("panoramicroof")
                                            } else if (item.key == "panoramicroof") {
                                                remove.push("sunroof")
                                            }

                                            if (item.key == "turbo") {
                                                remove.push("biturbo")
                                            } else if (item.key == "biturbo") {
                                                remove.push("turbo")
                                            }

                                            handleUpdateArray("extras", item.key, remove)
                                        }}
                                    />
                                )}
                            </BoxRadioButton>
                        </GroupFilter>

                        <GroupFilter
                            title="Vendedor"
                        >
                            <div className={classNames(style.boxOptions, style.boxStatus)}>
                                {[
                                    { label: "Dealer", slug: "dealer" },
                                    { label: "Particular", slug: "particular" }
                                ].map((seller, i) => (
                                    <div key={`seller-car-${i}`} className={classNames(avanceFilterState.sellers.includes(seller.slug) ? style.boxActive : "")}>
                                        <RadioButtonForm
                                            active
                                            label={seller.label}
                                            handleClick={() => {
                                                handleUpdateArrayOne("sellers", seller.slug)
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </GroupFilter>

                        <GroupFilter
                            title="Ads posted"
                        >
                            <div className={classNames(style.boxOptions, style.boxStatus)}>
                                {optionsDateRange.map((range, i) => (
                                    <div key={`date-range-car-${i}`} className={classNames(avanceFilterState.date.includes(range.key) ? style.boxActive : "")}>
                                        <RadioButtonForm
                                            active
                                            label={range.label}
                                            handleClick={() => {
                                                handleUpdateArrayOne("date", range.key)
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </GroupFilter>


                    </div>
                    <div className={classNames(styleFilter.boxButton)}>
                        <div className={styleFilter.boxClear}>
                            <button onClick={() => handleClear()}>Limpiar</button>
                        </div>
                        <div className={styleFilter.boxApply}>
                            <button onClick={() => handleApplyFilter()}>
                                {isFetching || isLoading ? "Cargando..." : (
                                    initial ? "Aplicar filtros" : `Mostrar ${count || 0} resultado`
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            }
        >
            <div className={classNames(styleItem.item, !allowSearch ? styleItem.noBorder : "")}>
                <div className={styleItem.contentItem}>
                    <strong>Filtros</strong>
                    <div className={styleItem.boxSearch}>
                        {countFilterSelected > 0 ? (
                            <p>{countFilterSelected} filtro{countFilterSelected > 1 ? "s" : ""} seleccionado</p>
                        ) : (
                            <p>Tipo de carroceria, Estado del vehículo, Color exterior, etc.</p>
                        )}
                    </div>
                </div>
                <div className={styleItem.boxIcon}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            </div>
        </Tippy>


    )
}