export interface AddPaymentMethodPropsI {
    show: boolean
    onClose: () => void
}

export enum TypePaymentEnum {
    creditcard = "creditcard",
    paypal = "paypal"
}

export type TypePayment = `${TypePaymentEnum}`