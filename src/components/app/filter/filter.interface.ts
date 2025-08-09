import { FilterSliceI } from "@redux/slices/filter/filter.interface"

export interface FilterPropsI {
    onSearch?: (filters: FilterSliceI) => void
}

export interface DataFilterI {
    brandUUID: string
    brandName: string
    modelUUID: string
    modelName: string
    versionUUID: string
    versionName: string
    priceGte: number
    priceLte: number
    yearGte: number
    yearLte: number
}