import Link from "next/link"
import MiniLogo from "@svg/MiniLogo.svg"
import classNames from "classnames"
import { navFooter } from "@settings/layout/layout.setting"

import Facebook from "@svg/socials/footer/facebook.svg"
import Instragram from "@svg/socials/footer/instagram.svg"
import Email from "@svg/socials/footer/email.svg"

import style from "./footer.module.css"

export default function FooterV1() {

    return (
        <footer className={style.footer}>
            <div className={classNames("container")}>
                <div className={style.boxTop}>
                    <MiniLogo />
                </div>
                <div className={style.boxNav}>
                    <nav>
                        {navFooter.map((nav, i) => (
                            <div key={i}>
                                <h3 className={style.navTitle}>{nav.label}</h3>
                                <ul>
                                    {nav.items.map((item, e) => (
                                        <li key={`${i}-${e}`}>
                                            <Link href={item.link} className={style.navLink}>{item.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        <div>
                            <ul>
                                <li className={style.liSocial}>
                                    <div>
                                        <Instragram />
                                    </div>
                                    <Link href="#">
                                        <span>
                                            Siguenos en Instagram
                                        </span>
                                    </Link>
                                </li>
                                <li className={style.liSocial}>
                                    <div>
                                        <Facebook />
                                    </div>
                                    <Link href="#">
                                        <span>
                                            Siguenos en Facebook
                                        </span>
                                    </Link>
                                </li>
                                <li className={style.liSocial}>
                                    <div>
                                        <Email />
                                    </div>
                                    <span>
                                        Dejanos un correo
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </footer>
    )
}