import { ListSvgI, RadioButtonHeavyVehicleFormPropsI } from "./heavy-vehicle.interface";

import { useMemo } from "react";
import style from "./heavy-vehicle.module.css";

import Bus from "@svg/heavy-vehicle/Bus.svg";
import HeavyVehicles from "@svg/heavy-vehicle/Camion.svg";
import Other from "@svg/post/car-body-type/other.svg";

import classNames from "classnames";

export default function RadioButtonHeavyVehicleForm({ label, active, data, handleClick }: RadioButtonHeavyVehicleFormPropsI) {
    const Svg = useMemo(() => ({
        trucks: () => (<HeavyVehicles />),
        bus: () => (<Bus />),
        others: () => (<Other />)
    }), []) as { [key: string]: ListSvgI }

    return (
        <div className={classNames(style.box)} onClick={() => {
            if (typeof handleClick == "function") {
                handleClick({ active: !active })
            }
        }}>
            {typeof Svg[data.type] == "function" && (
                <div className={style.boxImage}>
                    {Svg[data.type]()}
                </div>
            )}
            <span>{label}</span>
        </ div>
    )
}