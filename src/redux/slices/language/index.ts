import { createSlice } from '@reduxjs/toolkit'
import { LanguageSliceSliceI } from './language.interface'
import { setLanguageDataReducer } from './set-data.reducer'
import { resetLanguageDataReducer } from './reset-data.reducer'

export const languageSliceInitialState: LanguageSliceSliceI = {
	lang: 'es'
}

export const languageSlice = createSlice({
	initialState: languageSliceInitialState,
	name: 'language',
	reducers: {
		setLanguage: setLanguageDataReducer,
		resetLanguage: resetLanguageDataReducer
	}
})

export const { resetLanguage, setLanguage } = languageSlice.actions
export default languageSlice.reducer
