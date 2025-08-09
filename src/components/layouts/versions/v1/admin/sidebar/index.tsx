"use client";

import DirectionsCarFilledIcon from "@svg/dashboard-sidebar/car.svg";
import HomeIcon from "@svg/dashboard-sidebar/home.svg";
import MegaphoneIcon from "@svg/dashboard-sidebar/megaphone.svg";
import CommentIcon from "@svg/dashboard-sidebar/my-chats.svg";
import NotificationsIcon from "@svg/dashboard-sidebar/my-notifications.svg";
import PersonPinCircleIcon from "@svg/dashboard-sidebar/position.svg";
import SettingsIcon from "@svg/dashboard-sidebar/settings.svg";
import BarChartIcon from "@svg/dashboard-sidebar/stats.svg";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import styles from "./sidebar.module.css";

type RouteItem = {
  route: string;
  icon: ReactNode;
}

export default function DashboardSidebarV1() {
  const router = useRouter();
  const pathName = usePathname();

  const upperItems: RouteItem[] = [
    {
      route: "/dashboard",
      icon: <HomeIcon />,
    },
    {
      route: "/dashboard/announcements",
      icon: <MegaphoneIcon />,
    },
    {
      route: "/dashboard/chat",
      icon: <CommentIcon />,
    },
    {
      route: "/dashboard/offices",
      icon: <PersonPinCircleIcon />,
    },
    {
      route: "/dashboard/notifications",
      icon: <NotificationsIcon />,
    },
    {
      route: "/dashboard/cars",
      icon: <DirectionsCarFilledIcon width={22} />,
    },
    {
      route: "/dashboard/stats",
      icon: <BarChartIcon />,
    },
  ]

  const lowerItems: RouteItem[] = [
    {
      route: "/dashboard/settings",
      icon: <SettingsIcon />,
    },
  ]

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <Image
          src="/assets/img/logo.png"
          alt="logo"
          width={40}
          height={40}
        />
      </div>
      <div className={styles.sidebarOptions}>
        <div className={styles.upperOptions}>
          {upperItems.map((item, i) => (
            <div
              key={i}
              className={item?.route === pathName ? styles.active : ''}
              onClick={() => router.push(item.route)}
            >
              {item.icon}
            </div>
          ))}
        </div>
        <div className={styles.lowerOptions}>
          {lowerItems.map((item, i) => (
            <div
              key={i}
              className={item?.route === pathName ? styles.active : ''}
              onClick={() => router.push(item.route)}
            >
              {item.icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}