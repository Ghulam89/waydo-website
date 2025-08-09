'use client';

import { OfficeItem } from "@components/app/admin-office-item";
import Button from "@components/app/button/app";
import ModalZoom from "@components/app/modal/zoom";
import { Add, Close } from "@mui/icons-material";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from "@svg/Search.svg";
import UserPlusCircleIcon from "@svg/UserPlusCircle.svg";
import Image from "next/image";
import { useState } from "react";
import styles from "./add-agent-popup.module.css";

export type AddressTag = "home" | "work" | "custom";

export interface MarkerPositionI {
  lat: number,
  lng: number
}

export type CreateAddressOption = {
  name: string;
  tag: AddressTag;
  active?: boolean;
};

type Props = {
  office: OfficeItem;
  isOpen?: boolean;
  onClose?: () => void;
}

type NewAgentForm = {
  name: string;
  province: string;
  municipality: string;
  address: string;
  isDefaultAddress?: boolean;
}

export default function AddAgentForm({
  office,
  onClose,
  isOpen = false
}: Props) {
  const [colaboratorIndex, setColaboratorIndex] = useState<number | undefined>();
  const [form, setForm] = useState<NewAgentForm>({
    name: "",
    province: "",
    municipality: "",
    address: "",
  });

  const colaborators = [
    {
      imageSrc: "https://i.pravatar.cc/130",
      firstName: "Juan",
      lastName: "Loopez",
      email: "juan_lopez@gmail.com",
      isVerified: true,
      isPublisher: false,
      position: "SELLER"
    },
    {
      imageSrc: "https://i.pravatar.cc/130",
      firstName: "Jorge",
      lastName: "Perito",
      email: "juan_lopez@gmail.com",
      isVerified: false,
      isPublisher: false,
      position: "SELLER"
    },
    {
      imageSrc: "https://i.pravatar.cc/130",
      firstName: "Marina",
      lastName: "Parra",
      email: "juan_lopez@gmail.com",
      isVerified: true,
      isPublisher: false,
      position: "SELLER"
    },
  ]

  const handleClose = () => {
    onClose?.();
  };

  return (
    <ModalZoom show={isOpen} onClose={handleClose}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.boxClose}>
            <Close onClick={handleClose} />
          </div>
          <div className={styles.newOfficeHeader}>
            <div className={styles.newOfficeHeaderIcon}>
              <UserPlusCircleIcon />
            </div>
            <div className={styles.newOfficeHeaderTitles}>
              <h3>Agrega un usuario a tu sucursal</h3>
              <span>Vincula un usuario existente o crea uno nuevo.</span>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <form className={styles.officeForm}>
            <div className={styles.field}>
              <input
                className={styles.officeModalInput}
                placeholder="Agrega usuarios en waydo"
              />
            </div>
            <div className={styles.agentSubmitArea}>
              <div className={styles.checkboxControl}>
                <input type="checkbox" />
                <span> Notificar</span>
              </div>
              <div>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => { }}
                  styles={{
                    fontSize: '11px',
                    padding: '7px 10px',
                    borderRadius: '5px',
                  }}
                >
                  <Add style={{ fontSize: '12px' }} />
                  Agregar
                </Button>
              </div>
            </div>
          </form>
          <div className={styles.officeColaborators}>
            <div className={styles.newOfficeHeaderTitles}>
              <h4>Colaboradores</h4>
            </div>
            <div className={styles.colaboratorsContent}>
              {Boolean(typeof colaboratorIndex === "undefined") && (
                <div className={styles.colaboratosTable}>
                  <div className={styles.colaboratorsTableHeader}>
                    <div>
                      <div className={styles.field}>
                        <input
                          className={styles.officeModalInput}
                          placeholder="Busca colaboradores"
                        />
                        <SearchIcon />
                      </div>
                    </div>
                    <div>Estado</div>
                    <div>Publicante</div>
                    <div>Cargo</div>
                    <div></div>
                  </div>
                  <div className={styles.colaboratosTableBody}>
                    {colaborators.map(((colaborator, i) => (
                      <div
                        key={i}
                        className={styles.colaboratosTableItem}
                      >
                        <div className={styles.colaboratorInfo}>
                          <div className={styles.colaboratorAvatar}>
                            <Image
                              src={colaborator.imageSrc}
                              fill
                              alt="colaborator_avatar"
                            />
                          </div>
                          <div>
                            <strong>{`${colaborator.firstName} ${colaborator.lastName}`}</strong>
                            <span>{colaborator.email}</span>
                          </div>
                        </div>
                        <div className={styles.userState}>
                          {colaborator.isVerified
                            ? (<CheckOutlinedIcon
                              style={{
                                color: "#27d838",
                                fontSize: "18px",
                              }}
                            />
                            )
                            : (<AccessTimeOutlinedIcon
                              style={{
                                color: "#ffaa00",
                                fontSize: "18px",
                              }}
                            />
                            )
                          }
                        </div>
                        <div>
                          <select
                            className={styles.formSelect}
                            value={colaborator.isPublisher ? "yes" : "no"}
                          >
                            <option key="yes">Sí</option>
                            <option key="no">No</option>
                          </select>
                        </div>
                        <div>
                          <select
                            className={styles.formSelect}
                            value={colaborator.isPublisher ? "yes" : "no"}
                          >
                            <option key="seller">Vendedor</option>
                            <option key="chief">Gerente</option>
                          </select>
                        </div>
                        <div className={styles.colaboratorActions}>
                          <EditIcon
                            style={{ fontSize: "14px" }}
                            onClick={() => setColaboratorIndex(i)}
                          />
                          <DeleteIcon style={{ fontSize: "14px" }} />
                        </div>
                      </div>
                    )))}
                  </div>
                </div>
              )}

              {colaboratorIndex !== undefined && (
                <div className={styles.colaboratorsEdit}>
                  <div className={styles.colaboratorEditAvatar}>
                    <div className={styles.colaboratorAvatar}>
                      <Image
                        src={colaborators[colaboratorIndex].imageSrc}
                        fill
                        alt="colaborator_avatar"
                      />
                    </div>
                  </div>
                  <div className={styles.colaboratorEditForm}>
                    <div>
                      <div className={styles.field}>
                        <input
                          className={styles.officeModalInput}
                          value={colaborators[colaboratorIndex].firstName}
                          placeholder="Nombre"
                        />
                      </div>
                      <div className={styles.field}>
                        <input
                          className={styles.officeModalInput}
                          placeholder="Apellido"
                          value={colaborators[colaboratorIndex].lastName}
                        />
                      </div>
                    </div>
                    <div className={styles.field}>
                      <input
                        className={styles.officeModalInput}
                        placeholder="Correo"
                        value={colaborators[colaboratorIndex].email}
                      />
                    </div>
                    <div className={styles.colaboratorSelectors}>
                      <div>
                        <select
                          className={styles.colaboratorSelect}
                          value={colaborators[colaboratorIndex].isPublisher ? "yes" : "no"}
                        >
                          <option key="seller">Vendedor</option>
                          <option key="chief">Gerente</option>
                        </select>
                      </div>
                      <div>
                        <select
                          className={styles.colaboratorSelect}
                          value={colaborators[colaboratorIndex].isPublisher ? "yes" : "no"}
                        >
                          <option key="seller">Activo</option>
                          <option key="chief">Inactivo</option>
                        </select>
                      </div>
                    </div>
                    <div className={styles.colaboratorEditSubmit}>
                      <div>
                        <Button size="small">
                          Aplicar
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className={styles.colaboratorEditBack}>
                    <ArrowBackIcon
                      style={{
                        cursor: "pointer",
                        fontSize: '18px',
                      }}
                      onClick={() => setColaboratorIndex(undefined)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ModalZoom>
  );
}