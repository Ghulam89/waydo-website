import config from '@config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import paramsSerializerUtils from '@utils/paramsSerializer.utils'

export const carV1RTKProvider = createApi({
	reducerPath: 'carV1',
	baseQuery: fetchBaseQuery({
		baseUrl: `${config.server.api}/v1/colors`,
		credentials: 'include',
		paramsSerializer(params) {
			return paramsSerializerUtils(params)
		}
	}),
	endpoints: (builder) => ({
		
	})
})

export const {
	
} = carV1RTKProvider
