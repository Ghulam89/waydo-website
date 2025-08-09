import { useState } from "react";
import { ExtraItemSubscriptionPropsI } from "./extra-item.interface";

import style from "./extra-item.module.css";

export default function ExtraItemSubscription({ onChangeCant, title }: ExtraItemSubscriptionPropsI) {
    const [cant, setCant] = useState<number>(0)

    const handleChangeCant = (cant: number) => {
        if (cant < 0) {
            cant = 0
        }

        setCant(cant)
        onChangeCant(cant)
    }

    return (
        <div className={style.content}>
            <div>
                <strong>{title}</strong>
            </div>
            <div className={style.boxCounter}>
                <div>
                    <div onClick={() => (handleChangeCant(cant - 1))}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="7.287" height="1.508" viewBox="0 0 7.287 1.508">
                            <rect width="1.508" height="7.287" rx="0.754" transform="translate(7.287) rotate(90)" fill="#9c9c9c" />
                        </svg>
                    </div>
                    <div>
                        <span><b>{cant}</b></span>
                    </div>
                    <div onClick={() => (handleChangeCant(cant + 1))}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7">
                            <path d="M2.655,6.276V4.225H.724a.724.724,0,0,1,0-1.448H2.655V.725A.724.724,0,1,1,4.1.725V2.776H6.277a.724.724,0,0,1,0,1.448H4.1V6.276a.724.724,0,1,1-1.448,0Z" fill="#9c9c9c" />
                        </svg>

                    </div>

                </div>
            </div>
        </div>
    )
}