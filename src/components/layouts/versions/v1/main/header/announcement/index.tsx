import { useAppDispatch } from "@redux/hooks";
import { UserV1I } from "@redux/rtk/server/v1/me/me.interfaces";
import { updateLayout } from "@redux/slices/layout";
import Announcement from "@svg/nav/desktop/Announcement.svg";
import { useRouter } from 'next/navigation';
import { useCallback } from "react";

type Props = {
    user: UserV1I;
}

export default function AnnouncementVersion1({ user }: Props) {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleGoPage = useCallback(() => {
        if (!user) return dispatch(updateLayout({
            showModalAuth: true,
        }));

        router.push("/announcements");
    }, [user]);

    return (
        <div onClick={handleGoPage}>
            <Announcement />
        </div>
    )
}