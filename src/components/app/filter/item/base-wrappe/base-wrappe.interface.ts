
export interface ItemBaseWrappeFilterI {
    name: string
    slug: string
    uuid: string
}

export interface DataBaseWrappeFilterI {
    value?: string | any[]
}

export interface SelectDataI {
    name: string
    value: string
    values: any[]
    slugs: any[]
    slug: string
}

export interface OnChangeBaseWrappeFilterI {
    (item: ItemBaseWrappeFilterI, index: number): void
}

export interface BaseWrappeFilterI extends DataBaseWrappeFilterI {
    identifier: string
    items: ItemBaseWrappeFilterI[]
    disabled?: boolean
    onChange: OnChangeBaseWrappeFilterI
}
