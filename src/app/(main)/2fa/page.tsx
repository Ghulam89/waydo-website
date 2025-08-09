import TwoFactorAuthComponent from "@components/pages/2fa/view/1";
import { Suspense } from "react";

export default function TwoFactorAuth() {

  return (
    <Suspense>
      <TwoFactorAuthComponent />
    </Suspense>
  );
}
