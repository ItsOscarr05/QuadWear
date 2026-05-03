"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PageBackNav from "@/components/PageBackNav";
import { clearCart } from "@/lib/cart";

export default function ConfirmationClient() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  useEffect(() => {
    const order = searchParams.get("order");
    const sessionId = searchParams.get("session_id");
    if (order) {
      setOrderNumber(order);
    }
    if (order && sessionId) {
      clearCart();
      window.dispatchEvent(new Event("cartUpdated"));
    }
  }, [searchParams]);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <PageBackNav href="/shop" label="← Back to shop" />
      <div className="card-sticker text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          {orderNumber && (
            <p className="text-lg text-gray-600 mb-4">Order #{orderNumber}</p>
          )}
        </div>

        <div className="space-y-4 mb-8">
          <p className="text-gray-700">
            Thank you for your order! We&apos;ve sent a confirmation email to
            your inbox.
          </p>
          <p className="text-gray-700">
            Expected ship window: <strong>3-5 business days</strong>
          </p>
          <p className="text-sm text-gray-600">
            You&apos;ll receive a tracking number via email once your order
            ships.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop" className="btn-secondary">
            Continue Shopping
          </Link>
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
