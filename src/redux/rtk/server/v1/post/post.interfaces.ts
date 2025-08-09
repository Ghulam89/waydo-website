import { DeepPartial } from "@interfaces/common";
import { ParamsPetitionCommonI } from "@interfaces/common/petition.interface";
import { PayloadCreateFormPostI } from "@redux/slices/post/post.interface";
import { CarAutonomyI, CarBatteryCapacityI, CarBodyI, CarBrandI, CarChargingTimeI, CarColorI, CarCylinderI, CarDoorI, CarDrivetrainI, CarExtraI, CarFuelI, CarHorsepowerI, CarModelI, CarSeatingI, CarStatusI, CarTransmissionI, CarVersionI } from "../car/car.interfaces";
import { CurrencyI } from "../currency/currency.interfaces";
import { FileI } from "../file/file.interfaces";
import { GeolocationI } from "../location/location.interfaces";
import { UserV1I } from "../me/me.interfaces";

export interface CreatePostResponseI extends PostI {

}


export interface CarPostI {
    mileage: number
    year: number
    interiorColor: CarColorI
    exteriorColor: CarColorI
    extras: CarExtraI[]
    brand: CarBrandI
    cylinder: CarCylinderI
    model: CarModelI
    version: CarVersionI
    seating: CarSeatingI
    transmissionType: CarTransmissionI
    drivetrainType: CarDrivetrainI
    fuelType: CarFuelI
    uuid: string
    createdAt: string
    body: CarBodyI
    door: CarDoorI
    status: CarStatusI
    autonomy: CarAutonomyI
    batteryCapacity: CarBatteryCapacityI
    chargingTime: CarChargingTimeI
    horsepower: CarHorsepowerI
}

export interface PostI {
    title: string
    slug: string
    url: string
    currency: CurrencyI
    price: number
    description: string
    uuid: string
    createdAt: string
    thumbnail: FileI
    pictures: FileI[]
    car: CarPostI
    geolocation: GeolocationI
    creator: UserV1I
}

export interface PayloadCreatePostI extends PayloadCreateFormPostI {
    pictures: File[]
}

export interface GetPostBySlugParamsI extends DeepPartial<ParamsPetitionCommonI> {
    slug: string
}

export interface GetPostsParamsI extends DeepPartial<ParamsPetitionCommonI> {

}

export interface CountPostListBrandParamsI extends DeepPartial<ParamsPetitionCommonI> {
    brandSlug: string
    modelSlug: string
    versionSlug: string
    yearGte: number
    yearLte: number
    priceGte: number
    priceLte: number
    bodies: string[]
    statusCar: string[]
    colorsInterior: string[]
    colorsExterior: string[]
    fuels: string[]
    cylinders: string[]
    horsepowers: string[]
    batteryCapacities: string[]
    chargingTime: string[]
    autonomies: string[]
    transmissions: string[]
    drivetrains: string[]
    doors: number[]
    seatings: number[]
    typeUse: string[]
    cabinType: string[]
    softTopType: string[]
}


export interface CountPostListByBrandAndModelParamsI extends DeepPartial<ParamsPetitionCommonI> {

}

export interface CountPostListByBrandAndModelWithYearParamsI extends DeepPartial<ParamsPetitionCommonI> {

}

export interface GetPostBySlugResponseI extends PostI {

}

export interface GetPostsResponseI {
    data: PostI[]
    count: number
}

export enum TypeGetInfoByImageEnum {
    car = "car"
}

export type TypeGetInfoByImage = `${TypeGetInfoByImageEnum}`

export interface PayloadGetInfoPostByImageI {
    type: TypeGetInfoByImage
    file: File
}

export interface PayloadGetInfoPostByTextI {
    type: TypeGetInfoByImage
    text: string
}

export interface CountPostListBrandResponseI {
    brandUUID: string
    brandName: string
    brandSlug: string
    modelUUID?: string
    modelName?: string
    modelSlug?: string
    year?: number
    totalPost: number
    createdAt: string
    updatedAt: string
    deletedAt: string
}