"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getCart, getCartTotalQuantity } from "@/lib/cart";
import NavSearch from "@/components/NavSearch";

export default function Nav() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCart();
      setCartCount(getCartTotalQuantity(cart));
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b-4 border-black bg-white">
      {/* Three columns: logo | nav centered in remaining space | search+cart — avoids overlap with viewport-centered absolute nav */}
      <div className="mx-auto flex min-h-[4rem] w-full max-w-7xl items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:gap-6 lg:px-8">
        <Link
          href="/"
          className="relative z-40 ml-2 flex shrink-0 items-center sm:ml-4 lg:ml-6"
        >
          <Image
            src="/quadwear-logo.png"
            alt="QuadWear"
            width={380}
            height={256}
            className="h-24 w-auto object-contain"
          />
        </Link>

        <div className="pointer-events-auto hidden min-w-0 flex-1 items-center justify-center gap-3 px-1 sm:px-2 md:flex lg:gap-4 lg:px-4">
          <Link
            href="/shop"
            className="text-black hover:text-primary transition-colors font-bold text-lg whitespace-nowrap"
          >
            Shop
          </Link>
          <Link
            href="/shop/university"
            className="text-black hover:text-primary transition-colors font-bold text-lg whitespace-nowrap"
          >
            Universities
          </Link>
          <Link
            href="/shop/major"
            className="text-black hover:text-primary transition-colors font-bold text-lg whitespace-nowrap"
          >
            Majors
          </Link>
          <Link
            href="/about"
            className="text-black hover:text-primary transition-colors font-bold text-lg whitespace-nowrap"
          >
            About
          </Link>
        </div>

        <div className="relative z-40 ml-auto flex shrink-0 items-center justify-end gap-2 sm:gap-3 lg:gap-4">
          <NavSearch />
          <Link
            href="/cart"
            className="relative mr-1 shrink-0 sm:mr-2 lg:mr-4"
          >
            <svg
              className="h-8 w-8 text-black transition-colors hover:text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-black bg-accent text-xs font-bold text-black">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
