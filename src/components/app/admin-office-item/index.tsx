import AddAgentForm from "@components/pages/dashboard/offices/add-agent-popup";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Add } from "@mui/icons-material";
import DirectionsCarFilledIcon from "@svg/dashboard-sidebar/car.svg";
import Image from "next/image";
import { useState } from "react";
import Button from "../button/app";
import styles from "./admin-office-item.module.css";

export type OfficeItem = {
  location: string;
  officeName: string;
  publicationsQty: number;
  interactionsQty: number;
  viewQty: number;
  agentsQty: number;
  chiefOfficer: string;
  id: string;
}

type Props = {
  item: OfficeItem;
  isSelectable?: boolean;
}

export default function AdminOfficeItem({ item, isSelectable = false }: Props) {
  const [addAgentModalOpen, setAddAgentModalOpen] = useState(false);

  return (
    <div
      key={item.id}
      className={styles.officeItem}
    >
      <div className={styles.itemHead}>
        {isSelectable && (
          <div>
            <input type="checkbox" />
          </div>
        )}
        <div className={styles.officeInfo}>
          <Image
            src="/assets/img/honda-dealer-office.png"
            height={50}
            width={60}
            alt="Office-Logo"
          />
          <div>
            <h3>{item.location}</h3>
            <span>{item.officeName}</span>
          </div>
        </div>
        <div>
          <div>
            <Button
              variant="outlined"
              size="small"
              styles={{
                fontSize: "11px",
                padding: "9px 12px",
                borderRadius: '6px'
              }}
            >
              <FontAwesomeIcon
                icon={faPenToSquare}
                style={{ marginRight: '4px' }}
              />
              <span>
                Editar
              </span>
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.itemContent}>
        <div className={styles.itemPublishQty}>
          <h1>
            {item.publicationsQty}
          </h1>
          <div>
            <DirectionsCarFilledIcon />
            <span>Vehículos publicados</span>
          </div>
        </div>
        <div className={styles.viewsAndInteractions}>
          <div>
            <span>Interacciones</span>
            <h2>{item.interactionsQty?.toLocaleString()}</h2>
          </div>
          <div>
            <span>Vistas</span>
            <h2>{item.viewQty?.toLocaleString()}</h2>
          </div>
        </div>
        <div className={styles.officePersonel}>
          <div className={styles.agentsCounter}>
            <div>
              <h2>{item.agentsQty}</h2>
              <span>Agentes</span>
            </div>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setAddAgentModalOpen(true)}
            >
              <Add
                style={{
                  marginRight: "1px",
                  fontSize: '15px'
                }}
              />
              Agregar
            </Button>
          </div>
          <div>
            <span>Gerente:</span>
            <strong>{item.chiefOfficer}</strong>
          </div>
        </div>
      </div>
      <AddAgentForm
        office={item}
        isOpen={addAgentModalOpen}
        onClose={() => setAddAgentModalOpen(false)}
      />
    </div>
  )
}