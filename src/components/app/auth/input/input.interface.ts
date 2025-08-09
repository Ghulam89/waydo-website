export type ItemType = "password" | "text"

export interface OnChangeInputAuthPropsI{
    (name: string, value: string): void
}

export interface InputAuthPropsI{
    label: string
    name: string
    type: ItemType
    value?: string
    defaultValue?: string
    onChange: OnChangeInputAuthPropsI
}