import { ObjectKeyStringReturnArrayOfStringI } from "@interfaces/common/response.interface"

export interface DataReturnValidationI {
	isValid: Boolean
	errors: ObjectKeyStringReturnArrayOfStringI
}
