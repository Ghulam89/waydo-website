/**
 *
 * @param {string} template
 * @param {any[]} args
 * @returns
 */
export function printF(template: string, ...args: any[]) {
	return template.replace(/{(\d+)}/g, function (match, number) {
		return typeof args[number] != 'undefined' ? args[number] : match
	})
}

/**
 * validate required input
 * @param {any} field
 * @param {any} fields
 * @returns
 */
const isRequired = (field: any, fields: any, { message }: any) => {
	const response = { error: '', valid: true }

	if (typeof fields[field] == "boolean" && fields[field]) {
		return response
	} else if (typeof fields[field] == "boolean" && !fields[field]) {
		response.valid = false
		response.error = message
		return response
	}

	if (!fields[field] || !`${fields[field]}`.trim()) {
		response.valid = false
		response.error = message
	}

	return response
}

/**
 * check email address
 * @param {any} field
 * @param {any} fields
 * @param {any} param2
 * @returns
 */
const isEmailValid = (field: any, fields: any, { message }: any) => {
	const response = { error: '', valid: true }

	const regex = /\S+@\S+\.\S+/ // anystring@anystring.anystring
	if (!regex.test(fields[field])) {
		response.valid = false
		response.error = message
	}

	return response
}

/**
 * validate min length
 * @param {any} field
 * @param {any} fields
 * @param {any} param2
 * @returns
 */
const isMinLength = (field: any, fields: any, { message, value }: any) => {
	const response = { error: '', valid: true }

	if (value) {
		if (`${fields[field]}`.trim().length < value) {
			response.valid = false
			response.error = printF(message, value)
		}
	}

	return response
}

/**
 * @deprecated Maybe is easier to implement `validatePassword`. Personal suggestion
 */
const isPasswordValid = (
	field: any,
	fields: any,
	{ minLengthMessage, hasDigitMessage, hasSpecialCharacterMessage, hasLowerOrUpperMessage }: any
) => {
	if (fields[field].length < 6) {
		return { error: minLengthMessage, valid: false }
	} else if (!/\d/.test(fields[field])) {
		return { error: hasDigitMessage, valid: false }
	} else if (!/[!@#$%^&*]/.test(fields[field])) {
		return { error: hasSpecialCharacterMessage, valid: false }
	} else if (!/^(?=.*[a-z])(?=.*[A-Z]).*$/gm.test(fields[field])) {
		return { error: hasLowerOrUpperMessage, valid: false }
	} else {
		return { error: '', valid: true }
	}
}

/**
 * For the sake of standard flexibility, set flag to bypass or disable
 */
export interface PasswordValidationBypass {
	upperCase?: boolean;
	lowerCase?: boolean;
	number?: boolean;
	symbol?: boolean;
	length?: boolean;
}

/**
* Password pattern compliance validation
* @param {String} password
* @returns {Object}
*/
const validatePassword = (
	password: string,
	flagsToDisable: PasswordValidationBypass = {},
) => {
	const toDisable = Object.assign(
		{
			upperCase: false,
			lowerCase: false,
			number: false,
			symbol: false,
			length: false,
		},
		flagsToDisable,
	);

	const itHasUppercase =
		toDisable.upperCase || new RegExp("[A-Z]").test(password);

	const itHasLowercase =
		toDisable.lowerCase || new RegExp("[a-z]").test(password);

	const itHasNumber = toDisable.number || new RegExp("[0-9]").test(password);

	const itHasSymbol =
		toDisable.symbol || new RegExp("[#?!@$%^&*-]").test(password);

	const itHasEightLengh = toDisable.length || password.length >= 8;

	const isValid =
		itHasUppercase &&
		itHasLowercase &&
		itHasNumber &&
		itHasSymbol &&
		itHasEightLengh;

	let failText = "";

	if (!itHasUppercase) failText = "Debe contener mayúsculas";
	if (!itHasLowercase) failText = "Debe contener minúsculas";
	if (!itHasNumber) failText = "Debe contener números";
	if (!itHasSymbol) failText = "Faltan caracteres especiales (#?!@$%^&*-)";
	if (!itHasEightLengh) failText = "Debe contener al menos 8 caracteres";

	return {
		isValid,
		failText,
	};
}

const isEqualPassword = (field: any, fields: any, { message }: any) => {
	if (fields[field] !== fields['password']) {
		return { error: message, valid: false }
	} else {
		return { error: '', valid: true }
	}
}

const isCheck = (field: any, fields: any, { message }: any) => {
	if (!fields[field]) {
		return { error: message, valid: false }
	} else {
		return { error: '', valid: true }
	}
}

/**
 * Validates if there are digits in a string
 * @param {String} string
 * @returns {String}
 */
export const hasDigit = (field: any, fields: any, { message }: any) => {
	if (/\d/.test(fields[field])) {
		return { error: message, valid: false }
	} else {
		return { error: '', valid: true }
	}
}

const rulesFuncs = {
	isRequired,
	isEmailValid,
	isMinLength,
	isPasswordValid,
	validatePassword,
	isEqualPassword,
	hasDigit,
	isCheck
}

export default rulesFuncs
