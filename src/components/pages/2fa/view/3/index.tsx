"use client";

import Button from "@components/app/button/app";
import { alpha, FormControlLabel, styled, Switch } from "@mui/material";
import { red } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import styles from "../../2fa.module.css";

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

export default function TwoFactorAditionalSettings() {
  const router = useRouter();

  /**
   * TODO:
   * - Discuss with J about available options
   */

  const options = [
    {
      name: "login",
      label: "Iniciar sesión",
      checked: true,
    },
    {
      name: "changePassword",
      label: "Cambiar contraseaña",
      checked: false,
    },
    {
      name: "payment",
      label: "Pagos",
      checked: false,
    },
    {
      name: "updateProfile",
      label: "Actualizar perfil",
      checked: false,
    },
  ]

  return (
    <div className={styles.twoFactor}>
      <div className={styles.header}>
        <h2>Activar la autenticación de dos factores (2FA)</h2>
        <div className={styles.wizzardButtons}>
          <div className={styles.lineThrough}></div>
          <div className={styles.buttons}>
            <div onClick={() => router.push('/2fa/')}>1</div>
            <div onClick={() => router.push('/2fa/2')}>2</div>
            <div onClick={() => router.push('/2fa/3')} className={styles.active}>3</div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.titleAndText}>
          <h3>¡Ya casi estás! Solo un paso más</h3>
          <p>
            Personaliza la seguridad de tu cuenta y protege tus datos. Cada vez que quieras realizar cambios importantes, como crear una nueva publicación, cambiar tu contraseña o realizar pagos, te pediremos un código de verificación adicional para confirmar tu identidad.
          </p>
        </div>
        <div className={styles.titleAndText}>
          <h3>Selecciona dónde quieres activar la verificación adicional</h3>
          <div className={styles.configurationOptions}>
            {options && options.map(option => (
              <div
                key={`2fa-option-${option.name}`}
              >
                <FormControlLabel
                  disabled={false}
                  control={
                    <RedSwitch
                      aria-label="is-default-address-in-form"
                      checked={option.checked}
                      onClick={() => { }}
                      color="error"
                    />
                  }
                  label={option.label}
                  className={styles.setAsDefaultLabel}
                />
              </div>
            ))}
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
            Omitir por ahora
          </Button>
          <Button
            styles={{
              fontSize: "16px",
              backgroundColor: "#15223F",
            }}
            onClick={() => router.push("/profile/security")}
          >
            Guardar configuración
          </Button>
        </div>
      </div>
    </div>
  )
};