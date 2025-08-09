import { ObjectI } from "@interfaces/common"
import { SxProps, Theme } from "@mui/material"
import { Dayjs } from "dayjs"
import { ReactElement, ReactNode } from "react"

export type FieldConfigType =
	| 'number'
	| 'text'
	| 'select'
	| 'date'
	| 'switch'
	| 'divider'
	| 'file'
	| 'password'
	| 'blank'
	| 'textarea'
	| 'creditcard'
	| 'tel'
	| 'autocomplete'
	| 'identification'
	| 'radio'
	| 'checkbox'

export type FieldConfigXs = 12 | 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1

export interface ResponsiveFieldConfig {
	xs?: FieldConfigXs
	sm?: FieldConfigXs
	md?: FieldConfigXs
	lg?: FieldConfigXs
	xl?: FieldConfigXs
}

export type VarientType = 'outlined' | 'filled' | 'standard'

export interface FunctionI {
	(): ReactNode
}

export interface OptionIFieldConfigI {
	value: string
	label: string
	icon?: FunctionI
}

export interface PayloadFunctionDataPayloadRenderFieldConfigI {
	active: boolean
}

export interface FunctionDataPayloadRenderFieldConfigI {
	(payload: PayloadFunctionDataPayloadRenderFieldConfigI): void
}


export interface DataPayloadRenderFieldConfigI {
	data?: ObjectI
	key?: string
	color?: string
	handleClick?: FunctionDataPayloadRenderFieldConfigI
	label: string
	bold?: boolean
}

export interface PayloadRenderFieldConfigI extends DataPayloadRenderFieldConfigI {
	active: boolean
}

export interface RenderFieldConfigI {
	(payload: PayloadRenderFieldConfigI): ReactElement
}

export interface PayloadContainerRenderFieldConfig {
	children: ReactNode
}

export interface PayloadContainerForceRenderFieldConfigI {

}

export interface ForceRenderFieldConfigI {
	(payload: PayloadContainerForceRenderFieldConfigI): ReactElement
}


export interface FieldConfig<T> {
	name: keyof T | 'divider' | 'blank'
	label: string
	textAlign?: "left" | "center" | "right"
	sx?: SxProps<Theme>
	required?: boolean
	id?: string
	type: FieldConfigType
	style?: React.CSSProperties
	placeholder?: string
	ref?: React.Ref<any>
	responsive?: ResponsiveFieldConfig
	loading?: boolean
	dataRender?: DataPayloadRenderFieldConfigI[]
	render?: RenderFieldConfigI
	forceRender?: ForceRenderFieldConfigI
	forceRenderWithoutContainer?: boolean
	disabledDecimal?: boolean
	options?: OptionIFieldConfigI[]
	startAdornment?: React.JSX.Element
	disabled?: boolean
	isEditMode?: boolean
	initialCero?: boolean
	varient?: VarientType
	min?: number
	max?: number
	handleChange?: (value: string | NonNullable<Entity<T>[keyof T]> | Dayjs) => void
	helperText?: string;
}

export type Entity<T> = {
	[key in keyof T]: any
}

export interface FormInputPropsI<T> {
	fields: FieldConfig<T>[]
	form: Entity<T>
	isEditMode?: boolean
	responsive?: ResponsiveFieldConfig
	order?: number
	spacing?: number
	setIsEditMode?: React.Dispatch<React.SetStateAction<boolean>>
	errors?: Record<keyof T, any> | null | undefined
	setForm: React.Dispatch<React.SetStateAction<Entity<T>>>
	onChange?: (data: T) => void
	padding?: number
}

export interface RightPositionI {
	col: number
	children?: React.ReactNode
}