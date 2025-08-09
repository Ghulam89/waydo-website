export interface ObjectI {
	[key: string]: string | number | object | any
}

export interface ObjectArrayI {
	[key: string]: string[] | number[] | object[] | any[] | object | string | number | any
}

export type DeepPartial<T> = {
	[K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

export interface FunctionI {
	(): void
}

export type ReactMouseEvent<T = Element> = React.MouseEvent<T>;