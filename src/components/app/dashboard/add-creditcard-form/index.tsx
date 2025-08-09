import Button from "@components/app/button/app";
import AmericanExpressIcon from "@svg/AmericanExpress.svg";
import MasterCardIcon from "@svg/MasterCard.svg";
import VisaIcon from "@svg/Visa.svg";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { CardIssuerE } from "../wallet-modal/wallet.type";
import styles from "./add-creditcard-form.module.css";

export default function AddCreditcardForm() {
  const [cardIssuer, setCardIssuer] = useState<CardIssuerE>();
  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberString, setCardNumberString] = useState("");

  useEffect(() => {
    setCardNumberString(cardNumber.replace(/[0-9]{4}\s+|[0-9]{4}/g, a => a.trim() + " ").trim());

    const onlyNumber = cardNumber.replace(/\s/g, "")
    const issuerIsVisa = (/^4[0-9]{6,}$/).test(onlyNumber);
    const issuerIsAmericanExpress = (/^3[47][0-9]{5,}$/).test(onlyNumber);
    const issuerIsMasterCard = (/^5[1-5][0-9]{5,}|222[1-9][0-9]{3,}|22[3-9][0-9]{4,}|2[3-6][0-9]{5,}|27[01][0-9]{4,}|2720[0-9]{3,}$/).test(onlyNumber);

    const issuerEnum = issuerIsVisa
      ? CardIssuerE.VISA
      : issuerIsMasterCard
        ? CardIssuerE.MASTER_CARD : issuerIsAmericanExpress
          ? CardIssuerE.AMERICAN_EXPRESS : undefined;

    setCardIssuer(issuerEnum);
  }, [cardNumber]);

  return (
    <form className={styles.newMethodForm}>
      <div>
        <div className={styles.newMPFormControl}>
          <label>Nombre en tarjeta</label>
          <input placeholder="Nombre en tarjeta" />
        </div>
        <div
          className={classNames([
            styles.newMPFormControl,
            styles.creditCard
          ])}
        >
          <label>Número de tarjeta</label>
          <div>

            <input
              placeholder="**** **** **** ****"
              value={cardNumberString}
              onChange={ev => setCardNumber(ev.target.value)}
            />

            {cardIssuer && cardIssuer === CardIssuerE.VISA && (
              <VisaIcon width={40} className={styles.cardIssuerLogo} />
            )}

            {cardIssuer && cardIssuer === CardIssuerE.MASTER_CARD && (
              <MasterCardIcon width={40} className={styles.cardIssuerLogo} />
            )}

            {cardIssuer && cardIssuer === CardIssuerE.AMERICAN_EXPRESS && (
              <AmericanExpressIcon width={40} className={styles.cardIssuerLogo} />
            )}
          </div>
        </div>
        <div className={styles.cardExpirationWrapper}>
          <div className={styles.newMPFormControl}>
            <label>Fecha de expiración</label>
            <input placeholder="mm / yy" />
          </div>
          <div className={styles.newMPFormControl}>
            <label>CVV</label>
            <input placeholder="***" type="number" />
          </div>
        </div>
      </div>
      <div className={styles.addCreditCardButton}>
        <Button
          size="small"
          styles={{
            backgroundColor: '#15223F',
            fontWeight: "lighter"
          }}
          disabled
        >
          Agregar
        </Button>
      </div>
    </form>
  )
}