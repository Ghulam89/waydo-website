import { ModalNav } from "@components/app/modal";
import { useAppDispatch } from "@redux/hooks";
import { UserV1I } from "@redux/rtk/server/v1/me/me.interfaces";
import { updateLayout } from "@redux/slices/layout";
import Bell from "@svg/nav/BellImage.svg";
import Notification from "@svg/nav/desktop/Notification.svg";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

type Props = {
    user?: UserV1I;
}

export default function NotificationVersion1({ user }: Props) {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleGoPage = useCallback(() => {
        if (!user) return dispatch(updateLayout({
            showModalAuth: true,
        }));

        router.push("/notifications");
    }, [!user]);

    return (
        <ModalNav
            Logo={Bell}
            header={{
                title: "Notificaciones",
                action: {
                    label: "Marcar todas como leidas",
                    onClick: () => { }
                }
            }}
            title="Aun no tienes notificaciones"
            description="Aqui veras recomendaciones de anuncios, noticias de Waydo, etc..."
            link={{
                label: "Ver todas las notificaciones",
                onClick: () => handleGoPage()
            }}
        >
            <Notification />
        </ModalNav>
    )
}