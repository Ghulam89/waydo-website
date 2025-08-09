import { LayoutPropsI } from "@components/layouts/layout.interface"
import HeaderAuthV1 from "./header"

import style from "./auth.module.css"
import classNames from "classnames"

function LayoutAuthV1(props: LayoutPropsI) {

    return (
        <div className={style.root}>
            <HeaderAuthV1 {...props} />
            <main className={classNames(style.main, "container")}>
                {props.children}
            </main>
        </div>
    )
}

export default LayoutAuthV1