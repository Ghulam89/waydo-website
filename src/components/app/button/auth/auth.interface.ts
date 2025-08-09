import { FunctionI } from "@interfaces/common"


export interface AuthButtonPropsI{
    Logo: React.FC
    content: string
    onClick?: FunctionI
    disabled?: boolean
}