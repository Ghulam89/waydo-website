import { FuelCarEnum, TypeCarEnum } from "@redux/slices/filter/filter.interface";
import { FuelCarI, TypeCarI } from "./quick-search.interface";

export const TYPE_CARS_DATA: TypeCarI[] = [
    {
        label: "Compacto",
        img: "/assets/img/quick-search/compact.png",
        key: TypeCarEnum.compact
    }, {
        label: "Sedan",
        img: "/assets/img/quick-search/sedan.png",
        key: TypeCarEnum.sedan
    }, {
        label: "Jeepeta",
        img: "/assets/img/quick-search/jeepeta.png",
        key: TypeCarEnum.jeepeta
    }, {
        label: "Camioneta",
        img: "/assets/img/quick-search/truck.png",
        key: TypeCarEnum.truck
    }, {
        label: "Coupe",
        img: "/assets/img/quick-search/couper.png",
        key: TypeCarEnum.coupe
    }, {
        label: "Convertible",
        img: "/assets/img/quick-search/convertible.png",
        key: TypeCarEnum.convertible
    }, {
        label: "Minivan",
        img: "/assets/img/quick-search/minivan.png",
        key: TypeCarEnum.minivan
    }, {
        label: "Furgoneta",
        img: "/assets/img/quick-search/van.png",
        key: TypeCarEnum.van
    }
]

export const FUEL_CAR_DATA: FuelCarI[] = [
    {
        label: "Gasolina",
        img: "/assets/img/quick-search/petrol.png",
        key: FuelCarEnum.petrol
    }, {
        label: "Gas",
        img: "/assets/img/quick-search/gas.png",
        key: FuelCarEnum.gas
    }, {
        label: "Diesel",
        img: "/assets/img/quick-search/diesel.png",
        key: FuelCarEnum.diesel
    }, {
        label: "Electrico",
        img: "/assets/img/quick-search/electric.png",
        key: FuelCarEnum.electric
    }, {
        label: "Hibrido",
        img: "/assets/img/quick-search/hybrid.png",
        key: FuelCarEnum.hybrid
    }
]