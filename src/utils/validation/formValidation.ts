/* eslint-disable no-prototype-builtins */
import { ObjectKeyStringReturnArrayOfStringI } from '@interfaces/common/response.interface'
import rulesFuncs from './rules'
import { DataReturnValidationI } from './validation.interface'

/**
 * useValidation function
 * @param fields
 * @param rules
 * @returns
 */
const formValidation = (fields: any, rules: any): DataReturnValidationI => {
	const errors: ObjectKeyStringReturnArrayOfStringI = {}
	let isValid = true

	for (const field in fields) {
		if (rules.hasOwnProperty(field)) {
			for (const rule of Object.keys(rules[field])) {
				//@ts-ignore
				const { valid, error } = rulesFuncs[rule as keyof typeof rulesFuncs](field, fields, rules[field][rule])

				if (error && !valid) {
					if (!errors[field]) errors[field] = []
					errors[field].push(error)
					isValid = valid
				}
			}
		}
	}

	return {
		isValid,
		errors
	}
}

export default formValidation
