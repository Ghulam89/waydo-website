import { useRouter } from 'next/navigation'
import AuthButton from "../button/auth"

import Car from "@svg/auth/car.svg"
import Apple from "@svg/socials/icons/apple.svg"
import Email from "@svg/socials/icons/email.svg"
import Facebook from "@svg/socials/icons/facebook.svg"
import Google from "@svg/socials/icons/google.svg"

import { useAppDispatch } from '@redux/hooks'
import { updateLayout } from '@redux/slices/layout'
import Link from "next/link"
import { useCallback } from 'react'
import style from "./auth.module.css"

import firebaseProvider from '@providers/firebase/firebase.provider'
import { useAuthSocialV1Mutation } from '@redux/rtk/server/v1/auth'
import classNames from 'classnames'
import { toast } from 'react-toastify'
import { AuthComponentPropsI } from './auth.interface'


const AuthComponent = ({ isModal }: AuthComponentPropsI) => {
    const dispatch = useAppDispatch()
    const router = useRouter();
    const [requestAuthSocial, { isLoading }] = useAuthSocialV1Mutation()

    const handleCloseModalAuth = useCallback(() => {
        dispatch(
            updateLayout({
                showModalAuth: false
            })
        );
    }, [])

    const handleGoSigninAuth = useCallback(() => {
        handleCloseModalAuth()
        router.push("/auth/signin")
    }, [])

    const handleAuthGoogle = useCallback(() => {
        firebaseProvider.auth.social.google().then(resp => {
            if (!resp.idToken) return toast("Unauthorized", {
                type: "error"
            })

            requestAuthSocial({
                token: resp.idToken
            }).unwrap().then(() => {
                toast("User successfully logged in", {
                    type: "success",
                    onClose: () => {
                        if (isModal) {
                            location.reload()
                        } else {
                            router.push("/")
                        }
                    }
                })
            }).catch((error) => {
                toast(error?.data?.error?.message || "Internal server error", {
                    type: "error"
                })
            })
        }).catch(() => {

        })



    }, [])
    
    const handleAuthFacebook = useCallback(() => {
        firebaseProvider.auth.social.facebook().then((resp) => {
            if (!resp.idToken) return toast("Unauthorized", {
                type: "error"
            })

            requestAuthSocial({
                token: resp.idToken
            }).unwrap().then(() => {
                toast("User successfully logged in", {
                    type: "success",
                    onClose: () => {
                        if (isModal) {
                            location.reload()
                        } else {
                            router.push("/")
                        }
                    }
                })
            }).catch((error) => {
                toast(error?.data?.error?.message || "Internal server error", {
                    type: "error"
                })
            })
        }).catch(() => {

        })
    }, [])

    const handleAuthApple = useCallback(() => {
        firebaseProvider.auth.social.apple().then((resp) => {
            if (!resp.idToken) return toast("Unauthorized", {
                type: "error"
            })

            requestAuthSocial({
                token: resp.idToken
            }).unwrap().then(() => {
                toast("User successfully logged in", {
                    type: "success",
                    onClose: () => {
                        if (isModal) {
                            location.reload()
                        } else {
                            router.push("/")
                        }
                    }
                })
            }).catch((error) => {
                toast(error?.data?.error?.message || "Internal server error", {
                    type: "error"
                })
            })
        }).catch(() => {

        })
    }, [])

    return (
        <div className={classNames(style.box, style.boxModal)}>
            <div className={style.boxInfo}>
                <div className={style.boxImage}>
                    <Car />
                </div>
                <h1 className={style.title}>Iniciar sesión</h1>
            </div>
            <div className={style.boxButton}>
                <AuthButton Logo={Facebook} content="Continuar con Facebook" onClick={handleAuthFacebook} disabled />
                <AuthButton Logo={Google} content="Continuar con Google" onClick={handleAuthGoogle} />
                <AuthButton Logo={Apple} content="Continuar con Apple" onClick={handleAuthApple} disabled />
                <AuthButton
                    Logo={Email}
                    content="Continuar con el correo"
                    onClick={handleGoSigninAuth}
                />
            </div>
            <div className={style.boxInfo}>
                <div>
                    <p className={style.text1}>¿No tienes una cuenta? <Link href="/auth/signup" className={style.text1Link}>Crea una</Link></p>
                </div>
                <div>
                    <p className={style.text2}>Al iniciar sesión acepto los <Link href="/terms-and-conditions" className={style.text2Link}>Términos y Condiciones</Link> y <Link href="/privacy-policies" className={style.text2Link}>Políticas de Privacidad</Link></p>
                </div>
            </div>
        </div>
    )
}

export default AuthComponent