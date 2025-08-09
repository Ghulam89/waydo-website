
export interface OnChangeRangeFilterI {
    (ranges: PriceRangeFilterI): void
}
export interface PriceRangeFilterPropsI {
    allowSearch: boolean
}

export interface PriceRangeFilterI {
    from: number
    to: number
}