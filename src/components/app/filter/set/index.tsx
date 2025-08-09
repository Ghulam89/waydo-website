import { updateFilter } from "@redux/slices/filter";
import { AvanceFilterI } from "@redux/slices/filter/filter.interface";
import { useAppDispatch } from "@redux/store";
import { RangeDateNotDinamyc } from "@utils/date/date.util";
import { MAX_PRICE_FILER, MIN_PRICE_FILTER } from "@utils/filter";
import { insertByCondition } from "@utils/object/object.util";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { SetFilterPropsI } from "./set.interface";
import { StatusCar } from "./utils";

export default function SetFilter({ children }: SetFilterPropsI) {
    const dispatch = useAppDispatch()
    const query = useSearchParams()
    const params = useParams()

    useEffect(() => {
        const { brand, model, type } = params || {}
        const version = query.get("version")
        const priceLte = query.get("price__lte")
        const priceGte = query.get("price__gte")
        const yearLte = query.get("year__lte")
        const yearGte = query.get("year__gte")
        const seatings = query.getAll("seatings")
        const autonomies = query.getAll("autonomies")
        const fuels = query.getAll("fuels")
        const batteryCapacities = query.getAll("battery__capacities")
        const bodies = query.getAll("bodies")
        const chargingTime = query.getAll("charging__time")
        const horsepowers = query.getAll("horsepowers")
        const colorsExterior = query.getAll("colors_exterior")
        const colorsInterior = query.getAll("colors__interior")
        const cylinders = query.getAll("cylinders")
        const drivetrains = query.getAll("drivetrains")
        const doors = query.getAll("doors")
        const transmissions = query.getAll("transmissions")
        const statusCar = query.getAll("status__car")
        const search = query.get("keyword")
        const softTopType = query.getAll("soft_top_type")
        const cabinType = query.getAll("cabin_type")
        const typeUse = query.getAll("type_use")
        const heavyVehicles = query.getAll("heavy__vehicles")
        const truckTypes = query.getAll("truck__types")
        const extras = query.getAll("extras")
        const sellers = query.getAll("sellers")
        const date = query.getAll("date")

        const filterPrice = {
            ...(insertByCondition(priceLte || priceGte, { priceLte: priceLte ? parseFloat(`${priceLte}`) : MIN_PRICE_FILTER })),
            ...(insertByCondition(priceGte || priceLte, { priceGte: priceGte ? parseFloat(`${priceGte}`) : MAX_PRICE_FILER })),
        }

        const avanceFilter: AvanceFilterI = {
            priceGte: 0, // Only for interface
            priceLte: 0, // Only for interface
            ...filterPrice,
            autonomies,
            batteryCapacities,
            bodies,
            chargingTime,
            colorsExterior,
            colorsInterior,
            cylinders,
            heavyVehicles,
            truckTypes,
            doors: Array.from(doors || []).map((d) => (parseInt(d))),
            drivetrains,
            fuels,
            horsepowers,
            seatings: Array.from(seatings || []).map((s) => (parseInt(s))),
            statusCar,
            transmissions,
            softTopType,
            cabinType,
            typeUse,
            extras,
            sellers,
            date
        }

        const filters = {
            filters: {
                ...(insertByCondition(brand, { "car.brand.slug": brand })),
                ...(insertByCondition(model, { "car.model.slug": model })),
                ...(insertByCondition(version, { "car.version.slug": version })),
                ...(insertByCondition(Object.keys(StatusCar).includes(`${type}`), { "car.status.slug": StatusCar[`${type}`] }))
            },
            ranges: {
                ...insertByCondition(priceLte && priceGte, {
                    "price": {
                        from: parseFloat(`${priceLte}`),
                        to: parseFloat(`${priceGte}`),
                    }
                }),
                ...insertByCondition(yearLte && yearGte, {
                    "car.year": {
                        from: parseInt(`${yearLte}`),
                        to: parseInt(`${yearGte}`),
                    }
                }),
                ...insertByCondition((date.length ? true : false) && RangeDateNotDinamyc()[date[0]], {
                    createdAt: RangeDateNotDinamyc()[date[0]]
                })
            },
            include: {
                ...insertByCondition(Array.from(avanceFilter.bodies || []).length ? true : false, {
                    "car.body.slug": avanceFilter.bodies
                }),
                ...insertByCondition(Array.from(avanceFilter.statusCar || []).length ? true : false, {
                    "car.status.slug": avanceFilter.statusCar
                }),
                ...insertByCondition(Array.from(avanceFilter.colorsExterior || []).length ? true : false, {
                    "car.exteriorColor.color.key": avanceFilter.colorsExterior
                }),
                ...insertByCondition(Array.from(avanceFilter.colorsInterior || []).length ? true : false, {
                    "car.interiorColor.color.key": avanceFilter.colorsInterior
                }),
                ...insertByCondition(Array.from(avanceFilter.fuels || []).length ? true : false, {
                    "car.fuelType.slug": avanceFilter.fuels
                }),
                ...insertByCondition(Array.from(avanceFilter.cylinders || []).length ? true : false, {
                    "car.cylinder.slug": avanceFilter.cylinders
                }),
                ...insertByCondition(Array.from(avanceFilter.horsepowers || []).length ? true : false, {
                    "car.horsepower.slug": avanceFilter.horsepowers
                }),
                ...insertByCondition(Array.from(avanceFilter.batteryCapacities || []).length ? true : false, {
                    "car.batteryCapacity.slug": avanceFilter.batteryCapacities
                }),
                ...insertByCondition(Array.from(avanceFilter.chargingTime || []).length ? true : false, {
                    "car.chargingTime.slug": avanceFilter.chargingTime
                }),
                ...insertByCondition(Array.from(avanceFilter.autonomies || []).length ? true : false, {
                    "car.autonomy.slug": avanceFilter.autonomies
                }),
                ...insertByCondition(Array.from(avanceFilter.transmissions || []).length ? true : false, {
                    "car.transmissionType.slug": avanceFilter.transmissions
                }),
                ...insertByCondition(Array.from(avanceFilter.drivetrains || []).length ? true : false, {
                    "car.drivetrainType.slug": avanceFilter.drivetrains
                }),
                ...insertByCondition(Array.from(avanceFilter.doors || []).length ? true : false, {
                    "car.door.cant": Array.from(avanceFilter.doors || []).map((door) => (parseInt(`${door}`)))
                }),
                ...insertByCondition(Array.from(avanceFilter.seatings || []).length ? true : false, {
                    "car.seating.cant": Array.from(avanceFilter.seatings || []).map((seating) => (parseInt(`${seating}`)))
                }),
                ...insertByCondition(Array.from(avanceFilter.softTopType || []).length ? true : false, {
                    "car.softTopType.slug": avanceFilter.softTopType
                }),
                ...insertByCondition(Array.from(avanceFilter.cabinType || []).length ? true : false, {
                    "car.cabinType.slug": avanceFilter.cabinType
                }),
                ...insertByCondition(Array.from(avanceFilter.typeUse || []).length ? true : false, {
                    "car.typeUse.slug": avanceFilter.typeUse
                }),
                ...insertByCondition(Array.from(avanceFilter.heavyVehicles || []).length ? true : false, {
                    "car.heavyVehicle.slug": avanceFilter.heavyVehicles
                }),
                ...insertByCondition(Array.from(avanceFilter.truckTypes || []).length ? true : false, {
                    "car.truckType.slug": avanceFilter.truckTypes
                }),
                ...insertByCondition(Array.from(avanceFilter.extras || []).length ? true : false, {
                    "car.extras.slug": avanceFilter.extras
                })
            },
            ...(insertByCondition(search, {
                search: {
                    value: search,
                    keys: [
                        "title",
                        "car.interiorColor.color.name",
                        "car.exteriorColor.color.name",
                        "car.brand.name",
                        "car.model.name",
                        "car.version.name",
                        "car.status.name",
                        "car.transmissionType.name",
                        "car.drivetrainType.name",
                        "car.extras.name"
                    ]
                }
            })),
        }

        dispatch(updateFilter({
            ...filterPrice,
            ...avanceFilter,
            ...(insertByCondition(brand, { brandSlug: brand, brandUUID: "" })),
            ...(insertByCondition(model, { modelSlug: model, modelUUID: "" })),
            ...(insertByCondition(version, { versionSlug: version, versionUUID: "" })),
            ...(insertByCondition(yearLte || yearGte, { yearLte: yearLte ? parseFloat(`${yearLte}`) : MIN_PRICE_FILTER })),
            ...(insertByCondition(yearGte || yearLte, { yearGte: yearGte ? parseFloat(`${yearGte}`) : MAX_PRICE_FILER })),
            filterFormatted: filters,
            avanceFilterState: avanceFilter,
            search: search || ""
        }))

    }, [params, query])

    return children
}