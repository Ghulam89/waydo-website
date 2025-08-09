import { updateFilter } from "@redux/slices/filter";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { generateUrlPost } from "@utils/filter";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import BaseWrappeFilter from "../base-wrappe";
import { ItemBaseWrappeFilterI } from "../base-wrappe/base-wrappe.interface";
import { ItemBrandFilterI } from "./brand.interface";

export default function ItemBrandFilter({ items, allowSearch, tippyInstance, setSearch }: ItemBrandFilterI) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const filters = useAppSelector((s) => (s.filters))
    const { brandSlug, brandUUID } = filters

    const handleSetData = useCallback((item: ItemBaseWrappeFilterI, isNew: boolean = false) => {
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

    const handleChange = (item: ItemBaseWrappeFilterI) => {
        if (!allowSearch) {
            const { versionName, versionSlug, versionUUID, modelName, modelSlug, modelUUID, ..._filters } = filters

            router.push(generateUrlPost({
                ..._filters,
                brandName: item.name,
                brandSlug: item.slug,
                brandUUID: item.uuid,
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
                value={brandSlug || brandUUID || ""}
            />
        </div>
    )
}