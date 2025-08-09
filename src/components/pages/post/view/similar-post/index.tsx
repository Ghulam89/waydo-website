'use client'

import { ObjectI } from "@interfaces/common"
import { useLazyGetPostsQuery } from "@redux/rtk/server/v1/post"
import classNames from "classnames"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import ItemCar from "./item-car"
import style from "./similar-post.module.css"

export default function SimilarPost({ filters = {} }: { filters: ObjectI }) {
    const [getPosts, { isLoading, data: resPosts }] = useLazyGetPostsQuery()
    const params = useParams()

    useEffect(() => {
        getPosts({
            filters,
            sort: ["createdAt", "DESC"],
            pagination: {
                skip: 0,
                take: 40
            },
            noInclude: {
                slug: [params.slug]
            }
        })
    }, [filters, params])

    if (!Array.from(resPosts?.data || []).length) return null

    return (
        <div className={style.container}>
            <div className={style.boxTitle}>
                <h3>Publicaciones similares</h3>
            </div>
            <div className={style.box}>
                <Swiper
                    loop
                    autoplay
                    slidesPerView={4}
                    spaceBetween={30}
                    modules={[Autoplay]}
                    className={classNames(style.swiper, "swiper-opportunity")}
                    style={{ paddingBottom: 5 }}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        480: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 30,
                        },
                    }}
                >
                    {Array.from(resPosts?.data || []).map((item, i) => (
                        <SwiperSlide key={i}>
                            <ItemCar item={item} />
                        </SwiperSlide>
                    ))}

                </Swiper>
            </div>
        </div>
    )
}