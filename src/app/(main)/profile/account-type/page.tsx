import AccountTypeComponent from "@components/pages/profile/view/account-type";
import { Suspense } from "react";

export default function Profile() {
  return (
    <Suspense>
      <AccountTypeComponent />
    </Suspense>
  )
}
