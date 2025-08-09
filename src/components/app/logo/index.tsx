import { LogoPropsI } from "./logo.interface"

import LogoSvg from "@svg/Logo.svg"

const Logo = ({}: LogoPropsI) => {

    return (
        <div>
            <LogoSvg />
        </div>
    )
}

export default Logo