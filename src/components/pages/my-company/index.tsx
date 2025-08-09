'use client'

import AnnouncementItem, {
  AnnouncementItemI,
  statusProps
} from "@components/app/announcement-item";
import Pagination from "@components/app/pagination";
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import ListAltIcon from '@mui/icons-material/ListAlt';
import StarIcon from '@mui/icons-material/Star';
import Captus from "@svg/Captus.svg";
import VerifyBlueIcon from "@svg/VerifyBlue.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./my-company.module.css";

export default function MyCompany() {
  const router = useRouter();

  const companyProfileSrc = "/assets/img/mock/company-profile.png";
  const stars = 4;

  const items: AnnouncementItemI[] = Array(3)
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
      statusProps: statusProps['ACTIVE'],
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
    });

  return (
    <div className={styles.companyContainer}>
      <div className={styles.header}>
        <div>
          <div className={styles.companySlider}>
            <Image
              alt="Company Profile Cover"
              src="/assets/img/mock/company-profile.png"
              fill
            />
            <div
              className={styles.openCompanyAdmin}
              onClick={() => window.open("/dashboard", "_blank")}
            >
              <EditIcon />
            </div>
          </div>
          <div className={styles.companyProfile}>
            <div className={styles.companyAvatar}>
              <div
                style={{
                  backgroundImage: `url(${companyProfileSrc})`
                }}
              />
              <div
                className={styles.openCompanyAdmin}
                onClick={() => window.open("/dashboard", "_blank")}
              >
                <EditIcon />
              </div>
            </div>
            <div>
              <h3>Autoshop <VerifyBlueIcon /></h3>
              <span>Se unió en Junio 2024</span>
            </div>
            <div className={styles.salesAndRate}>
              <div>
                <InfoIcon />
                <span>580 ventas</span>
              </div>
              <div className={styles.stars}>
                {Array(5).fill(0).map((_, i) => (
                  <StarIcon
                    key={i}
                    className={(stars - 1) >= i ? styles.active : ""}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.announcements}>
        <div className={styles.boxTop}>
          <div className={styles.boxTitle}>
            <h3 className={styles.title}>Anuncios</h3>
            <span>|</span>
            <div onClick={() => router.push('/announcements')}>
              <ListAltIcon />
              <span>Administrar mis anuncios</span>
            </div>
          </div>
        </div>
        <div>
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
                  <div className={styles.items}>
                    {items.map((item: AnnouncementItemI, i: number) => (
                      <AnnouncementItem
                        item={item}
                        key={item.title.replace(/\s/g, '') + i}
                      />
                    ))}
                  </div>
                  <div className={styles.pagination}>
                    <Pagination
                      page={0}
                      total={1}
                      onChangePage={() => { }}
                    />
                  </div>
                </div>
                <div className={styles.extraContainer}></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
