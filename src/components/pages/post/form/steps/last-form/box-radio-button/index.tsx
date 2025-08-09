import classNames from "classnames"
import React, { useMemo, useState } from "react"
import { BoxRadioButtonPropsI } from "./box-radio-button.interface"
import style from "./box-radio-button.module.css"

export default function BoxRadioButton<T>({ error, data, children, title, grid, showMore, container }: BoxRadioButtonPropsI<T>) {
    const [show, setShow] = useState<boolean>(false)
    const positionShowMore = useMemo(() => (showMore?.position || "with-items"), [showMore?.position])
    const totalItemNoActive = useMemo(() => (showMore?.totalItemNoActive || 7), [showMore?.totalItemNoActive])

    return (
        <div>
            {title ? (
                <div className={style.boxHeaderRadioButton}>
                    <div>
                        <b >
                            {title} {error ? (<span className={style.error}>{error}</span>) : ""}
                        </b>
                    </div>
                </div>
            ) : null}
            <div className={classNames(style.container, grid ? style.containerGrid : "")} style={{
                ...(container?.style ? container.style : {}),
                ...(grid ? {
                    gridTemplateColumns: grid.gridTemplateColumns
                } : {})
            }}>
                {data.slice(0, show ? data.length : totalItemNoActive).map((item, i) => (
                    <React.Fragment key={`${`${title || "default"}`.replaceAll(" ", "-").toLocaleLowerCase()}-${i}`}>
                        <div>
                            {children({ item, index: i })}
                        </div>
                    </React.Fragment>
                ))}

                {positionShowMore === "with-items" && (
                    <div className={style.boxShowMore} onClick={() => (setShow(!show))}>
                        <span>
                            <p>{!show ? "Mostrar mas" : "Mostrar menos"}</p>
                        </span>
                    </div>
                )}
            </div>
            {positionShowMore === "buttom" && (
                <div className={style.contentShowMore}>
                    <div className={style.boxShowMore} onClick={() => (setShow(!show))}>
                        <span>
                            <p>{!show ? "Mostrar mas" : "Mostrar menos"}</p>
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}