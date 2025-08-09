import classNames from "classnames";
import { InputAuthPropsI } from "./input.interface";

import { ChangeEvent, useCallback, useMemo, useState } from "react";
import style from "./input.module.css";

import EyeClosed from "@svg/EyeClosed.svg";

export default function InputAuth({ label, name, onChange, type, defaultValue, value }: InputAuthPropsI) {
    const [focus, setFocus] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const forceText = useMemo(() => (type === "password" && showPassword), [type, showPassword])

    const handleEnter = useCallback(() => {
        setFocus(true)
    }, [])

    const handleOut = useCallback(() => {
        setFocus(false)
    }, [])

    const handleChangeModePassword = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setShowPassword((prev) => (!prev))
    }, [])

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget
        onChange(name, value)
    }, [])

    return (
        <div className={classNames(style.boxInput, focus ? style.boxInputFocus : "")}>
            <input
                type={forceText ? "text" : type}
                name={name}
                className={style.input}
                {...(defaultValue ? { defaultValue } : {})}
                {...(value ? { value } : {})}
                placeholder={label}
                onBlur={handleOut}
                onFocus={handleEnter}
                onChange={handleChange}
            />
            {type === "password" && (
                <button
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleChangeModePassword(event)}
                    className={style.boxModePassword}
                    type="button"
                >
                    <EyeClosed />
                </button>
            )}
        </div>
    )
}