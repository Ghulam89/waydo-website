import { FunctionI } from "@interfaces/common"
import { ReactNode } from "react"

export interface ModalZoonPropsI{
    children: ReactNode
    show?: boolean
    onClose?: FunctionI
}