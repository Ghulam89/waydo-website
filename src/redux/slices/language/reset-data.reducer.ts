import { LanguageSliceSliceI } from './language.interface'

export const resetLanguageDataReducer = (state: LanguageSliceSliceI) => {
	state.lang = 'es'
	return state
}