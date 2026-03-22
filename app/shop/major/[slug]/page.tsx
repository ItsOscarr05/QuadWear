import { Suspense } from "react";
import MajorShopClient from "./MajorShopClient";

export default function MajorShopPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-500">
          Loading...
        </div>
      }
    >
      <MajorShopClient />
    </Suspense>
  );
}
