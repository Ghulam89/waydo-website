'use client'

import classNames from "classnames"
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import Filter from "../filter"
import { BannerPropsI } from "./banner.interface"
import style from "./banner.module.css"

export default function Banner({ withFilter, onSearch, filterSticky }: BannerPropsI) {

    return (
        <div className={classNames(style.boxBanner, style.banner1)}>
            <div className={style.boxBannerImg}>
                <Swiper
                    loop
                    autoplay={{
                        delay: 10000
                    }}
                    className={style.swiper}
                    style={{ height: "100%" }}
                    modules={[Autoplay]}
                >
                    <SwiperSlide>
                        <div className={style.boxImg}>
                            <img src="/assets/img/mock/banner-1/1.png" alt="banner" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={style.boxImg}>
                            <img src="/assets/img/mock/banner-1/2.png" alt="banner" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={style.boxImg}>
                            <img src="/assets/img/mock/banner-1/3.png" alt="banner" />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            {withFilter && (
                <div className={classNames(style.boxFilter, filterSticky ? style.boxFilterSticky : "")}>
                    <Filter onSearch={onSearch} />
                </div>
            )}
        </div>
    )
}