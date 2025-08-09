import config from '@config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import paramsSerializerUtils from '@utils/paramsSerializer.utils';
import {
	CreateAddressResponseV1I as AddressResponseV1I,
	CreateAddressPayloadV1I,
	PayloadUpdateUserPhoneV1I,
	PayloadUserPhoneV1I,
	UpdateAddressPayloadV1I,
	UpdatePasswordPayloadV1I,
	UpdateUserPayloadV1I,
	UpdateUserResponseV1I,
	UserAddressV1I,
	UserPhoneV1I,
	UserV1I
} from './me.interfaces';

export const meV1RTKProvider = createApi({
	reducerPath: 'meV1',
	baseQuery: fetchBaseQuery({
		baseUrl: `${config.server.api}/v1/me`,
		credentials: 'include',
		paramsSerializer(params) {
			return paramsSerializerUtils(params)
		}
	}),
	tagTypes: ['User', 'UserPhones'],
	endpoints: (builder) => ({
		getUserInfoV1: builder.query<UserV1I, object>({
			query: () => ({
				url: '/',
				method: 'GET'
			}),
			providesTags: ['User']
		}),
		logoutV1: builder.mutation({
			query: () => ({
				url: '/logout',
				method: 'POST'
			}),
			invalidatesTags: ['User']
		}),
		updateUserV1: builder.mutation<UpdateUserResponseV1I, UpdateUserPayloadV1I>({
			query: (data) => ({
				url: '/',
				method: 'PUT',
				body: data
			}),
			transformResponse: (res: UpdateUserResponseV1I) => {
				return res
			},
			invalidatesTags: ['User']
		}),
		updatePasswordV1: builder.mutation<UpdateUserResponseV1I, UpdatePasswordPayloadV1I>({
			query: (data) => ({
				url: '/change-password',
				method: 'PATCH',
				body: data
			}),
			transformResponse: (res: UpdateUserResponseV1I) => {
				return res
			},
		}),
		updateProfilePictureV1: builder.mutation<UpdateUserResponseV1I, FormData>({
			query: (data) => ({
				url: '/picture',
				method: 'PUT',
				body: data
			}),
			transformResponse: (res: UpdateUserResponseV1I) => {
				return res
			},
			invalidatesTags: ['User']
		}),
		getAddressesV1: builder.query<UserAddressV1I[], object>({
			query: () => ({ url: '/addresses' }),
		}),
		createAddressV1: builder.mutation<AddressResponseV1I, CreateAddressPayloadV1I>({
			query: (data) => ({
				url: '/address',
				method: 'POST',
				body: data
			}),
			transformResponse: (res: AddressResponseV1I) => res,
		}),
		updateAddressV1: builder.mutation<AddressResponseV1I, UpdateAddressPayloadV1I>({
			query: (data) => {
				const { addressUUID } = data;

				delete data.addressUUID;

				return {
					url: `/address/${addressUUID}`,
					method: "PATCH",
					body: data,
				}
			},
			transformResponse: (res: AddressResponseV1I) => res,
		}),
		setAddressAsDefaultV1: builder.mutation<AddressResponseV1I, string>({
			query: (addressUUID) => ({
				url: `/address/${addressUUID}/set-as-default`,
				method: "PATCH"
			}),
			transformResponse: (res: AddressResponseV1I) => res,
		}),
		deleteAddressV1: builder.mutation<AddressResponseV1I, string>({
			query: (addressUUID) => ({
				url: `/address/${addressUUID}`,
				method: "DELETE"
			}),
			transformResponse: (res: AddressResponseV1I) => res,
		}),
		getUserPhonesV1: builder.query<UserPhoneV1I[], object>({
			query: () => ({
				url: '/phones',
				method: 'GET'
			}),
			providesTags: ['UserPhones']
		}),
		createUserPhoneV1: builder.mutation<UserPhoneV1I, PayloadUserPhoneV1I>({
			query: (body) => ({
				url: '/phones',
				method: 'POST',
				body
			}),
			invalidatesTags: ['UserPhones'],
		}),
		updateUserPhoneV1: builder.mutation<UserPhoneV1I, PayloadUpdateUserPhoneV1I>({
			query: (body) => {
				const { uuid } = body;

				delete body.uuid;

				return {
					url: `/phones/${uuid}`,
					method: 'PATCH',
					body
				}
			},
			invalidatesTags: ['UserPhones'],
		}),
		deleteUserPhoneV1: builder.mutation<AddressResponseV1I, string>({
			query: (phoneUUID) => ({
				url: `/phones/${phoneUUID}`,
				method: "DELETE"
			}),
			transformResponse: (res: AddressResponseV1I) => res,
			invalidatesTags: ['UserPhones'],
		}),
	})
});

export const {
	useGetUserInfoV1Query,
	useLazyGetUserInfoV1Query,
	useLogoutV1Mutation,
	useUpdateUserV1Mutation,
	useUpdateProfilePictureV1Mutation,
	useUpdatePasswordV1Mutation,
	useGetAddressesV1Query,
	useCreateAddressV1Mutation,
	useSetAddressAsDefaultV1Mutation,
	useDeleteAddressV1Mutation,
	useUpdateAddressV1Mutation,
	useGetUserPhonesV1Query,
	useCreateUserPhoneV1Mutation,
	useUpdateUserPhoneV1Mutation,
	useDeleteUserPhoneV1Mutation,
} = meV1RTKProvider;
