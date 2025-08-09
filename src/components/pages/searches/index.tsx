"use client";

import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import HowToIcon from "@svg/how-to.svg";
import EmptySearchIcon from "@svg/nav/SearchImage.svg";
import SearchIcon from "@svg/Search.svg";
import SearchItem, { SearchItemI } from '../../app/search-item';
import styles from "./searches.module.css";

export default function Searches() {
  const itemImages = [
    "https://www.kbb.com/wp-content/uploads/2022/08/2022-mercedes-amg-eqs-front-left-3qtr.jpg",
    "https://i.ytimg.com/vi/ekgUjyWe1Yc/maxresdefault.jpg",
    "https://www.topgear.com/sites/default/files/cars-car/image/2024/05/14-Lamborghini-Revuelto-review-UK-2024.jpg"
  ]

  const items: SearchItemI[] = Array(3)
    .fill({
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
    .map((item, i) => ({
      ...item,
      images: [itemImages[i]],
      id: i
    }));

  const searchItems = Array(3)
    .fill({
      articleTags: ["Sedan", "Yipeta", "Camioneta"],
      title: "Mi búsqueda de Toyota (350)",
      location: "Distrito Nacional",
      date: new Date(),
      items,
    });

  return (
    <div className={styles.searchesContainer}>
      <div className={styles.header}>
        <h3>Mis búsquedas guardadas</h3>
      </div>

      {!!!searchItems.length && (
        <div className={styles.empty}>
          <div>
            <div className={styles.emptyText}>
              <h3>Aún no tienes búsquedas guardadas</h3>
              <strong>
                Guardar una búsqueda te ayuda a encontrar lo que buscas más rápido.
              </strong>
            </div>
            <div className={styles.emptySteps}>
              <div>
                1. Inicia buscando un artículo
              </div>
              <div
                style={{
                  display: 'flex',
                  flexFlow: 'column',
                  gap: '14px',
                }}
              >
                2. Selecciona guardar búsqueda
                <HowToIcon width="230.022" height="73" />
              </div>
              <div>
                3. Vuelve a tu búsqueda en cualquier momento usando &ldquo;Búsquedas&rdquo;
              </div>
            </div>
          </div>
          <div className={styles.emptyIcon}>
            <EmptySearchIcon />
          </div>
        </div>
      )}

      {!!searchItems.length && (
        <div className={styles.searchListContainer}>
          <div className={styles.listHeader}>
            <div className={styles.filterSearchInput}>
              <SearchIcon />
              <input
                placeholder="Buscar..."
              />
            </div>
            <div className={styles.organizeSearch}>
              <div>
                <UnfoldMoreIcon />
              </div>
              <span>
                Organizar:
              </span>
              <strong>Visto recientemente</strong>
            </div>
          </div>
          <div className={styles.items}>
            {searchItems.map((item, i) => (
              <SearchItem search={item} key={item?.id + i} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}