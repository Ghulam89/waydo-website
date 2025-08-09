'use client'

import { useAppDispatch, useAppSelector } from "@redux/hooks"
import Image from "next/image"
import { useCallback, useMemo } from "react"

import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { updateFilter } from "@redux/slices/filter"
import { FuelCarType, TypeCar } from "@redux/slices/filter/filter.interface"
import { generateUrlPost } from "@utils/filter"
import classNames from "classnames"
import { useRouter, useSearchParams } from "next/navigation"
import { FUEL_CAR_DATA, TYPE_CARS_DATA } from "./quick-search.data"
import style from "./quick-search.module.css"

export default function QuickSearchHome() {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const query = useSearchParams()

    const filters = useAppSelector((s) => s.filters)
    const { fuels, bodies, avanceFilterState } = filters

    const listTypeCar = useMemo(() => (TYPE_CARS_DATA.map((item) => {
        item.active = bodies.includes(item.key);
        return item
    })), [bodies, TYPE_CARS_DATA])

    const listFuelCar = useMemo(() => (FUEL_CAR_DATA.map((item) => {
        item.active = fuels.includes(item.key);
        return item
    })), [fuels, FUEL_CAR_DATA])

    const handleUpdateTypeCar = useCallback((key: TypeCar) => {
        const _bodies = [...bodies]
        const _bodiesAvance = [...(avanceFilterState.bodies || [])]
        const index = _bodies.indexOf(key)

        if (index > -1) {
            _bodies.splice(index, 1);
            _bodiesAvance.splice(index, 1);
        } else {
            _bodies.push(key)
            _bodiesAvance.push(key)
        }

        dispatch(updateFilter({
            bodies: _bodies,
            avanceFilterState: {
                ...avanceFilterState,
                bodies: _bodiesAvance
            }
        }))
    }, [bodies, avanceFilterState])

    const handleUpdateFuelCar = useCallback((key: FuelCarType) => {
        const _fuels = [...fuels]
        const _fuelsAvance = [...(avanceFilterState.fuels || [])]
        const index = _fuels.indexOf(key)

        if (index > -1) {
            _fuels.splice(index, 1);
            _fuelsAvance.splice(index, 1);
        } else {
            _fuels.push(key)
            _fuelsAvance.push(key)
        }

        dispatch(updateFilter({
            fuels: _fuels,
            avanceFilterState: {
                ...avanceFilterState,
                fuels: _fuelsAvance
            }
        }))
    }, [fuels, avanceFilterState])

    const handleSearch = useCallback(() => {
        const url = generateUrlPost({
            ...filters,
            ...avanceFilterState
        })

        router.push(url)
    }, [filters])

    return (

        <div className={style.container}>
            <div className={style.boxTitle}>
                <h3>Busqueda rapida</h3>
            </div>
            <div className={style.box}>
                <div>
                    <div className={style.boxList}>
                        {listTypeCar.map((car, i) => (
                            <div className={classNames(style.list, car.active ? style.listActive : "")} key={i} onClick={() => handleUpdateTypeCar(car.key)}>
                                <div className={style.boxImage}>
                                    <Image src={car.img} height={50} width={80} alt={car.label} />
                                </div>
                                <span>{car.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={style.divider}></div>
                <div className={style.contentFuel}>
                    <div className={style.boxFuel}>
                        <div className={classNames(style.boxList, style.boxListFuel)}>
                            {listFuelCar.map((car, i) => (
                                <div className={classNames(style.list, car.active ? style.listActive : "")} key={i} onClick={() => handleUpdateFuelCar(car.key)}>
                                    <div className={style.boxImage}>
                                        <Image src={car.img} height={50} width={80} alt={car.label} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={style.contentInfo}>
                    <div className={style.boxInfo}>
                        <div>
                            <FontAwesomeIcon icon={faCircleInfo} />
                        </div>
                        <p>Elige uno o mas tipos de vehiculos y combustibles para acceder a una busqueda persomalizada.</p>
                    </div>
                </div>
                <div className={style.boxButton}>
                    <button onClick={handleSearch}>Buscar</button>
                </div>
            </div>
        </div>
    )
}