import classNames from "classnames";
import { RadioButtonColorFormPropsI } from "./color.interface";

import style from "./color.module.css";

export default function RadioButtonColorForm({ label, active, data, execute, handleClick }: RadioButtonColorFormPropsI) {
    const _handleClick = () => {
        if (typeof handleClick == "function") {
            handleClick({ active: !active })
        }
    }

    return (
        <div className={classNames(style.box, execute ? style.executeBox : "", execute && active ? style.executeBoxActive : "")} onClick={_handleClick}>
            <div style={{ background: data?.color }} className={style.boxColor}></div>
            <span>{label}</span>
        </div>
    )
}