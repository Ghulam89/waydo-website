import ProfileComponent from "@components/pages/profile/view/profile";
import { Suspense } from "react";

export default function Profile() {
  return (
    <Suspense>
      <ProfileComponent />
    </Suspense>
  )
}
