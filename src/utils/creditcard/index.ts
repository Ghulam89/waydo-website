import { TypeCreditCardEnum, TypeCreditCardType } from "./creditcard.interface";

export function detectTypeCreditCard(number: string): TypeCreditCardType {
    const card = number.replace(/[\s-]/g, '');

    if (card.length < 0) {
        return TypeCreditCardEnum.none
    }

    const firtFour = card.substring(0, 4);

    if (/^4/.test(firtFour)) {
        return TypeCreditCardEnum.visa;
    } else if (/^5[1-5]/.test(firtFour)) {
        return TypeCreditCardEnum.masterCard;
    } else if (/^3[47]/.test(firtFour)) {
        return TypeCreditCardEnum.amex;
    } else if (/^6/.test(firtFour)) {
        return TypeCreditCardEnum.discover;
    } else if (/^35/.test(firtFour)) {
        return TypeCreditCardEnum.jcb;
    } else {
        return TypeCreditCardEnum.none;
    }
}