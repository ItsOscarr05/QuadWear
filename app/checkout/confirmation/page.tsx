import { Suspense } from "react";
import ConfirmationClient from "./ConfirmationClient";

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-gray-500">
          Loading…
        </div>
      }
    >
      <ConfirmationClient />
    </Suspense>
  );
}
