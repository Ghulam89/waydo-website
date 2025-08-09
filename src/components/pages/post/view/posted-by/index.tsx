import { ModalZoon } from "@components/app/modal"
import { PostI } from "@redux/rtk/server/v1/post/post.interfaces"
import { useMaskPhone } from "@utils/phone-mask"
import classNames from "classnames"
import moment from "moment"
import Link from "next/link"
import React, { useCallback, useMemo, useState } from "react"
import style from "./posted-by.module.css"

import Chat from "@svg/post/Chat.svg"
import Phone from "@svg/post/Phone.svg"
import WS from "@svg/post/WS.svg"
import Image from "next/image"

export default function PostedBy({ post }: { post?: PostI }) {
    const [showPhone, setShowPhone] = useState<boolean>(false)
    const [showModalPhone, setShowModalPhone] = useState<boolean>(false)

    const { setToMask } = useMaskPhone({
        maskFormat: '(###) ###-####',
    });

    //@ts-ignore
    const phone = useMemo(() => (setToMask(`${post?.creator?.info?.phoneNumber || ""}`.replace('+1', ''))?.maskedValue), [post])
    const timeAgo = useMemo(() => (post?.creator ? moment(post?.creator?.createdAt).locale("es").fromNow() : ""), [post]);
    const message = useMemo(() => (`Hola, estoy interesado en el vehículo que tienen en venta. ¿Podríamos hablar más sobre los detalles?\n\n${post?.url}`), [post])


    const handleShowPhone = useCallback(() => {
        if (!post?.creator?.info?.phoneNumber || showPhone) return;

        setShowModalPhone(true)
        setShowPhone(true)
    }, [post, showPhone])

    const handleCloseModalPhone = useCallback(() => {
        setShowModalPhone(false)
    }, [])

    return (
        <React.Fragment>
            <div className={style.container}>
                <div className={style.boxInfo}>
                    <div className={style.information}>
                        <span>Publicado por</span>
                        <strong>{post?.creator?.info?.firstName || ""} {post?.creator?.info?.lastName || ""}</strong>
                    </div>
                    <div className={style.boxPicture}>
                        <Link href="#">
                            <div>
                                {post?.creator?.profileSrc ? (
                                    <Image src={post.creator.profileSrc} alt={`${post.creator?.info?.firstName || ""} Profile`} height={200} width={200} />
                                ) : (
                                    <img src="/assets/img/no-picture.jpg" alt="" />
                                )}
                            </div>
                        </Link>
                    </div>
                </div>
                <div className={style.containerButtons}>
                    <button className={classNames(style.button, style.showPhoneButton, !post?.creator?.info?.phoneNumber ? style.showPhoneButtonDisabled : "")} onClick={handleShowPhone}>
                        {showPhone ? (
                            <React.Fragment>
                                {phone}
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Phone /> Mostrar numero de telefono
                            </React.Fragment>
                        )}
                    </button>
                    <button className={classNames(style.button)}>
                        <Chat width="15.609" height="15" /> Chatear con el vendedor
                    </button>
                    <button className={classNames(style.button)}>
                        <Link href={`https://wa.me/${`${post?.creator?.info?.phoneNumber || ""}`.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`} target="_blank">
                            <WS /> Whatsapp
                        </Link>
                    </button>
                </div>
            </div>

            <ModalZoon
                show={showModalPhone}
                onClose={handleCloseModalPhone}
            >
                <div className={style.boxModalShowPhone}>
                    <div className={style.contentModalShowPhone}>
                        <div className={style.phoneBoxPicture}>
                            {post?.creator?.profileSrc ? (
                                <img src={post.creator.profileSrc} alt={`${post.creator?.info?.firstName || ""} Profile`} />
                            ) : (
                                <img src="/assets/img/no-picture.jpg" alt="" />
                            )}
                        </div>
                        <div className={style.phoneBoxInfo}>
                            <span>Se unió {timeAgo}</span>
                            <p>{post?.creator?.info?.firstName || ""} {post?.creator?.info?.lastName || ""}</p>
                        </div>
                        <div className={style.phoneBoxRole}>
                            <span>Vendedor</span>
                        </div>
                    </div>
                    <div>
                        <button className={classNames(style.button, style.showPhoneButton)}>
                            {phone}
                        </button>
                    </div>
                    <div className={style.boxPhoneInfo}>
                        <p color="#4294ff" className="sc-6c7554a-1 sc-6c7554a-2 laOcwU dNlJTR sc-b8576da4-7 ezzQEI">Tips for a safer transaction:</p>
                        <ul className="sc-b8576da4-8 jJtPJB">
                            <li className="sc-b8576da4-9 hxzbPU">
                                <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="StyledIconBase-ea9ulj-0 gcdKNa"><path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.356 3.356a1 1 0 0 0 1.414 0l1.586-1.586a1 1 0 0 0 0-1.414l-3.356-3.356a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0zm9.646 10.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708zM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11z"></path></svg>
                                <span>Check the condition of the item</span>
                            </li>
                            <li className="sc-b8576da4-9 hxzbPU">
                                <svg viewBox="0 0 640 512" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="StyledIconBase-ea9ulj-0 gcdKNa"><path fill="currentColor" d="M434.7 64h-85.9c-8 0-15.7 3-21.6 8.4l-98.3 90c-.1.1-.2.3-.3.4-16.6 15.6-16.3 40.5-2.1 56 12.7 13.9 39.4 17.6 56.1 2.7.1-.1.3-.1.4-.2l79.9-73.2c6.5-5.9 16.7-5.5 22.6 1 6 6.5 5.5 16.6-1 22.6l-26.1 23.9L504 313.8c2.9 2.4 5.5 5 7.9 7.7V128l-54.6-54.6c-5.9-6-14.1-9.4-22.6-9.4zM544 128.2v223.9c0 17.7 14.3 32 32 32h64V128.2h-96zm48 223.9c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zM0 384h64c17.7 0 32-14.3 32-32V128.2H0V384zm48-63.9c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16c0-8.9 7.2-16 16-16zm435.9 18.6L334.6 217.5l-30 27.5c-29.7 27.1-75.2 24.5-101.7-4.4-26.9-29.4-24.8-74.9 4.4-101.7L289.1 64h-83.8c-8.5 0-16.6 3.4-22.6 9.4L128 128v223.9h18.3l90.5 81.9c27.4 22.3 67.7 18.1 90-9.3l.2-.2 17.9 15.5c15.9 13 39.4 10.5 52.3-5.4l31.4-38.6 5.4 4.4c13.7 11.1 33.9 9.1 45-4.7l9.5-11.7c11.2-13.8 9.1-33.9-4.6-45.1z"></path></svg>
                                <span>Meet the seller in person</span>
                            </li>
                            <li className="sc-b8576da4-9 hxzbPU">
                                <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="StyledIconBase-ea9ulj-0 gcdKNa"><path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z"></path><path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z"></path></svg>
                                <span>Don’t wire money online</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </ModalZoon>
        </React.Fragment>
    )
}