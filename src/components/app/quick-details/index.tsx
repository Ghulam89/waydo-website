import CachedIcon from '@mui/icons-material/Cached';
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorIcon from '@mui/icons-material/Error';
import ClockIcon from "@svg/Clock.svg";
import UserPlusIcon from "@svg/UserPlus.svg";
import { ReactNode } from "react";
import styles from "./quick-details.module.css";

type Props = {
  titleContent: ReactNode;
}

export default function QuickDetails({ titleContent: title }: Props) {
  const quickDetailItems = [
    {
      name: "50 nuevos chats",
      subTitle: "Últimas 24 horas",
      color: "#808aff",
      icon: (
        <UserPlusIcon
          style={{
            color: "#808aff",
            width: "17px"
          }}
        />
      ),
    },
    {
      name: "20 anuncios",
      subTitle: "Republicadas",
      color: "#4ad991",
      icon: <CachedIcon style={{ color: "#4ad991" }} />,
    },
    {
      name: "15 anuncios",
      subTitle: "En revisión",
      color: "#b4b4c6",
      icon: (
        <ClockIcon
          style={{
            color: "#b4b4c6",
            width: '22px',
            position: 'relative',
            left: '3px',
          }}
        />
      ),
    },
    {
      name: "60 anuncios",
      subTitle: "Vencidos",
      color: "#ffca83",
      icon: <ErrorIcon style={{ color: "#ffca83" }} />,
    },
    {
      name: "42 anuncios",
      subTitle: "Rechazados",
      color: "#ff7285",
      icon: <CancelIcon style={{ color: "#ff7285" }} />,
    },
  ]

  return (
    <div className={styles.quickDetails}>
      <div className={styles.titleArea}>
        {title}
      </div>
      <div className={styles.quickDetailItems}>
        {quickDetailItems.map((option, i) => (
          <div key={i}>
            <div
              className={styles.itemIcon}
              style={{
                backgroundColor: option.color + "33"
              }}
            >
              {option.icon}
            </div>
            <div className={styles.itemName}>
              {option.name}
            </div>
            <div className={styles.itemSubtitle}>
              {option.subTitle}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}