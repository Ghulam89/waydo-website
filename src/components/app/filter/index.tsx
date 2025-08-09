'use client'

import Search from "@svg/Search.svg"

import { useAppSelector } from "@redux/store"
import { useCallback, useMemo, useRef } from "react"
import { FilterPropsI } from "./filter.interface"
import style from "./filter.module.css"
import AvanceFilter from "./item/avance"
import BrandFilter from "./item/brand"
import ModelFilter from "./item/model"
import PriceRangeFilter from "./item/price-range"
import VersionFilter from "./item/version"
import YearFilter from "./item/year"
import SetFilter from "./set"

export default function Filter({ onSearch }: FilterPropsI) {
    const inputSearchRef = useRef<HTMLInputElement>();
    const filters = useAppSelector((s) => (s.filters))
    const { modelUUID, brandUUID } = filters
    const allowSearch = useMemo(() => (typeof onSearch == "function"), [onSearch])

    const handleSearch = useCallback(() => {
        if (typeof onSearch == "function") {
            onSearch(filters)
        }

        setTimeout(() => inputSearchRef.current?.focus(), 300);
    }, [allowSearch, filters]);

    return (
        <SetFilter>
            <div className={style.box}>
                <div className={style.boxItem}>
                    <BrandFilter allowSearch={allowSearch} />
                    <ModelFilter allowSearch={allowSearch} />
                    {brandUUID && modelUUID ? (
                        <VersionFilter allowSearch={allowSearch} />
                    ) : null}

                    <YearFilter allowSearch={allowSearch} />


                    {!modelUUID ? (
                        <PriceRangeFilter allowSearch={allowSearch} />
                    ) : null}

                    <AvanceFilter allowSearch={allowSearch} />
                </div>

                {onSearch ? (
                    <div>
                        <div className={style.boxSearch} onClick={handleSearch}>
                            <Search />
                        </div>
                    </div>
                ) : null}
            </div>
        </SetFilter>
    )
}