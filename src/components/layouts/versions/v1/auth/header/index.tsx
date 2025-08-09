import { LayoutPropsI } from "@components/layouts/layout.interface"

import LinkLogo from "@components/app/logo/link"
import style from "./header.module.css"

export default function HeaderAuthV1(props: LayoutPropsI) {

    return (
        <header className={style.header}>
            <LinkLogo />
        </header>
    )
}