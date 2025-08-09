import Tippy from "@tippyjs/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BrandFilterPropsI } from "./brand.interface";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLazyGetBrandsCarQuery } from "@redux/rtk/server/v1/car";
import { updateFilter } from "@redux/slices/filter";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { ItemBaseWrappeFilterI } from "../base-wrappe/base-wrappe.interface";
import style from "../item.module.css";
import ItemBrandFilter from "./item";

export default function BrandFilter({ allowSearch }: BrandFilterPropsI) {
    const [initial, setInitial] = useState<boolean>(false)
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const tippyInstance = useRef<any>();
    const dispatch = useAppDispatch()
    const [search, setSearch] = useState<string>("")

    const filters = useAppSelector((s) => (s.filters))
    const { brandSlug, brandUUID, brandName } = filters
    const [getBrands, { data: responseBrand }] = useLazyGetBrandsCarQuery()

    const items = useMemo(() => (
        [
            {
                name: "Todos los carros",
                slug: "",
                uuid: ""
            },
            ...(
                (isSearching ? Array.from(responseBrand?.data || [])
                    .filter((item) => (item.name.toLowerCase().includes(search.toLowerCase()))) : Array.from(responseBrand?.data || []))
                    .map((item) => ({ name: item.name, slug: item.slug, uuid: item.uuid }))
            )
        ]
    ), [responseBrand?.data, search, isSearching])

    const handleGetBrands = useCallback(async () => {
        await getBrands({
            sort: ["name", "ASC"]
        }).catch(() => { })
    }, [])

    const handleSetData = useCallback((item: ItemBaseWrappeFilterI, isNew: boolean = false) => {
        setIsSearching(false)
        setInitial(false)

        dispatch(updateFilter({
            brandName: item.name,
            brandSlug: item.slug,
            brandUUID: item.uuid,
            ...(!isNew ? {
                modelSlug: "",
                modelUUID: "",
                modelName: "",
                versionName: "",
                versionSlug: "",
                versionUUID: ""
            } : {})
        }))
    }, [])

    const handleSearch = useCallback((search: string) => {
        setIsSearching(true)
        setSearch(search)
    }, [])

    useEffect(() => {
        handleGetBrands()
    }, [])

    useEffect(() => {
        if (brandSlug && !brandUUID && Array.isArray(responseBrand?.data)) {
            const item = Array.from(responseBrand?.data || []).find((d) => (d.slug == brandSlug))
            if (!item) return;

            handleSetData(item, true)
        }
    }, [brandSlug, brandUUID, responseBrand?.data])

    useEffect(() => {
        if (!brandSlug && !brandUUID) {
            setSearch("")
            dispatch(updateFilter({
                brandName: ""
            }))
        }
    }, [brandSlug, brandUUID])

    useEffect(() => {
        if (!search && !initial && brandName) {
            setInitial(true)
            setSearch(brandName || "")
        }
    }, [brandName, search, initial])

    return (
        <Tippy
            key={`brand-filter`}
            interactive
            arrow={false}
            trigger="click"
            placement="bottom-start"
            animation="shift-away"
            maxWidth={"auto"}
            onCreate={(intance) => tippyInstance.current = intance}
            content={
                <ItemBrandFilter
                    items={items}
                    setSearch={(value) => {
                        setSearch(value)
                        setIsSearching(false)
                    }}
                    tippyInstance={tippyInstance}
                    allowSearch={allowSearch}
                />
            }
        >
            <div className={style.item}>
                <div className={style.contentItem}>
                    <strong>Marca</strong>
                    <div className={style.boxSearch}>
                        <input type="text" placeholder="ej. Toyota" onChange={(e) => (handleSearch(e.currentTarget?.value || ""))} value={search} />
                    </div>
                </div>
                <div className={style.boxIcon}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            </div>
        </Tippy>

    )
}