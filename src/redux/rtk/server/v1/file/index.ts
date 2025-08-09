import config from '@config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import paramsSerializerUtils from '@utils/paramsSerializer.utils'

export const fileV1RTKProvider = createApi({
	reducerPath: 'fileV1',
	baseQuery: fetchBaseQuery({
		baseUrl: `${config.server.api}/v1/files`,
		credentials: 'include',
		paramsSerializer(params) {
			return paramsSerializerUtils(params)
		}
	}),
	endpoints: (builder) => ({
		
	})
})

export const {
} = fileV1RTKProvider
