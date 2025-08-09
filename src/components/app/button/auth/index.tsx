import classNames from "classnames"
import { AuthButtonPropsI } from "./auth.interface"

import { useCallback } from "react"
import style from "./auth.module.css"

const AuthButton = ({ Logo, content, disabled, onClick }: AuthButtonPropsI) => {
    const handleClick = useCallback(() => {
        if (!disabled && typeof onClick == "function") {
            onClick()
        }
    }, [disabled, onClick])

    return (
        <div className={classNames(style.button, disabled ? style.buttonDisabled : style.buttonActive)} onClick={handleClick}>
            <div>
                <div className={style.boxLogo}>
                    <Logo />
                </div>
            </div>
            <div className={style.boxLabel}>
                <span className={style.span}>{content}</span>
            </div>
        </div>
    )
}

export default AuthButton