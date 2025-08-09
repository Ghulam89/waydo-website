
export interface BrandFilterPropsI {
    allowSearch: boolean
}

export interface ItemDataBrandFilterI {
    name: string
    slug: string
    uuid: string
}

export interface ItemBrandFilterI {
    items: ItemDataBrandFilterI[]
    allowSearch?: boolean
    tippyInstance: any
    setSearch: (value: string) => void
}