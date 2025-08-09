import MyCompanyComponent from "@components/pages/my-company";
import { Suspense } from "react";

export default function MyCompanyPage() {

  return (
    <Suspense>
      <MyCompanyComponent />
    </Suspense>
  );
}
