import TermsComponent from "@components/pages/terms";
import { Suspense } from "react";

export default function TermsPage() {
  return (
    <Suspense>
      <TermsComponent />
    </Suspense>
  );
}
