import { ListSvgI, RadioButtonHeavyVehicleFormPropsI } from "./truck-type.interface";

import { useMemo } from "react";
import style from "./truck-type.module.css";

import Cabezote from "@svg/heavy-vehicle/Cabezote.svg";
import Camion from "@svg/heavy-vehicle/Camion.svg";
import Chasis from "@svg/heavy-vehicle/Chasis.svg";
import Furgon from "@svg/heavy-vehicle/Furgon.svg";
import Refrigerado from "@svg/heavy-vehicle/Refrigerado.svg";
import Volteo from "@svg/heavy-vehicle/Volteo.svg";

import classNames from "classnames";

export default function RadioButtonTruckTypeForm({ label, active, data, handleClick }: RadioButtonHeavyVehicleFormPropsI) {
    const Svg = useMemo(() => ({
        truck: () => (<Camion />),
        van: () => (<Furgon />),
        chassis: () => (<Chasis />),
        dump_truck: () => (<Volteo />),
        refrigerated_truck: () => (<Refrigerado />),
        tractor_unit: () => (<Cabezote />)
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