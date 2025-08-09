import { PayloadRenderFieldConfigI } from "@components/app/form-input/form-input.interface";
import { ReactNode } from "react";

export interface DataRadioButtonFormPropsI {
    createdAt: string
    name: string
    slug: string
    type: string
    uuid: string
}

export interface RadioButtonBodyTypeFormPropsI extends PayloadRenderFieldConfigI {
    data: DataRadioButtonFormPropsI
}

export interface RadioButtonHeavyVehicleFormPropsI extends PayloadRenderFieldConfigI {
    data: DataRadioButtonFormPropsI
}

export interface ListSvgI {
    (): ReactNode
}