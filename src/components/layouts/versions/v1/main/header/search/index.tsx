import { ModalNav } from "@components/app/modal";
import { useAppDispatch } from "@redux/hooks";
import { UserV1I } from "@redux/rtk/server/v1/me/me.interfaces";
import { updateLayout } from "@redux/slices/layout";
import SearchNav from "@svg/nav/desktop/Search.svg";
import Search from "@svg/nav/SearchImage.svg";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

type Props = {
    user?: UserV1I;
}

export default function SearchVersion1({ user }: Props) {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleGoPage = useCallback(() => {
        if (!user) return dispatch(updateLayout({
            showModalAuth: true,
        }));

        router.push("/searches");
    }, [user]);

    return (
        <ModalNav
            Logo={Search}
            header={{
                title: "Búsquedas"
            }}
            title="Aun no tienes busquedas guardadas"
            link={{
                label: "Ver todas las búsquedas",
                onClick: () => handleGoPage()
            }}
        >
            <SearchNav />
        </ModalNav>
    )
}