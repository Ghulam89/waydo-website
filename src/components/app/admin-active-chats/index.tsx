import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Add } from "@mui/icons-material";
import { UserV1I } from "@redux/rtk/server/v1/me/me.interfaces";
import dayjs from "dayjs";
import ChatChannelItem, { ChatChannel, MessageTypeE } from "../chat-channel-item";
import styles from "./admin-active-chats.module.css";

type Props = {
  onSelectedChannel?: (chatChannel: ChatChannel) => void;
  selectedChannel?: ChatChannel;

  /** @deprecated Used only for mocking purposes */
  user?: UserV1I;
}

export default function AdminActiveChats({ onSelectedChannel, selectedChannel, user }: Props) {
  const activeChats: ChatChannel[] = Array(7).fill({
    name: "Carlos Ramirez",
    isReceiverActive: false,
    chatLastMessage: "",
    lastMessageDate: new Date(),
    isGroup: false,
    onlySendToAllChannel: false,
    pendingMessagesCount: 0,
    status: "normal",
    availability: "disconnected",
    isInternalChat: false,
    id: "45454453453454"
  }).map((item, i) => ({
    ...item,
    availability: i === 0 ? "active" : "disconnected",
    id: item.id + i,
    receiverAvatarSrc: "https://i.pravatar.cc/130",
    conversation: i === 0 && {
      messages: [
        {
          type: MessageTypeE.OUTGOING,
          messages: [
            {
              id: Math.random().toString().slice(2),
              type: MessageTypeE.OUTGOING,
              senderUserId: user?.uuid || "",
              receiverUserId: "322424324432",
              content: "Hola Franky!",
              status: [
                {
                  statusDate: dayjs().toDate(),
                  statusName: "sent"
                },
                {
                  statusDate: dayjs().toDate(),
                  statusName: "received"
                }
              ],
            }
          ]
        },
        {
          type: MessageTypeE.INCOMING,
          messages: [
            {
              id: Math.random().toString().slice(2),
              type: MessageTypeE.INCOMING,
              senderUserId: user?.uuid || "",
              receiverUserId: "322424324432",
              content: "Hola Pablo, como estas?",
              status: [
                {
                  statusDate: dayjs().toDate(),
                  statusName: "sent"
                },
                {
                  statusDate: dayjs().toDate(),
                  statusName: "received"
                }
              ],
            },
          ]
        },
        {
          type: MessageTypeE.OUTGOING,
          messages: [
            {
              id: Math.random().toString().slice(2),
              type: MessageTypeE.OUTGOING,
              senderUserId: "322424324432",
              receiverUserId: user?.uuid || "",
              content: "Estoy bien",
              status: [
                {
                  statusDate: dayjs().toDate(),
                  statusName: "sent"
                },
                {
                  statusDate: dayjs().toDate(),
                  statusName: "received"
                }
              ],
            },
            {
              id: Math.random().toString().slice(2),
              type: MessageTypeE.OUTGOING,
              senderUserId: user?.uuid || "",
              receiverUserId: "322424324432",
              content: "Te escribo porque necesito que me asistas en algo",
              status: [
                {
                  statusDate: dayjs().toDate(),
                  statusName: "sent"
                },
                {
                  statusDate: dayjs().toDate(),
                  statusName: "received"
                }
              ],
            },
            {
              id: Math.random().toString().slice(2),
              type: MessageTypeE.OUTGOING,
              senderUserId: user?.uuid || "",
              receiverUserId: "322424324432",
              content: "Memorandum...",
              status: [
                {
                  statusDate: dayjs().toDate(),
                  statusName: "sent"
                },
                {
                  statusDate: dayjs().toDate(),
                  statusName: "received"
                }
              ],
            },
          ]
        },
      ]
    }
  }));

  return (
    <div className={styles.activeChats}>
      <div className={styles.activeChatsTitle}>
        <h4>Chats activos</h4>
        <button className={styles.addPersonToChat}>
          <Add />
        </button>
      </div>
      <div className={styles.chatsSearch}>
        <input placeholder='Buscar personas' />
        <FontAwesomeIcon
          icon={faSearch}
        />
      </div>
      <div className={styles.chatsList}>
        {activeChats.map((item, i) => (
          <ChatChannelItem
            key={i}
            item={item}
            isSelected={selectedChannel?.id === item.id}
            onClick={() => onSelectedChannel?.(item)}
          />
        ))}
      </div>
    </div>
  )
}