import { PayloadAction } from '@reduxjs/toolkit';
import { Locale } from '../../../../i18n.config';
import { LanguageSliceSliceI } from './language.interface';

export const setLanguageDataReducer = (state: LanguageSliceSliceI, action: PayloadAction<Locale>) => {

	localStorage.setItem('lang', action.payload)

	state.lang = action.payload;

	return state;
}
