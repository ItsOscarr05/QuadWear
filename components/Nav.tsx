"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getCart, getCartTotalQuantity } from "@/lib/cart";
import { UNIVERSITIES } from "@/lib/universities";
import { MAJORS } from "@/lib/majors";
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
          <div className="group relative">
            <button
              type="button"
              className="text-black hover:text-primary transition-colors font-bold text-lg"
            >
              Universities
            </button>
            <div className="invisible absolute left-0 top-full z-[60] mt-2 max-h-80 w-56 overflow-y-auto rounded-lg border-4 border-black bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
              {UNIVERSITIES.map((u) => (
                <Link
                  key={u.slug}
                  href={`/shop/university/${u.slug}`}
                  className="block border-b-2 border-black px-4 py-2 font-semibold text-black last:border-b-0 hover:bg-primary hover:text-white"
                >
                  {u.fullName}
                </Link>
              ))}
            </div>
          </div>
          <div className="group relative">
            <button
              type="button"
              className="text-black hover:text-primary transition-colors font-bold text-lg"
            >
              Majors
            </button>
            <div className="invisible absolute left-0 top-full z-[60] mt-2 max-h-80 w-56 overflow-y-auto rounded-lg border-4 border-black bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
              {MAJORS.map((m) => (
                <Link
                  key={m.slug}
                  href={`/shop/major/${m.slug}`}
                  className="block border-b-2 border-black px-4 py-2 font-semibold text-black last:border-b-0 hover:bg-primary hover:text-white"
                >
                  {m.name}
                </Link>
              ))}
            </div>
          </div>
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
