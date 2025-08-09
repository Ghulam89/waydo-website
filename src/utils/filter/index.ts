import { DeepPartial } from "@interfaces/common";
import { FilterSliceI } from "@redux/slices/filter/filter.interface";
import { processFilter, TypeProcessFilterEnum } from "./filter.ult";

export const generateUrlPost = (filters: DeepPartial<FilterSliceI>): string => {
    const queryParams = new URLSearchParams(window.location.search);
    const {
        brandSlug,
        modelSlug,
        ..._filters
    } = filters


    let url = "/motors/all"

    if (brandSlug) {

        url += `/${brandSlug}`

        if (modelSlug) {
            url += `/${modelSlug}`
        }
    }

    Object.keys(_filters).forEach(key => {
        const selected = processFilter[key]

        if (!selected) return;

        //@ts-ignore
        const value = _filters[key]

        if (selected.type === TypeProcessFilterEnum.set && !Array.isArray(value)) {
            if (value) {
                queryParams.set(selected.key, value);
            } else {
                queryParams.delete(selected.key)
            }
        } else if (selected.type === TypeProcessFilterEnum.appends && Array.isArray(value)) {
            if (value.length) {
                const allItems = queryParams.getAll(selected.key)
                value.forEach(v => {
                    if (!queryParams.has(selected.key, v)) {
                        queryParams.append(selected.key, `${v}`)
                    } else if (!v) {
                        queryParams.delete(selected.key)
                    }
                })

                allItems.forEach(item => {
                    if (!value.includes(item)) {
                        queryParams.delete(selected.key, item)
                    }
                })
            } else {
                queryParams.delete(selected.key)
            }
        } else {
            queryParams.delete(selected.key)
        }
    })

    return queryParams.size > 0 ? `${url}?${queryParams.toString()}` : url
}

const now = new Date()
export const MIN_YEAR_FILTER = 1920
export const MAX_YEAR_FILER = now.getFullYear()

export const MIN_PRICE_FILTER = 1
export const MAX_PRICE_FILER = 200000000