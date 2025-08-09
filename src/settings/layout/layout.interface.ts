export enum LayoutVersionEnum {
    v1 = "v1"
}

export type LayoutVersionType = `${LayoutVersionEnum}`

export interface ItemNavFooterI{
    label: string
    link: string
}

export interface NavFooterI{
    label: string
    items: ItemNavFooterI[]
}