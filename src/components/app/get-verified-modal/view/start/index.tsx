import Button from "@components/app/button/app";
import { useAppDispatch } from "@redux/hooks";
import { toggleModal } from "@redux/slices/user-verification-modal";
import EncryptedShieldIcon from "@svg/EncryptedShield.svg";
import QuickVerification from "@svg/QuickVerification.svg";
import UserDocumentCard from "@svg/UserDocumentCard.svg";
import { ReactNode } from "react";
import styles from "./start-verifying.module.css";

type Props = {
  goTo: (viewIndex: number) => void;
}

type Feature = {
  icon: ReactNode;
  title: string;
  subtitle: string;
}

export default function StartVerifying({ goTo }: Props) {
  const dispatch = useAppDispatch();

  const features: Feature[] = [
    {
      icon: <QuickVerification />,
      title: "Rápido y sencillo",
      subtitle: "Solo toma unos minutos",
    },
    {
      icon: <EncryptedShieldIcon />,
      title: "Seguro",
      subtitle: "La información de su autenticación permanece privada",
    },
  ]

  return (
    <div className={styles.startVerifying}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <UserDocumentCard />
        </div>
        <div className={styles.title}>
          <h3>¡Obtén la verificación en Waydo!</h3>
        </div>
        <div>
          <span>Generar confianza</span>
          <div className={styles.subtitleSeparator}></div>
          <span>Generar visibilidad</span>
          <div className={styles.subtitleSeparator}></div>
          <span>Recompensas</span>
        </div>
      </div>
      <div className={styles.body}>
        {features.map((feature, i) => (
          <div
            key={feature.title.replace(/\s/g, "") + i}
            className={styles.feature}
          >
            <div>
              {feature.icon}
            </div>
            <div>
              <h4>{feature.title}</h4>
              <span>{feature.subtitle}</span>
            </div>
          </div>
        ))}
        <div className={styles.moreAboutVerification}>
          <span>Más información sobre la verificación en Waydo</span>
        </div>
      </div>
      <div className={styles.footer}>
        <div>
          <Button
            styles={{
              borderColor: "#b6b8b9",
              fontWeight: "lighter",
            }}
            variant="outlined"
            onClick={() => dispatch(toggleModal(false))}
          >
            Mas tarde
          </Button>
          <Button onClick={() => goTo(1)}>
            Verificarse
          </Button>
        </div>
      </div>
    </div>
  );
}