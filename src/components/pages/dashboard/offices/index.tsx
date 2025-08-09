"use client";

import AdminOfficeItem from "@components/app/admin-office-item";
import AdminPagination from "@components/app/admin-pagination";
import Button from "@components/app/button/app";
import { Add } from "@mui/icons-material";
import TrashIcon from "@svg/TrashCan.svg";
import classNames from "classnames";
import { useState } from "react";
import AddOfficeForm from "./add-office-popup";
import styles from "./offices.module.css";

export type OfficeItemI = {
  location: string;
  officeName: string;
  publicationsQty: number;
  interactionsQty: number;
  viewQty: number;
  agentsQty: number;
  chiefOfficer: string;
  id: string;
  imageSrc?: string;
}

export default function AdminOffices() {
  const [openAddOffice, setOpenAddOffice] = useState(false);

  const offices = Array(7).fill(0).map((_, i) => ({
    location: "Santo Domingo",
    officeName: "Mainstream Motors",
    publicationsQty: 43,
    interactionsQty: 830,
    viewQty: 5583,
    agentsQty: 15,
    chiefOfficer: "Juan López",
    id: 'office-item-mock-' + i
  }));

  return (
    <div className={classNames(["shadow-card", styles.officesContainer])}>
      <div className={styles.header}>
        <div>
          <Button
            variant="outlined"
            onClick={() => setOpenAddOffice(true)}
          >
            <Add style={{ marginRight: "1px" }} />
            Agregar
          </Button>
          <Button
            variant="outlined"
          >
            <TrashIcon
              style={{
                height: "16px",
                marginRight: '6px',
              }}
            />
            Eliminar
          </Button>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.officesList}>
          {offices.map(item => (
            <AdminOfficeItem
              item={item}
              key={item.id}
              isSelectable
            />
          ))}
        </div>
      </div>
      <div className={styles.footer}>
        <AdminPagination />
      </div>
      <AddOfficeForm
        isOpen={openAddOffice}
        onClose={() => setOpenAddOffice(false)}
      />
    </div>
  );
}