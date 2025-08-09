import { IsoCurrencyType } from "@redux/rtk/server/v1/currency/currency.interfaces";
import { PeriodSubscriptionType, RuleSubscriptionI, SubscriptionI } from "@redux/rtk/server/v1/subscription/subscription.interfaces";

export interface ItemSubscriptionPropsI {
    item: SubscriptionI
    active?: boolean
    currency: IsoCurrencyType
    period: PeriodSubscriptionType
}

export interface ListItemSubscriptionI {
    listOne: RuleSubscriptionI[]
    listTwo: RuleSubscriptionI[]
}