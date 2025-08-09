import { PaginationParamsPetitionCommonI } from "@interfaces/common/petition.interface"
import { PostI } from "@redux/rtk/server/v1/post/post.interfaces"

export interface IFile extends File {
	preview: string
}

export interface FileDataCreateFormPostI {
	file: IFile
	isMain?: boolean
}

export enum PostTypeEnum {
	car = "car",
	house = "house",
	service = "service"
}

export type PostType = `${PostTypeEnum}`

export interface LocationPayloadCreateFormPostI {
	address: string
	formattedAddress?: string
	lat: number
	lng: number
}

export interface PayloadCreateFormPostI {
	extras: string[]
	truckTypeUUID: string
	truckTypeSlug: string
	heavyVehicleUUID: string
	heavyVehicleSlug: string
	softTopTypeUUID: string
	softTopTypeSlug: string
	cabinTypeUUID: string
	typeUseUUID: string
	typeUseSlug: string
	cabinTypSlug: string
	bodyUUID: string
	bodySlug: string
	brandUUID: string
	brandSlug: string
	type: PostType
	modelUUID: string
	modelSlug: string
	versionUUID: string
	versionSlug: string
	yearUUID: string
	years: number[]
	mileage: number
	currencyUUID: string
	currencySlug: string
	title: string
	description: string
	price: number
	carStatusUUID: string
	carStatusSlug: string
	interiorColorUUID: string
	interiorColorSlug: string
	exteriorColorUUID: string
	exteriorColorSlug: string
	fuelTypeUUID: string
	fuelTypeSlug: string
	transmissionUUID: string
	transmissionSlug: string
	drivetrainUUID: string
	drivetrainSlug: string
	doorUUID: string
	door: number
	seatingUUID: string
	seating: number
	cyliderUUID: string
	cylider: number
	horsepowerUUID: string
	horsepower: number[]
	location: LocationPayloadCreateFormPostI
	address: string
	batteryCapacityUUID: string
	chargingTimeUUID: string
	autonomyUUID: string
}

export interface DataCreateFormPostI extends PayloadCreateFormPostI {
	pictures: FileDataCreateFormPostI[]
}

export interface CreateFormPostI {
	data: DataCreateFormPostI
	step: number
}

export interface ListPostI {
	pagination: PaginationParamsPetitionCommonI
	loading: boolean
	total: number
	data: PostI[]
}

export interface PostSliceI {
	createForm: CreateFormPostI
	list: ListPostI
}
