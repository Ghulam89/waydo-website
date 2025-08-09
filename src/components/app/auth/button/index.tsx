import classNames from "classnames";
import React, { useCallback } from "react";
import { Rings } from "react-loader-spinner";
import { ButtonAuthPropsI } from "./button.interface";
import style from "./button.module.css";

export default function ButtonAuth({
    children,
    onClick,
    disabled,
    loading,
    type = "button"
}: ButtonAuthPropsI) {

    const handleClick = useCallback(() => {
        if (disabled || loading) return;

        onClick()
    }, [disabled, loading, onClick])

    return (
        <button
            className={classNames(style.button, disabled ? style.buttonDisabled : "", loading ? style.buttonLoading : "")}
            onClick={handleClick}
            type={type}
            disabled={disabled}
        >
            {loading ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Rings
                        visible={true}
                        height="25"
                        width="25"
                        color="var(--primary-color-transparent)"
                        ariaLabel="rings-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            ) : (
                <React.Fragment>
                    {children}
                </React.Fragment>
            )}
        </button>
    )
}