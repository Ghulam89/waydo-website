import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLazyGetModelsByBrandCarQuery } from "@redux/rtk/server/v1/car";
import { updateFilter } from "@redux/slices/filter";
import { useAppDispatch, useAppSelector } from "@redux/store";
import Tippy from "@tippyjs/react";
import classNames from "classnames";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ItemBaseWrappeFilterI } from "../base-wrappe/base-wrappe.interface";
import style from "../item.module.css";
import ItemModelFilter from "./item";
import { ModelFilterPropsI } from "./model.interface";

export default function ModelFilter({ allowSearch }: ModelFilterPropsI) {
    const [initial, setInitial] = useState<boolean>(false)
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const tippyInstance = useRef<any>();
    const dispatch = useAppDispatch()
    const [search, setSearch] = useState<string>("")

    const filters = useAppSelector((s) => (s.filters))
    const { modelSlug, modelUUID, modelName, brandUUID, brandSlug } = filters
    const [getModels, { data: responseModel }] = useLazyGetModelsByBrandCarQuery()
    const isDisabled = useMemo(() => (!brandUUID), [brandUUID])

    const items = useMemo(() => (
        [
            {
                name: "Todos los modelos",
                slug: "",
                uuid: ""
            },
            ...(
                (isSearching ? Array.from(responseModel?.data || [])
                    .filter((item) => (item.name.toLowerCase().includes(search.toLowerCase()))) : Array.from(responseModel?.data || []))
                    .map((item) => ({ name: item.name, slug: item.slug, uuid: item.uuid }))
            )
        ]
    ), [responseModel?.data || [], search])

    const handleGetModels = useCallback(async () => {
        await getModels({
            brandUUID,
            sort: ["name", "ASC"]
        }).catch(() => { })
    }, [brandUUID])

    const handleSetData = useCallback((item: ItemBaseWrappeFilterI, isNew: boolean = false) => {
        setIsSearching(false)
        setInitial(false)
        dispatch(updateFilter({
            modelName: item.name,
            modelSlug: item.slug,
            modelUUID: item.uuid,
            ...(!isNew ? {
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
        if (brandUUID) {
            handleGetModels()
        }
    }, [brandUUID])

    useEffect(() => {
        if (modelSlug && !modelUUID && Array.isArray(responseModel?.data)) {
            const item = Array.from(responseModel?.data || []).find((d) => (d.slug == modelSlug))
            if (!item) return;

            handleSetData(item, true)
        }
    }, [modelSlug, modelUUID, responseModel?.data])

    useEffect(() => {
        if (!modelSlug && !modelUUID) {
            setSearch("")
            dispatch(updateFilter({
                modelName: ""
            }))
        }
    }, [modelSlug, modelUUID])

    useEffect(() => {
        if (!search && !initial && modelName) {
            setInitial(true)
            setSearch(modelName || "")
        }
    }, [modelName, search, initial])

    return (
        <Tippy
            key={`model-filter`}
            interactive
            arrow={false}
            trigger="click"
            placement="bottom-start"
            animation="shift-away"
            maxWidth={"auto"}
            disabled={isDisabled}
            onCreate={(intance) => tippyInstance.current = intance}
            content={
                <ItemModelFilter
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
            <div className={classNames(style.item, isDisabled ? style.itemDisabled : "")}>
                <div className={style.contentItem}>
                    <strong>Modelo</strong>
                    <div className={style.boxSearch}>
                        <input type="text" placeholder="ej. 4Runner" disabled={isDisabled} onChange={(e) => (handleSearch(e.currentTarget?.value || ""))} value={search} />
                    </div>
                </div>
                <div className={style.boxIcon}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            </div>
        </Tippy>
    )
}