import User from "@svg/User.svg"

import style from "./message-active-account.module.css"
import classNames from "classnames"

export default function MessageActiveAccount() {

    return (
        <div className={style.container}>
            <div className={style.box}>
                <div className={style.boxLogo}>
                    <User />
                </div>
                <h2 className={style.title}>Tu cuenta esta casi lista</h2>
                <p className={style.description}>Hemos enviado un correo de activacion a tu email. Favor de revisar su bandeja de mensajes para activar la cuenta.</p>
                <p className={style.description}>En caso de no haber recibido el correo puede hacer click en el boton de abajo para volver a reenviar el correo.</p>

                <button className={style.button}>Reenviar</button>
            </div>
        </div>
    )
}