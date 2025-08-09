
export interface ModelFilterPropsI {
    allowSearch: boolean
}

export interface ItemDataModelFilterI {
    name: string
    slug: string
    uuid: string
}

export interface ItemModelFilterI {
    items: ItemDataModelFilterI[]
    allowSearch?: boolean
    tippyInstance: any
    setSearch: (value: string) => void
}