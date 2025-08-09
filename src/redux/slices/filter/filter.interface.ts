import { DeepPartial, ObjectI } from "@interfaces/common";
import { SortTableType } from "@interfaces/common/petition.interface";

export interface PayloadRenderItemBarPageFilterSliceI {
	items: any[] | any;
	value: any;
	slug: string;
	typpeInstance?: any;
	placeholder?: string;
	index: number;
}

export interface RenderItemBarPageFilterSliceI {
	(payload: PayloadRenderItemBarPageFilterSliceI): React.ReactElement;
}

export interface ItemBarPageFilterSliceI {
	label: string;
	items: any[] | any;
	isRange?: boolean;
	slug?: string;
	value?: string;
	placeholder?: string;
	render: RenderItemBarPageFilterSliceI;
}

export interface BarPageFilterSliceI {
	brand: ItemBarPageFilterSliceI;
	model: ItemBarPageFilterSliceI;
	year: ItemBarPageFilterSliceI;
	priceRange: ItemBarPageFilterSliceI;
	zone: ItemBarPageFilterSliceI;
}

export enum TypeCarEnum {
	compact = "compact",
	convertible = "convertible",
	coupe = "coupe",
	jeepeta = "jeepeta",
	minivan = "minivan",
	sedan = "sedan",
	truck = "truck",
	van = "van"
}

export type TypeCar = `${TypeCarEnum}`

export enum FuelCarEnum {
	petrol = "petrol",
	gas = "gas",
	diesel = "diesel",
	electric = "electric",
	hybrid = "hybrid"
}

export enum KeySortEnum {
	default = "default",
	newest_to_oldest = "newest-to-oldest",
	oldest_to_newest = "oldest-to-newest",
	kilometers_highest_to_lowest = "kilometers-highest-to-lowest",
	kilometers_lowest_to_highest = "kilometers-lowest-to-highest",
	price_highest_to_lowest = "price-highest-to-lowest",
	price_lowest_to_highest = "price-lowest-to-highest"
}

export type FuelCarType = `${FuelCarEnum}`

export interface PayloadFilterSliceI {
	data: [string, SortTableType | null] | [];
	key: string;
	label: string;
}

export interface BarFilterSliceI {

}

export interface AvanceFilterI {
	priceGte: number | null
	priceLte: number | null
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
	softTopType: string[]
	cabinType: string[]
	typeUse: string[]
	heavyVehicles: string[]
	truckTypes: string[]
	extras: string[]
	sellers: string[]
	date: string[]
}

export interface FilterSliceI extends AvanceFilterI {
	search: string;
	sort: PayloadFilterSliceI;
	brandUUID: string
	brandSlug: string
	brandName: string
	modelUUID: string
	modelSlug: string
	modelName: string
	versionUUID: string
	versionSlug: string
	versionName: string
	yearGte: number | null
	yearLte: number | null
	filterFormatted: ObjectI
	avanceFilterState: AvanceFilterI
}

export interface DataPayloadUpdateBarPageFilterSliceI {
	value: string | any[] | ObjectI;
	slug: string | any[] | ObjectI;
	placeholder?: string;
	items: any[] | any;
}

export enum TypePayloadUpdateBarPageFilterEnum {
	brand = "brand",
	model = "model",
	year = "year",
	priceRange = "priceRange",
	zone = "zone"
}

export type TypePayloadUpdateBarPageFilter = `${TypePayloadUpdateBarPageFilterEnum}`

export interface PayloadUpdateBarPageFilterSliceI {
	type: string;
	payload: DeepPartial<DataPayloadUpdateBarPageFilterSliceI>;
}
