export interface IErrorResponse {
	message: string
}

export interface IResponse<T> extends IErrorResponse {
	success?: T
}

export interface ObjectKeyStringReturnArrayOfStringI {
	[key: string]: Array<string>
}