import { PayloadRenderFieldConfigI } from "@components/app/form-input/form-input.interface";

export interface DataRadioButtonFormPropsI {
    color: string
}

export interface RadioButtonColorFormPropsI extends PayloadRenderFieldConfigI {
    data: DataRadioButtonFormPropsI
    execute?: boolean
}