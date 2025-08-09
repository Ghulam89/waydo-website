import { ModalZoon } from "@components/app/modal";
import { AddPaymentMethodPropsI, TypePayment, TypePaymentEnum } from "./add-payment-method.interface";

import AmericanExpress from "@svg/AmericanExpress.svg";
import MasterCardIcon from "@svg/MasterCard.svg";
import PaypalIcon from "@svg/Paypal.svg";
import VisaIcon from "@svg/Visa.svg";

import { detectTypeCreditCard } from "@utils/creditcard";
import { TypeCreditCardEnum } from "@utils/creditcard/creditcard.interface";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import style from "./add-payment-method.module.css";

const icons = {
    [TypeCreditCardEnum.amex]: () => (<AmericanExpress />),
    [TypeCreditCardEnum.masterCard]: () => (<MasterCardIcon />),
    [TypeCreditCardEnum.visa]: () => (<VisaIcon />)
}

export default function AddPaymentMethod({ onClose, show }: AddPaymentMethodPropsI) {
    const [paymentMethod, setPaymentMethod] = useState<TypePayment>(TypePaymentEnum.creditcard)
    const [creditcardNumber, setCreditcardNumber] = useState('');
    const typeCreditCard = useMemo(() => (detectTypeCreditCard(creditcardNumber)), [creditcardNumber])

    //@ts-ignore
    const icon = useMemo(() => (icons[typeCreditCard]), [icons, typeCreditCard])

    const formatearNumeroTarjeta = (value: string) => {
        // Eliminamos todos los caracteres no numéricos
        const soloNumeros = value.replace(/\D/g, '');

        // Dividimos el número en bloques de 4 dígitos
        const formateado = soloNumeros
            .replace(/(\d{4})(?=\d)/g, '$1 ');

        return formateado;
    };

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numeroFormateado = formatearNumeroTarjeta(value);
        setCreditcardNumber(numeroFormateado);
    }, [])

    return (
        <ModalZoon
            show={show}
            onClose={onClose}
        >
            <div className={style.content}>
                <div>
                    <h3 className={style.title}>Agrega tu método de pago</h3>
                </div>
                <div className={style.boxTypeMethod}>
                    <div>
                        <input
                            type="radio"
                            name="payment-method-type"
                            value="creditcard"
                            onClick={(e) => {
                                e.stopPropagation()
                                setPaymentMethod(TypePaymentEnum.creditcard)
                            }}
                            checked={paymentMethod === TypePaymentEnum.creditcard}
                        />
                        <VisaIcon />
                        <MasterCardIcon />
                        <AmericanExpress />
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="payment-method-type"
                            value="paypal"
                            onClick={(e) => {
                                e.stopPropagation()
                                setPaymentMethod(TypePaymentEnum.paypal)
                            }}
                            checked={paymentMethod === TypePaymentEnum.paypal}
                        />
                        <PaypalIcon />
                    </div>
                </div>
                <div>
                    <div className={style.inputGroup}>
                        <div>
                            <div>
                                <label>Nombre en la tarjeta</label>
                            </div>
                            <div className={style.boxInput}>
                                <input type="text" />
                            </div>
                        </div>
                    </div>
                    <div className={style.inputGroup}>
                        <div>
                            <div>
                                <label>Card Number</label>
                            </div>
                            <div className={style.boxInput}>
                                <input
                                    type="text"
                                    value={creditcardNumber}
                                    onChange={handleChange}
                                    maxLength={19}
                                />
                                {typeof icon === "function" && (
                                    <div className={style.boxIconRight}>
                                        {icon()}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={style.contentCCV}>
                        <div className={style.inputGroup}>
                            <div>
                                <div>
                                    <label>Expiry Date</label>
                                </div>
                                <div className={style.boxInput}>
                                    <input type="text" />
                                </div>
                            </div>
                        </div>
                        <div className={style.inputGroup}>
                            <div>
                                <div>
                                    <label>CVV</label>
                                </div>
                                <div className={style.boxInput}>
                                    <input type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={style.boxButtonPaymentMethod}>
                        <button >Agregar método de pago</button>
                    </div>
                </div>
            </div>
        </ModalZoon>
    )
}