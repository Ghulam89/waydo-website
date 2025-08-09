import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { UserV1I } from "@redux/rtk/server/v1/me/me.interfaces";
import classNames from "classnames";
import Image from "next/image";
import { useState } from 'react';
import ChatTurnsModal from '../chat-turns-modal';
import styles from "./admin-chat-profile.module.css";

type Props = {
  user: UserV1I;
  showTurnsButton?: boolean;
}

export default function AdminChatProfile({ user, showTurnsButton = false }: Props) {
  const [turnsModalOpen, setTurnsModalOpen] = useState(false);

  return (
    <div className={styles.chatProfile}>
      <div className={styles.profileAvatar}>
        <div>
          {user?.profileSrc && (
            <Image
              src={user?.profileSrc || ""}
              width={70}
              height={70}
              style={{
                objectFit: 'cover',
              }}
              alt={`admin-avatar-${user?.uuid}`}
              quality={100}
            />
          )}
        </div>
        <div className={styles.chatChannelAvailabilityLight}></div>
      </div>
      <div className={styles.profileName}>
        <h3>
          Mainstream Motors LLC

          {showTurnsButton && (
            <SettingsOutlinedIcon
              className={styles.chatConfig}
              onClick={() => setTurnsModalOpen(true)}
            />
          )}
        </h3>
        <div className={styles.smallDropdown}>
          <strong>Sucursal Santo Domingo</strong>
          <KeyboardArrowDownIcon />
        </div>
        <div className={classNames([styles.smallDropdown, styles.statusDropdown])}>
          <strong>Online</strong>
          <KeyboardArrowDownIcon />
        </div>
      </div>
      <ChatTurnsModal
        isOpen={turnsModalOpen}
        onClose={() => setTurnsModalOpen(false)}
      />
    </div>
  )
}