import { LayoutVersionEnum } from "@settings/layout/layout.interface"
import { layoutVersion } from "@settings/layout/layout.setting"
import React from "react"
import { LayoutPropsI } from "./layout.interface"
import LayoutV1 from "./versions/v1/main"
import useTranslate from "@hooks/translate/useTranslate"

function Layout(props: LayoutPropsI) {
    const { t: tLayout } = useTranslate('layout')

    if (layoutVersion === LayoutVersionEnum.v1) {
        return (
            <LayoutV1 {...props} />
        )
    }

    return (
        <React.Fragment>
            {/* <p>{tLayout("you-must-activate-a-layout-at-the-settings-configuration-level")}Layout no active</p> */}
               <LayoutV1 {...props} />
        </React.Fragment>
    )
}

export default Layout