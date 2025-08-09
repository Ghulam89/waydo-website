"use client";

import Button from "@components/app/button/app";
import { Cancel, CheckCircle } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { useAppDispatch } from "@redux/hooks";
import {
  useActivateTwoFactorV1Mutation,
  useVerifyTwoFactorV1Mutation
} from "@redux/rtk/server/v1/2fa";
import { setTwoFactor } from "@redux/slices/two-factor";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";
import styles from "../../2fa.module.css";

export default function TwoFactorAuthStart() {
  const router = useRouter();
  const [activate, { isLoading: isActivating }] = useActivateTwoFactorV1Mutation();
  const [verify, { isLoading: isVerifying }] = useVerifyTwoFactorV1Mutation();
  const [setupKey, setSetupKey] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [codeErrorMessage, setCodeErrorMessage] = useState("");
  const dispatch = useAppDispatch();

  /**
   * TODO:
   * - Validate whether the user already activated 2FA to render this page
   * - Clean storage when process is cancelled or finished
   */

  useEffect(() => {
    handleActivate();
  }, []);

  const handleActivate = () => {
    activate(null).unwrap().then(result => {
      setSetupKey(result.otpAuthUrl);
      dispatch(setTwoFactor(result.mnemonic));
    });
  }

  const handleGeneratedCode = (val: string) => {
    setGeneratedCode(val);

    if (new RegExp(/\d{6}$/).test(val)) {
      setCodeErrorMessage("");
      handleVerifyCode(val);
    }
  }

  const handleVerifyCode = (code: string) => {
    verify(code)
      .unwrap()
      .then(() => {
        setCodeErrorMessage("");
        toast(
          "2FA code is valid", {
          type: "success"
        });
      }).catch(() => {
        toast(
          "Invalid 2FA code", {
          type: "error"
        });
        setCodeErrorMessage("Invalid 2FA code");
      });
  }

  return (
    <div className={classNames([styles.twoFactor, styles.firstPage])}>
      <div className={styles.header}>
        <h2>Activar la autenticación de dos factores (2FA)</h2>
        <div className={styles.wizzardButtons}>
          <div className={styles.lineThrough}></div>
          <div className={styles.buttons}>
            <div onClick={() => router.push('/2fa/')} className={styles.active}>1</div>
            <div onClick={() => router.push('/2fa/2')}>2</div>
            <div onClick={() => router.push('/2fa/3')}>3</div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.titleAndText}>
          <h3>Configurar la aplicación de autenticación</h3>
          <p>
            Aplicaciones de autenticación y extensiones de navegador como 1Password, Authy, Microsoft Authenticator, etcétera. Genere contraseñas de un solo uso que se utilicen como un segundo factor para verificar su identidad cuando se le solicite durante el inicio de sesión.
          </p>
        </div>
        <div className={styles.titleAndText}>
          <h3>Escanea el código QR</h3>
          <p>
            Use una aplicación de autenticación o una extensión del navegador para escanear.
          </p>
          <div className={styles.twoFactorQR}>
            {isActivating ? (
              <ColorRing
                visible={isActivating}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['red', 'red', 'red', 'red', 'red']}
              />
            ) : (
              <QRCode className={styles.qr} value={setupKey} />
            )}
          </div>
        </div>
        <div className={styles.couldntScan}>
          <p>
            <strong>¿No puedes escanear?</strong>
            <span> Puede utilizar la función de </span>
            <span
              className={styles.configurationKey}
              onClick={() => { }}
            >
              Clave de Configuración
            </span>
            <span> para configurar manualmente la aplicación de autenticación.</span>
          </p>
        </div>
        <div className={styles.titleAndText}>
          <h3>Verifica el código desde la aplicación</h3>
          <div className={styles.codeWrap}>
            <TextField
              disabled={isVerifying}
              variant="outlined"
              className={styles.textField}
              value={generatedCode}
              placeholder="XXXXXX"
              helperText={codeErrorMessage}
              error={Boolean(codeErrorMessage)}
              onChange={(ev) => handleGeneratedCode(ev.target.value)}
            />
            <div className={styles.codeStatusIcon}>
              {
                generatedCode.length !== 6 ? (
                  <></>
                ) : codeErrorMessage ? (
                  <Cancel style={{ color: "red" }} />
                ) : (
                  <CheckCircle style={{ color: "green" }} />
                )
              }
            </div>
          </div>
        </div>
        <div className={styles.footerOptions}>
          <Button
            styles={{
              fontSize: "16px",
              border: "1px solid #15223F",
              backgroundColor: "transparent",
              color: "#15223F",
            }}
            onClick={() => router.push("/")}
          >
            Cancelar
          </Button>
          <Button
            disabled={Boolean(codeErrorMessage) || generatedCode.length !== 6}
            styles={{
              fontSize: "16px",
              backgroundColor: "#15223F",
            }}
            onClick={() => router.push("/2fa/2")}
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  )
};