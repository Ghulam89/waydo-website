import InputAuth from "@components/app/auth/input";

import ButtonAuth from "@components/app/auth/button";
import TermsCondition from "@components/app/auth/terms-condition";
import RequirementList from "@components/app/password/requirements-list";
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from "react";
import { toast } from 'react-toastify';
import { FormSignUpI, SignUpComponentPropsI } from "./signup.interface";

import { useSignUpV1Mutation } from "@redux/rtk/server/v1/auth";
import style from "./signup.module.css";

export default function SignUpComponent({ isModal }: SignUpComponentPropsI) {
    const router = useRouter();

    const [requestRegister, { isLoading }] = useSignUpV1Mutation()
    const [form, setForm] = useState<FormSignUpI>({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    } as FormSignUpI)
    const [passwordValid, setPasswordValid] = useState<boolean>(false)

    const isValidForRegister = useMemo(() => (passwordValid && (Object.keys(form).length === Object.values(form).filter((v) => v).length)), [form, passwordValid])

    const handleUpdateForm = useCallback((name: string, value: string) => {
        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }, [])

    const handleSignUp = useCallback(() => {
        if (!isValidForRegister) {
            return;
        }

        const { password, email, ...data } = form

        requestRegister(form).unwrap().then(() => {
            toast("The user has been successfully created", {
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
            toast(error.message || "Internal server error", {
                type: "error"
            })
        })
    }, [isValidForRegister, form, isModal])

    return (
        <div className={style.box}>
            <div className={style.boxInfo}>
                <h1 className={style.title}>Registrarse</h1>
            </div>
            <div>
                <div className={style.formGroup}>
                    <InputAuth
                        label="First Name"
                        name="firstName"
                        onChange={handleUpdateForm}
                        type="text"
                        value={form.firstName}
                    />
                </div>

                <div className={style.formGroup}>
                    <InputAuth
                        label="Last Name"
                        name="lastName"
                        onChange={handleUpdateForm}
                        type="text"
                        value={form.lastName}
                    />
                </div>
                <div className={style.formGroup}>
                    <InputAuth
                        label="Correo"
                        name="email"
                        onChange={handleUpdateForm}
                        type="text"
                        value={form.email}
                    />
                </div>
                <div className={style.formGroup}>
                    <InputAuth
                        label="Contraseña"
                        name="password"
                        onChange={handleUpdateForm}
                        type="password"
                        value={form.password}
                    />
                </div>
                <div className={style.formGroup}>
                    <RequirementList
                        data={form}
                        password={form.password}
                        handleValid={setPasswordValid}
                    />
                </div>
            </div>
            <div className={style.boxButtons}>
                <ButtonAuth
                    onClick={handleSignUp}
                    loading={isLoading}
                    disabled={!isValidForRegister}
                >
                    Registrarme
                </ButtonAuth>
            </div>
            <div className={style.boxInfo}>
                <TermsCondition />
            </div>
        </div>
    )
}