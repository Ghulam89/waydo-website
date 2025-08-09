'use client'

import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Checkbox } from "@mui/material";
import RefreshIcon from "@svg/Refresh.svg";
import InteractionIcon from "@svg/interactions.svg";
import Image from "next/image";
import { ReactNode } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Button from "../button/app";
import styles from "./admin-announcement-item.module.css";

/**
 * TODO:
 * - Move types to single interface file
 * - Discuss about status colors consistency
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
  isSelectable?: boolean;
  item: AnnouncementItemI;
  onSelectionChange?: (isSelected: boolean) => void;
}

export const statusProps: Record<keyof AnnouncementStatusEnum, AnnouncementItemI['statusProps']> = {
  ACTIVE: {
    name: "Activo",
    color: "#27d838",
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
    name: "Acción requerida",
    color: "red",
  },
}

export default function AdminAnnouncementItem({
  isSelected,
  item,
  onSelectionChange,
  isSelectable = false
}: Props) {
  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => e.preventDefault();

  const handleCheckItem = (checked: boolean) => {
    onSelectionChange?.(checked);
  }

  return (
    <div className={styles.announcementItem}>
      <div className={styles.announcementImageSlide}>
        <div className={styles.stateBox}>
          <div>
            {!!isSelectable && (
              <div className={styles.checkItem}>
                <Checkbox
                  checked={isSelected}
                  sx={{ color: "transparent" }}
                  onChange={(ev) => handleCheckItem(ev.target.checked)}
                />
              </div>
            )}
          </div>
          <div>
            <Button
              size="small"
              styles={{
                backgroundColor: item.statusProps?.color,
                padding: '4px 15px',
                borderRadius: "6px",
                fontSize: "0.75rem"
              }}
            >
              {item.statusProps?.name}
            </Button>
          </div>
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
                  height: "150px",
                  width: "234px",
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
          <div className={styles.title}>
            <span>{item.brand} • {item.model}</span>
            <span>
              USD {
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(item.price)
              }
            </span>
          </div>
          <div className={styles.highDemand}>
            <div>
              <Image
                src="/assets/img/fire.png"
                alt="Impulsar"
                fill
              />
            </div>
          </div>
        </div>
        <div className={styles.announcementMetrics}>
          <div>
            <h1>2,000</h1>
            <div>
              <RemoveRedEyeOutlinedIcon
                style={{
                  fontSize: "12px",
                  color: "#232f4a",
                }}
              />
              <span>Vistas</span>
            </div>
          </div>
          <div>
            <h1>100</h1>
            <div>
              <InteractionIcon width={10} />
              <span>Interacciones</span>
            </div>
          </div>
        </div>
        <div className={styles.boostArea}>
          <span>¡Lleva tu anuncio más lejos!</span>
          <div>
            <Image
              src="/assets/img/booster.png"
              alt="Interacciones"
              height={16}
              width={16}
              quality={100}
            />
            <strong>Impulsar</strong>
          </div>
        </div>
        <div className={styles.actions}>
          <div>
            <div className={styles.publicationDate}>
              <span>Publicado:</span>
              <strong> 03 Julio 2024</strong>
              <span> por José Núñez</span>
            </div>
          </div>
          <div>
            <Button
              variant="outlined"
              size="small"
              styles={{
                padding: '8px 6px',
                borderRadius: '6px',
                fontSize: '10px'
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
            <Button
              variant="outlined"
              size="small"
              styles={{
                padding: '8px 6px',
                borderRadius: '6px',
                fontSize: '10px'
              }}
            >
              <RefreshIcon
                style={{
                  height: '13px',
                  marginRight: '4px',
                }}
              />
              <span>
                Republicar
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}