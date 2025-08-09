import Lottie from "lottie-react";
import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";

import LogoSelectMethodPost from "@svg/post/LogoSelectMethodPost.svg";
import classNames from "classnames";
import { ModalFormI, TypeSelectPost } from "./select-type-post.interface";
import style from "./select-type-post.module.css";

import BackHistory from "@components/app/back/history";
import { ModalZoon } from "@components/app/modal";
import SpeechRecognitionComponent from "@components/app/speech-recognition";
import { useAppDispatch } from "@redux/hooks";
import { useGetInfoPostByImageMutation, useGetInfoPostByTextMutation } from "@redux/rtk/server/v1/post";
import { TypeGetInfoByImageEnum } from "@redux/rtk/server/v1/post/post.interfaces";
import { addFileDataCreatePostForm, updateDataCreatePostForm, updateStepCreatePostForm } from "@redux/slices/post";
import Manually from "@svg/post/select-method/Manually.svg";
import React from "react";
import { toast } from "react-toastify";

import audioAnimation from "@animations/post/create/audio.json";
import imageAnimation from "@animations/post/create/image.json";
import AudioSvg from "@svg/post/select-method/Audio.svg";
import ImageSvg from "@svg/post/select-method/Image.svg";
import Image from "next/image";

export default function SelectTypePost({ show: _show = false }: { show: boolean }) {
    const dispatch = useAppDispatch()
    const [modal, setModal] = useState<ModalFormI>({ show: false, type: "none" })
    const [getInfoPostByImage] = useGetInfoPostByImageMutation()
    const [getInfoPostByText] = useGetInfoPostByTextMutation()
    const imageIARef = useRef<HTMLInputElement>(null)

    const isImage = useMemo(() => (modal.type === "image"), [modal.type])
    const isAudio = useMemo(() => (modal.type === "audio"), [modal.type])
    const isLoadingAudio = useMemo(() => (modal.type === "loading-audio"), [modal.type])

    const handleProcessImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const file = Array.from(e.currentTarget.files || [])[0]
        if (!file) return;

        setModal({ show: true, type: "image" })
        getInfoPostByImage({
            file: file,
            type: TypeGetInfoByImageEnum.car
        }).unwrap().then((data) => {
            dispatch(addFileDataCreatePostForm(Object.assign(file, {
                preview: URL.createObjectURL(file)
            })))
            dispatch(updateDataCreatePostForm(data))
            dispatch(updateStepCreatePostForm(1))
        }).catch((e) => {
            toast(e?.data?.error?.message || 'Error al procesar la imagen', {
                type: "error"
            })
        }).finally(() => {
            setModal({ show: false, type: "none" })
        })
    }, [])

    const handleProcessAudio = useCallback((transcript: string) => {
        setModal({ show: true, type: "loading-audio" })

        getInfoPostByText({
            text: transcript,
            type: TypeGetInfoByImageEnum.car
        }).unwrap().then((data) => {
            dispatch(updateDataCreatePostForm(data))
            dispatch(updateStepCreatePostForm(1))
        }).catch(() => {
            toast('Error al procesar el audio', {
                type: "error"
            })
        }).finally(() => {
            setModal({ show: false, type: "none" })
        })
    }, [])

    const types = useMemo(() => {
        return ([
            {
                label: "Quiero hacerlo manualmente.",
                Icon: Manually,
                onClick: () => {
                    dispatch(updateStepCreatePostForm(1))
                }
            },
            {
                label: "Subiré una foto para que la IA lo haga por mí.",
                Icon: ImageSvg,
                onClick: () => {
                    if (imageIARef.current) {
                        imageIARef.current.click()
                    }
                }
            },
            {
                label: "Subiré un audio para que la IA lo haga por mi.",
                Icon: AudioSvg,
                onClick: () => {
                    setModal({ show: true, type: "audio" })
                },
                EmbedButton: ({ children }) => {

                    return (
                        <div className={style.boxSpeecRecognition}>
                            <SpeechRecognitionComponent
                                alwayChildren
                                onStop={({ transcript }) => {
                                    handleProcessAudio(transcript)
                                }}
                            >
                                {() => (
                                    <div className={style.boxIconSpeecRecognition}>
                                        {children}
                                    </div>
                                )}
                            </SpeechRecognitionComponent>

                        </div>
                    )
                }
            }
        ] as TypeSelectPost[])
    }, [imageIARef, SpeechRecognitionComponent, handleProcessAudio, style])

    return (
        <React.Fragment>
            <div className={classNames(style.container, !_show ? style.none : "")}>
                <div className={style.boxBack}>
                    <BackHistory />
                </div>
                <div className={style.contentBox}>
                    <div>
                        <LogoSelectMethodPost />
                    </div>
                    <div>
                        <h1 className={style.title}>¿Cómo quieres publicar?</h1>
                    </div>
                    <div className={style.content}>
                        {types.map((item, i) => (
                            <div className={classNames(style.box)} onClick={item.onClick} key={i}>
                                {item.EmbedButton ? (
                                    <div className={style.button}>
                                        <item.EmbedButton>
                                            <item.Icon />
                                        </item.EmbedButton>
                                    </div>
                                ) : (
                                    <div className={style.button}>
                                        <item.Icon />
                                    </div>
                                )}
                                <p>{item.label}</p>
                            </div>
                        ))}
                    </div>
                    <input ref={imageIARef} type="file" className={style.imageIA} onChange={handleProcessImage} />
                </div>
            </div>
            <ModalZoon show={modal.show} onClose={() => { }}>
                <div className={style.modal}>
                    {isLoadingAudio ? (
                        <div className={style.boxLoadingAudio}>
                            <div>
                                <Image src="/assets/img/loading.gif" alt="loading audio" height={200} width={200} />
                            </div>
                            <p>Estamos procesando el archivo de audio. Este proceso puede tardar unos minutos, ya que estamos extrayendo y completando la información con los datos del audio.</p>
                            <p>Te pedimos que tengas paciencia mientras finalizamos esta tarea.</p>
                        </div>
                    ) : (
                        <React.Fragment>

                            <div className={style.button}>
                                {isImage && (
                                    <ImageSvg />
                                )}

                                {isAudio && (
                                    <AudioSvg />
                                )}
                            </div>

                            <p className={style.textModal}>
                                {isImage && (
                                    <React.Fragment>
                                        Estamos procesando tu imagen, solo nos tomará un momento.
                                    </React.Fragment>
                                )}

                                {isAudio && (
                                    <React.Fragment>
                                        Cuéntanos fuerte y claro la marca, modelo y precio de venta de tu vehículo.
                                    </React.Fragment>
                                )}
                            </p>

                            {isImage && (
                                <div className={style.boxAnimationImage}>
                                    <Lottie animationData={imageAnimation} loop={true} />
                                </div>
                            )}

                            {isAudio && (
                                <div className={style.boxAnimationAudio}>
                                    <Lottie animationData={audioAnimation} loop={true} />
                                </div>
                            )}
                        </React.Fragment>
                    )}
                </div>
            </ModalZoon>
        </React.Fragment>

    )
}