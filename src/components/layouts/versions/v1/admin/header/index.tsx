"use client";

import WalletModal from "@components/app/dashboard/wallet-modal";
import { useAppDispatch } from "@redux/hooks";
import { useGetUserInfoV1Query } from "@redux/rtk/server/v1/me";
import { updateLayout } from "@redux/slices/layout";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import styles from "./header.module.css";

type RouteProps = {
  title: string;
  subTitle: string;
}

type RoutePropsObject = Record<string, RouteProps>;

export default function DashboardHeaderV1() {
  const { data } = useGetUserInfoV1Query({});
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [currentRoute, setCurrentRoute] = useState<RouteProps>();
  const pathName = usePathname();

  const routeProps: RoutePropsObject = {
    '/dashboard': {
      title: "Dashboard",
      subTitle: "Resumen de estado de tus actividades comerciales."
    },
    '/dashboard/announcements': {
      title: "Anuncios",
      subTitle: "Publica y configura tus anuncios."
    },
    '/dashboard/chat': {
      title: "Chats",
      subTitle: "Conversa con tus clientes."
    },
    '/dashboard/offices': {
      title: "Sucursales",
      subTitle: "Administra las localidades de tu negocio."
    },
    '/dashboard/notifications': {
      title: "Notificaciones",
      subTitle: "Mira que hay de nuevo."
    },
    '/dashboard/cars': {
      title: "Inventario",
      subTitle: "Administra tu inventario de vehiculos"
    },
    '/dashboard/stats': {
      title: "Estadísticas",
      subTitle: "Resumen de estado de tus actividades comerciales."
    },
  }

  const handleGoPost = useCallback(() => {
    if (!data) {
      return dispatch(
        updateLayout({
          showModalAuth: true,
        })
      );
    }

    router.push("/posts/create");
  }, [!data]);

  useEffect(() => {
    pathName && setCurrentRoute(routeProps[pathName]);
  }, [pathName]);

  return (
    <div className={styles.dashboardHeader}>
      <div className={styles.sectionTitle}>
        <h1>{currentRoute?.title || 'Dashboard'}</h1>
        <label>{currentRoute?.subTitle || ''}</label>
      </div>
      <div className={styles.headerOptions}>
        <div className={styles.companyMetrics}>
          <div className={styles.companyPlan}>
            <div>
              <label>Plan:</label>
              <div className={styles.companyMetricsPlan}>Standard</div>
            </div>
            <div>
              <h4>24</h4>
              <label>Tickets</label>
            </div>
          </div>
          <div>
            <label>Vencimiento:</label>
            <h3>15 días</h3>
          </div>
          <div>
            <label>Tickets:</label>
            <h3>12</h3>
          </div>
          <div>
            <label>Vehículos:</label>
            <h3>32</h3>
          </div>
          <div>
            <label>Interacciones:</label>
            <h3>255,486</h3>
          </div>
          <div>
            <label>Vistas:</label>
            <h3>896</h3>
          </div>
        </div>
        <WalletModal />
        {/* <div className={styles.companyWallet}>
          <WalletIcon />
          <span>Billetera</span>
        </div> */}
        <div className={styles.companyAvatar}>
          <div>
            <Image src={data?.profileSrc || ""} alt="company-logo" height={200} width={200} />
          </div>
        </div>
        <div className={styles.boxButtonPost}>
          <button onClick={handleGoPost}>
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
}