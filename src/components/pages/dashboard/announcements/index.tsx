"use client";

import AdminAnnouncementItem, {
  AnnouncementStatusEnum,
  statusProps
} from '@components/app/admin-announcement-item';
import AdminPagination from '@components/app/admin-pagination';
import {
  AnnouncementActionI,
  AnnouncementItemI
} from '@components/app/announcement-item';
import {
  FilterAnnouncementI
} from '@components/pages/announcements/announcements.interface';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Cactus from "@svg/Captus.svg";
import CheckIcon from "@svg/Check.svg";
import RefreshIcon from "@svg/Refresh.svg";
import SearchIcon from "@svg/Search.svg";
import TrashCanIcon from "@svg/TrashCan.svg";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from "./announcements.module.css";

export default function AdminAnnouncements() {
  const [selectedFilter, setSelectedFilter] = useState(0);
  const router = useRouter();

  const [filters] = useState<FilterAnnouncementI>({
    all: {
      label: "Todos",
      count: 0,
    },
    active: {
      label: "Activos",
      count: 0
    },
    drafs: {
      label: "Borradores",
      count: 0
    },
    inReview: {
      label: "En revision",
      count: 0
    },
    rejected: {
      label: "Rechazados",
      count: 0
    },
    expired: {
      label: "Expirados",
      count: 0
    }
  });

  const actions = [
    {
      name: "Eliminar",
      icon: <TrashCanIcon style={{ height: '17px' }} />,
      isAvailable: true,
      onClick: () => { }
    },
    {
      name: "Impulsar",
      icon: (
        <Image
          src="/assets/img/booster.png"
          alt="Impulsar"
          height={23}
          width={23}
        />
      ),
      isAvailable: true,
      onClick: () => { }
    },
    {
      name: "Republicar",
      icon: <RefreshIcon style={{ height: '16px' }} />,
      isAvailable: true,
      onClick: () => { }
    },
  ];

  const items: AnnouncementItemI[] = Array(7)
    .fill({
      images: [
        "https://www.kbb.com/wp-content/uploads/2022/08/2022-mercedes-amg-eqs-front-left-3qtr.jpg",
        "https://i.ytimg.com/vi/ekgUjyWe1Yc/maxresdefault.jpg",
        "https://www.topgear.com/sites/default/files/cars-car/image/2024/05/14-Lamborghini-Revuelto-review-UK-2024.jpg"
      ],
      title: "AED 2,230 Per Month • MODEL 3 STANDARD",
      brand: "Tesla",
      model: "Model 3",
      price: 10000,
      status: "ACTIVE",
      date: new Date(),
      address: "Ciudad del Almirante, C/ Juan Eulises",
      fuelType: "",
      views: 230,
      features: [
        {
          label: "Año",
          value: "2023",
        },
        {
          label: "Kilometraje",
          value: "47,000 km",
        },
        {
          label: "Combustible",
          value: "Eléctrico",
        },
        {
          label: "Tipo",
          value: "Sedan",
        },
      ]
    })
    .map((item, i) => {
      const statusList: (keyof AnnouncementStatusEnum)[] = [
        'ACTIVE',
        'IN_REVISION',
        'DRAFT',
        'PAUSED',
        'PAYMENT_PENDING',
        'EXPIRED',
        'REFUSED',
      ];

      const status = statusList[i % statusList.length];

      return {
        ...item,
        status,
        statusProps: statusProps[status],
      };
    });

  return (
    <div className={classNames(["shadow-card", styles.announcementsContainer])}>
      <div className={styles.upperFilters}>
        <div className={styles.boxTabList}>
          {Object.keys(filters).map((key, i) => {
            const announcement = filters[key]

            return (
              <div
                key={i}
                className={classNames(
                  styles.list,
                  selectedFilter === i ? styles.listActive : ""
                )}
                onClick={() => setSelectedFilter(i)}
              >
                <span>{announcement.label} ({announcement.count})</span>
              </div>
            )
          })}
        </div>

        <div className={styles.officesDropdown}>
          <div>
            <h2>Sucursal Santo Domingo</h2>
            <KeyboardArrowDownIcon />
          </div>
          <div className={styles.officesDropdownOptions}></div>
        </div>
      </div>

      <div className={styles.announces}>
        {!!!items.length && (
          <div className={styles.empty}>
            <div>
              <Cactus />
            </div>
            <p className={styles.description}>
              <strong >
                Aún no has publicado un anuncio
              </strong>
            </p>
            <button
              className={styles.advertiseNowButton}
              onClick={() => router.push("/posts/create")}
            >
              Anúnciate ahora
            </button>
          </div>
        )}

        {!!items.length && (
          <div className={styles.announcementItemsWrapper}>
            <div className={styles.content}>
              <div className={styles.actionsWrapper}>
                <div className={styles.actions}>
                  {actions.map((action: AnnouncementActionI, i: number) => (
                    <div
                      key={action.name.replace(/\s/g, '') + i}
                      onClick={(ev: React.MouseEvent<HTMLDivElement>) => (
                        action.isAvailable && action?.onClick?.(ev)
                      )}
                      className={action.isAvailable ? styles.actionAvailable : ''}
                    >
                      {action.icon}
                      <span>{action.name}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.searchAndSelect}>
                  <div className={styles.announccementsSearch}>
                    <input placeholder='Escribe el codigo de tu anuncio' />
                    <SearchIcon />
                  </div>
                  <div className={styles.selectAll}>
                    <span>Seleccionar todo</span>
                    <CheckIcon style={{ height: '17px' }} />
                  </div>
                </div>
              </div>

              <div className={styles.items}>
                {items.map((item: AnnouncementItemI, i: number) => (
                  <AdminAnnouncementItem
                    item={item}
                    key={item.title.replace(/\s/g, '') + i}
                    isSelectable
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <AdminPagination />
      </div>
    </div>
  );
}