import Link from "next/link"
import style from "./terms-condition.module.css"

export default function TermsCondition() {
    return (
        <div>
            <p className={style.text}>Al iniciar sesión acepto los <Link href="/terms-and-conditions" className={style.link}>Términos y Condiciones</Link> y <Link href="/privacy-policies" className={style.link}>Políticas de Privacidad</Link></p>
        </div>
    )
}