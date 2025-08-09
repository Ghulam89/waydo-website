"use client";

import Button from "@components/app/button/app";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useAppSelector } from "@redux/store";
import { useRouter } from "next/navigation";
import styles from "../../2fa.module.css";

export default function TwoFactorRecoveryCodes() {
  const router = useRouter();
  const { mnemonic } = useAppSelector((s) => s.twoFactorProcess);

  return (
    <div className={styles.twoFactor}>
      <div className={styles.header}>
        <h2>Activar la autenticación de dos factores (2FA)</h2>
        <div className={styles.wizzardButtons}>
          <div className={styles.lineThrough}></div>
          <div className={styles.buttons}>
            <div onClick={() => router.push('/2fa/')}>1</div>
            <div onClick={() => router.push('/2fa/2')} className={styles.active}>2</div>
            <div onClick={() => router.push('/2fa/3')}>3</div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.downloadCodesContent}>
          <h2>Descarga tus códigos de recuperación</h2>
          <p>
            Puede usar los códigos de recuperación como un segundo factor para autenticarse en caso de que pierda el acceso a su dispositivo. Recomendamos guardarlos con un administrador de contraseñas seguro como 1Password, Authy u Keeper.
          </p>
          <div className={styles.codes}>
            {mnemonic.length && mnemonic.map(code => (
              <h3 key={code}>
                <strong>-</strong>
                <strong>{code}</strong>
              </h3>
            ))}
          </div>
          <div className={styles.downloadButton}>
            <div>
              <Button
                size="small"
                onClick={() => { }}
                styles={{
                  marginRight: "8px",
                  backgroundColor: "#15223F",
                }}
              >
                <FileDownloadOutlinedIcon
                  style={{
                    marginRight: "8px",
                    fontSize: "25px"
                  }}
                />
                <span>Descargar</span>
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.warningBox}>
          <div>
            <InfoOutlinedIcon />
          </div>
          <div>
            <h3 style={{ marginBottom: "6px" }}>Guarde sus códigos de recuperación en un lugar seguro</h3>
            <p>Si pierdes tu dispositivo y no tienes los códigos de recuperación, perderás el acceso a tu cuenta.</p>
          </div>
        </div>
        <div className={styles.footerOptions}>
          <Button
            styles={{
              fontSize: "16px",
              border: "1px solid #15223F",
              backgroundColor: "transparent",
              color: "#15223F",
              width: "360px",
            }}
            onClick={() => router.push("/")}
          >
            Cancelar
          </Button>
          <Button
            styles={{
              fontSize: "16px",
              backgroundColor: "#15223F",
            }}
            onClick={() => router.push("/2fa/3")}
          >
            He guardado mis códigos de recuperación
          </Button>
        </div>
      </div>
    </div>
  )
};