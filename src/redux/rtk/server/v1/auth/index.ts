import config from '@config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import paramsSerializerUtils from '@utils/paramsSerializer.utils'
import {
	AuthSocialPayloadV1I,
	SignInPayloadV1I,
	SIgnInResponseV1I,
	SignUpPayloadV1I,
	SIgnUpResponseV1I,
} from './auth.interfaces'

export const authV1RTKProvider = createApi({
	reducerPath: 'authV1',
	baseQuery: fetchBaseQuery({
		baseUrl: `${config.server.api}/v1/auth`,
		credentials: 'include',
		paramsSerializer(params) {
			return paramsSerializerUtils(params)
		}
	}),
	tagTypes: ['SignUp'],
	endpoints: (builder) => ({
		signUpV1: builder.mutation<SIgnUpResponseV1I, SignUpPayloadV1I>({
			query: (data) => ({
				url: '/signup',
				method: 'POST',
				body: data
			}),
			transformResponse: (res: SIgnUpResponseV1I) => {
				return res
			},
			invalidatesTags: ["SignUp"]
		}),
		signInV1: builder.mutation<SIgnInResponseV1I, SignInPayloadV1I>({
			query: (data) => ({
				url: '/signin',
				method: 'POST',
				body: data
			}),
			transformResponse: (res: SIgnInResponseV1I) => {
				return res
			},
			invalidatesTags: ["SignUp"]
		}),
		authSocialV1: builder.mutation<any, AuthSocialPayloadV1I>({
			query: (data) => ({
				url: '/social',
				method: 'POST',
				body: data
			}),
			transformResponse: (res: any) => {
				return res
			},
			invalidatesTags: ["SignUp"]
		}),
	})
})

export const {
	useSignUpV1Mutation,
	useSignInV1Mutation,
	useAuthSocialV1Mutation,
} = authV1RTKProvider
