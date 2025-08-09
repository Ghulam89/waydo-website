'use client'

import Pagination from "@components/app/pagination";
import { useAppDispatch } from "@redux/hooks";
import { toggleModal } from "@redux/slices/user-verification-modal";
import Captus from "@svg/Captus.svg";
import PauseIcon from "@svg/Pause.svg";
import PlayIcon from "@svg/Play.svg";
import TrashCanIcon from "@svg/TrashCan.svg";
import VerifyBlue from "@svg/VerifyBlue.svg";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AnnouncementItem, {
  AnnouncementActionI,
  AnnouncementItemI,
  AnnouncementStatusEnum
} from "../../app/announcement-item";
import { FilterAnnouncementI } from "./announcements.interface";
import styles from "./announcements.module.css";

export default function AnnouncementComponent() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState(0);

  const [filters] = useState<FilterAnnouncementI>({
    all: {
      label: "Todos",
      count: 0,
    },
    active: {
      label: "Activos",
      count: 0
    },
    paused: {
      label: "Pausados",
      count: 0
    },
    drafs: {
      label: "Borradores",
      count: 0
    },
    pendingPayment: {
      label: "Pendiente de pago",
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

  const statusProps: Record<keyof AnnouncementStatusEnum, AnnouncementItemI['statusProps']> = {
    ACTIVE: {
      name: "Activo",
      color: "red",
    },
    IN_REVISION: {
      name: "En revisión",
      color: "#ffaa00",
    },
    DRAFT: {
      name: "Borrador",
      color: "#97de7d",
    },
    PAUSED: {
      name: "Pausado",
      color: "#43587c",
    },
    PAYMENT_PENDING: {
      name: "Pendiente de pago",
      color: "#7fb2c1",
    },
    EXPIRED: {
      name: "Expirado",
      color: "#a4a4a4",
    },
    REFUSED: {
      name: "Rechazado",
      color: "#a68d5c",
    },
  }

  const actions = [
    {
      name: "Eliminar",
      icon: <TrashCanIcon style={{ height: '21px' }} />,
      isAvailable: true,
      onClick: () => { }
    },
    {
      name: "Pausar",
      icon: <PauseIcon style={{ height: '21px' }} />,
      isAvailable: true,
      onClick: () => { }
    },
    {
      name: "Impulsar",
      icon: (
        <Image
          src="/assets/img/booster.png"
          alt="Impulsar"
          height={28}
          width={28}
        />
      ),
      isAvailable: true,
      onClick: () => { }
    },
    {
      name: "Activar",
      icon: <PlayIcon style={{ height: '21px' }} />,
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
    <div className={styles.announcementsContainer}>
      <div className={styles.boxTop}>
        <div className={styles.boxTitle}>
          <h1 className={styles.title}>Mis anuncios</h1>
        </div>
        <div>
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
        </div>
      </div>
      <div>
        <div className={styles.containerVerify}>
          <div className={styles.boxVerifyIcon}>
            <VerifyBlue />
          </div>
          <div className={styles.boxInfoVerify}>
            <h5>Vuelvete un usuario verificado</h5>
            <p>Consigue más visibilidad | Aumenta tu credibilidad</p>
          </div>
          <div>
            <button
              className={styles.buttonStart}
              onClick={() => dispatch(toggleModal(true))}
            >Iniciar</button>
          </div>
        </div>
        <div className={styles.body}>

          {!!!items.length && (
            <div className={styles.empty}>
              <div>
                <Captus />
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
                <div className={styles.items}>
                  {items.map((item: AnnouncementItemI, i: number) => (
                    <AnnouncementItem item={item} key={item.title.replace(/\s/g, '') + i} />
                  ))}
                </div>
                <div className={styles.pagination}>
                  <Pagination page={0} total={1} onChangePage={() => { }} />
                </div>
              </div>
              <div className={styles.extraContainer}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
