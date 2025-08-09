import { SymbolCurrencyEnum } from "@redux/rtk/server/v1/currency/currency.interfaces"
import { FrequencyAbbreviationEnum } from "@redux/rtk/server/v1/subscription/subscription.interfaces"
import { abbreviateNumber } from "@utils/number/number.util"
import { useMemo } from "react"
import { ItemSubscriptionPropsI, ListItemSubscriptionI } from "./item.interface"
import style from "./item.module.css"

import CheckCircle from "@svg/CheckCircle.svg"
import classNames from "classnames"
import Link from "next/link"

export default function ItemSubscription({ item, active, currency, period }: ItemSubscriptionPropsI) {

    const { listOne, listTwo } = useMemo(() => (Array.from(item.rules || []).reduce((a: ListItemSubscriptionI, b) => {
        if (b.cant === -1) {
            a.listTwo.push(b)
        } else {
            a.listOne.push(b)
        }
        return a
    }, {
        listOne: [],
        listTwo: []
    })), [item.rules])

    return (
        <div className={classNames(style.content, active ? style.contentActive : "")}>
            <div className={style.contentTop}>
                <h2 className={style.title}>{item.name}</h2>
                <strong className={style.boxPrice}>
                    <span className={style.symbol}>{SymbolCurrencyEnum[item.currency.iso3]}</span>
                    <span className={style.price}>{item.price > 9999 ? abbreviateNumber(item.price) : item.price}</span>
                    <span className={style.period}>/{FrequencyAbbreviationEnum[item.period]}</span>
                </strong>
            </div>
            <div className={style.contentCenter}>
                <div className={style.boxTry}>
                    <Link href={`/profile/subscriptions/checkout?s=${item.uuid}&c=${currency}&p=${period}`}>
                        <button>
                            Pruebe para {item.name}
                        </button>
                    </Link>
                </div>
            </div>
            <div>
                <div>
                    <ul>
                        {listOne.map((list, i) => (
                            <li key={`list-one-${i}`}>
                                <div className={style.boxListOne}>
                                    <div className={style.boxName}>
                                        <span>{list.name}</span>
                                    </div>
                                    <div className={style.boxCant}>
                                        <span>{list.cant}</span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={style.contentEnd}>
                    <ul>
                        {listTwo.map((list, i) => (
                            <li key={`list-two-${i}`}>
                                <div className={style.boxListTwo}>
                                    <div className={style.boxIcon}>
                                        <CheckCircle />
                                    </div>
                                    <p>{list.name}</p>
                                </div>
                            </li>
                        ))}

                    </ul>
                </div>
            </div>
        </div>
    )
}