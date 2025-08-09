import { DeepPartial } from "@interfaces/common";
import { ParamsPetitionCommonI } from "@interfaces/common/petition.interface";

export interface GetCurrencyParamsI extends DeepPartial<ParamsPetitionCommonI> {

}

export enum IsoCurrencyEnum {
	DOP = "DOP",
	USD = "USD",
	WCASH = "WCash"
}

export type IsoCurrencyType = `${IsoCurrencyEnum}`


export enum SymbolCurrencyEnum {
	USD = "$",    // Dólar estadounidense
	EUR = "€",    // Euro
	GBP = "£",    // Libra esterlina
	JPY = "¥",    // Yen japonés
	CNY = "¥",    // Yuan chino
	INR = "₹",    // Rupia india
	AUD = "A$",   // Dólar australiano
	CAD = "C$",   // Dólar canadiense
	CHF = "CHF",  // Franco suizo
	NZD = "NZ$",  // Dólar neozelandés
	SEK = "kr",   // Corona sueca
	NOK = "kr",   // Corona noruega
	DKK = "kr",   // Corona danesa
	RUB = "₽",    // Rublo ruso
	BRL = "R$",   // Real brasileño
	MXN = "$",    // Peso mexicano
	ZAR = "R",    // Rand sudafricano
	KRW = "₩",    // Won surcoreano
	SGD = "S$",   // Dólar de Singapur
	HKD = "HK$",  // Dólar de Hong Kong
	MYR = "RM",   // Ringgit malayo
	IDR = "Rp",   // Rupia indonesia
	TRY = "₺",    // Lira turca
	THB = "฿",    // Baht tailandés
	PLN = "zł",   // Zloty polaco
	PHP = "₱",    // Peso filipino
	SAR = "﷼",    // Riyal saudí
	AED = "د.إ",   // Dirham de los Emiratos Árabes Unidos
	DOP = "RD$", // Peso dominicano
	WCash = "₩C" // WayCash Digital
}

export type SymbolCurrencyType = `${SymbolCurrencyEnum}`

export interface CurrencyI {
	createdAt: string
	name: string
	iso3: IsoCurrencyType
	uuid: string
}

export interface CurrencyResponseI {
	count: number
	data: CurrencyI[]
}
