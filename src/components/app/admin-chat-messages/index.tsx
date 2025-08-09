import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Avatar } from "@mui/material";
import { UserV1I } from '@redux/rtk/server/v1/me/me.interfaces';
import PaperclipIcon from "@svg/paperclip.svg";
import SmileIcon from "@svg/smile.svg";
import classNames from "classnames";
import dayjs from "dayjs";
import { ReactNode, useState } from 'react';
import ChatCarListModal from '../chat-car-list-modal';
import { ChatChannel, MessageTypeE } from "../chat-channel-item";
import Dropzone from '../dropzone';
import styles from "./admin-chat-messages.module.css";

type Props = {
  selectedChannel: ChatChannel;
  onHeaderClick?: () => void;
  onChatContentClick?: () => void;
  user: UserV1I;
  headerContent?: ReactNode;
}

export default function AdminChatMessages({
  selectedChannel,
  onHeaderClick,
  onChatContentClick,
  user,
  headerContent
}: Props) {
  const [isDropFileActive, setIsDropFileActive] = useState(false);

  return (
    <div className={styles.chatMessages}>
      {headerContent && (
        <div
          className={styles.chatMessagesBar}
          onClick={() => onHeaderClick?.()}
        >
          {headerContent}
        </div>
      )}
      <div
        className={styles.chatMessagesContent}
        onClick={() => onChatContentClick?.()}
        onDragOver={() => setIsDropFileActive(true)}
        onDragEnd={() => setIsDropFileActive(false)}
        onDragLeave={() => setIsDropFileActive(false)}
      >
        <div className={styles.chatBubblesWrapper}>
          {selectedChannel?.conversation ? (
            <div className={styles.messageBubles}>
              {selectedChannel.conversation.messages.map((messageGroup, index) => (
                <div
                  key={index}
                  className={classNames(styles.messagesGroup, styles[messageGroup.type])}
                >
                  <div className={styles.messagesGroupAvatar}>
                    <Avatar
                      component="image"
                      alt={selectedChannel.name}
                      src={messageGroup.type === MessageTypeE.OUTGOING
                        ? user?.profileSrc || ''
                        : selectedChannel.receiverAvatarSrc
                      }
                      height={25}
                      width={25}
                    />
                  </div>
                  <div
                    className={classNames(
                      styles.messagesGroupContent,
                      styles[messageGroup.type]
                    )}
                  >
                    {messageGroup.messages.map((message, i) => (
                      <>
                        <div
                          key={i}
                          className={classNames(styles.messageBubleItem, {
                            [styles.incoming]: message.type === MessageTypeE.INCOMING,
                            [styles.outgoing]: message.type === MessageTypeE.OUTGOING,
                            [styles.firstOfGroup]: messageGroup.messages.length > 1 && i === 0,
                            [styles.lastOfGroup]: i === (messageGroup.messages.length - 1),
                          })}
                        >
                          {message.content}
                        </div>

                        {i === (messageGroup.messages.length - 1) && (
                          <div className={styles.bubbleMessageTime}>
                            {dayjs(message.status[0].statusDate).format("HH:mm")}
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                </div>
              ))}

              {selectedChannel?.isReceiverWriting && (
                <div className={styles.writingBubble}>
                  {selectedChannel.name} está escribiendo...
                </div>
              )}
            </div>
          ) : (
            <div className={styles.emptyConversation}>
              Conversación no iniciada
            </div>
          )}
        </div>

        <div className={styles.chatLowerBar}>
          <div className={styles.chatInput}>
            <input
              placeholder="Escribe tu mensaje aquí"
            />
          </div>
          <div className={styles.chatUtils}>
            <ChatCarListModal />
            <div className={styles.chatLoadIconsButton}>
              <SmileIcon style={{ width: '25px' }} />
            </div>
            <div className={styles.chatLoadFilesButton}>
              <label htmlFor="chat-add-file">
                <PaperclipIcon />
              </label>
              <input
                type="file"
                style={{ display: "none" }}
                id="chat-add-file"
                accept="image/png, image/gif, image/jpeg, video/mp4"
              />
            </div>
            <div className={styles.chatSendButton}>
              <SendOutlinedIcon />
            </div>
          </div>
        </div>

        <div
          className={classNames(styles.dropzoneContainer, {
            [styles.active]: isDropFileActive
          })}
        >
          {isDropFileActive && (
            <Dropzone
              label="Deja caer tus archivos a este chat"
              name="chatDropFileInput"
              onChange={() => setIsDropFileActive(false)}
            />
          )}
        </div>
      </div>
    </div>
  )
}