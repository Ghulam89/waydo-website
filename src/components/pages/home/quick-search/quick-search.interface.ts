import { FuelCarType, TypeCar } from "@redux/slices/filter/filter.interface"

export interface TypeCarI{
    label: string
    img: string
    active?: boolean
    key: TypeCar
}

export interface FuelCarI{
    label: string
    img: string
    active?: boolean
    key: FuelCarType
}