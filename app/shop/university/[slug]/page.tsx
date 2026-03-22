import { Suspense } from "react";
import UniversityShopClient from "./UniversityShopClient";

export default function UniversityShopPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-500">
          Loading...
        </div>
      }
    >
      <UniversityShopClient />
    </Suspense>
  );
}
