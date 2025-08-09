import IncomingIcon from "@svg/Incoming.svg";
import OutgoingIcon from "@svg/Outgoing.svg";
import dayjs from "dayjs";
import styles from "./wallet-transaction-item.module.css";

export enum TransactionTypeE {
  DEPOSIT = "DEPOSIT",
  WITHDRAWAL = "WITHDRAWAL",
}

export type TransactionItemI = {
  amount: number;
  type: TransactionTypeE;
  date: Date;
  description: string;
}

type Props = {
  item: TransactionItemI;
}

export default function WalletTransactionItem({ item }: Props) {
  return (
    <div className={styles.transactionItem}>
      {
        item.type === TransactionTypeE.DEPOSIT
          ? <IncomingIcon width={25} />
          : <OutgoingIcon width={25} />
      }
      <div className={styles.amountAndTransaction}>
        <h3>$ {item.amount.toLocaleString()}</h3>
        <span>{item.description}</span>
      </div>
      <div className={styles.transactionTypeAndDate}>
        <span>
          {
            item.type === TransactionTypeE.DEPOSIT
              ? "Depósito"
              : "Pagado"
          }
        </span>
        <span>
          {dayjs(item.date).format("MMM DD, YYYY")}
        </span>
      </div>
    </div>
  )
}