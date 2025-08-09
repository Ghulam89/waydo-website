"use client";

import AdminPagination from "@components/app/admin-pagination";
import Button from "@components/app/button/app";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SyncIcon from '@mui/icons-material/Sync';
import SearchIcon from "@svg/Search.svg";
import TrashIcon from "@svg/TrashCan.svg";
import classNames from "classnames";
import Image from "next/image";
import { MouseEvent } from "react";
import DataTable, { TableColumn } from 'react-data-table-component';
import styles from "./inventory.module.css";

type InventoryItemI = {
  imageSrc: string;
  brand: string;
  model: string;
  version: string;
  year: string;
  price: string;
  publicationDate: string;
  visits: number;
  isActive: boolean;
  id: string;
}

export default function AdminInventory() {
  const columns: TableColumn<InventoryItemI>[] = [
    {
      name: <strong>Código</strong>,
      selector: row => row?.id,
      sortable: true,
      format: (row) => (
        <div className={styles.itemCarImageAndId}>
          <Image
            height={40}
            width={55}
            alt={"Item-Avatar"}
            src={row.imageSrc}
            style={{ borderRadius: '3px' }}
          />
          <span>{row.id}</span>
        </div>
      )
    },
    {
      name: <strong>Marca</strong>,
      selector: row => row?.brand,
      sortable: true,
      width: "90px",
    },
    {
      name: <strong>Modelo</strong>,
      selector: row => row?.model,
      sortable: true,
      width: "90px",
    },
    {
      name: <strong>Versión</strong>,
      selector: row => row?.version,
      sortable: true,
      width: "90px",
    },
    {
      name: <strong>Año</strong>,
      selector: row => row?.year,
      sortable: true,
      width: "90px",
    },
    {
      name: <strong>Precio</strong>,
      selector: row => row?.price,
      sortable: true,
      width: "130px",
    },
    {
      name: <strong>Fecha publicación</strong>,
      selector: row => row.publicationDate,
      sortable: true,
      width: "130px",
    },
    {
      name: <strong>Visitas</strong>,
      selector: row => (row?.visits || 0)?.toLocaleString(),
      sortable: true,
      width: "90px",
    },
    {
      name: <strong>Estado</strong>,
      selector: row => row.isActive,
      format: row => (
        <div
          className={classNames([
            styles.itemActiveBadge,
            row.isActive ? styles.isActive : ''
          ])}
        >
          {row.isActive ? "Activo" : "Expirado"}
        </div>
      ),
      sortable: true,
    },
    {
      selector: row => row?.year,
      format: row => {
        const buttons = [
          {
            icon: <SyncIcon style={{ height: 18, color: '#4ad991' }} />,
            onClick: (ev: MouseEvent) => { },
            buttonActive: !row.isActive,
          },
          {
            icon: <Image
              src="/assets/img/booster.png"
              alt="Interacciones"
              height={18}
              width={18}
              quality={100}
            />,
            onClick: (ev: MouseEvent) => { },
            buttonActive: row.isActive,
          },
          {
            icon: <TrashIcon style={{ width: "15px" }} />,
            onClick: (ev: MouseEvent) => { },
            buttonActive: true,
          },
          {
            icon: <FontAwesomeIcon
              icon={faPenToSquare}
              style={{ fontSize: '14px', color: '#15223f' }}
            />,
            onClick: (ev: MouseEvent) => { },
            buttonActive: true,
          },
        ];

        return (
          <div className={styles.itemActions}>
            {buttons.map((btn, i) => (
              <button
                key={i}
                className={btn.buttonActive ? '' : styles.inactive}
                onClick={(ev) => btn?.onClick?.(ev)}
              >
                {btn.icon}
              </button>
            ))}
          </div>
        );
      },
      sortable: true,
    },
  ];

  const data = Array(10)
    .fill({
      imageSrc: '/assets/img/mock/featured/1.png',
      brand: "Toyota",
      model: "Corolla",
      version: "LX",
      publicationDate: new Date().toLocaleDateString(),
      isActive: true,
    })
    .map((item, i) => ({
      ...item,
      visits: Math.round(Math.random() * 10000),
      price: `RD$${(Math.round(Math.random() * 1200000).toLocaleString())}`,
      id: Math.random().toString().slice(12) + i,
      isActive: Boolean(i % 2),
      year: 2000 + i
    }));

  const handleToggleSelectAll = () => {
    // HANDLE SELECT ALL
  }

  const handleRepublicateAllInactive = () => {
    // HANDLE SELECT ALL
  }

  return (
    <div className={classNames(["shadow-card", styles.dashboardNotifications])}>
      <div className={styles.inventoryHeader}>
        <div className={styles.boxTabList}>
          <div
            className={classNames(styles.list, styles.listActive)}
            onClick={() => handleToggleSelectAll()}
          >
            <span>Seleccionar todo</span>
          </div>
          <button
            className={styles.republicateButton}
            onClick={() => handleRepublicateAllInactive()}
          >
            <SyncIcon style={{ height: 18 }} />
          </button>
        </div>

        <div className={styles.notificationSearchInputs}>
          <div className={styles.notificationsSearchInput}>
            <input placeholder='Buscar' />
            <SearchIcon />
          </div>
          <div className={styles.notificationsSearchInput}>
            <input placeholder='Rango de fechas' />
            <CalendarTodayIcon />
          </div>
        </div>

        <div className={styles.notificationSearchInputs}>
          <Button
            size="small"
            styles={{
              backgroundColor: "#24acd4",
              color: "white",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              padding: "2px 25px",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            <span>Exportar búsqueda</span>
            <ArrowDropDownIcon />
          </Button>
        </div>

        <div className={styles.officesDropdown}>
          <div>
            <h2>Sucursal Santo Domingo</h2>
            <KeyboardArrowDownIcon />
          </div>
          <div className={styles.officesDropdownOptions}></div>
        </div>
      </div>
      <div className={styles.notificationsContent}>
        <DataTable<InventoryItemI>
          columns={columns}
          data={data}
          selectableRows
          onSelectedRowsChange={() => { }}
        />
      </div>
      <div className={styles.notificationsFooter}>
        <AdminPagination />
      </div>
    </div>
  );
}