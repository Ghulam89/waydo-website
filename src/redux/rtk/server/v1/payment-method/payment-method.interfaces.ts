import { DeepPartial } from "@interfaces/common"
import { ParamsPetitionCommonI } from "@interfaces/common/petition.interface"

export interface GetPaymentMethodParamsI extends DeepPartial<ParamsPetitionCommonI> {

}

export interface PaymentMethodI {
    uuid: string
}

export interface GetSubscriptionResponseI {
    data: PaymentMethodI[]
    count: number
}