import classNames from "classnames";
import { RadioButtonPlainFormPropsI } from "./check.interface";

import { useCallback, useRef } from "react";
import style from "./check.module.css";

export default function CheckButtonForm({ label, active, bold, handleClick }: RadioButtonPlainFormPropsI) {
    const ref = useRef<HTMLInputElement>(null)
    const _handleClick = useCallback(() => {
        if (typeof handleClick == "function") {
            handleClick({
                active: !active
            })
        }
    }, [active])
    return (
        <div className={classNames(style.box)} onClick={_handleClick}>
            <input type="checkbox" ref={ref} checked={active} />
            <span style={bold ? { fontWeight: 700 } : {}}>{label}</span>
        </div>
    )
}