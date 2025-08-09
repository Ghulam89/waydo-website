import { Close } from "@mui/icons-material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useGetUserInfoV1Query } from "@redux/rtk/server/v1/me";
import OmniChatBubble from "@svg/OmniChatBubble.svg";
import Tippy from "@tippyjs/react";
import classNames from "classnames";
import Image from "next/image";
import { useRef, useState } from "react";
import AdminActiveChats from "../admin-active-chats";
import AdminChatClientProfile from "../admin-chat-client-profile";
import AdminChatMessages from "../admin-chat-messages";
import AdminChatProfile from "../admin-chat-profile";
import { ChatChannel } from "../chat-channel-item";
import styles from "./chat-modal.module.css";

export default function ChatModal() {
  const tippyRef = useRef<any>(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [activeViewIndex, setActiveViewIndex] = useState(0);
  const { data } = useGetUserInfoV1Query({});
  const [selectedChannel, setSelectedChannel] = useState<ChatChannel>();

  const handleSelectChat = (item: ChatChannel) => {
    setSelectedChannel(item);
    setActiveViewIndex(1);
  }

  return (
    <Tippy
      interactive
      trigger="click"
      arrow
      onShow={() => setIsModalActive(true)}
      onHide={() => setIsModalActive(false)}
      placement="bottom-start"
      animation="shift-away"
      maxWidth={"auto"}
      hideOnClick="toggle"
      onCreate={(intance) => tippyRef.current = intance}
      className={styles.modalWrapper}
      content={
        <div className={styles.modalContent}>
          <div
            className={styles.modalChatList}
            style={{
              marginLeft: `calc(${activeViewIndex} * -100%)`
            }}
          >
            <div className={styles.modalHeader}>
              <div className={styles.chatModalClose}>
                <Close onClick={() => tippyRef?.current?.hide()} />
              </div>
              <div className={styles.modalHeaderContent}>
                <AdminChatProfile user={data!} />
              </div>
            </div>
            <div className={styles.chatModalContent}>
              <AdminActiveChats
                user={data}
                onSelectedChannel={(item) => handleSelectChat(item)}
                selectedChannel={selectedChannel}
              />
            </div>
          </div>
          <div className={styles.modalSingleChat}>
            {selectedChannel && (
              <AdminChatMessages
                user={data!}
                selectedChannel={selectedChannel}
                headerContent={(
                  <div className={styles.secondHeader}>
                    <div className={styles.chatModalClose}>
                      <ArrowBackIcon onClick={() => setActiveViewIndex(0)} />
                      <Close onClick={() => tippyRef?.current?.hide()} />
                    </div>
                    <div className={styles.secondHeaderContent}>
                      <Image
                        src={selectedChannel?.receiverAvatarSrc || ""}
                        width={50}
                        height={50}
                        alt="Avatar"
                      />
                      <div className={styles.secondHeaderTItles}>
                        <h4>{selectedChannel?.name || ""}</h4>
                        <strong onClick={() => setActiveViewIndex(2)}>
                          <span>Ver historial de búsqueda</span>
                          <ArrowForwardIcon />
                        </strong>
                      </div>
                    </div>
                  </div>
                )}
              />
            )}
          </div>
          <div className={styles.modalChatProfile}>
            <div className={styles.modalHeader}>
              <div className={styles.chatModalClose}>
                <Close onClick={() => tippyRef?.current?.hide()} />
              </div>
              <div className={styles.secondHeaderContent}>
                <Image
                  src={selectedChannel?.receiverAvatarSrc || ""}
                  width={50}
                  height={50}
                  alt="Avatar"
                />
                <div className={styles.secondHeaderTItles}>
                  <h4>{selectedChannel?.name || ""}</h4>
                  <strong onClick={() => setActiveViewIndex(1)}>
                    <span>Volver al chat</span>
                    <ArrowBackIcon />
                  </strong>
                </div>
              </div>
            </div>
            <AdminChatClientProfile
              selectedChannel={selectedChannel!}
              customClass={styles.clientProfileOpen}
            />
          </div>
        </div>
      }
    >
      <div className={classNames(styles.chatBubbleButton, {
        [styles.chatBubbleButtonActive]: isModalActive
      })}>
        <OmniChatBubble />
      </div>
    </Tippy>
  )
}