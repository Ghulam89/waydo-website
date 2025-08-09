'use client'

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Checkbox } from "@mui/material";
import MapIcon from "@svg/map.svg";
import RedCircleArrowUpIcon from "@svg/RedCircleArrowUp.svg";
import dayjs from "dayjs";
import Image from "next/image";
import { ReactNode } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import styles from "./announcement-item.module.css";

/**
 * TODO:
 * - Move types to single interface file
 */

export type AnnouncementActionI = {
  name: string;
  icon: ReactNode;
  isAvailable: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export type AnnouncementStatusEnum = {
  ACTIVE: 'ACTIVE',
  IN_REVISION: 'IN_REVISION',
  DRAFT: 'DRAFT',
  PAUSED: 'PAUSED',
  PAYMENT_PENDING: 'PAYMENT_PENDING',
  EXPIRED: 'EXPIRED',
  REFUSED: 'REFUSED',
}

export type AnnouncementItemI = {
  images: string[];
  title: string;
  brand: string;
  model: string;
  price: number;
  status: keyof AnnouncementStatusEnum;
  date: Date;
  address: string;
  fuelType: string;
  features: {
    label: string;
    value: string;
  }[];
  views: number;
  statusProps?: {
    name: string;
    color: string;
  }
}

type Props = {
  isSelected?: boolean;
  item: AnnouncementItemI;
  onSelectionChange?: (isSelected: boolean) => void;
}

export const statusProps: Record<keyof AnnouncementStatusEnum, AnnouncementItemI['statusProps']> = {
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

export default function AnnouncementItem({ isSelected, item, onSelectionChange }: Props) {
  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => e.preventDefault();

  const handleCheckItem = (checked: boolean) => {
    onSelectionChange?.(checked);
  }

  return (
    <div className={styles.announcemntItem}>
      <div className={styles.announcementImageSlide}>
        <div className={styles.checkItem}>
          <Checkbox
            checked={isSelected}
            sx={{ color: "transparent" }}
            onChange={(ev) => handleCheckItem(ev.target.checked)}
          />
        </div>
        <AliceCarousel
          disableButtonsControls
          items={item.images.map((src, i) => (
            <div
              key={`announcement-gallery-item-${i}`}
              style={{ height: "500px", width: "100%" }}
            >
              <img
                alt="slide image"
                src={src}
                role="presentation"
                onDragStart={handleDragStart}
                style={{
                  height: "227px",
                  width: "275px",
                  objectFit: "cover"
                }}
              />
            </div>
          ))}
          mouseTracking={true}
        />
      </div>
      <div className={styles.announcementDetails}>
        <div>
          <span>AED 2,230 Per Month • MODEL 3 STANDARD</span>
        </div>
        <div className={styles.announcementItemBrand}>
          <span>
            Tesla
          </span>
          <span>
            •
          </span>
          <span>
            Model 3
          </span>
        </div>
        <div>
          <strong>USD 10,000.00</strong>
        </div>
        <div className={styles.announcementFeatures}>
          {item.features.map((feature, i) => (
            <div key={feature.label.replace(/\s/g, '') + i}>
              <span>{feature.label}</span>
              <span>{feature.value}</span>
            </div>
          ))}
        </div>
        <div className={styles.addressAndDate}>
          <div>
            <MapIcon />
            <span>
              {item.address}
            </span>
          </div>
          <span>
            {dayjs(item.date).format("DD MMMM YYYY")}
          </span>
        </div>
        <div className={styles.statusAndActions}>
          <div
            className={styles.statusBadge}
            style={{
              backgroundColor: item.statusProps?.color || ''
            }}
          >
            {item.statusProps?.name || ''}
          </div>

          {item.status === "ACTIVE" && (
            <div
              style={{
                position: 'relative',
                top: '8px'
              }}
            >
              <Image
                src="/assets/img/fire.png"
                alt="Impulsar"
                height={42}
                width={42}
              />
            </div>
          )}

          {item.status === "ACTIVE" && (
            <div
              style={{
                position: 'relative',
                top: '5px'
              }}
            >
              <Image
                src="/assets/img/booster.png"
                alt="Impulsar"
                height={35}
                width={35}
              />
            </div>
          )}

          {item.status === "ACTIVE" && (
            <div className={styles.views}>
              <div>
                <div className={styles.viewCounter}>
                  <VisibilityIcon style={{ fontSize: '17px' }} />
                  <span>224</span>
                </div>
                <div>
                  <span>Vistas</span>
                  <InfoOutlinedIcon style={{ fontSize: '13px' }} />
                </div>
              </div>
              <div className={styles.getMoreViews}>
                <RedCircleArrowUpIcon style={{ overflow: 'visible' }} />
                <span
                  style={{ whiteSpace: 'nowrap' }}
                >
                  Consigue más vistas
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}