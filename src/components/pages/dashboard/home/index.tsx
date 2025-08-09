"use client";

import AdminAnnouncementItem, {
  AnnouncementItemI,
  AnnouncementStatusEnum,
  statusProps
} from "@components/app/admin-announcement-item";
import AdminOfficeItem from "@components/app/admin-office-item";
import QuickDetails from "@components/app/quick-details";
import ScrollNavigation from "@components/app/scroll-navigation";
import classNames from "classnames";
import styles from "./home.module.css";

export default function AdminHome() {
  const announces: AnnouncementItemI[] = Array(7)
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

  const offices = Array(7).fill(0).map((_, i) => ({
    location: "Santo Domingo",
    officeName: "Mainstream Motors",
    publicationsQty: 43,
    interactionsQty: 830,
    viewQty: 5583,
    agentsQty: 15,
    chiefOfficer: "Juan López",
    id: 'office-item-mock-' + i
  }));

  return (
    <div className={styles.dashboardHome}>
      <div>
        <div className={classNames(["shadow-card", styles.homeAnnounces])}>
          <div className={styles.titleArea}>
            <h1>
              Anuncios | Sucursal Santo Domingo
            </h1>
          </div>
          <ScrollNavigation
            skipOffset={258}
            minWidthPerItem={258}
          >
            {announces.map((item: AnnouncementItemI, i: number) => (
              <AdminAnnouncementItem
                item={item}
                key={item.title.replace(/\s/g, '') + i}
              />
            ))}
          </ScrollNavigation>
        </div>
        <div className={classNames(["shadow-card", styles.homeQuickDetails])}>
          <QuickDetails
            titleContent={(
              <h1>
                Detalles rápidos
              </h1>
            )}
          />
        </div>
      </div>
      <div className={classNames(["shadow-card", styles.homeOffices])}>
        <div className={styles.titleArea}>
          <h1>
            Sucursales
          </h1>
        </div>
        <ScrollNavigation
          skipOffset={407}
          minWidthPerItem={407}
        >
          {offices.map(item => (
            <AdminOfficeItem
              item={item}
              key={item.id}
            />
          ))}
        </ScrollNavigation>
      </div>
    </div>
  );
}