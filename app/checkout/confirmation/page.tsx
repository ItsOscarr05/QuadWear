import { Suspense } from "react";
import RouteFallback from "@/components/RouteFallback";
import ConfirmationClient from "./ConfirmationClient";

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <ConfirmationClient />
    </Suspense>
  );
}
