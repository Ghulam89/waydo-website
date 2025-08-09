import Button from "@components/app/button/app";
import { CheckCircleRounded, Close } from "@mui/icons-material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useAppDispatch } from "@redux/hooks";
import { toggleModal } from "@redux/slices/user-verification-modal";
import AppleStoreBadge from "@svg/AppleStoreBadge.svg";
import UserIDIcon from "@svg/SolidAddressCard.svg";
import PassportIcon from "@svg/SolidPassport.svg";
import classNames from "classnames";
import { useState } from "react";
import QRCode from "react-qr-code";
import styles from "./verifying-user-id.module.css";

type Props = {
  goTo: (viewIndex: number) => void;
}

export default function VerifyingID({ goTo }: Props) {
  const [selectedDocType, setSelectedDocType] = useState(0);
  const [downloadAppVisible, setdownloadAppVisible] = useState(false);
  const dispatch = useAppDispatch();

  const docTypes = [
    {
      icon: <UserIDIcon />,
      name: "Documento de identidad",
      isRecommended: true,
    },
    {
      icon: <PassportIcon />,
      name: "Pasaporte y Visa de Residencia",
      isRecommended: true,
    },
  ]

  return (
    <div className={styles.verificationUserID}>
      <div className={styles.header}>
        <h3>Selecciona un tipo de ID para agregar</h3>
        <Close
          className={styles.boxClose}
          onClick={() => dispatch(toggleModal(false))}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.progressBars}>
          <div><div className={styles.progressBarsFill}></div></div>
          <div></div>
        </div>
        <div className={styles.idTypeSelector}>
          <div>
            <span>Tomaremos 2 fotos de su identificación. ¿Qué ID te gustaría usar?</span>
          </div>
          <div>
            {docTypes.map((docType, i) => (
              <div
                key={docType.name.replace(/\s/g, "") + i}
                className={classNames([
                  styles.docTypeCard,
                  i === selectedDocType ? styles.active : ''
                ])}
                onClick={() => setSelectedDocType(i)}
              >
                <div>{docType.icon}</div>
                <div>
                  <strong>
                    {docType.name}
                  </strong>
                  <span>Recomendado</span>
                </div>
                <div>
                  {i === selectedDocType
                    ? (<CheckCircleRounded />)
                    : (<div className={styles.cardUnchecked}></div>)
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.verificationDescription}>
          <p>
            La verificación de Waydo es un servicio exclusivo para residentes de la República Dominicana. Sus datos se procesarán de forma segura y no se divulgarán a terceros.
          </p>
          <p>
            Esto nos ayuda a evitar que alguien cree cuentas falsas con sus datos.
          </p>
        </div>
        <div className={styles.appDownloadAccess}>
          <div
            className={classNames([
              styles.drawerTitle,
              downloadAppVisible ? '' : styles.active
            ])}
            onClick={() => setdownloadAppVisible(!downloadAppVisible)}
          >
            <strong>Probar la app</strong>
            <KeyboardArrowUpIcon />
          </div>
          <div
            className={classNames([
              styles.appDownloadBox,
              downloadAppVisible ? styles.visible : ''
            ])}
          >
            <div>
              <p>
                Esto nos ayuda a evitar que alguien cree cuentas falsas con sus datos.
              </p>
            </div>
            <div>
              <div>
                <QRCode
                  className={styles.qr}
                  value={"https://play.google.com/store/games?hl=en_US&pli=1"}
                />
                <a
                  target="_blank"
                  href="https://play.google.com/store/games?hl=en_US&pli=1"
                >
                  <img
                    alt="Descargar app desde google"
                    src="/assets/img/google-play-badge.png"
                    style={{
                      marginTop: '4px',
                      width: "auto",
                      height: "47px",
                    }}
                  />
                </a>
              </div>
              <div>
                <QRCode
                  className={styles.qr}
                  value={"https://www.apple.com/app-store/"}
                />
                <a
                  target="_blank"
                  href="https://www.apple.com/app-store/"
                >
                  <AppleStoreBadge
                    style={{
                      height: "32px",
                      width: 'auto',
                      marginTop: "12px",
                    }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div>
          <Button
            styles={{ padding: "16px 40px" }}
            disabled
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
}