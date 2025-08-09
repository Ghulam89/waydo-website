

export interface ItemListFilterProptI {
    label: string
    subLabel: string
    value: string
}

export interface ListFilterProptI {
    items: ItemListFilterProptI[]
    link: string
    keysQuery?: string[]
    noAddLink?: boolean
}