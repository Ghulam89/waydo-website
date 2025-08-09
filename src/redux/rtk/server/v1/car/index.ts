import config from '@config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import paramsSerializerUtils from '@utils/paramsSerializer.utils'
import {
	BodyResponseI,
	BrandCarResponseI,
	CarAutonomyResponseI,
	CarBatteryCapacityResponseI,
	CarCabinTypeResponseI,
	CarChargingTimeResponseI,
	CarColorResponseI,
	CarCylinderResponseI,
	CarDoorResponseI,
	CarDrivetrainResponseI,
	CarExtraResponseI,
	CarFuelResponseI,
	CarHeavyVehicleResponseI,
	CarHorsepowerResponseI,
	CarSeatingResponseI,
	CarSoftTopTypeResponseI,
	CarStatusResponseI,
	CarTransmissionResponseI,
	CarTruckTypeResponseI,
	CarTypeUseResponseI,
	GetAutonomyParamsI,
	GetBatteryCapacityParamsI,
	GetBodyParamsI,
	GetBrandCarParamsI,
	GetCabinTypeParamsI,
	GetChargingTimeParamsI,
	GetColorParamsI,
	GetCylinderParamsI,
	GetDoorParamsI,
	GetDrivetrainParamsI,
	GetExtraParamsI,
	GetFuelParamsI,
	GetHeavyVehicleParamsI,
	GetHorsepowerParamsI,
	GetModelByBrandCarParamsI,
	GetModelCarParamsI,
	GetSeatingParamsI,
	GetSoftTopTypeParamsI,
	GetStatusParamsI,
	GetTransmissionParamsI,
	GetTruckTypeParamsI,
	GetTypeUseParamsI,
	GetVersionParamsI,
	GetYearParamsI,
	ModelCarResponseI,
	YearResponseI
} from './car.interfaces'

export const carV1RTKProvider = createApi({
	reducerPath: 'carV1',
	baseQuery: fetchBaseQuery({
		baseUrl: `${config.server.api}/v1/cars`,
		credentials: 'include',
		paramsSerializer(params) {
			return paramsSerializerUtils(params)
		}
	}),
	endpoints: (builder) => ({
		getBrandsCar: builder.query<BrandCarResponseI, GetBrandCarParamsI>({
			query: (data) => ({
				url: '/brands',
				method: 'GET',
				params: data
			})
		}),
		getModelsCar: builder.query<ModelCarResponseI, GetModelCarParamsI>({
			query: (data) => ({
				url: '/models',
				method: 'GET',
				params: data
			})
		}),
		getModelsByBrandCar: builder.query<ModelCarResponseI, GetModelByBrandCarParamsI>({
			query: (data) => {
				const { brandUUID, ...params } = data
				return ({
					url: `/brands/${brandUUID}/models`,
					method: 'GET',
					params
				})
			}
		}),
		getYearsCar: builder.query<YearResponseI, GetYearParamsI>({
			query: (data) => {
				const { brandUUID, modelUUID, ...params } = data
				return ({
					url: `/brands/${brandUUID}/models/${modelUUID}/years`,
					method: 'GET',
					params
				})
			}
		}),
		getBodies: builder.query<BodyResponseI, GetBodyParamsI>({
			query: (data) => {
				return ({
					url: `/bodies`,
					method: 'GET',
					params: data
				})
			}
		}),
		getColors: builder.query<CarColorResponseI, GetColorParamsI>({
			query: (data) => {
				return ({
					url: `/colors`,
					method: 'GET',
					params: data
				})
			}
		}),
		getCylinders: builder.query<CarCylinderResponseI, GetCylinderParamsI>({
			query: (data) => {
				return ({
					url: `/cylinders`,
					method: 'GET',
					params: data
				})
			}
		}),
		getDoors: builder.query<CarDoorResponseI, GetDoorParamsI>({
			query: (data) => {
				return ({
					url: `/doors`,
					method: 'GET',
					params: data
				})
			}
		}),
		getDrivetrains: builder.query<CarDrivetrainResponseI, GetDrivetrainParamsI>({
			query: (data) => {
				return ({
					url: `/drivetrains`,
					method: 'GET',
					params: data
				})
			}
		}),
		getExtras: builder.query<CarExtraResponseI, GetExtraParamsI>({
			query: (data) => {
				return ({
					url: `/extras`,
					method: 'GET',
					params: data
				})
			}
		}),
		getHorsepowers: builder.query<CarHorsepowerResponseI, GetHorsepowerParamsI>({
			query: (data) => {
				return ({
					url: `/horsepowers`,
					method: 'GET',
					params: data
				})
			}
		}),
		getSeatings: builder.query<CarSeatingResponseI, GetSeatingParamsI>({
			query: (data) => {
				return ({
					url: `/seatings`,
					method: 'GET',
					params: data
				})
			}
		}),
		getStatuses: builder.query<CarStatusResponseI, GetStatusParamsI>({
			query: (data) => {
				return ({
					url: `/statuses`,
					method: 'GET',
					params: data
				})
			}
		}),
		getTransmissions: builder.query<CarTransmissionResponseI, GetTransmissionParamsI>({
			query: (data) => {
				return ({
					url: `/transmissions`,
					method: 'GET',
					params: data
				})
			}
		}),
		getFuels: builder.query<CarFuelResponseI, GetFuelParamsI>({
			query: (data) => {
				return ({
					url: `/fuels`,
					method: 'GET',
					params: data
				})
			}
		}),
		getVersionsCar: builder.query<CarFuelResponseI, GetVersionParamsI>({
			query: (data) => {
				const { brandUUID, modelUUID, ...params } = data
				return ({
					url: `/brands/${brandUUID}/models/${modelUUID}/versions`,
					method: 'GET',
					params
				})
			}
		}),
		getChargingTime: builder.query<CarChargingTimeResponseI, GetChargingTimeParamsI>({
			query: (data) => {
				return ({
					url: `/charging-times`,
					method: 'GET',
					params: data
				})
			}
		}),
		getBatteryCapacity: builder.query<CarBatteryCapacityResponseI, GetBatteryCapacityParamsI>({
			query: (data) => {
				return ({
					url: `/battery-capacities`,
					method: 'GET',
					params: data
				})
			}
		}),
		getAutonomy: builder.query<CarAutonomyResponseI, GetAutonomyParamsI>({
			query: (data) => {
				return ({
					url: `/autonomies`,
					method: 'GET',
					params: data
				})
			}
		}),
		getSoftTopType: builder.query<CarSoftTopTypeResponseI, GetSoftTopTypeParamsI>({
			query: (data) => {
				return ({
					url: `/soft-top-type`,
					method: 'GET',
					params: data
				})
			}
		}),
		getCabinType: builder.query<CarCabinTypeResponseI, GetCabinTypeParamsI>({
			query: (data) => {
				return ({
					url: `/cabin-type`,
					method: 'GET',
					params: data
				})
			}
		}),
		getTypeUse: builder.query<CarTypeUseResponseI, GetTypeUseParamsI>({
			query: (data) => {
				return ({
					url: `/type-use`,
					method: 'GET',
					params: data
				})
			}
		}),
		getHeavyVehicle: builder.query<CarHeavyVehicleResponseI, GetHeavyVehicleParamsI>({
			query: (data) => {
				return ({
					url: `/heavy-vehicles`,
					method: 'GET',
					params: data
				})
			}
		}),
		getTruckType: builder.query<CarTruckTypeResponseI, GetTruckTypeParamsI>({
			query: (data) => {
				return ({
					url: `/truck-types`,
					method: 'GET',
					params: data
				})
			}
		})
	})
})

export const {
	useGetBrandsCarQuery,
	useLazyGetBrandsCarQuery,
	useGetModelsByBrandCarQuery,
	useGetModelsCarQuery,
	useLazyGetModelsByBrandCarQuery,
	useLazyGetModelsCarQuery,
	useGetYearsCarQuery,
	useLazyGetYearsCarQuery,
	useGetBodiesQuery,
	useLazyGetBodiesQuery,
	useGetColorsQuery,
	useGetCylindersQuery,
	useLazyGetColorsQuery,
	useLazyGetCylindersQuery,
	useGetDoorsQuery,
	useGetDrivetrainsQuery,
	useLazyGetDoorsQuery,
	useLazyGetDrivetrainsQuery,
	useGetExtrasQuery,
	useGetHorsepowersQuery,
	useGetSeatingsQuery,
	useGetStatusesQuery,
	useGetTransmissionsQuery,
	useLazyGetExtrasQuery,
	useLazyGetHorsepowersQuery,
	useLazyGetSeatingsQuery,
	useLazyGetStatusesQuery,
	useLazyGetTransmissionsQuery,
	useGetFuelsQuery,
	useLazyGetFuelsQuery,
	useGetVersionsCarQuery,
	useLazyGetVersionsCarQuery,
	useGetBatteryCapacityQuery,
	useGetChargingTimeQuery,
	useLazyGetBatteryCapacityQuery,
	useLazyGetChargingTimeQuery,
	useGetAutonomyQuery,
	useLazyGetAutonomyQuery,
	useGetCabinTypeQuery,
	useGetSoftTopTypeQuery,
	useGetTypeUseQuery,
	useLazyGetCabinTypeQuery,
	useLazyGetSoftTopTypeQuery,
	useLazyGetTypeUseQuery,
	useGetHeavyVehicleQuery,
	useLazyGetHeavyVehicleQuery,
	useGetTruckTypeQuery,
	useLazyGetTruckTypeQuery
} = carV1RTKProvider
