import Button from "@components/app/button/app";
import ModalZoom from "@components/app/modal/zoom";
import { Close, Edit } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { InputAdornment, TextField } from "@mui/material";
import {
  useCreateUserPhoneV1Mutation,
  useDeleteUserPhoneV1Mutation,
  useUpdateUserPhoneV1Mutation
} from "@redux/rtk/server/v1/me";
import { useMaskPhone } from "@utils/phone-mask";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import { toast } from "react-toastify";
import styles from "./phone-item.module.css";

export type Phone = {
  value: string;
  maskedValue: string;
  uuid?: string;
}

type Props = {
  phoneItem: Phone;
  label: string;
  isEditMode?: boolean;
  isAvailableToDelete?: boolean;
}

export default function PhoneItem({
  phoneItem,
  isEditMode,
  label,
  isAvailableToDelete
}: Props) {
  const [editMode, setEditMode] = useState(false);
  const [updatePhone, { isLoading: updating }] = useUpdateUserPhoneV1Mutation();
  const [createPhone, { isLoading: creating }] = useCreateUserPhoneV1Mutation();
  const [deletePhone, { isLoading: deleting }] = useDeleteUserPhoneV1Mutation();
  const [phone, setPhone] = useState<Phone>(phoneItem);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const { setToMask } = useMaskPhone({
    maskFormat: '(###) ###-####',
  });

  const handleSubmitPhone = () => {
    createPhone({
      phone: '+1' + phone.value.replace(/\s/g, ""),
      countryCode: "+1"
    })
      .unwrap()
      .then(() => {
        toast("Teléfono enviado", {
          type: "success",
          autoClose: 2000,
        });

        setEditMode(false);
      })
      .catch((error) => {
        toast(error?.data?.error?.message || "Error interno", {
          type: "error",
        });
      });
  }

  const handleUpdatePhone = () => {
    updatePhone({
      phone: '+1' + phone.value.replace(/\s/g, ""),
      uuid: phoneItem?.uuid || ''
    })
      .unwrap()
      .then(() => {
        toast("Teléfono actualizado", {
          type: "success",
          autoClose: 2000,
        });

        setEditMode(false);
      })
      .catch((error) => {
        toast(error?.data?.error?.message || "Error interno", {
          type: "error",
        });
      });
  }

  const handleDeletePhone = () => {
    setIsConfirmationOpen(false);

    if (!phoneItem?.uuid || !isAvailableToDelete) return;

    deletePhone(phoneItem?.uuid || '')
      .unwrap()
      .then(() => {
        toast("Teléfono eliminado", {
          type: "success",
          autoClose: 2000,
        });

        setEditMode(false);
      })
      .catch((error) => {
        toast(error?.data?.error?.message || "Error interno", {
          type: "error",
        });
      });
  }

  const handlePhone = (val: string) => {
    setToMask(
      val.replace('+1', ''),
      (data: Record<string, unknown>) => {
        setPhone({
          value: data.isValid ? data.rowValue as string : '',
          maskedValue: data.maskedValue as string,
        });
      }
    );
  }

  useEffect(() => {
    handlePhone((phoneItem.value || '').replace('+1', ''));
  }, [phoneItem]);

  return (
    <div className={styles.phoneItem}>
      <div className={styles.content}>
        <div
          className={classNames([styles.addPhone, !editMode ? styles.showArea : ''])}
          onClick={() => setEditMode(true)}
        >
          <span>{label}</span>

          {isEditMode && (
            <span>
              +1 {phone.maskedValue}
            </span>
          )}

          {isEditMode
            ? (<Edit style={{ fontSize: '20px' }} />)
            : (<AddIcon />)
          }
        </div>
        <div className={classNames([styles.editPhoneArea, editMode ? styles.showArea : ''])}>
          <div className={styles.editHeader}>
            <span>{label}</span>
            <CloseIcon onClick={() => setEditMode(false)} />
          </div>
          <div className={styles.editField}>
            <TextField
              label="Teléfono"
              variant="outlined"
              className={styles.textField}
              value={phone.maskedValue}
              size="small"
              name="phone"
              onChange={(ev) => handlePhone(ev.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    +1
                  </InputAdornment>
                )
              }}
            />
          </div>
          <div className={styles.savePhoneButton}>
            {!!isAvailableToDelete && (
              <div>
                <Button
                  color="danger"
                  size="small"
                  disabled={!Boolean(phoneItem?.uuid)
                    || creating
                    || updating
                    || deleting
                  }
                  onClick={() => setIsConfirmationOpen(true)}
                >
                  Borrar
                </Button>
              </div>
            )}

            <div>
              <Button
                color="success"
                size="small"
                disabled={!phone.value
                  || creating
                  || updating
                  || deleting
                }
                onClick={() => isEditMode
                  ? handleUpdatePhone()
                  : handleSubmitPhone()
                }
              >
                {isEditMode
                  ? "Actualizar número"
                  : "Agregar número"
                }
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ModalZoom
        show={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
      >
        <div className={styles.confirmationContainer}>
          <div className={styles.header}>
            <h3>Confirmar operación</h3>
            <div
              className={styles.boxClose}
              onClick={() => setIsConfirmationOpen(false)}
            >
              <Close />
            </div>
          </div>
          <div className={styles.content}>
            <div className="description">
              <p>Confirmar el borrado del teléfono: <strong>{phoneItem.maskedValue}</strong></p>
            </div>
            <div className={styles.confirmationOptions}>
              <Button
                color="danger"
                disabled={deleting}
                onClick={() => handleDeletePhone()}
              >
                {deleting && (
                  <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    <Rings
                      visible={true}
                      height="25"
                      width="25"
                      color="white"
                      ariaLabel="rings-loading"
                    />
                  </div>
                )}

                {!deleting && (
                  <span>
                    Eliminar
                  </span>
                )}
              </Button>
              <Button
                color="#F7F7F8"
                styles={{
                  border: "1px solid black ",
                  color: 'black',
                  borderRadius: '8px',
                }}
                onClick={() => setIsConfirmationOpen(false)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </ModalZoom>
    </div>
  )
}
