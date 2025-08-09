import { twoFactorAuthV1RTKProvider } from '@redux/rtk/server/v1/2fa'
import { currencyV1RTKProvider } from '@redux/rtk/server/v1/currency'
import { locationV1RTKProvider } from '@redux/rtk/server/v1/location'
import { paymentMethodV1RTKProvider } from '@redux/rtk/server/v1/payment-method'
import { postV1RTKProvider } from '@redux/rtk/server/v1/post'
import { subscriptionV1RTKProvider } from '@redux/rtk/server/v1/subscription'
import { authV1RTKProvider } from '../rtk/server/v1/auth'
import { carV1RTKProvider } from '../rtk/server/v1/car'
import { meV1RTKProvider } from '../rtk/server/v1/me'

const middlewares = [
    authV1RTKProvider.middleware,
    meV1RTKProvider.middleware,
    carV1RTKProvider.middleware,
    currencyV1RTKProvider.middleware,
    locationV1RTKProvider.middleware,
    postV1RTKProvider.middleware,
    twoFactorAuthV1RTKProvider.middleware,
    subscriptionV1RTKProvider.middleware,
    paymentMethodV1RTKProvider.middleware
]

export default middlewares
