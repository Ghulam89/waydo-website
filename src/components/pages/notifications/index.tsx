"use client";

import Bell from "@svg/nav/BellImage.svg";
import styles from "./notifications.module.css";

export default function Notifications() {
  return (
    <div className={styles.notificationsContainer}>
      <div className={styles.header}>
        <h3>Notificaciones</h3>
      </div>
      <div className={styles.empty}>
        <Bell />
        <div className={styles.emptyText}>
          <h3>Aún no tienes notificaciones</h3>
          <p>Aquí verás recomendaciones de anuncios, <br /> noticias de Waydo, etc...</p>
        </div>
      </div>
    </div>
  );
}