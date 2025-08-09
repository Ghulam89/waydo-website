import config from '@config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import paramsSerializerUtils from '@utils/paramsSerializer.utils';
import {
	TwoFactorOptionsResponseV1I,
	TwoFactorResponseV1I,
	UpdateTwoFactorOptionsPayloadV1I
} from './2fa.interfaces';

export const twoFactorAuthV1RTKProvider = createApi({
	reducerPath: 'twoFactorAuthV1',
	baseQuery: fetchBaseQuery({
		baseUrl: `${config.server.api}/v1/two-factor`,
		credentials: 'include',
		paramsSerializer(params) {
			return paramsSerializerUtils(params)
		}
	}),
	endpoints: (builder) => ({
		activateTwoFactorV1: builder.mutation({
			query: () => ({
				url: '/activate',
				method: 'POST',
				body: {},
			}),
			transformResponse: (res: TwoFactorResponseV1I) => {
				return res
			},
		}),
		verifyTwoFactorV1: builder.mutation<boolean, string>({
			query: (generatedCode) => ({
				url: '/verify',
				method: 'POST',
				body: { generatedCode },
			}),
			transformResponse: (res: string): boolean => {
				return res === "verified"
			},
		}),
		updateTwoFactorOptionsV1: builder.mutation<TwoFactorOptionsResponseV1I, UpdateTwoFactorOptionsPayloadV1I>({
			query: (data) => ({
				url: '/update-option',
				method: 'POST',
				body: data
			}),
			transformResponse: (res: any) => {
				return res
			},
		}),
	})
})

export const {
	useActivateTwoFactorV1Mutation,
	useVerifyTwoFactorV1Mutation,
	useUpdateTwoFactorOptionsV1Mutation,
} = twoFactorAuthV1RTKProvider
