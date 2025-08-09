import ChevronLeftIcon from "@svg/ChevronLeft.svg";
import ChevronRightIcon from "@svg/ChevronRight.svg";
import PreviousFirstIcon from "@svg/FirstPrevious.svg";
import styles from "./admin-pagination.module.css";

export default function AdminPagination() {
  return (
    <div className={styles.dashboardPagination}>
      <div className={styles.paginationHomeBtn}>
        <PreviousFirstIcon width={11} />
        <span>Volver a la página 01</span>
      </div>
      <div className={styles.paginationNav}>
        <div>
          <ChevronLeftIcon width={9} />
        </div>
        <div>
          <ChevronRightIcon width={9} />
        </div>
      </div>
      <div className={styles.paginationInfo}>
        <span>Página</span>
        <div>04</div>
        <span>de 05</span>
      </div>
    </div>
  )
}