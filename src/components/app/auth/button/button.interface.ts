import { FunctionI } from "@interfaces/common";
import { ReactNode } from "react";

export interface ButtonAuthPropsI {
    children: ReactNode;
    onClick: FunctionI;
    disabled?: boolean;
    loading?: boolean;
    type?: "button" | "submit" | "reset";
}