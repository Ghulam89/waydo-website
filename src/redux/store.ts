import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import middlewares from './middlewares'

import { twoFactorAuthV1RTKProvider } from './rtk/server/v1/2fa'
import { authV1RTKProvider } from './rtk/server/v1/auth'
import { carV1RTKProvider } from './rtk/server/v1/car'
import { currencyV1RTKProvider } from './rtk/server/v1/currency'
import { locationV1RTKProvider } from './rtk/server/v1/location'
import { meV1RTKProvider } from './rtk/server/v1/me'
import { paymentMethodV1RTKProvider } from './rtk/server/v1/payment-method'
import { postV1RTKProvider } from './rtk/server/v1/post'
import { subscriptionV1RTKProvider } from './rtk/server/v1/subscription'

import { adminChatSlice } from './slices/admin-chat'
import { filterSlice } from './slices/filter'
import { languageSlice } from './slices/language'
import { layoutSlice } from './slices/layout'
import { postSlice } from './slices/post'
import { twoFactorSlice } from './slices/two-factor'
import { verificationModalSlice } from './slices/user-verification-modal'

export const store = configureStore({
	reducer: {
		language: languageSlice.reducer,
		filters: filterSlice.reducer,
		layout: layoutSlice.reducer,
		post: postSlice.reducer,
		twoFactorProcess: twoFactorSlice.reducer,
		adminChat: adminChatSlice.reducer,
		verificationModal: verificationModalSlice.reducer,

		[authV1RTKProvider.reducerPath]: authV1RTKProvider.reducer,
		[meV1RTKProvider.reducerPath]: meV1RTKProvider.reducer,
		[carV1RTKProvider.reducerPath]: carV1RTKProvider.reducer,
		[currencyV1RTKProvider.reducerPath]: currencyV1RTKProvider.reducer,
		[locationV1RTKProvider.reducerPath]: locationV1RTKProvider.reducer,
		[postV1RTKProvider.reducerPath]: postV1RTKProvider.reducer,
		[twoFactorAuthV1RTKProvider.reducerPath]: twoFactorAuthV1RTKProvider.reducer,
		[subscriptionV1RTKProvider.reducerPath]: subscriptionV1RTKProvider.reducer,
		[paymentMethodV1RTKProvider.reducerPath]: paymentMethodV1RTKProvider.reducer
	},
	middleware: (gDM) => {
		return gDM({ serializableCheck: false }).concat(middlewares)
	}
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

const useAppDispatch = () => useDispatch<AppDispatch>()
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export { useAppDispatch, useAppSelector }

