import { Suspense } from "react";
import RouteFallback from "@/components/RouteFallback";
import MajorShopClient from "./MajorShopClient";

export default function MajorShopPage() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <MajorShopClient />
    </Suspense>
  );
}
