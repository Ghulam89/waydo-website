import classNames from "classnames";
import dayjs from "dayjs";
import Image from "next/image";
import { useMemo } from "react";
import styles from "./chat-channel-item.module.css";

export enum MessageTypeE {
  OUTGOING = "OUTGOING",
  INCOMING = "INCOMING",
}

type MessageStatusI = {
  statusName: "sent" | "received" | "read";
  statusDate: Date;
}

type MessageI = {
  id: string;
  content: string;
  senderUserId: string;
  receiverUserId: string;
  status: MessageStatusI[];
  type: MessageTypeE;
}

type MessageGroupI = {
  type: MessageTypeE;
  messages: MessageI[];
}

type ConversationI = {
  chatChannelId?: string;
  messages: MessageGroupI[];
}

export type channelAvailability = "active" | "away" | "disconnected";

export type ChannelStatus = "normal" | "user-typing";

export type ChatChannel = {
  name: string;
  isReceiverActive: boolean;
  receiverAvatarSrc: string;
  chatLastMessage: string;
  lastMessageDate: Date;
  isGroup: boolean;
  id: string;
  onlySendToAllChannel: boolean;
  pendingMessagesCount: number;
  status: ChannelStatus;
  availability: channelAvailability;
  isInternalChat: boolean;
  conversation?: ConversationI;
  isReceiverWriting?: boolean;
}

type Props = {
  item: ChatChannel;
  onClick?: (item?: ChatChannel) => void;
  isSelected?: boolean;
}

export default function ChatChannelItem({
  item,
  isSelected = false,
  onClick
}: Props) {
  const itemIsSelected = useMemo(() => isSelected, [isSelected]);

  return (
    <div
      key={item.id}
      className={classNames([
        styles.chatChannelItem,
        itemIsSelected ? styles.active : ''
      ])}
      onClick={() => onClick && onClick(item)}
    >
      <div className={styles.channelAvatar}>
        <Image
          src={item.receiverAvatarSrc}
          width={50}
          height={50}
          alt={`receiver-avatar-${item.id}`}
        />
        <div className={classNames(styles.chatChannelAvailabilityLight, styles[item.availability])}></div>
      </div>
      <div className={styles.channelInfo}>
        <div>
          <h4>{item.name}</h4>
          <span>{dayjs(item.lastMessageDate).format("DD.MM.YY")}</span>
        </div>
        <div>
          {item.chatLastMessage}
        </div>
      </div>
    </div>
  )
}