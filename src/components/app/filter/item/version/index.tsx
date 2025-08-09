import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDebounce } from "@hooks/useDebounce";
import { useLazyGetVersionsCarQuery } from "@redux/rtk/server/v1/car";
import { updateFilter } from "@redux/slices/filter";
import { useAppDispatch, useAppSelector } from "@redux/store";
import Tippy from "@tippyjs/react";
import { generateUrlPost } from "@utils/filter";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import BaseWrappeFilter from "../base-wrappe";
import { ItemBaseWrappeFilterI } from "../base-wrappe/base-wrappe.interface";
import style from "../item.module.css";
import { VersionFilterPropsI } from "./version.interface";

export default function VersionFilter({ allowSearch }: VersionFilterPropsI) {
    const router = useRouter()
    const tippyInstance = useRef<any>();
    const [search, setSearch] = useState<string>("")
    const dispatch = useAppDispatch()
    const [selecting, setSlecting] = useState<boolean>(false)

    const filters = useAppSelector((s) => (s.filters))
    const { modelUUID, brandUUID, versionSlug, versionUUID } = filters
    const [getVersions, { data: responseVersion }] = useLazyGetVersionsCarQuery()

    const items = useMemo(() => (
        [
            {
                name: "Todos las versiones",
                slug: "",
                uuid: ""
            },
            ...(
                Array.from(responseVersion?.data || [])
                    .filter((item) => (item.name.toLowerCase().includes(search.toLowerCase())))
                    .map((item) => ({ name: item.name, slug: item.slug, uuid: item.uuid }))
            )
        ]
    ), [responseVersion?.data || [], search])

    const isDisabled = useMemo(() => (!brandUUID || !modelUUID), [brandUUID, modelUUID])
    const itemsTimeout = useDebounce(items, selecting ? 500 : 0)

    const handleGetModels = useCallback(async () => {
        await getVersions({
            brandUUID,
            modelUUID
        }).catch(() => { })
    }, [brandUUID, modelUUID])

    const handleChange = useCallback((item: ItemBaseWrappeFilterI) => {
        setSlecting(true)
        tippyInstance.current.hide()
        handleSetData(item)
        setSearch(item.uuid ? item.name : "")
        setTimeout(() => (setSlecting(false)), 500)

        if (!allowSearch) {
            const { versionName, versionSlug, versionUUID, ..._filters } = filters

            router.push(generateUrlPost({
                ..._filters,
                versionName: item.name,
                versionSlug: item.slug,
                versionUUID: item.uuid
            }))
        }
    }, [tippyInstance, filters])

    const handleSetData = useCallback((item: ItemBaseWrappeFilterI) => {
        dispatch(updateFilter({
            versionName: item.name,
            versionSlug: item.slug,
            versionUUID: item.uuid
        }))
        setSearch(item.uuid ? item.name : "")
    }, [filters])

    useEffect(() => {
        if (brandUUID && modelUUID) {
            handleGetModels()
        }
    }, [brandUUID, modelUUID])

    useEffect(() => {
        if (versionSlug && !versionUUID && Array.isArray(responseVersion?.data)) {
            const item = Array.from(responseVersion?.data || []).find((d) => (d.slug == versionSlug))
            if (!item) return;

            handleSetData(item)
        }
    }, [versionSlug, versionUUID, responseVersion?.data])

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
            disabled={isDisabled}
            content={
                <div>
                    <BaseWrappeFilter
                        items={itemsTimeout}
                        identifier="version"
                        disabled={isDisabled}
                        onChange={handleChange}
                        value={versionSlug || versionUUID || ""}
                    />
                </div>
            }
        >
            <div className={classNames(style.item, isDisabled ? style.itemDisabled : "")}>
                <div className={style.contentItem}>
                    <strong>Version</strong>
                    <div className={style.boxSearch}>
                        <input type="text" placeholder="ej. Escriba un nombre de version..." disabled={isDisabled} onChange={(e) => (setSearch(e.currentTarget?.value || ""))} value={search} />
                    </div>
                </div>
                <div className={style.boxIcon}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            </div>
        </Tippy>
    )
}