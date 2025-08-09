import { ObjectI } from "@interfaces/common";

export interface HandleValidRequirementListI{
    (valid: boolean): void
}

export interface RequirementListPropsI{
    data: ObjectI
    password: string
    handleValid: HandleValidRequirementListI
}