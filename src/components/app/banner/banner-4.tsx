'use client'

import classNames from "classnames"
import style from "./banner.module.css"

export default function Banner4() {

    return (
        <div className={classNames(style.boxBanner, style.banner4)}>
            <img src="/assets/img/mock/banner-4.png" alt="banner" />
        </div>
    )
} 