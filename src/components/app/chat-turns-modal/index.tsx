'use client';

import ModalZoom from "@components/app/modal/zoom";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Close } from "@mui/icons-material";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Image from "next/image";
import { useEffect, useState } from "react";
import DragSortZone from "../drag-sort-zone";
import styles from "./chat-turns-modal.module.css";

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
  isOpen?: boolean;
  onClose?: () => void;
}

enum AgentPositionE {
  CHIEF = "CHIEF",
  SELLER = "SELLER",
}

type ColaboratorItem = {
  imageSrc: string;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
  isPublisher: boolean;
  position: AgentPositionE;
  reasignationTime: string;
  ableToChat: boolean;
  id: number;
}

export default function ChatTurnsModal({
  onClose,
  isOpen = false
}: Props) {
  const [colaboratorIndex, setColaboratorIndex] = useState<number | undefined>();
  const [colaborators, setColaborators] = useState<ColaboratorItem[]>([]);
  const [orderList, setOrderList] = useState<(string | number)[]>([1, 2, 3]);

  useEffect(() => {
    setColaborators([
      {
        imageSrc: "https://i.pravatar.cc/130",
        firstName: "Juan",
        lastName: "Loopez",
        email: "juan_lopez@gmail.com",
        isVerified: true,
        isPublisher: false,
        position: AgentPositionE.CHIEF,
        reasignationTime: "1 minute",
        ableToChat: true,
        id: 1,
      },
      {
        imageSrc: "https://i.pravatar.cc/130",
        firstName: "Jorge",
        lastName: "Perito",
        email: "juan_lopez@gmail.com",
        isVerified: false,
        isPublisher: false,
        position: AgentPositionE.SELLER,
        reasignationTime: "2 minutos",
        ableToChat: false,
        id: 2,
      },
      {
        imageSrc: "https://i.pravatar.cc/130",
        firstName: "Marina",
        lastName: "Parra",
        email: "juan_lopez@gmail.com",
        isVerified: true,
        isPublisher: false,
        position: AgentPositionE.SELLER,
        reasignationTime: "1 minute",
        ableToChat: true,
        id: 3,
      },
    ]);
  }, []);

  const handleClose = () => {
    onClose?.();
  };

  const handleTurnPositions = (newOrderList: (number | string)[]) => {
    const list: ColaboratorItem[] = [];

    newOrderList.forEach((colaboratorOrderId) => {
      const item = colaborators.find(item => item.id === colaboratorOrderId);
      list.push(item!);
    });

    setOrderList(newOrderList);
    setColaborators(list);
  }

  return (
    <ModalZoom show={isOpen} onClose={handleClose}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.boxClose}>
            <Close onClick={handleClose} />
          </div>
          <div className={styles.newOfficeHeader}>
            <div className={styles.newOfficeHeaderTitles}>
              <h3>Turnos de atención y reasignación de clientes</h3>
              <span>Configura quien atiende a tus clientes y el tiempo de respuesta de cada vendedor.</span>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.officeColaborators}>
            <div className={styles.colaboratorsContent}>
              <div className={styles.colaboratosTable}>
                <div className={styles.colaboratorsTableHeader}>
                  <div></div>
                  <div></div>
                  <div>Reasignación</div>
                  <div>Chatea</div>
                  <div>Rol</div>
                  <div></div>
                </div>
                <div className={styles.colaboratosTableBody}>
                  <DragSortZone
                    orderList={orderList}
                    onChange={handleTurnPositions}
                    childrenItems={colaborators.map(((colaborator, i) => (
                      <div
                        key={i}
                        className={styles.colaboratosTableItem}
                      >
                        <div className={styles.colaboratorOrder}>
                          <div>
                            {i + 1}
                          </div>
                        </div>
                        <div className={styles.colaboratorInfo}>
                          <div className={styles.colaboratorAvatar}>
                            <Image
                              src={colaborator?.imageSrc || ""}
                              fill
                              alt="colaborator_avatar"
                            />
                          </div>
                          <div>
                            <strong>{`${colaborator.firstName} ${colaborator.lastName}`}</strong>
                            <span>{colaborator.email.substring(0, 11)}...</span>
                          </div>
                        </div>
                        <div className={styles.userState}>
                          <div>
                            {colaborator.reasignationTime}
                            <FontAwesomeIcon icon={faSort} />
                          </div>
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
                          {colaborator.position === AgentPositionE.CHIEF ? "Gerente" : "Vendedor"}
                        </div>
                        <div className={styles.colaboratorActions}>
                          <DragIndicatorIcon style={{ fontSize: "14px" }} />
                        </div>
                      </div>
                    )))}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalZoom>
  );
}