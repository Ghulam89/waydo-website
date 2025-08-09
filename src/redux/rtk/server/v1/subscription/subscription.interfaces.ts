import { DeepPartial } from "@interfaces/common"
import { ParamsPetitionCommonI } from "@interfaces/common/petition.interface"
import { CurrencyI } from "../currency/currency.interfaces"

export interface GetSubscriptioParamsI extends DeepPartial<ParamsPetitionCommonI> {

}

export interface GetOneSubscriptioParamsI extends DeepPartial<ParamsPetitionCommonI> {
    uuid: string
}


export interface GetExtraItemSubscriptioParamsI extends DeepPartial<ParamsPetitionCommonI> {

}

export interface RuleSubscriptionI {
    cant: number
    createdAt: string
    name: string
    slug: string
    type: TypeSubscriptionType
    uuid: string
}


export interface SubscriptionI {
    currency: CurrencyI
    createdAt: string
    discountPercentage: number
    duration: number
    name: string
    period: PeriodSubscriptionType
    price: number
    type: TypeSubscription
    uuid: string
    rules: RuleSubscriptionI[]
}

export interface GetSubscriptionResponseI {
    data: SubscriptionI[]
    count: number
}

export enum TypeSubscriptionItemEnum {
    boost_ads = "boost_ads",
    featured_ads = "featured_ads",
    statistics = "statistics",
    branches = "branches",
    carfax = "carfax",
}
export type TypeSubscriptionItem = `${TypeSubscriptionItemEnum}`

export interface ExtraItemSubscriptionI {
    uuid: string;
    name: string;
    slug: string;
    price: number;
    type: TypeSubscriptionItem;
}

export interface GetExtrasItemSubscriptionResponseI {
    data: ExtraItemSubscriptionI[]
    count: number
}

export enum PeriodSubscriptionEnum {
    daily = "daily",
    weekly = "weekly",
    monthly = "monthly",
    quarterly = "quarterly",
    annual = "annual"
}

export enum FrequencyAbbreviationEnum {
    daily = "d",
    weekly = "w",
    monthly = "mo",
    quarterly = "q",
    annual = "y"
};


export type PeriodSubscriptionType = `${PeriodSubscriptionEnum}`

export enum TypeSubscriptionTypeEnum {
    announcements = "announcements",
    boost_ads = "boost_ads",
    featured_ads = "featured_ads",
    statistics = "statistics",
    branches = "branches",
}

export type TypeSubscriptionType = `${TypeSubscriptionTypeEnum}`

export enum TypeSubscriptionEnum {
    basic = "basic",
    standard = "standard",
    medium = "medium",
    large = "large",
    xl = "xl",
}

export type TypeSubscription = `${TypeSubscriptionEnum}`