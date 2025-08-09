import classNames from "classnames"
import style from "./banner.module.css"

export default function Banner3() {

    return (
        <div className={classNames(style.boxBanner, style.banner3)}>
            <img src="/assets/img/mock/banner-3.png" alt="banner" />
        </div>
    )
} 