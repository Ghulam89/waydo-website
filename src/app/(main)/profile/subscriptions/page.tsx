import SubscriptionComponent from "@components/pages/profile/view/subscriptions";
import { Suspense } from "react";

export default function SubscriptionProfile() {
  return (
    <Suspense>
      <SubscriptionComponent />
    </Suspense>
  )
}
