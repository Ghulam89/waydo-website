'use client';

import { useLazyGetSubscriptionsQuery } from "@redux/rtk/server/v1/subscription";
import ItemSubscription from "./item";

import { Switch } from "@mui/material";
import { IsoCurrencyEnum, IsoCurrencyType } from "@redux/rtk/server/v1/currency/currency.interfaces";
import { PeriodSubscriptionEnum, PeriodSubscriptionType } from "@redux/rtk/server/v1/subscription/subscription.interfaces";
import React, { useEffect, useMemo, useState } from "react";
import style from "./subscriptions.module.css";

export default function SubscriptionComponent() {
  const [currency, setCurrency] = useState<IsoCurrencyType>(IsoCurrencyEnum.DOP)
  const [period, setPeriod] = useState<PeriodSubscriptionType>(PeriodSubscriptionEnum.monthly)
  const [getSubscriptions, { isLoading, data: subscriptionResp, isFetching }] = useLazyGetSubscriptionsQuery();

  const subscriptions = useMemo(() => (Array.from(subscriptionResp?.data || [])), [subscriptionResp?.data])
  const midNumberItems = useMemo(() => (Math.ceil(subscriptions.length / 2) - 1), [subscriptions])

  useEffect(() => {
    getSubscriptions({
      filters: {
        "currency.iso3": currency,
        "period": period,
        active: true
      },
      sort: ["price", "ASC"]
    })
  }, [currency, period])

  return (
    <div >
      <div className={style.contentPeriod}>
        <div className={style.boxPeriod}>
          <span className={period === PeriodSubscriptionEnum.monthly ? style.active : ""}>Mensual</span>
          <div>
            <Switch
              checked={period === PeriodSubscriptionEnum.annual}
              onChange={(e) => {
                setPeriod(e.currentTarget.checked ? PeriodSubscriptionEnum.annual : PeriodSubscriptionEnum.monthly)
              }}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: 'var(--color-subscription)',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: 'var(--color-subscription)',
                },
                '& .MuiSwitch-switchBase': {
                  color: 'var(--color-subscription)',
                },
                '& .MuiSwitch-track': {
                  backgroundColor: 'var(--color-subscription)',
                },
              }}
            />
          </div>
          <span className={period === PeriodSubscriptionEnum.annual ? style.active : ""}>Anual</span>
        </div>
      </div>
      <div className={style.contentItems}>
        {subscriptions.map((subscription, i) => (
          <React.Fragment key={i}>
            <ItemSubscription item={subscription} active={midNumberItems == i} currency={currency} period={period} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
