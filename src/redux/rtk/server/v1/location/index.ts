import config from '@config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import paramsSerializerUtils from '@utils/paramsSerializer.utils'
import {
	GetCityParamsI,
	GetCityResponseI,
	GetProvinceByCityParamsI,
	GetProvinceResponseI
} from './location.interfaces'

export const locationV1RTKProvider = createApi({
	reducerPath: 'locationV1',
	baseQuery: fetchBaseQuery({
		baseUrl: `${config.server.api}/v1/locations`,
		credentials: 'include',
		paramsSerializer(params) {
			return paramsSerializerUtils(params)
		}
	}),
	endpoints: (builder) => ({
		getCities: builder.query<GetCityResponseI, GetCityParamsI>({
			query: (data) => ({
				url: '/cities',
				method: 'GET',
				params: data
			})
		}),
		getProvincesByCity: builder.query<GetProvinceResponseI, GetProvinceByCityParamsI>({
			query: (data) => {
				const {cityUUID, ...params} = data
				return ({
					url: `/cities/${cityUUID}/provinces`,
					method: 'GET',
					params
				})
			}
		})
	})
})

export const {
	useGetCitiesQuery,
	useGetProvincesByCityQuery,
	useLazyGetCitiesQuery,
	useLazyGetProvincesByCityQuery
} = locationV1RTKProvider
