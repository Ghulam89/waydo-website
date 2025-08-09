import { ListSvgI, RadioButtonBodyTypeFormPropsI } from "./body-type.interface";

import { useMemo } from "react";
import style from "./body-type.module.css";

import HeavyVehicles from "@svg/heavy-vehicle/Camion.svg";
import Compact from "@svg/post/car-body-type/compact.svg";
import Convertible from "@svg/post/car-body-type/convertible.svg";
import Coupe from "@svg/post/car-body-type/coupe.svg";
import Jeepeta from "@svg/post/car-body-type/jeepeta.svg";
import Minivan from "@svg/post/car-body-type/minivan.svg";
import Other from "@svg/post/car-body-type/other.svg";
import Sedan from "@svg/post/car-body-type/sedan.svg";
import Truck from "@svg/post/car-body-type/truck.svg";
import Van from "@svg/post/car-body-type/van.svg";
import classNames from "classnames";

export default function RadioButtonBodyTypeForm({ label, active, data, handleClick }: RadioButtonBodyTypeFormPropsI) {
    const Svg = useMemo(() => ({
        compact: () => (<Compact />),
        convertible: () => (<Convertible />),
        coupe: () => (<Coupe />),
        jeepeta: () => (<Jeepeta />),
        minivan: () => (<Minivan />),
        other: () => (<Other />),
        sedan: () => (<Sedan />),
        truck: () => (<Truck />),
        van: () => (<Van />),
        heavy_vehicles: () => (<HeavyVehicles />)
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