import { DeepPartial } from "@interfaces/common";
import { ParamsPetitionCommonI } from "@interfaces/common/petition.interface";

export interface GetCityParamsI extends DeepPartial<ParamsPetitionCommonI> {

}

export interface GetProvinceByCityParamsI extends DeepPartial<ParamsPetitionCommonI> {
	cityUUID: string
}

export interface CityI {
	createdAt: string
	uuid: string
	name: string
	slug: string
}

export interface ProvinceI {
	createdAt: string
	uuid: string
	name: string
	slug: string
}

export interface GeolocationI {
	address: string
	city: CityI
	createdAt: string
	latitude: number
	longitude: number
	province: ProvinceI
	radius: number
	uuid: string
}

export interface GetCityResponseI {
	count: number
	data: CityI[]
}

export interface GetProvinceResponseI {
	count: number
	data: ProvinceI[]
}
