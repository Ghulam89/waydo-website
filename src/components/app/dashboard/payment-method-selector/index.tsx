import { alpha, FormControlLabel, styled, Switch } from "@mui/material";
import { red } from "@mui/material/colors";
import MasterCardIcon from "@svg/MasterCard.svg";
import PaypalIcon from "@svg/Paypal.svg";
import TrashIcon from "@svg/TrashCan.svg";
import VisaIcon from "@svg/Visa.svg";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { CardIssuerE, PaymentMethodTypeE } from "../wallet-modal/wallet.type";
import styles from "./payment-method-selector.module.css";

const RedSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: red['600'],
    '&:hover': {
      backgroundColor: alpha(red['600'], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: red['600'],
  },
}));

export default function PaymentMethodSelector() {
  const [selectedMethod, setSelectedMethod] = useState("");

  const paymentMethods = [
    {
      type: PaymentMethodTypeE.CARD,
      cardType: CardIssuerE.VISA,
      reference: "**** **** **** 4543",
      isDefault: true,
    },
    {
      type: PaymentMethodTypeE.CARD,
      cardType: CardIssuerE.MASTER_CARD,
      reference: "**** **** **** 3985",
    },
    {
      type: PaymentMethodTypeE.PAYPAL,
      reference: "ernesto@paypal.me",
    },
  ]

  useEffect(() => {
    const defaultPaymentMethod = paymentMethods.find(method => method.isDefault);
    if (defaultPaymentMethod) setSelectedMethod(defaultPaymentMethod.reference);
  }, []);

  return (
    <div className={styles.paymentMethodList}>
      {paymentMethods.map((method, i) => (
        <div
          key={i}
          className={classNames(styles.paymentMethodItem, {
            [styles.paymentMethodIsChecked]: method.reference === selectedMethod
          })}
        >
          <input
            type="radio"
            name="checkedPaymentMethod"
            checked={selectedMethod === method.reference}
            onChange={ev => setSelectedMethod(ev.target.checked
              ? method.reference
              : selectedMethod
            )}
          />
          <div className={styles.paymentMethodIcon}>
            {
              method.type === PaymentMethodTypeE.CARD &&
                method?.cardType === CardIssuerE.VISA ? (
                <VisaIcon width={45} />
              ) : (
                method.type === PaymentMethodTypeE.CARD &&
                  method?.cardType === CardIssuerE.MASTER_CARD ? (
                  <MasterCardIcon width={45} />
                ) : (
                  <PaypalIcon width={45} />
                )
              )
            }
          </div>
          <div className={styles.paymentMethodInfo}>
            <span>
              {
                method.type === PaymentMethodTypeE.CARD &&
                  method?.cardType === CardIssuerE.VISA ? "Visa" : (
                  method.type === PaymentMethodTypeE.CARD &&
                    method?.cardType === CardIssuerE.MASTER_CARD
                    ? "Mastercard"
                    : "Paypal"
                )
              }
            </span>
            <span>{method.reference}</span>
          </div>
          <div className={styles.setDefaultWrapper}>
            <FormControlLabel
              disabled={false}
              control={
                <RedSwitch
                  size="small"
                  aria-label="is-default-address-in-form"
                  checked={!!method?.isDefault}
                  onClick={() => { }}
                  color="error"
                />
              }
              label={!!method?.isDefault
                ? (<span className={styles.defultLabel}>Default</span>)
                : ""
              }
              className={styles.setAsDefaultLabel}
              labelPlacement="start"
            />
          </div>
          <div className={styles.deletePaymentMethod}>
            {!method?.isDefault && (
              <TrashIcon
                onClick={() => { }}
                className={styles.deletePaymentMethodIcon}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}