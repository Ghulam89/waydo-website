import { FilterSliceI } from "@redux/slices/filter/filter.interface"

export interface BannerPropsI {
    withFilter?: boolean
    filterSticky?: boolean
    onSearch?: (filters: FilterSliceI) => void
}