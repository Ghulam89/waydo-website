"use client";

import Button from "@components/app/button/app";
import ModalZoom from "@components/app/modal/zoom";
import Close from "@mui/icons-material/Close";
import { alpha, FormControlLabel, styled, Switch } from "@mui/material";
import { red } from "@mui/material/colors";
import {
  useDeleteAddressV1Mutation,
  useSetAddressAsDefaultV1Mutation
} from "@redux/rtk/server/v1/me";
import { UserAddressV1I } from "@redux/rtk/server/v1/me/me.interfaces";
import LocationIcon from "@svg/map.svg";
import { useEffect, useMemo, useState } from "react";
import { Rings } from "react-loader-spinner";
import { toast } from "react-toastify";
import AddressForm, { AddressTag } from "../address-form";
import styles from "./address-item.module.css";

type Props = {
  address: UserAddressV1I;
  onChange?: () => void;
}

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

export default function AddressItem({ address, onChange }: Props) {
  const isDefault = useMemo(() => address.isDefaultAddress, [address]);
  const [inProcess, setInProcess] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [setAsDefault, { isLoading }] = useSetAddressAsDefaultV1Mutation();
  const [deleteAddress, { isLoading: isDeleteLoading }] = useDeleteAddressV1Mutation();

  const handleSetDefault = () => {
    setAsDefault(address.uuid)
      .unwrap()
      .then(() => {
        onChange?.();
        toast("Cambios guardados", {
          type: "success",
          autoClose: 1500,
        });
      })
      .catch((error) => {
        toast(error?.data?.error?.message || "Error interno", {
          type: "error",
        });
      });
  }

  const handleRequestDelete = () => {
    deleteAddress(address.uuid)
      .unwrap()
      .then(() => {
        onChange?.();
        toast("Dirección eliminada", {
          type: "success",
          autoClose: 1500,
        });
      })
      .catch((error) => {
        toast(error?.data?.error?.message || "Error interno", {
          type: "error",
        });
      });
  }

  useEffect(() => setInProcess(isLoading), [isLoading]);

  return (
    <div className={styles.addressItem}>
      <div className={styles.header}>
        <div>
          <LocationIcon
            style={{
              width: '14px',
              height: '18px'
            }}
          />
          <strong>{address.name}</strong>
        </div>
        <div>
          <FormControlLabel
            disabled={inProcess}
            control={
              <RedSwitch
                aria-label="is-default-address-in-form"
                checked={isDefault}
                onClick={() => handleSetDefault()}
                color="error"
              />
            }
            label={isDefault
              ? "Predeterminada"
              : "Configurar como predeterminada"
            }
            className={styles.setAsDefaultLabel}
            labelPlacement="start"
          />
        </div>
      </div>
      <div className={styles.addressDescription}>
        <p>
          {address.address}
        </p>
      </div>
      <div className={styles.addressOptions}>
        <div>
          <Button
            color="#F7F7F8"
            size="small"
            styles={{
              border: "1px solid black ",
              color: 'black',
              borderRadius: '8px',
            }}
            onClick={() => setIsEditOpen(true)}
          >
            Editar
          </Button>
          <Button
            color="#F7F7F8"
            size="small"
            styles={{
              border: "1px solid black ",
              color: 'black',
              borderRadius: '8px',
            }}
            onClick={() => setIsConfirmationOpen(true)}
          >
            Eliminar
          </Button>
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
              <p>Confirmar el borrado de la dirección <strong>{address.name}</strong></p>
            </div>
            <div className={styles.confirmationOptions}>
              <Button
                color="danger"
                disabled={isDeleteLoading}
                onClick={() => handleRequestDelete()}
              >
                {isDeleteLoading && (
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

                {!isDeleteLoading && (
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
      <AddressForm
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        address={address}
        addressTag={!['home', 'work'].includes(address.name)
          ? 'custom'
          : address.name as AddressTag
        }
      />
    </div>
  );
}