import EastIcon from "@mui/icons-material/East";
import Link from "next/link";
import style from "./account-type.module.css";

export default function AccountType() {
  return (
    <div className={style.accountType}>
      <div className={style.header}>
        <h3>Tipo de cuenta</h3>
        <p>
          Puedes cambiar el tipo de cuenta de acuerdo a tus necesidades de
          publicación, puedes cambiar el tipo de cuenta en cualquier momento
          desde la configuración de tu perfil.
        </p>
        <p>
          Con una cuenta de Dealer puedes acceder a estadísticas sobre tus
          anuncios, planes y muchas otras opciones exclusivas.
        </p>
      </div>
      <div className={style.content}>
        <Link href="/profile/subscriptions">
          <div className={style.changePlan}>
            <span>Cambiar a cuenta de Dealer</span>
            <EastIcon className={style.arrowIcon} />
          </div>
        </Link>
      </div>
    </div>
  );
}
