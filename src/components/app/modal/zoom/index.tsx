import classNames from "classnames";
import { ModalZoonPropsI } from "./zoom.interface";

import { ReactMouseEvent } from "@interfaces/common";
import { useCallback, useEffect, useState } from "react";
import style from "./zoom.module.css";

export default function ModalZoom({ children, show, onClose }: ModalZoonPropsI) {
    const [active, setActive] = useState<boolean>(false)
    const [activeFlex, setActiveFlex] = useState<boolean>(false)

    const handleClickBox = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }, [])

    const handleClickContainer = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
        if (typeof onClose == "function") {
            onClose()
        }
    }, [])

    const handleOverflowHidden = useCallback((hidden: boolean = false) => {
        document.body.style.overflowY = hidden ? "hidden" : "auto"
    }, [])

    useEffect(() => {
        if (show) {
            handleOverflowHidden(true)

            setActiveFlex(true)
            setTimeout(() => {
                setActive(true)
            }, 100)
        } else {
            handleOverflowHidden()

            setActive(false)
            setTimeout(() => {
                setActiveFlex(false)
            }, 100)
        }
    }, [show])

    useEffect(() => {
        return () => {
            handleOverflowHidden()
        }
    }, [])


    return (
        <div className={classNames(style.container, activeFlex ? style.containerFlex : "", active ? style.containerActive : "")} onClick={handleClickContainer}>
            <div className={classNames(style.box, active ? style.boxActive : "")} onClick={handleClickBox}>
                {children}
            </div>
        </div>
    )
}