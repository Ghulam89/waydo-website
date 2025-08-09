import { DeepPartial } from "@interfaces/common"
import { CSSProperties, ReactNode } from "react"

export interface PayloadChildrenBoxRadioButtonPropsI<T> {
    item: T
    index: number
}

export interface ChildrenBoxRadioButtonPropsI<T> {
    (paylaod: PayloadChildrenBoxRadioButtonPropsI<T>): ReactNode
}

export interface GridBoxRadioButtonPropsI {
    gridTemplateColumns: string
}

export interface ShowMoreBoxRadioButtonPropsI {
    position?: 'with-items' | 'buttom'
    totalItemNoActive?: number
}

export interface ContainerBoxRadioButtonPropsI {
    style: CSSProperties | undefined
}

export interface BoxRadioButtonPropsI<T> {
    title?: string
    error?: string
    data: T[]
    children: ChildrenBoxRadioButtonPropsI<T>
    showMore?: ShowMoreBoxRadioButtonPropsI
    grid?: GridBoxRadioButtonPropsI
    container?: DeepPartial<ContainerBoxRadioButtonPropsI>
}