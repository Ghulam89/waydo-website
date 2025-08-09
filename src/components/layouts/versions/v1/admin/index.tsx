import ChatModal from "@components/app/chat-modal";
import { usePathname } from "next/navigation";
import styles from "./admin.module.css";
import DashboardHeaderV1 from "./header";
import DashboardSidebarV1 from "./sidebar";

export default function LayoutAdminV1(
  { children }: { children: React.ReactNode }
) {
  const pathName = usePathname();

  return (
    <div className={styles.dashboardContainer}>
      <DashboardHeaderV1 />
      <DashboardSidebarV1 />

      <div className={styles.dashboardContent}>
        <div>
          {children}
        </div>

        {pathName !== '/dashboard/chat' && (
          <ChatModal />
          // <div className={styles.chatBubbleArea}>
          //   <OmniChatBubble />
          // </div>
        )}
      </div>
    </div>
  );
}