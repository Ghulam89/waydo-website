import { RadioButtonPlainFormPropsI } from "./plain.interface";

import classNames from "classnames";
import style from "./plain.module.css";

export default function RadioButtonForm({ label, active, bold, handleClick, execute }: RadioButtonPlainFormPropsI) {

    const _handleClick = () => {
        if (typeof handleClick == "function") {
            handleClick({ active: !active })
        }
    }

    return (
        <div className={classNames(style.box, execute ? style.executeBox : "", execute && active ? style.executeBoxActive : "")} onClick={_handleClick}>
            <span style={bold ? { fontWeight: 700 } : {}}>{label}</span>
        </div>
    )
}