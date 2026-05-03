import { Suspense } from "react";
import RouteFallback from "@/components/RouteFallback";
import UniversityShopClient from "./UniversityShopClient";

export default function UniversityShopPage() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <UniversityShopClient />
    </Suspense>
  );
}
