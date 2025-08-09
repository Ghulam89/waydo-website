import { ModalZoon } from "@components/app/modal"

import Close from "@svg/Close.svg"

import Logo from "@components/app/logo"
import SignUpComponent from "@components/pages/auth/signup"
import { useAppDispatch, useAppSelector } from "@redux/hooks"
import { updateLayout } from "@redux/slices/layout"
import { useCallback } from "react"
import style from "./modal.module.css"

export default function ModalSignUpAuth() {
    const dispatch = useAppDispatch()
    const { showModalSignUp } = useAppSelector((x) => x.layout)

    const handleClose = useCallback(() => {
        dispatch(updateLayout({
            showModalSignUp: false
        }))
    }, [])

    return (
        <ModalZoon show={showModalSignUp} onClose={handleClose}>
            <div className={style.box}>
                <div className={style.header}>
                    <Logo />

                    <div className={style.boxClose} onClick={handleClose}>
                        <Close />
                    </div>
                </div>
                <div>
                    <SignUpComponent  isModal/>
                </div>
            </div>
        </ModalZoon>
    )
}