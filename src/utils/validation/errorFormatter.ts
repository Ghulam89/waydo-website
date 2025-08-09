import { ObjectI } from "@interfaces/common"
import { ObjectKeyStringReturnArrayOfStringI } from "@interfaces/common/response.interface"

export const ErrorFormatterIntoObject = (errors: ObjectKeyStringReturnArrayOfStringI): ObjectI => {
	let object: ObjectI = {}
	Object.keys(errors).map((key) => (object = { ...object, [key]: errors[key][0] || '' }))
	return object
}
