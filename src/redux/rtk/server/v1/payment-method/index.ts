import config from '@config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import paramsSerializerUtils from '@utils/paramsSerializer.utils'
import {
    GetPaymentMethodParamsI,
    GetSubscriptionResponseI
} from './payment-method.interfaces'

export const paymentMethodV1RTKProvider = createApi({
    reducerPath: 'paymentMethodV1',
    baseQuery: fetchBaseQuery({
        baseUrl: `${config.server.api}/v1/payment-methods`,
        credentials: 'include',
        paramsSerializer(params) {
            return paramsSerializerUtils(params)
        }
    }),
    endpoints: (builder) => ({
        getPaymentMethods: builder.query<GetSubscriptionResponseI, GetPaymentMethodParamsI>({
            query: () => {
                return {
                    url: '/',
                    method: 'GET'
                }
            }
        })
    })
})

export const {
    useGetPaymentMethodsQuery,
    useLazyGetPaymentMethodsQuery
} = paymentMethodV1RTKProvider
