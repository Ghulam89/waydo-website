import { ModalNav } from "@components/app/modal";
import { useAppDispatch } from "@redux/hooks";
import { UserV1I } from "@redux/rtk/server/v1/me/me.interfaces";
import { updateLayout } from "@redux/slices/layout";
import Favorite from "@svg/nav/desktop/Favorite.svg";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

type Props = {
    user?: UserV1I;
}

export default function FavoriteVersion1({ user }: Props) {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleGoPage = useCallback(() => {
        if (!user) return dispatch(updateLayout({
            showModalAuth: true,
        }));

        router.push("/favorites");
    }, [user]);

    return (
        <ModalNav
            header={{
                title: "Favoritos"
            }}

            title="Tu bandeja de favoritos esta vacia"
            description='Para llenar tu bandeja de favoritos haz click en el boton "Agregar a favoritos" cuando veas un anuncio'
            link={{
                label: "Ir a Favoritos",
                onClick: () => handleGoPage()
            }}
        >
            <Favorite />
        </ModalNav>
    )
}