import AddressesComponent from "@components/pages/profile/view/addresses";
import { Suspense } from "react";

export default function Profile() {
  return (
    <Suspense>
      <AddressesComponent />
    </Suspense>
  )
}
