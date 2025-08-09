import AboutusComponent from "@components/pages/about-us";
import { Suspense } from "react";

export default function AboutusPage() {

  return (
    <Suspense>
      <AboutusComponent />
    </Suspense>
  );
}
