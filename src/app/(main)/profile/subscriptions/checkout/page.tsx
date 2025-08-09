import CheckoutSubscriptionComponent from "@components/pages/profile/view/checkout-subscription";
import { Suspense } from "react";

export default function CheckoutSubscriptionProfile() {
  return (
    <Suspense>
      <CheckoutSubscriptionComponent />
    </Suspense>
  )
}
