'use client';

import { useLazyGetExtrasItemSubscriptionQuery, useLazyGetSubscriptionQuery } from "@redux/rtk/server/v1/subscription";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import DropdownSubscriptions from "./dropdown";

import { SymbolCurrencyEnum } from "@redux/rtk/server/v1/currency/currency.interfaces";
import { useLazyGetPaymentMethodsQuery } from "@redux/rtk/server/v1/payment-method";
import { ExtraItemSubscriptionI } from "@redux/rtk/server/v1/subscription/subscription.interfaces";
import Link from "next/link";
import React from "react";
import AddPaymentMethod from "./add-payment-method";
import style from "./checkout-subscription.module.css";
import ExtraItemSubscription from "./extra-item";

interface ExtrasI extends ExtraItemSubscriptionI {
    cant: number
}

export default function CheckoutSubscriptionComponent() {
    const [showAddPaymentMethodModal, setShowAddPaymentMethodModal] = useState<boolean>(false)
    const query = useSearchParams()
    const [extras, setExtras] = useState<ExtrasI[]>([])

    const [getSubscription, { isLoading, data: subscription, isFetching }] = useLazyGetSubscriptionQuery()
    const [getExtraItems, { data: extraItemsSubscription }] = useLazyGetExtrasItemSubscriptionQuery()
    const [getPaymentMethods, { isLoading: isLoadingPaymentMethod, data: respPaymentMethod }] = useLazyGetPaymentMethodsQuery()

    const total = useMemo(() => (extras.reduce((a, b) => (a + (b.cant * b.price)), 0) + (subscription?.price || 0)), [extras, subscription])

    const handleCloseAddPaymentMethodModal = useCallback(() => {
        setShowAddPaymentMethodModal(false)
    }, [])

    const handleOpenAddPaymentMethodModal = useCallback(() => {
        setShowAddPaymentMethodModal(true)
    }, [])

    useEffect(() => {
        const uuid = query.get("s")
        if (!uuid) return;


        getSubscription({
            uuid
        })
    }, [query])

    useEffect(() => {
        getExtraItems({
            filters: {
                active: true
            }
        })
    }, [])

    useEffect(() => {
        setExtras(Array.from(extraItemsSubscription?.data || []).map((item) => ({
            ...item,
            cant: 0
        })))
    }, [extraItemsSubscription])

    useEffect(() => {
        getPaymentMethods({})
    }, [])

    return (
        <React.Fragment>
            <div className={style.container}>
                <div className={style.header}>
                    <h2>Paga tu plan</h2>
                    <p>Configura tu plan y elige un método de pago.</p>
                </div>
                <div className={style.boxInfo}>
                    <div className={style.contentInfo}>
                        <div>
                            <DropdownSubscriptions subscription={subscription || null} />
                        </div>

                        <div className={style.boxInclude}>
                            <p><strong>Este plan incluye</strong>: {Array.from(subscription?.rules || []).map((item) => {
                                if (item.type == "statistics") {
                                    return 'dashboard con estadística'
                                } else {
                                    return `${item.cant} ${item.name.toLowerCase()}`
                                }
                            }).join(", ")}.</p>
                        </div>

                        <div className={style.description}>
                            <p><strong>Mejora tu plan</strong>: Aumenta tus posibilidades de vender agregando mejoras para utilizar en tus anuncios.</p>
                        </div>

                        <div className={style.boxExtraItem}>
                            <ul>
                                {Array.from(extraItemsSubscription?.data || []).map((item, i) => (
                                    <li key={`extra-item-${i}`}>
                                        <ExtraItemSubscription
                                            title={item.name}
                                            onChangeCant={(cant) => {
                                                setExtras(extras.map((ex) => {
                                                    if (ex.uuid == item.uuid) {
                                                        ex.cant = cant
                                                    }
                                                    return ex
                                                }))
                                            }}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className={style.boxSummary}>
                        <div>
                            <div className={style.contentSumamry}>
                                <h4>Resumen</h4>
                            </div>
                            <div>
                                <div className={style.contentPlan}>
                                    <div className={style.plan}>
                                        <span>Plan :{subscription?.name || ""}{subscription?.period === "annual" ? (<span style={{ fontSize: ".7em", position: "relative", top: -5 }}>(Anual)</span>) : ""}</span>
                                    </div>
                                    <div>
                                        <span>{
                                            //@ts-ignore
                                            SymbolCurrencyEnum[subscription?.currency.iso3]
                                        }{(subscription?.price || 0).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        })}</span>
                                    </div>
                                </div>
                                <div className={style.summaryPrice}>
                                    <strong className={style.titleExtra}>Adicionales</strong>
                                    <ul className={style.extrasContent}>
                                        {extras.map((extra, i) => (
                                            <li key={`extra-item-summary-${i}`}>
                                                <div>
                                                    <span>{extra.cant} {extra.name}:</span>
                                                </div>
                                                <div>
                                                    <span>${extra.price * extra.cant}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className={style.boxPrice}>
                                    <div>
                                        <strong>Total:</strong>
                                    </div>
                                    <div>
                                        <strong>{
                                            //@ts-ignore
                                            SymbolCurrencyEnum[subscription?.currency.iso3]}{total.toLocaleString(undefined, {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                            })}</strong>
                                    </div>
                                </div>
                                <div className={style.boxButtom}>
                                    <button className={style.buttonPay}>PAGAR</button>
                                    <p>
                                        Al comprar este plan, aceptas las <Link href={"#"}>politicas de
                                            privacidad</Link> y <Link href={"#"}>términos de uso</Link> de Waydo.do
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div>
                    <div className={style.paymentMethod}>
                        <h2>Información de pago</h2>
                        <p>Elige un método de pago</p>
                    </div>

                    <div className={style.infoBoxPaymentMethod}>
                        {!Array.from(respPaymentMethod?.data || []).length && (
                            <p>Aun no haz agregado un metodo de pago</p>
                        )}
                    </div>
                    <div className={style.boxButtonPaymentMethod}>
                        <button onClick={handleOpenAddPaymentMethodModal}>Agregar método de pago</button>
                    </div>
                </div>
            </div>
            <AddPaymentMethod
                show={showAddPaymentMethodModal}
                onClose={handleCloseAddPaymentMethodModal}
            />
        </React.Fragment>
    )
}