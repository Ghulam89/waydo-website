import classNames from "classnames";
import { ListFilterProptI } from "./list.interface";

import { updateFilter } from "@redux/slices/filter";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { generateUrlPost } from "@utils/filter";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import style from "./list.module.css";

export default function ListFilter({ items, link, noAddLink, keysQuery }: ListFilterProptI) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const content = useRef<HTMLDivElement>(null)
    const query = useSearchParams()
    const [showButtonMore, setShowButtonMore] = useState(false)
    const [showMore, setShowMore] = useState(false)
    const filters = useAppSelector((x) => x.filters)

    const handleShowMore = useCallback(() => {
        setShowMore(!showMore)
    }, [showMore])

    useEffect(() => {
        const container = content.current
        if (!container || !Array.from(items || []).length) return;
        const _items = container.querySelectorAll(".item-list-filter");
        const firstRowHeight = _items[0].getBoundingClientRect().top;
        let hasBreak = false;

        for (let i = 1; i < _items.length; i++) {
            const item = _items[i];
            const itemOffsetTop = item.getBoundingClientRect().top;
            if (itemOffsetTop > firstRowHeight) {
                hasBreak = true;
                break;
            }
        }

        if (hasBreak) {
            setShowButtonMore(true)
        }
    }, [content, items])

    return (
        <div className={style.boxListFilter}>
            <div className={classNames(style.content, showMore ? style.contentActive : "")} ref={content}>
                {Array.from(items || []).map((item, i) => (
                    <div
                        key={i}
                        className={classNames(style.item, "item-list-filter")}
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()

                            if (Array.isArray(keysQuery) && noAddLink) {
                                const _filters = keysQuery.reduce((a, b) => ({
                                    ...a,
                                    [b]: item.value
                                }), {})

                                dispatch(updateFilter(_filters))

                                router.push(generateUrlPost({
                                    ...filters,
                                    ..._filters
                                }))
                            }

                            if (!noAddLink) {
                                router.push(`${link}/${item.value}${query.toString().length > 0 ? "?" : ""}${query.toString()}`)
                            }
                        }}
                    >
                        <div>{item.label} <span>{item.subLabel}</span>
                        </div>
                    </div>
                ))}

                {showMore && showButtonMore && (
                    <div className={classNames(style.item, style.showMore)} onClick={handleShowMore}>
                        <span>
                            <p>Ver menos</p>
                        </span>
                    </div>
                )}
            </div>
            {!showMore && showButtonMore && (
                <div className={style.boxButtonShowMore}>
                    <div className={classNames(style.item, style.showMore)} onClick={handleShowMore}>
                        <span>
                            <p>Ver mas</p>
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}