import PhoneComponent from "@components/pages/profile/view/phone";
import { Suspense } from "react";

export default function Profile() {
  return (
    <Suspense>
      <PhoneComponent />
    </Suspense>
  )

}
