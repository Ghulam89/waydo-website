import Tippy from "@tippyjs/react"
import { DescriptionTypeEnum, ModalNavPropsI } from "./nav.interface"

import style from "./nav.module.css"
import Link from "next/link"
import classNames from "classnames"
import { useMemo } from "react"

export default function ModalNav({ children, Logo, description, header, link, title, descriptionType }: ModalNavPropsI) {
    const isNormal = useMemo(() => (descriptionType == DescriptionTypeEnum.normal), [descriptionType, DescriptionTypeEnum])

    return (
        <Tippy
            interactive
            arrow={true}
            trigger="click"
            placement="bottom-start"
            animation="shift-away"
            maxWidth={"auto"}
            content={
                <div className={style.box}>
                    {header ? (
                        <div className={classNames(style.header, isNormal ? style.headerNotPadding : "")}>
                            <div className={style.boxTitleHeader}>
                                <h4 >{header.title}</h4>
                            </div>
                            {header.action ? (
                                <div className={style.containerActionHeader}>
                                    <div onClick={() => header.action?.onClick()}>
                                        <span className={style.actionHeader}>{header.action?.label}</span>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    ) : null}

                    {Logo ? (
                        <div className={style.boxLogo}>
                            <Logo />
                        </div>
                    ) : null}

                    {title ? (
                        <div className={style.boxTitle}>
                            <span>{title}</span>
                        </div>
                    ) : null}

                    {description ? (
                        <div className={classNames(style.boxDescription, isNormal ? style.boxDescriptionNormal : "")}>
                            <p>{description}</p>
                        </div>
                    ) : null}


                    {link ? (
                        <div className={style.boxLink}>
                            {link.href ? (
                                <Link href={link.href} className={style.link}>{link.label}</Link>
                            ) : null}

                            {typeof link.onClick === "function" ? (
                                <div onClick={() => {
                                    if (typeof link.onClick === "function") {
                                        link.onClick()
                                    }
                                }} className={style.link}>{link.label}</div>
                            ) : null}
                        </div>
                    ) : null}
                </div>
            }
        >
            <div>
                {children}
            </div>
        </Tippy>
    )
}