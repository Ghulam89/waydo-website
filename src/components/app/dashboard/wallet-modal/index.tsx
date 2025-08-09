import { Add } from "@mui/icons-material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AmericanExpressIcon from "@svg/AmericanExpress.svg";
import MasterCardIcon from "@svg/MasterCard.svg";
import PaypalIcon from "@svg/Paypal.svg";
import VisaIcon from "@svg/Visa.svg";
import WaydoCashIcon from "@svg/WaydoCash.svg";
import WalletIcon from "@svg/wallet.svg";
import Tippy from "@tippyjs/react";
import classNames from "classnames";
import { useEffect, useState } from "react";
import AddCreditcardForm from "../add-creditcard-form";
import PaymentMethodSelector from "../payment-method-selector";
import PaypalButtons from "../paypal-checkout";
import WalletTransactionItem, { TransactionItemI, TransactionTypeE } from "../wallet-transaction-item";
import styles from "./wallet-modal.module.css";
import { PaymentMethodTypeE } from "./wallet.type";

export default function WalletModal() {
  const [currentViewIndex, setCurrentViewIndex] = useState(0);
  const [accordions, setAccordions] = useState<Element[]>([]);
  const [makePaymentType, setMakePaymentType] = useState<PaymentMethodTypeE>(PaymentMethodTypeE.CARD);

  const generateRandomTransaction = (): TransactionItemI => ({
    amount: Math.floor(Math.random() * 20000),
    type: [TransactionTypeE.DEPOSIT, TransactionTypeE.WITHDRAWAL][Math.floor(Math.random() * 2)],
    date: new Date(),
    description: "WayCash"
  });

  const handleActiveAccordion = (index: number) => {
    if (!accordions.length) return;

    Array.from(accordions).forEach((item, i) => {
      const container = item.children[1] as HTMLElement;
      const containerContent = container?.children?.[0] as HTMLElement;

      if (containerContent) {
        const containerHeight = containerContent?.offsetHeight || 0;

        Object.assign(container.style, {
          maxHeight: index === i ? (containerHeight + 20) + "px" : 0,
          height: index === i ? (containerHeight + 20) + "px" : 0
        });
      }
    });
  }

  useEffect(() => {
    const accordionItems = document.querySelectorAll("." + styles.paymentMethodAccordion);
    if (accordionItems.length) setAccordions(Array.from(accordionItems));
  }, [currentViewIndex]);

  return (
    <Tippy
      interactive
      trigger="click"
      arrow
      placement="bottom"
      animation="shift-away"
      maxWidth={"auto"}
      className={styles.modalWrapper}
      content={
        <div className={styles.walletContent}>
          <div className={styles.walletHeader}>
            {currentViewIndex !== 0 && (
              <ArrowBackIosIcon
                className={styles.walletNavigationBack}
                onClick={() => setCurrentViewIndex(0)}
              />
            )}

            <h1>Billetera</h1>
          </div>

          {currentViewIndex === 0 && (
            <div className={styles.walletHome}>
              <div className={styles.walletMethods}>
                <div className={styles.addNewPaymentMethod}>
                  <strong onClick={() => setCurrentViewIndex(1)}>Agregar Tarjeta</strong>
                </div>
                <PaymentMethodSelector />
              </div>
              <div className={styles.walletBalance}>
                <div
                  className={styles.balanceOptions}
                  onClick={() => setCurrentViewIndex(2)}
                >
                  <Add />
                  <span>Agrega balance</span>
                </div>
                <div className={styles.balanceDetails}>
                  <span>Balance disponible</span>
                  <span>$8,452.98</span>
                </div>
                <div className={styles.cashLogo}>
                  <WaydoCashIcon width={75} />
                </div>
              </div>
              <div className={styles.walletLastTransactions}>
                <h2>Últimas transacciones</h2>
                <div className={styles.transactionsList}>
                  {Array(3).fill(0).map((_, i) => (
                    <WalletTransactionItem
                      key={i}
                      item={generateRandomTransaction()}
                    />
                  ))}
                </div>
                <button
                  className={styles.seeAllTransactions}
                  onClick={() => setCurrentViewIndex(3)}
                >
                  <strong>
                    Ver todas
                  </strong>
                </button>
              </div>
            </div>
          )}

          {currentViewIndex === 1 && (
            <div className={styles.walletNewPaymentMethod}>
              <div className={styles.newPMHeader}>
                Agrega tu método de pago
              </div>
              <div className={styles.newPMContent}>
                <div className={styles.PMTypeSelector}>
                  <div>
                    <input
                      type="radio"
                      checked={makePaymentType === PaymentMethodTypeE.CARD}
                      onChange={ev => ev.target.checked && setMakePaymentType(PaymentMethodTypeE.CARD)}
                      name="paymentMethodType"
                    />
                    <VisaIcon width={30} />
                    <MasterCardIcon width={30} />
                    <AmericanExpressIcon width={30} />
                  </div>
                  <div>
                    <input
                      type="radio"
                      checked={makePaymentType === PaymentMethodTypeE.PAYPAL}
                      onChange={ev => ev.target.checked && setMakePaymentType(PaymentMethodTypeE.PAYPAL)}
                      name="paymentMethodType"
                    />
                    <PaypalIcon width={30} />
                  </div>
                </div>
                {makePaymentType === PaymentMethodTypeE.PAYPAL
                  ? (
                    <div style={{ marginTop: "25px" }}>
                      <PaypalButtons />
                    </div>
                  )
                  : (<AddCreditcardForm />)
                }
              </div>
            </div>
          )}

          {currentViewIndex === 2 && (
            <div className={styles.walletAddBalance}>
              <div className={styles.newPMHeader}>
                Agrega balance WayCash
              </div>
              <div className={styles.accordionsWrapper}>
                <div className={classNames([styles.newMPFormControl, styles.newBalanceInput])}>
                  <label>Ingresa un monto</label>
                  <input placeholder="5,000" />
                </div>
                <div
                  className={classNames([styles.paymentMethodAccordion])}
                >
                  <div
                    className={styles.paymentMethodAccordionTitle}
                    onClick={() => handleActiveAccordion(0)}
                  >
                    <h3>Método de pago guardado</h3>
                    <ExpandMoreIcon />
                  </div>
                  <div
                    className={styles.savedPaymentMethods}
                    style={{ maxHeight: "100%" }}
                  >
                    <PaymentMethodSelector />
                  </div>
                </div>
                <div className={classNames(styles.paymentMethodAccordion)}>
                  <div
                    className={styles.paymentMethodAccordionTitle}
                    onClick={() => handleActiveAccordion(1)}
                  >
                    <h3>Pago único</h3>
                    <ExpandMoreIcon />
                  </div>
                  <div className={styles.addPaymentMethodContent}>
                    <AddCreditcardForm />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentViewIndex === 3 && (
            <div className={styles.walletAllTransactions}>
              <div className={styles.newPMHeader}>
                Todas las transacciones
              </div>
              <div className={styles.transactionsList}>
                {Array(20).fill(0).map((_, i) => (
                  <WalletTransactionItem
                    key={i}
                    item={generateRandomTransaction()}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      }
    >
      <div className={styles.companyWalletButton}>
        <WalletIcon />
        <span>Billetera</span>
      </div>
    </Tippy>
  )
}