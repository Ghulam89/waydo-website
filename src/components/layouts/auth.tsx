import { LayoutVersionEnum } from "@settings/layout/layout.interface"
import { layoutAuthVersion } from "@settings/layout/layout.setting"
import React from "react"
import { LayoutPropsI } from "./layout.interface"
import LayoutV1 from "./versions/v1/main"
import useTranslate from "@hooks/translate/useTranslate"
import LayoutAuthV1 from "./versions/v1/auth"

const LayoutAuth = (props: LayoutPropsI) => {
    const { t: tLayout } = useTranslate('layout')

    if (layoutAuthVersion === LayoutVersionEnum.v1) {
        return (
            <LayoutAuthV1 {...props} />
        )
    }

    return (
        <React.Fragment>
            {/* <p>{tLayout("you-must-activate-a-layout-at-the-settings-configuration-level")}Layout no active</p> */}
              <LayoutAuthV1 {...props} />
        </React.Fragment>
    )
}

export default LayoutAuth