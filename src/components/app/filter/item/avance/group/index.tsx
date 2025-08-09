import { GroupFilterPropsI } from "./group.interface";

import style from "./group.module.css";

export default function GroupFilter({ title, children }: GroupFilterPropsI) {

    return (
        <div className={style.box}>
            <div className={style.boxTitle}>
                <strong>{title}</strong>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}