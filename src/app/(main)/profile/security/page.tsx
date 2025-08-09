import SecurityComponent from "@components/pages/profile/view/security";
import { Suspense } from "react";

export default function Profile() {
  return (
    <Suspense>
      <SecurityComponent />
    </Suspense>
  )
}
