import SecondTwoFactorAuthComponent from "@components/pages/2fa/view/3";
import { Suspense } from "react";

export default function TwoFactorAuth() {

  return (
    <Suspense>
      <SecondTwoFactorAuthComponent />
    </Suspense>
  );
}
