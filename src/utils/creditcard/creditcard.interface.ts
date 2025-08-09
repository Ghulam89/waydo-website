export enum TypeCreditCardEnum {
    visa = "visa",
    masterCard = "masterCard",
    amex = "amex",
    discover = "discover",
    jcb = "jcb",
    none = "none"
}

export type TypeCreditCardType = `${TypeCreditCardEnum}`