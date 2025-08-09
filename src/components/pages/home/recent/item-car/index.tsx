import classNames from "classnames"
import Link from "next/link"
import { useMemo } from "react"
import { ItemCarPropsI } from "./item-car.interface"
import style from "./item-car.module.css"

export default function ItemCar({ item }: ItemCarPropsI) {
    const isDealer = useMemo(() => (false), [])
    const onBooster = useMemo(() => (false), [])
    const onFire = useMemo(() => (false), [])

    return (
        <Link href={`/posts/v/${item.title}`}>
            <div className={classNames(style.box, onFire ? style.boxFire : "", onBooster ? style.boxBooster : "")}>
                <div className={style.containerImage}>
                    <div className={style.boxIconImage}>
                        {onFire && (
                            <img src="/assets/img/fire.png" alt="" />
                        )}

                        {onBooster && (
                            <img src="/assets/img/booster.png" alt="" />
                        )}
                    </div>
                    <div className={style.boxImage}>
                        {isDealer && (
                            <div className={style.boxLabelDealer}>
                                <span>Dealer</span>
                            </div>
                        )}
                        {item?.thumbnail?.src ? (
                            <img src={item?.thumbnail?.src} alt={item.title} onError={(e) => {
                                e.currentTarget.src = "/assets/img/no-car-photo.png"
                            }} />
                        ) : (
                            <img src="/assets/img/no-car-photo.png" alt={item.title} style={{
                                objectFit: "contain"
                            }} />
                        )}
                    </div>
                </div>
                <div className={style.boxInfo}>
                    <strong className={style.price}>{item?.currency?.iso3}&#x24; {item.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}</strong>
                    <h6 className={style.title}>{item.title}</h6>
                    <span className={style.description}>{item.car.year} • {item?.car?.mileage?.toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                    })} KM</span>
                </div>
            </div>
        </Link>
    )
}