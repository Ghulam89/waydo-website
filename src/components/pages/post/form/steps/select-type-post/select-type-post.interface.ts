import { FunctionI } from "@interfaces/common"
import { ReactNode } from "react"

export interface PropsEmbedButtonTypeSelectPost {
    children: React.ReactNode
}

export interface EmbedButtonTypeSelectPost {
    (props: PropsEmbedButtonTypeSelectPost): ReactNode
}

export interface TypeSelectPost {
    label: string
    onClick: FunctionI
    Icon: React.FC
    EmbedButton?: EmbedButtonTypeSelectPost
}

export type TypeModalForm = "image" | "audio" | "loading-audio" | "none"

export interface ModalFormI {
    type: TypeModalForm
    show: boolean
}