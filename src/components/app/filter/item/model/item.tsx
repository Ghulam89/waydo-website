import { updateFilter } from "@redux/slices/filter";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { generateUrlPost } from "@utils/filter";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import BaseWrappeFilter from "../base-wrappe";
import { ItemBaseWrappeFilterI } from "../base-wrappe/base-wrappe.interface";
import { ItemModelFilterI } from "./model.interface";

export default function ItemModelFilter({ items, allowSearch, tippyInstance, setSearch }: ItemModelFilterI) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const filters = useAppSelector((s) => (s.filters))
    const { modelSlug, modelUUID } = filters

    const handleSetData = useCallback((item: ItemBaseWrappeFilterI, isNew: boolean = false) => {
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

    const handleChange = (item: ItemBaseWrappeFilterI) => {
        if (!allowSearch) {
            const { versionName, versionSlug, versionUUID, modelName, modelSlug, modelUUID, ..._filters } = filters

            router.push(generateUrlPost({
                ..._filters,
                modelName: item.name,
                modelSlug: item.slug,
                modelUUID: item.uuid,
            }))
        }

        tippyInstance.current.hide()
        setSearch(item.name)
        handleSetData(item)
    }

    return (
        <div>
            <BaseWrappeFilter
                identifier="brand"
                items={items}
                onChange={(payload) => (handleChange(payload))}
                value={modelSlug || modelUUID || ""}
            />
        </div>
    )
}