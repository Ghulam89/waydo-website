import Button from "@components/app/button/app";
import ModalZoom from "@components/app/modal/zoom";
import { Close } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { useUpdatePasswordV1Mutation } from "@redux/rtk/server/v1/me";
import utils from "@utils/validation/rules";
import { useState } from "react";
import { toast } from "react-toastify";
import style from "./password-form.module.css";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
}

type FormInputs = {
  oldPassword: string;
  newPassword: string;
  confirmationPassword: string;
  passwordFail: string;
  passwordConfirmationFail: string;
  oldPasswordFail: string;
}

export default function NewPasswordForm({ isOpen, onClose }: Props) {
  const [fields, setFields] = useState<FormInputs>({
    oldPassword: "",
    newPassword: "",
    confirmationPassword: "",
    passwordFail: "",
    passwordConfirmationFail: "",
    oldPasswordFail: "",
  });

  const [
    updatePassword,
    { isLoading }
  ] = useUpdatePasswordV1Mutation();

  const handleClose = () => {
    onClose?.();
  };

  const handleSubmit = () => {
    const data = {
      oldPassword: fields.oldPassword,
      newPassword: fields.newPassword,
    }

    updatePassword(data)
      .unwrap()
      .then(() => {
        toast("Datos actualizados", {
          type: "success",
          autoClose: 1500,
          onClose: () => {
            handleClose();
            setFields({
              oldPassword: "",
              newPassword: "",
              confirmationPassword: "",
              passwordFail: "",
              passwordConfirmationFail: "",
              oldPasswordFail: "",
            });
          }
        });
      })
      .catch((error) => {
        const message = error?.data?.error?.message || "Error interno";

        setFields(prev => ({
          ...prev,
          oldPasswordFail: message === "The old password is incorrect"
            ? 'La vieja contraseña es incorrecta'
            : ''
        }));

        toast(message, { type: "error" });
      });
  }

  const handleOldPassword = (val: string): void => {
    setFields(prev => ({ ...prev, oldPassword: val }));
  }

  const handleNewPassword = (val: string) => {
    const { failText } = utils.validatePassword(val);
    const isExactMatch = val === fields.confirmationPassword;

    setFields(prev => ({
      ...prev,
      newPassword: val,
      passwordFail: failText,
      passwordConfirmationFail: isExactMatch ? '' : 'Las contraseñas deben ser iguales'
    }));
  }

  const handleRepeatPassword = (val: string) => {
    const isExactMatch = val === fields.newPassword;

    setFields(prev => ({
      ...prev,
      confirmationPassword: val,
      passwordConfirmationFail: isExactMatch ? '' : 'Las contraseñas deben ser iguales'
    }));
  }

  return (
    <ModalZoom show={isOpen} onClose={handleClose}>
      <div className={style.container}>
        <div className={style.header}>
          <h3>Cambiar contraseña</h3>
          <div className={style.boxClose} onClick={handleClose}>
            <Close />
          </div>
        </div>
        <div className={style.content}>
          <form className={style.form}>
            <div className={style.field}>
              <TextField
                label="Vieja contraseña"
                variant="outlined"
                type="password"
                className={style.textField}
                required
                helperText={fields.oldPasswordFail}
                color={Boolean(fields.oldPasswordFail) ? 'error' : 'primary'}
                error={Boolean(fields.oldPasswordFail)}
                value={fields.oldPassword}
                onChange={ev => handleOldPassword(ev?.target?.value || '')}
              />
            </div>
            <div className={style.field}>
              <TextField
                label="Nueva contraseña"
                type="password"
                variant="outlined"
                className={style.textField}
                required
                helperText={fields.passwordFail}
                color={Boolean(fields.newPassword) ? 'error' : 'primary'}
                error={Boolean(fields.passwordFail)}
                value={fields.newPassword}
                onChange={ev => handleNewPassword(ev?.target?.value || '')}
              />
            </div>
            <div className={style.field}>
              <TextField
                type="password"
                label="Repetir nueva contraseña"
                variant="outlined"
                className={style.textField}
                required
                helperText={fields.passwordConfirmationFail}
                color={Boolean(fields.passwordConfirmationFail) ? 'error' : 'primary'}
                error={Boolean(fields.passwordConfirmationFail)}
                value={fields.confirmationPassword}
                onChange={ev => handleRepeatPassword(ev?.target?.value || '')}
              />
            </div>
          </form>
        </div>
        <div className={style.footer}>
          <div>
            <Button
              color="success"
              disabled={Boolean(
                fields.passwordConfirmationFail ||
                fields.passwordFail ||
                !fields.newPassword ||
                !fields.confirmationPassword ||
                isLoading
              )}
              onClick={() => handleSubmit()}
            >
              Guardar cambios
            </Button>
          </div>
        </div>
      </div>
    </ModalZoom>
  );
}