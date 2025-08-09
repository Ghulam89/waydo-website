import Back from "@svg/ArrowBack.svg"
import { useCallback } from "react"

import style from "./history.module.css"

export default function BackHistory() {
    const handleBack = useCallback(() => {
        history.back()
    }, [])

    return (
        <div className={style.container}>
            <div onClick={handleBack} className={style.button}>
                <Back />
            </div>
        </div>
    )
}