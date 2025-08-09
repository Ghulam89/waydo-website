import { ModalNav } from "@components/app/modal";
import { DescriptionTypeEnum } from "@components/app/modal/nav/nav.interface";
import Chat from "@svg/nav/desktop/Chat.svg"

export default function ChatVersion1() {

    return (
        <ModalNav
            description="Parece que aun no has iniciado algun chat. Conecta con otros waydues para tu proximo mejor negocio."
            descriptionType={DescriptionTypeEnum.normal}
        >
            <Chat />
        </ModalNav>
    )
}