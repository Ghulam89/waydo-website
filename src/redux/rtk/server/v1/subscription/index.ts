import config from '@config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import paramsSerializerUtils from '@utils/paramsSerializer.utils'
import {
    GetExtraItemSubscriptioParamsI,
    GetExtrasItemSubscriptionResponseI,
    GetOneSubscriptioParamsI,
    GetSubscriptionResponseI,
    GetSubscriptioParamsI,
    SubscriptionI
} from './subscription.interfaces'

export const subscriptionV1RTKProvider = createApi({
    reducerPath: 'subscriptionV1',
    baseQuery: fetchBaseQuery({
        baseUrl: `${config.server.api}/v1/subscriptions`,
        credentials: 'include',
        paramsSerializer(params) {
            return paramsSerializerUtils(params)
        }
    }),
    endpoints: (builder) => ({
        getSubscriptions: builder.query<GetSubscriptionResponseI, GetSubscriptioParamsI>({
            query: (data) => {
                return {
                    url: '/',
                    method: 'GET',
                    params: data
                }
            }
        }),
        getSubscription: builder.query<SubscriptionI, GetOneSubscriptioParamsI>({
            query: (data) => {
                const { uuid, ...params } = data
                return {
                    url: `/${uuid}`,
                    method: 'GET',
                    params: params
                }
            }
        }),
        getExtrasItemSubscription: builder.query<GetExtrasItemSubscriptionResponseI, GetExtraItemSubscriptioParamsI>({
            query: (data) => {

                return {
                    url: `/extras`,
                    method: 'GET',
                    params: data
                }
            }
        })
    })
})

export const {
    useGetSubscriptionsQuery,
    useLazyGetSubscriptionsQuery,
    useGetSubscriptionQuery,
    useLazyGetSubscriptionQuery,
    useGetExtrasItemSubscriptionQuery,
    useLazyGetExtrasItemSubscriptionQuery
} = subscriptionV1RTKProvider
