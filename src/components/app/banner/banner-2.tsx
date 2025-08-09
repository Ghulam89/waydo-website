'use client'

import classNames from "classnames"
import style from "./banner.module.css"

export default function Banner2() {

    return (
        <div className={classNames(style.boxBanner, style.banner2)}>
             <img src="/assets/img/mock/banner-2.png" alt="banner" />
        </div>
    )
}