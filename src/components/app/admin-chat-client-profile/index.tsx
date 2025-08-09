import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import DragHandleOutlinedIcon from '@mui/icons-material/DragHandleOutlined';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import HondaIcon from "@svg/brand-logos/honda.svg";
import LexusIcon from "@svg/brand-logos/lexus.svg";
import ToyotaIcon from "@svg/brand-logos/toyota.svg";
import VerifyIcon from "@svg/VerifyGray.svg";
import classNames from "classnames";
import Image from "next/image";
import { ChatChannel } from "../chat-channel-item";
import styles from "./admin-chat-client-profile.module.css";

type Props = {
  selectedChannel: ChatChannel;
  customClass?: any;
}

export default function AdminChatClientProfile({
  selectedChannel,
  customClass
}: Props) {
  const userHistoryDetails = {
    brands: [
      { icon: <ToyotaIcon /> },
      { icon: <LexusIcon /> },
      { icon: <HondaIcon /> },
    ],
    carTypes: [
      {
        name: "Jeepeta",
        icon: <Image
          src="/assets/img/quick-search/jeepeta.png"
          alt="jeepeta"
          height={40}
          width={70}
        />
      },
      {
        name: "Camioneta",
        icon: <Image
          src="/assets/img/quick-search/truck.png"
          alt="truck"
          height={70}
          width={70}
        />
      },
      {
        name: "Minivan",
        icon: <Image
          src="/assets/img/quick-search/minivan.png"
          alt="minivan"
          height={40}
          width={80}
        />
      },
    ],
    pricesRangeDescription: "$1,200,000 a 1,800,000",
    vehicleInterestPercentage: 85,
    announceViewTimes: 15,
  }

  return (
    <div
      className={classNames([
        styles.chatReceiverProfile,
        customClass || ''
      ])}
    >
      <div className={styles.chatChannelProfileContent}>
        <div className={styles.profileBasicInfo}>
          <div className={styles.chatProfileAvatar}>
            <Image
              src={selectedChannel?.receiverAvatarSrc || ""}
              width={120}
              height={120}
              style={{
                objectFit: 'cover',
              }}
              alt={`chat-user-avatar-${selectedChannel?.id}`}
              quality={100}
            />
            <VerifyIcon className={styles.chatUserVerified} />
          </div>
          <div>
            <h2>{selectedChannel?.name}</h2>
            <span>Usuario desde 26 de marzo 2024</span>
          </div>
        </div>
        <div className={styles.searchHistory}>
          <h2>Historial de búsqueda</h2>

          <div className={styles.historyItems}>
            <span>Marcas</span>
            <div className={styles.historyBrands}>
              {userHistoryDetails.brands.map((brand, i) => (
                <div key={i}>
                  {brand.icon}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.historyItems}>
            <span>Carrocerías</span>
            <div className={styles.historyCarTypes}>
              {userHistoryDetails.carTypes.map((carType, i) => (
                <div key={i}>
                  {carType.icon}
                  <span>{carType.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.historyItems}>
            <span>Rango de precios</span>
            <div className={styles.priceDetails}>
              <strong>{userHistoryDetails.pricesRangeDescription}</strong>
            </div>
          </div>
          <div className={styles.historyItems}>
            <span>Nivel de interés en tu vehículo</span>
            <div className={styles.interestChartWrapper}>
              <div className={styles.interestsBars}>
                <div className={styles.chatUtils}></div>
                <div></div>
              </div>
              <div className={styles.interestPoint}>
                <div><AcUnitOutlinedIcon /></div>
                <span>Bajo</span>
              </div>
              <div className={styles.interestPoint}>
                <div><DragHandleOutlinedIcon /></div>
                <span>Medio</span>
              </div>
              <div className={styles.interestPoint}>
                <div><LocalFireDepartmentIcon /></div>
                <span>Alto</span>
              </div>
            </div>
            <div className={styles.announceCheckQty}>
              <strong>{selectedChannel?.name}</strong>
              <span> ha visto tu anuncio </span>
              <strong>{userHistoryDetails.announceViewTimes} veces</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}