

import FavoriteComponent from "@components/pages/favorite";
import { Suspense } from "react";

export default function FavoritePage() {

  return (
    <Suspense>
      <FavoriteComponent />
    </Suspense>
  );
}
