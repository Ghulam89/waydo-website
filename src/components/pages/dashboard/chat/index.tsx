"use client";

import AdminActiveChats from '@components/app/admin-active-chats';
import AdminChatClientProfile from '@components/app/admin-chat-client-profile';
import AdminChatMessages from '@components/app/admin-chat-messages';
import AdminChatProfile from '@components/app/admin-chat-profile';
import ChatChannelItem, { ChatChannel, MessageTypeE } from '@components/app/chat-channel-item';
import { useGetUserInfoV1Query } from '@redux/rtk/server/v1/me';
import LogoSvg from "@svg/Logo.svg";
import ChatIcon from "@svg/post/Chat.svg";
import classNames from "classnames";
import dayjs from 'dayjs';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from "./chat.module.css";

export default function AdminChat() {
  const [selectedChannel, setSelectedChannel] = useState<ChatChannel>();
  const { data } = useGetUserInfoV1Query({});
  const [activeChatProfileOpen, setActiveChatProfileOpen] = useState(false);

  const internalChats: ChatChannel[] = [
    {
      name: "Sucursales",
      isReceiverActive: false,
      receiverAvatarSrc: "/assets/img/auto-shop-logo.png",
      chatLastMessage: "",
      lastMessageDate: new Date(),
      isGroup: true,
      id: "1324132413242",
      onlySendToAllChannel: true,
      pendingMessagesCount: 0,
      status: "normal",
      availability: "disconnected",
      isInternalChat: true,
    },
    {
      name: "Santo Domingo",
      isReceiverActive: false,
      receiverAvatarSrc: "/assets/img/auto-shop-logo.png",
      chatLastMessage: "Yo: Memorandum...",
      lastMessageDate: new Date(),
      isGroup: false,
      id: "322424324432",
      onlySendToAllChannel: false,
      pendingMessagesCount: 0,
      status: "normal",
      availability: "active",
      isInternalChat: true,
      isReceiverWriting: true,
      conversation: {
        messages: [
          {
            type: MessageTypeE.OUTGOING,
            messages: [
              {
                id: Math.random().toString().slice(2),
                type: MessageTypeE.OUTGOING,
                senderUserId: data?.uuid || "",
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
                senderUserId: data?.uuid || "",
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
                receiverUserId: data?.uuid || "",
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
                senderUserId: data?.uuid || "",
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
                senderUserId: data?.uuid || "",
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
    },
    {
      name: "Santiago",
      isReceiverActive: false,
      receiverAvatarSrc: "/assets/img/auto-shop-logo.png",
      chatLastMessage: "",
      lastMessageDate: new Date(),
      isGroup: false,
      id: "3232343223442",
      onlySendToAllChannel: false,
      pendingMessagesCount: 0,
      status: "normal",
      availability: "disconnected",
      isInternalChat: true,
    },
    {
      name: "Santo Domingo",
      isReceiverActive: false,
      receiverAvatarSrc: "/assets/img/auto-shop-logo.png",
      chatLastMessage: "",
      lastMessageDate: new Date(),
      isGroup: false,
      id: "23432342344342",
      onlySendToAllChannel: false,
      pendingMessagesCount: 0,
      status: "normal",
      availability: "disconnected",
      isInternalChat: true,
    },
    {
      name: "Santiago",
      isReceiverActive: false,
      receiverAvatarSrc: "/assets/img/auto-shop-logo.png",
      chatLastMessage: "",
      lastMessageDate: new Date(),
      isGroup: false,
      id: "435334554543",
      onlySendToAllChannel: false,
      pendingMessagesCount: 0,
      status: "normal",
      availability: "disconnected",
      isInternalChat: true,
    },
  ];

  useEffect(() => setActiveChatProfileOpen(false), [selectedChannel]);

  return (
    <div className={classNames(["shadow-card", styles.chatContainer])}>
      <div className={styles.chatSidebar}>
        <div className={styles.sidebarHeader}>
          <LogoSvg />
          <div>
            <span>
              Messenger
            </span>
            <ChatIcon width="15.609" height="15" />
          </div>
        </div>
        <AdminChatProfile user={data!} showTurnsButton />
        <div className={styles.internalChats}>
          <div>
            <h4>Chat interno</h4>
          </div>
          <div className={styles.chatsList}>
            {internalChats.map((item, i) => (
              <ChatChannelItem
                key={i}
                item={item}
                isSelected={selectedChannel?.id === item.id}
                onClick={() => setSelectedChannel(item)}
              />
            ))}
          </div>
        </div>
        <AdminActiveChats
          onSelectedChannel={(item) => setSelectedChannel(item)}
          selectedChannel={selectedChannel}
        />
      </div>

      {!!selectedChannel && (
        <div className={styles.chatContent}>
          <AdminChatMessages
            user={data!}
            selectedChannel={selectedChannel}
            onHeaderClick={() => setActiveChatProfileOpen(true)}
            onChatContentClick={() => setActiveChatProfileOpen(false)}
            headerContent={(
              <>
                <Image
                  src={selectedChannel?.receiverAvatarSrc || ""}
                  width={50}
                  height={50}
                  alt="Avatar"
                />
                <h4>{selectedChannel?.name || ""}</h4>
              </>
            )}
          />
          <AdminChatClientProfile
            selectedChannel={selectedChannel}
            customClass={activeChatProfileOpen ? styles.chatReceiverProfileOpen : ''}
          />
        </div>
      )}

      {!selectedChannel && (
        <div className={styles.noActiveChannel}>Sin conversación activa</div>
      )}
    </div>
  );
}