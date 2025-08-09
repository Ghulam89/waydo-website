"use client";

import { ObjectI } from "@interfaces/common";
import ChevronUpIcon from "@svg/ChevronUp.svg";
import CogIcon from "@svg/Cog.svg";
import LockIcon from "@svg/Lock.svg";
import UserIcon from "@svg/UserCircle.svg";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import style from "./profile-layout.module.css";

type Props = {
  children: React.ReactNode;
};

const SUB_ITEMS: ObjectI = {
  "/profile/subscriptions": "/profile/account-type",
  "/profile/subscriptions/checkout": "/profile/account-type"
}

export default function Profile({ children }: Props) {
  const router = useRouter();
  const pathName = usePathname();
  const [activePath, setActivePath] = useState("");
  const [activeMenuItemIndex, setActiveMenuItemIndex] = useState(0);

  const menu = [
    {
      name: "Perfil",
      icon: <UserIcon />,
      active: true,
      options: [
        {
          name: "Mi Perfil",
          route: "/profile",
        },
        {
          name: "Mis direcciones",
          route: "/profile/addresses",
        }
      ],
    },
    {
      name: "Cuenta",
      icon: <CogIcon />,
      options: [
        {
          name: "Número de teléfono",
          route: "/profile/phone",
        },
        {
          name: "Tipo de cuenta",
          route: "/profile/account-type"
        },
      ],
    },
    {
      name: "Seguridad",
      icon: <LockIcon />,
      route: "/profile/security",
    },
  ];

  const setMenuItemActive = (itemIndex: number) => {
    const selectedMenuItem = menu[itemIndex];

    if (
      selectedMenuItem.route &&
      !(selectedMenuItem?.options || [])?.length
    ) router.push(menu[activeMenuItemIndex]?.route || "")

    setActiveMenuItemIndex(activeMenuItemIndex === itemIndex ? -1 : itemIndex);
  }

  useEffect(() => {
    const _pathName = SUB_ITEMS[pathName] || pathName
    const itemIndex = menu.findIndex((item) => (item?.options || [])
      ?.map(option => option.route)
      .includes(_pathName)
    );

    setActiveMenuItemIndex(itemIndex);
    setActivePath(_pathName);
  }, [pathName]);

  return (
    <div className={style.profileContainer}>
      <h1>Configuración de perfil</h1>
      <div className={style.contentWrap}>
        <div className={style.aside}>
          <ul className={style.profileOptions}>
            {!!menu.length && menu.map((item, i) => (
              <li
                key={item.name + i}
                onClick={() => setMenuItemActive(i)}
                className={
                  item.route === activePath && !(item?.options || [])?.length
                    ? style.active
                    : ''
                }
              >
                <div className={style.optionsItemContent}>
                  <div className={style.optionIcon}>
                    {item.icon}
                  </div>
                  <div>{item.name}</div>

                  {!!item?.options?.length && (
                    <div>
                      <ChevronUpIcon
                        className={(
                          activeMenuItemIndex === i ||
                          (item?.options || [])?.map(option => option.route).includes(activePath)
                        )
                          ? style.chevronActive
                          : style.chevron
                        }
                      />
                    </div>
                  )}
                </div>
                {!!item?.options?.length && (
                  <ul
                    className={style.subGroup}
                    style={{
                      minHeight: (
                        activeMenuItemIndex === i ||
                        (item?.options || [])?.map(option => option.route).includes(activePath)
                      )
                        //@ts-ignore
                        ? `calc(${(item?.options || []).filter(o => !o.hidden)?.length} * 51px)`
                        : 0
                    }}
                  >
                    {item.options.map((subItem, i) => (
                      <React.Fragment key={subItem.name + i}>

                        {
                          //@ts-ignore
                          !subItem?.hidden && (
                            <li
                              className={subItem.route === activePath ? style.active : ""}
                              onClick={() => router.push(subItem.route)}
                            >
                              {subItem.name}
                            </li>
                          )}
                      </React.Fragment>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className={style.profileContent}>{children}</div>
      </div>
    </div >
  );
}
