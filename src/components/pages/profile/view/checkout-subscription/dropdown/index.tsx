import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useLazyGetSubscriptionsQuery } from "@redux/rtk/server/v1/subscription";
import { SubscriptionI } from "@redux/rtk/server/v1/subscription/subscription.interfaces";
import { insertByCondition } from "@utils/object/object.util";
import { useRouter, useSearchParams } from "next/navigation";
import { DropdownSubscriptionsPropsI } from "./dropdown.interface";
import style from "./dropdown.module.css";

const COLORS = {
    basic: {
        backgroundColor: "#1E90FF",
        color: "#333333"
    },
    standard: {
        backgroundColor: "#32CD32",
        color: "#333333"
    },
    medium: {
        backgroundColor: "#FFA500",
        color: "#333333"
    },
    large: {
        backgroundColor: "#DC143C",
        color: "#333333"
    },
    xl: {
        backgroundColor: "#FFD700",
        color: "#333333"
    }
}

export default function DropdownSubscriptions({ subscription }: DropdownSubscriptionsPropsI) {
    const router = useRouter()
    const query = useSearchParams()
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionI>({} as SubscriptionI);

    const [getSubscriptions, { isLoading, data: subscriptionResp, isFetching }] = useLazyGetSubscriptionsQuery();

    const subscriptions = useMemo(() => (Array.from(subscriptionResp?.data || [])), [subscriptionResp])

    const toggleDropdown = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen])

    const handleSelectSubscription = useCallback((subscription: SubscriptionI) => {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set("s", subscription.uuid)
        toggleDropdown()
        router.push(`/profile/subscriptions/checkout?${queryParams.toString()}`)
    }, [isOpen])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const currency = query.get("c")
        const period = query.get("p")

        getSubscriptions({
            filters: {
                ...(insertByCondition(currency, { "currency.iso3": currency })),
                ...(insertByCondition(period, { "period": period })),
                active: true
            },
            sort: ["price", "ASC"]
        })
    }, [query])

    useEffect(() => {
        if (!selectedSubscription) return;

        const _subscription = subscriptions.find((s) => s.uuid === subscription?.uuid)

        if (_subscription) {
            setSelectedSubscription(_subscription)
        }

    }, [selectedSubscription, subscription, subscriptions])

    return (
        <div className={style.dropdown} ref={dropdownRef}>
            <button onClick={toggleDropdown} className={style.dropdownToggle}>
                <div className={style.dropdownToggleItem}>
                    <div style={{ ...(COLORS[selectedSubscription.type] || {}) }}>
                        {selectedSubscription?.name || ""}
                    </div>
                </div>
                <div className={style.dropdownToggleIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15.707" height="8.561" viewBox="0 0 15.707 8.561">
                        <path d="M23.5,11.5,16,19,8.5,11.5" transform="translate(-8.146 -11.146)" fill="none" stroke="#707070" stroke-width="1" />
                    </svg>
                </div>
            </button>

            {isOpen && (
                <ul className={style.dropdownMenu}>
                    {subscriptions.map((subscription, i) => (
                        <li key={`item-subscription-${i}`} onClick={() => handleSelectSubscription(subscription)}>{subscription.name}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}