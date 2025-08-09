'use client'

import { useLazyGetPostsQuery } from "@redux/rtk/server/v1/post";
import style from "./featured.module.css";

import classNames from "classnames";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ItemFeaturedPropsI } from "./featured.inteface";

import ArrowDown from "@svg/ArrowDown.svg";
import ArrowUp from "@svg/ArrowUp.svg";

const NOT_PICTURE = "/assets/img/no-car-photo.png"

function Item({ item, pictureSrc, objectContain }: ItemFeaturedPropsI) {
    return (
        <div className={style.boxSlide}>
            <div className={classNames(style.boxImage, objectContain ? style.boxImageObjectContain : "")}>
                <img src={pictureSrc} />
            </div>

            <div className={style.boxInfo}>
                <strong className={style.price}>{item?.currency?.iso3}$ {parseFloat(`${item?.price || "0"}`).toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                })}</strong>
                <p className={style.descriptionInfo}>{item?.car?.brand?.name || ""} {item?.car?.model?.name || ""} - {item?.car?.year} • {parseFloat(`${item?.car?.mileage || "0"}`).toFixed(0)} KM</p>
            </div>
        </div>
    )
}

export default function FeaturedHome() {
    const ref = useRef<HTMLDivElement[]>([])
    const [getPosts, { isLoading, data: resPosts }] = useLazyGetPostsQuery()

    const [indexSelected, setIndexSelected] = useState(0)
    const [page, setPage] = useState(0)
    const selectedItem = useMemo(() => (Array.from(resPosts?.data || [])[indexSelected]), [resPosts?.data, indexSelected])
    const paginationItems = useMemo(() => (Array.from(resPosts?.data || []).map((item) => (item?.thumbnail?.src || NOT_PICTURE))), [resPosts?.data, NOT_PICTURE])
    const totalPage = useMemo(() => (Math.ceil(paginationItems.length / 4)), [paginationItems])

    const hiddenButtonDown = useMemo(() => ((page + 1) >= totalPage), [page, totalPage])
    const hiddenButtonUp = useMemo(() => (page <= 0), [page])

    useEffect(() => {
        getPosts({
            pagination: { skip: 0, take: 8 },
            sort: ["createdAt", "DESC"]
        })
    }, [])

    const handleNext = useCallback(() => {
        if ((page + 1) < totalPage) {
            setPage(page + 1);
        }
    }, [page, totalPage])

    const handlePrev = useCallback(() => {
        if (page > 0) {
            setPage(page - 1);
        }
    }, [page]);

    const handleSelectItem = useCallback((page: number) => {
        setIndexSelected(page)
    }, [])

    return (
        <div className={style.container}>
            <div className={style.boxTitle}>
                <h3>Destacados</h3>
            </div>
            <div className={style.box}>
                <div className={style.panel}>
                    <button onClick={handlePrev} className={classNames(style.navButton, hiddenButtonUp ? style.disabled : "")}>
                        <ArrowUp />
                    </button>
                    <div className={style.navPanel} >
                        <div className={style.navPanelAnimation} style={{ transform: `translateY(-${page * (80 * 4)}px)` }}>
                            {paginationItems.map((src, i) => (
                                <div key={i} className={classNames(i === indexSelected ? style.itemActive : "", "featured-items")}>
                                    <img src={src} key={i} onClick={() => (handleSelectItem(i))} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <button onClick={handleNext} className={classNames(style.navButton, hiddenButtonDown ? style.disabled : "")}>
                        <ArrowDown />
                    </button>
                </div>

                <div className={style.slider}>
                    <Swiper
                        navigation={true}
                        modules={[Navigation, Autoplay]}
                        loop
                        autoplay
                        className='swiper-featured'
                    >
                        {Array.from(selectedItem?.pictures || []).map((picture, i) => (
                            <SwiperSlide key={i}>
                                <Item pictureSrc={picture.src || NOT_PICTURE} item={selectedItem} />
                            </SwiperSlide>
                        ))}

                        {!Array.from(selectedItem?.pictures || []).length && (
                            <SwiperSlide>
                                <Item pictureSrc={NOT_PICTURE} item={selectedItem} objectContain />
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}