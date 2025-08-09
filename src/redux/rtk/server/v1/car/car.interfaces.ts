import { DeepPartial } from "@interfaces/common";
import { ParamsPetitionCommonI } from "@interfaces/common/petition.interface";
import { ColorI } from "../color/color.interfaces";

export interface GetBrandCarParamsI extends DeepPartial<ParamsPetitionCommonI> {

}

export interface GetModelCarParamsI extends DeepPartial<ParamsPetitionCommonI> {

}

export interface GetModelByBrandCarParamsI extends DeepPartial<GetModelCarParamsI> {
	brandUUID: string
}

export interface GetYearParamsI extends DeepPartial<GetModelCarParamsI> {
	brandUUID: string
	modelUUID: string
}

export interface GetBodyParamsI extends DeepPartial<ParamsPetitionCommonI> {

}

export interface GetColorParamsI extends DeepPartial<ParamsPetitionCommonI> {

}

export interface GetCylinderParamsI extends DeepPartial<ParamsPetitionCommonI> {

}

export interface GetDoorParamsI extends DeepPartial<ParamsPetitionCommonI> {

}

export interface GetDrivetrainParamsI extends DeepPartial<ParamsPetitionCommonI> {

}

export interface GetExtraParamsI extends DeepPartial<ParamsPetitionCommonI> {

}

export interface GetHorsepowerParamsI extends DeepPartial<ParamsPetitionCommonI> {

}

export interface GetSeatingParamsI extends DeepPartial<ParamsPetitionCommonI> {

}

export interface GetStatusParamsI extends DeepPartial<ParamsPetitionCommonI> {

}

export interface GetTransmissionParamsI extends DeepPartial<ParamsPetitionCommonI> {

}

export interface GetFuelParamsI extends DeepPartial<ParamsPetitionCommonI> {

}

export interface GetChargingTimeParamsI extends DeepPartial<ParamsPetitionCommonI> {

}

export interface GetBatteryCapacityParamsI extends DeepPartial<ParamsPetitionCommonI> {

}

export interface GetAutonomyParamsI extends DeepPartial<ParamsPetitionCommonI> {

}

export interface GetSoftTopTypeParamsI extends DeepPartial<ParamsPetitionCommonI> {

}

export interface GetCabinTypeParamsI extends DeepPartial<ParamsPetitionCommonI> {

}

export interface GetTypeUseParamsI extends DeepPartial<ParamsPetitionCommonI> {

}

export interface GetHeavyVehicleParamsI extends DeepPartial<ParamsPetitionCommonI> {

}

export interface GetTruckTypeParamsI extends DeepPartial<ParamsPetitionCommonI> {

}

export interface GetVersionParamsI extends DeepPartial<ParamsPetitionCommonI> {
	brandUUID: string
	modelUUID: string
}

export interface CarBrandI {
	createdAt: string
	name: string
	slug: string
	uuid: string
}

export interface CarModelI {
	createdAt: string
	name: string
	slug: string
	uuid: string
}

export interface CarYearI {
	uuid: string
	createdAt: string
	year: number
}

export interface CarBodyI {
	createdAt: string
	name: string
	slug: string
	type: string
	uuid: string
}

export interface CarColorI {
	createdAt: string
	interior: boolean
	exterior: boolean
	color: ColorI
	uuid: string
}

export interface CarCylinderI {
	createdAt: string
	name: string
	slug: string
	cant: number
	uuid: string
}


export interface CarDoorI {
	createdAt: string
	name: string
	slug: string
	cant: number
	uuid: string
}


export interface CarDrivetrainI {
	createdAt: string
	name: string
	slug: string
	type: string
	uuid: string
}


export interface CarExtraI {
	createdAt: string
	name: string
	slug: string
	type: string
	uuid: string
}

export interface CarHorsepowerI {
	createdAt: string
	name: string
	slug: string
	from: number
	to: number
	uuid: string
}

export interface CarChargingTimeI {
	createdAt: string
	name: string
	slug: string
	from: number
	to: number
	uuid: string
}

export interface CarBatteryCapacityI {
	createdAt: string
	name: string
	slug: string
	from: number
	to: number
	uuid: string
}

export interface CarAutonomyI {
	createdAt: string
	name: string
	slug: string
	from: number
	to: number
	uuid: string
}

export interface CarSeatingI {
	createdAt: string
	name: string
	slug: string
	cant: number
	uuid: string
}

export interface CarStatusI {
	createdAt: string
	name: string
	slug: string
	type: string
	uuid: string
}

export interface CarTransmissionI {
	createdAt: string
	name: string
	slug: string
	type: string
	uuid: string
}

export interface CarFuelI {
	createdAt: string
	name: string
	slug: string
	type: string
	uuid: string
}

export interface CarVersionI {
	createdAt: string
	name: string
	slug: string
	uuid: string
}
export interface CarSoftTopTypeI {
	createdAt: string
	name: string
	slug: string
	type: string
	uuid: string
}

export interface CarCabinTypeI {
	createdAt: string
	name: string
	slug: string
	type: string
	uuid: string
}

export interface CarTypeUseI {
	createdAt: string
	name: string
	slug: string
	type: string
	uuid: string
}

export interface CarHeavyVehicleI {
	createdAt: string
	name: string
	slug: string
	type: string
	uuid: string
}

export interface CarTruckTypeI {
	createdAt: string
	name: string
	slug: string
	type: string
	uuid: string
}

export interface BrandCarResponseI {
	count: number
	data: CarBrandI[]
}

export interface ModelCarResponseI {
	count: number
	data: CarModelI[]
}

export interface YearResponseI {
	count: number
	data: CarYearI[]
}

export interface BodyResponseI {
	count: number
	data: CarBodyI[]
}

export interface CarColorResponseI {
	count: number
	data: CarColorI[]
}

export interface CarCylinderResponseI {
	count: number
	data: CarCylinderI[]
}


export interface CarDoorResponseI {
	count: number
	data: CarDoorI[]
}

export interface CarDrivetrainResponseI {
	count: number
	data: CarDrivetrainI[]
}

export interface CarExtraResponseI {
	count: number
	data: CarExtraI[]
}

export interface CarHorsepowerResponseI {
	count: number
	data: CarHorsepowerI[]
}

export interface CarChargingTimeResponseI {
	count: number
	data: CarChargingTimeI[]
}

export interface CarBatteryCapacityResponseI {
	count: number
	data: CarBatteryCapacityI[]
}

export interface CarAutonomyResponseI {
	count: number
	data: CarAutonomyI[]
}

export interface CarSeatingResponseI {
	count: number
	data: CarSeatingI[]
}

export interface CarStatusResponseI {
	count: number
	data: CarStatusI[]
}

export interface CarTransmissionResponseI {
	count: number
	data: CarTransmissionI[]
}

export interface CarFuelResponseI {
	count: number
	data: CarFuelI[]
}


export interface CarSoftTopTypeResponseI {
	count: number
	data: CarSoftTopTypeI[]
}


export interface CarCabinTypeResponseI {
	count: number
	data: CarCabinTypeI[]
}


export interface CarTypeUseResponseI {
	count: number
	data: CarTypeUseI[]
}

export interface CarHeavyVehicleResponseI {
	count: number
	data: CarHeavyVehicleI[]
}

export interface CarTruckTypeResponseI {
	count: number
	data: CarTruckTypeI[]
}