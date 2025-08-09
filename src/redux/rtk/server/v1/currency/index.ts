import config from '@config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import paramsSerializerUtils from '@utils/paramsSerializer.utils'
import {
	CurrencyResponseI,
	GetCurrencyParamsI
} from './currency.interfaces'

export const currencyV1RTKProvider = createApi({
	reducerPath: 'currencyV1',
	baseQuery: fetchBaseQuery({
		baseUrl: `${config.server.api}/v1/currencies`,
		credentials: 'include',
		paramsSerializer(params) {
			return paramsSerializerUtils(params)
		}
	}),
	endpoints: (builder) => ({
		getCurrencies: builder.query<CurrencyResponseI, GetCurrencyParamsI>({
			query: (data) => ({
				url: '/',
				method: 'GET',
				params: data
			})
		})
	})
})

export const {
	useGetCurrenciesQuery,
	useLazyGetCurrenciesQuery
} = currencyV1RTKProvider
