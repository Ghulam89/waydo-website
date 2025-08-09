"use client";

import Button from "@components/app/button/app";
import PencilIcon from "@mui/icons-material/Edit";
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useGetUserInfoV1Query } from "@redux/rtk/server/v1/me";
import TrashIcon from "@svg/TrashCan.svg";
import LockIcon from "@svg/soap-lock.svg";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NewPasswordForm from "./password-form";
import style from "./security.module.css";

export default function Security() {
  const { data: user } = useGetUserInfoV1Query({});
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  return (
    <div className={style.security}>
      <div className={style.password}>
        <div className={style.header}>
          <h3>Seguridad</h3>
        </div>
        <div className={style.content}>
          <form className={style.securityForm}>
            <div className={style.formControl}>
              <label>Email</label>
              <TextField
                disabled
                label={user?.email || 'patron@gmail.com'}
                variant="outlined"
              />
            </div>
            <div className={style.formControl}>
              <label>Contraseña</label>
              <OutlinedInput
                placeholder="**********"
                type="password"
                disabled
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setModalOpen(true)}
                    >
                      <PencilIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
          </form>
        </div>
        <div>
          <NewPasswordForm
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
          />
        </div>
      </div>
      <div className={style.twoFactorAuth}>
        <div className={style.header}>
          <h3>Autenticación de dos factores</h3>
        </div>
        <div className={style.content}>
          <div className={style.twoFactorIcon}>
            <LockIcon />
          </div>
          <div className={style.title}>
            <h3>
              La autenticación de dos factores aún no está activada.
            </h3>
            <p>
              La autenticación de dos factores añade una capa adicional de seguridad a tu cuenta, ya que requiere algo más que una contraseña para iniciar sesión. Activar la autenticación de dos factores
            </p>
          </div>
          <div>
            <Button
              color="#15223F"
              styles={{
                borderRadius: '50px',
                padding: '16px 50px',
                marginBottom: '8px',
              }}
              onClick={() => router.push("/2fa")}
            >
              Activar la autenticación de dos factores
            </Button>
            <Button
              size="small"
              color="transparent"
            >
              <span
                style={{
                  color: '#00B3FF',
                  fontWeight: "lighter"
                }}
              >
                Aprender más
              </span>
            </Button>
          </div>
        </div>
      </div>
      <div className={style.accountDisabling}>
        <div className={style.header}>
          <h3>Gestión de cuenta</h3>
        </div>
        <div className={style.content}>
          <div className={style.disableAccountBtn}>
            <TrashIcon />
            <strong>Desactiva tu cuenta</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
