"use client";

import AdminPagination from "@components/app/admin-pagination";
import Button from "@components/app/button/app";
import { Check, Close } from "@mui/icons-material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CachedIcon from '@mui/icons-material/Cached';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorIcon from '@mui/icons-material/Error';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckIcon from "@svg/Check.svg";
import ClockIcon from "@svg/Clock.svg";
import SearchIcon from "@svg/Search.svg";
import UserPlusIcon from "@svg/UserPlus.svg";
import Tippy from "@tippyjs/react";
import classNames from "classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ReactNode, useRef, useState } from "react";
import styles from "./notifications.module.css";

dayjs.extend(relativeTime);

export interface ItemFilterNotificationsI {
  label: string;
  count: number;
  active?: boolean;
}

export interface FilterNotificationsI {
  [key: string]: ItemFilterNotificationsI;
}

type notificationTypeName = "user-related"
  | "warning"
  | "approval"
  | "sync"
  | "awaiting"
  | "error";

type NotificationTypeI = {
  backgroundColor: string;
  icon: ReactNode;
}

type NotificationItemI = {
  content: ReactNode;
  date: Date;
  notificationType: notificationTypeName;
}

export default function AdminNotifications() {
  const [selectedFilter, setSelectedFilter] = useState(0);
  const tippyRef = useRef<any>(null);

  const [filters] = useState<FilterNotificationsI>({
    all: {
      label: "Todas",
      count: 0,
    },
    active: {
      label: "No leídas",
      count: 0
    },
  });

  const notificationTypeProps: Record<notificationTypeName, NotificationTypeI> = {
    "user-related": {
      backgroundColor: "#808aff33",
      icon: <UserPlusIcon
        style={{
          color: "#808aff",
          width: "17px"
        }}
      />
    },
    "warning": {
      backgroundColor: "#ffca8333",
      icon: <ErrorIcon style={{ color: "#ffca83" }} />,
    },
    "approval": {
      backgroundColor: "#4ad991",
      icon: (
        <CheckIcon
          className={styles.notificationCheckIcon}
          style={{ width: '17px' }}
        />
      )
    },
    "sync": {
      backgroundColor: "#4ad99133",
      icon: <CachedIcon style={{ color: "#4ad991" }} />
    },
    "awaiting": {
      backgroundColor: "#b4b4c633",
      icon: <ClockIcon
        style={{
          color: "#b4b4c6",
          width: '22px',
          position: 'relative',
          left: '3px',
        }}
      />
    },
    "error": {
      backgroundColor: "#ff728533",
      icon: <CancelIcon style={{ color: "#ff7285" }} />,
    },
  }

  const notifications: NotificationItemI[] = [
    {
      notificationType: "user-related",
      content: (
        <div>
          <strong>Franky</strong>
          <span> te dejó un mensaje en tu anuncio</span>
          <strong> &quot;Toyota | Corolla | 2023 | $1,200,000 | Gris&quot;</strong>
        </div>
      ),
      date: new Date(new Date().setMinutes(0)),
    },
    {
      notificationType: "warning",
      content: (
        <div>
          <span>Tu anuncio </span>
          <strong>&quot;Toyota | Corolla | 2023 | $1,200,000 | Gris&quot;</strong>
          <span> está a punto de vencer</span>
        </div>
      ),
      date: new Date(new Date().setMinutes(0)),
    },
    {
      notificationType: "approval",
      content: (
        <div>
          <span>Tu anuncio </span>
          <strong>&quot;Toyota | Corolla | 2023 | $1,200,000 | Gris&quot;</strong>
          <span> ha sido aprobado</span>
        </div>
      ),
      date: new Date(new Date().setMinutes(0)),
    },
    {
      notificationType: "sync",
      content: (
        <div>
          <span>Tu anuncio </span>
          <strong>&quot;Toyota | Corolla | 2023 | $1,200,000 | Gris&quot;</strong>
          <span> ha sido republicado con éxito</span>
        </div>
      ),
      date: new Date(new Date().setMinutes(0)),
    },
    {
      notificationType: "awaiting",
      content: (
        <div>
          <span>Tu anuncio</span>
          <strong>&quot;Toyota | Corolla | 2023 | $1,200,000 | Gris&quot;</strong>
          <span> se encuentra en revisión, te avisaremos cuando se aprobado</span>
        </div>
      ),
      date: new Date(new Date().setMinutes(0)),
    },
    {
      notificationType: "error",
      content: (
        <div>
          <span>Tu anuncio </span>
          <strong>&quot;Toyota | Corolla | 2023 | $1,200,000 | Gris&quot;</strong>
          <span> ha sido rechazado</span>
        </div>
      ),
      date: new Date(new Date().setMinutes(0)),
    },
  ]

  return (
    <div className={classNames(["shadow-card", styles.dashboardNotifications])}>
      <div className={styles.notificationsHeader}>
        <div className={styles.boxTabList}>
          {Object.keys(filters).map((key, i) => {
            const announcement = filters[key];

            return (
              <div
                key={i}
                className={classNames(
                  styles.list,
                  selectedFilter === i ? styles.listActive : ""
                )}
                onClick={() => setSelectedFilter(i)}
              >
                <span>{announcement.label}</span>
              </div>
            );
          })}
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
        {notifications.map((notification, i) => (
          <div key={i}>
            <div
              className={styles.itemIcon}
              style={{
                backgroundColor: notificationTypeProps[
                  notification.notificationType
                ].backgroundColor
              }}
            >
              {notificationTypeProps[notification.notificationType].icon}
            </div>
            <div className={styles.itemName}>
              <div>
                {notification.content}
              </div>
              <div>
                {dayjs(notification.date).fromNow()}
              </div>
            </div>
            <div className={styles.notificationDropdown}>
              <Tippy
                interactive
                trigger="click"
                arrow
                placement="bottom-start"
                animation="shift-away"
                maxWidth={"auto"}
                onCreate={(intance) => tippyRef.current = intance}
                className={styles.modalWrapper}
                content={
                  <div className={styles.notificationDropdownModal}>
                    <div className={styles.dropdownItem}>
                      <div className={styles.dropdownIcon}>
                        <Check />
                      </div>
                      <span>
                        Marcar como no leida
                      </span>
                    </div>
                    <div className={styles.dropdownItem}>
                      <div className={styles.dropdownIcon}>
                        <Close />
                      </div>
                      <span>
                        Eliminar esta notificación
                      </span>
                    </div>
                  </div>
                }
              >
                <MoreHorizIcon
                  style={{
                    color: "#c4c4c4",
                    fontSize: "30px",
                  }}
                />
              </Tippy>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.notificationsFooter}>
        <AdminPagination />
      </div>
    </div>
  );
}