import { FunctionI } from "@interfaces/common";
import { ReactNode } from "react";

export interface LinkModalNavPropsI {
    label: string
    href?: string
    onClick?: FunctionI 
}

export interface ActionHeaderModalNavPropsI{
    label: string
    onClick: FunctionI
}

export interface HeaderModalNavPropsI {
    action?: ActionHeaderModalNavPropsI
    title?: string
}

export enum DescriptionTypeEnum{
    normal = "normal"
}

export type DescriptionType = `${DescriptionTypeEnum}`

export interface ModalNavPropsI {
    children: ReactNode
    title?: string
    header?: HeaderModalNavPropsI
    Logo?: React.FC
    description?: string
    link?: LinkModalNavPropsI
    descriptionType?: DescriptionType
}