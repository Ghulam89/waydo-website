import Logo from "@components/app/logo"
import { ModalZoon } from "@components/app/modal"
import { useAppDispatch, useAppSelector } from "@redux/hooks"
import { updateLayout } from "@redux/slices/layout"
import Close from "@svg/Close.svg"
import { useCallback } from "react"
import AuthComponent from ".."
import style from "./modal.module.css"

export default function ModalAuth() {
    const dispatch = useAppDispatch()
    const { showModalAuth } = useAppSelector((x) => x.layout)

    const handleClose = useCallback(() => {
        dispatch(updateLayout({
            showModalAuth: false
        }))
    }, [])

    return (
        <ModalZoon show={showModalAuth} onClose={handleClose}>
            <div className={style.box}>
                <div className={style.header}>
                    <Logo />

                    <div className={style.boxClose} onClick={handleClose}>
                        <Close />
                    </div>
                </div>
                <div>
                    <AuthComponent isModal />
                </div>
            </div>
        </ModalZoon>
    )
}