'use client'

import { Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"

import classNames from "classnames"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import style from "./item.module.css"

import { ReactMouseEvent } from "@interfaces/common"
import Link from "next/link"

import ChevronWhiteRight from "@svg/chevronWhiteRight.svg"
import Favorite from "@svg/Favorite.svg"
import ImageCount from "@svg/imageCount.svg"
import Location from "@svg/map.svg"
import Share from "@svg/Share.svg"
import Image from "next/image"
import { ItemPageFilterPropsI } from "./item.interface"

export default function ItemPageFilter({ item, loading }: ItemPageFilterPropsI) {
    const prevRef = useRef(null)
    const nextRef = useRef(null)
    const swiperRef = useRef<SwiperRef>(null)
    const [showButtons, setShowButtons] = useState(false)
    const [isBeginning, setIsBeginning] = useState(true)
    const [isEnd, setIsEnd] = useState(false)

    const skeleton = useMemo(() => (loading ? "skeleton" : ""), [loading])
    const handleClickPicture = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }, [])

    const list = useMemo(() => ([
        {
            label: "Año",
            value: item?.car?.year
        },
        {
            label: "Kilometraje",
            value: `${(item?.car?.mileage || 0).toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            })} km`
        },
        {
            label: "Combustible",
            value: item?.car?.fuelType?.name
        },
        {
            label: "Tipo",
            value: item?.car?.body?.name
        }
    ]), [item])

    useEffect(() => {
        if (!swiperRef.current) return

        const swiperInstance = swiperRef.current.swiper
        const updateNavigationButtons = () => {
            setIsBeginning(swiperInstance.isBeginning)
            setIsEnd(swiperInstance.isEnd)
        }

        swiperInstance.on('slideChange', updateNavigationButtons)

        return () => {
            swiperInstance.off('slideChange', updateNavigationButtons)
        }
    }, [swiperRef])

    return (
        <Link href={`/posts/v/${item?.slug}`}>
            <div className={classNames(style.box)}>
                <div className={classNames(skeleton)}>
                    <div
                        className={style.boxSwpper}
                        onClick={handleClickPicture}
                        onMouseEnter={() => setShowButtons(true)}
                        onMouseLeave={() => setShowButtons(false)}
                    >
                        <div className={classNames(style.buttonBack, showButtons ? style.showButton : "", isBeginning ? style.buttonHidden : "")}>
                            <button ref={prevRef} >
                                <ChevronWhiteRight />
                            </button>

                        </div>
                        <div className={classNames(style.buttonNext, showButtons ? style.showButton : "", isEnd ? style.buttonHidden : "")}>
                            <button ref={nextRef} >
                                <ChevronWhiteRight />
                            </button>
                        </div>
                        <div className={style.boxImageCount}>
                            <ImageCount />
                            <span>{Array.from(item?.pictures || []).length}</span>
                        </div>

                        <div className={style.boxShare}>
                            <Share />
                        </div>

                        <div className={style.boxFavorite}>
                            <Favorite />
                        </div>
                        <Swiper
                            ref={swiperRef}
                            navigation={{
                                prevEl: prevRef.current,
                                nextEl: nextRef.current,
                            }}
                            pagination={{
                                dynamicBullets: true,
                            }}
                            slidesPerView={1}
                            modules={[Navigation, Pagination]}
                            className={classNames(style.swiper)}
                            onBeforeInit={(swiper) => {
                                if (swiper.params.navigation) {
                                    //@ts-ignore
                                    swiper.params.navigation.prevEl = prevRef.current
                                    //@ts-ignore
                                    swiper.params.navigation.nextEl = nextRef.current
                                }
                            }}
                        >
                            {Array.from(item?.pictures || []).map((picture, i) => (
                                <SwiperSlide key={i}>
                                    <div className={style.boxImg}>
                                        <Image src={picture.src as string} alt="user" height={193} width={282} onError={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                        }} />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                <div className={style.boxInfo}>
                    <div className={style.contentPrice}>
                        <div className={classNames(style.boxPrice)}>
                            <h1 className={classNames(style.price, skeleton)}><span className={style.currencyISO}>{item?.currency?.iso3}</span> {(item?.price || 0).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}</h1>
                        </div>
                        <div>
                            {/* <div>
                                <div className={style.impulse}>
                                    <span>Impulsado</span>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className={classNames(style.boxBrandAndModel)}>
                        <div className={classNames(skeleton)}>
                            <span>{item?.car?.brand?.name}</span>
                            <strong>•</strong>
                            <span>{item?.car?.model?.name}</span>
                        </div>
                    </div>
                    <div className={style.boxTitle}>
                        <h2 className={classNames(skeleton)}>{item.title}</h2>
                    </div>
                    <div className={style.boxButton}>
                        <div className={style.contentList}>
                            <div className={style.boxList}>
                                {list.map((item, i) => (
                                    <div key={i} className={classNames(style.boxItemList, skeleton)}>
                                        <span>{item.label}</span>
                                        <strong>{item.value}</strong>
                                    </div>
                                ))}
                            </div>
                            <div className={classNames(style.boxLocation)}>
                                <div className={classNames(skeleton)}>
                                    <Location
                                        style={{
                                            width: '14px',
                                            height: '18px'
                                        }}
                                    />
                                    <p>{item.geolocation?.city?.name}</p>
                                </div>
                            </div>
                        </div>
                        <div className={style.contentPicture}>
                            <div className={classNames(style.boxPicture, skeleton)}>
                                {item?.creator?.profileSrc ? (
                                    <Image src={item.creator.profileSrc} alt="user" height={150} width={150} />
                                ) : (
                                    <Image src="/assets/img/no-picture.jpg" alt="user" height={150} width={150} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}