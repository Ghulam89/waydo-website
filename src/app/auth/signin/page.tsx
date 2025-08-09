"use client";

import ButtonAuth from "@components/app/auth/button";
import InputAuth from "@components/app/auth/input";
import TermsCondition from "@components/app/auth/terms-condition";
import BackHistory from "@components/app/back/history";
import { useSignInV1Mutation } from "@redux/rtk/server/v1/auth";
import { SignInPayloadV1I } from "@redux/rtk/server/v1/auth/auth.interfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import style from "./page.module.css";

export default function Signin() {
  const router = useRouter();
  const [requestSignIn, { isLoading }] = useSignInV1Mutation();

  const [form, setForm] = useState<SignInPayloadV1I>({
    email: "",
    password: "",
  });

  const isValidForRegister = useMemo(
    () =>
      Object.keys(form).length === Object.values(form).filter((v) => v).length,
    [form]
  );

  const handleUpdateForm = useCallback((name: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSignIn = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   router.push("/");
    // requestSignIn(form)
    //   .unwrap()
    //   .then(() => {
    //     toast("Sesión iniciada", {
    //       type: "success",
    //       autoClose: 1500,
    //       onClose: () => {
    //         router.push("/");
    //       },
    //     });
    //   })
    //   .catch((error) => {
    //     toast(error?.data?.error?.message || "Internal server error", {
    //       type: "error",
    //     });
    //   });
  }, [form]);

  return (
    <div className={style.component}>
      <BackHistory />
      <div className={style.main}>
        <form className={style.box} onSubmit={e => handleSignIn(e)}>
          <div className={style.boxInfo}>
            <h1 className={style.title}>Accede con tu correo</h1>
          </div>
          <div>
            <div className={style.formGroup}>
              <InputAuth
                label="Correo"
                name="email"
                onChange={handleUpdateForm}
                type="text"
              />
            </div>
            <div className={style.formGroup}>
              <InputAuth
                label="Contraseña"
                name="password"
                onChange={handleUpdateForm}
                type="password"
              />
            </div>
          </div>
          <div className={style.boxButtons}>
            <ButtonAuth
              onClick={() => { }}
              disabled={!isValidForRegister}
              loading={isLoading}
              type="submit"
            >
              Acceder
            </ButtonAuth>
          </div>
          <div className={style.boxInfo}>
            <div>
              <p>
                <Link href="/auth/forgot-password" className={style.link}>
                  ¿Olvidaste tu contraseña?
                </Link>
              </p>
            </div>
            <TermsCondition />
          </div>
        </form>
      </div>
    </div>
  );
}
