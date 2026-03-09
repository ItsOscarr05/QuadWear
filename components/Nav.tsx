"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getCart, getCartTotalQuantity } from "@/lib/cart";

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
    <nav className="bg-white border-b-4 border-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 relative">
          <Link href="/" className="flex items-center ml-6">
            <Image
              src="/quadwear-logo.png"
              alt="QuadWear"
              width={380}
              height={256}
              className="h-24 w-auto object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <Link
              href="/shop"
              className="text-black hover:text-primary transition-colors font-bold text-lg"
            >
              Shop
            </Link>
            <div className="relative group">
              <button className="text-black hover:text-primary transition-colors font-bold text-lg">
                Universities
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border-4 border-black opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link
                  href="/uva"
                  className="block px-4 py-2 hover:bg-primary hover:text-white text-black font-semibold border-b-2 border-black last:border-b-0"
                >
                  UVA
                </Link>
                <Link
                  href="/virginia-tech"
                  className="block px-4 py-2 hover:bg-primary hover:text-white text-black font-semibold border-b-2 border-black last:border-b-0"
                >
                  Virginia Tech
                </Link>
                <Link
                  href="/jmu"
                  className="block px-4 py-2 hover:bg-primary hover:text-white text-black font-semibold border-b-2 border-black last:border-b-0"
                >
                  JMU
                </Link>
                <Link
                  href="/george-mason"
                  className="block px-4 py-2 hover:bg-primary hover:text-white text-black font-semibold border-b-2 border-black last:border-b-0"
                >
                  George Mason
                </Link>
                <Link
                  href="/vcu"
                  className="block px-4 py-2 hover:bg-primary hover:text-white text-black font-semibold border-b-2 border-black last:border-b-0"
                >
                  VCU
                </Link>
                <Link
                  href="/odu"
                  className="block px-4 py-2 hover:bg-primary hover:text-white text-black font-semibold border-b-2 border-black last:border-b-0"
                >
                  ODU
                </Link>
                <Link
                  href="/university-of-richmond"
                  className="block px-4 py-2 hover:bg-primary hover:text-white text-black font-semibold border-b-2 border-black last:border-b-0"
                >
                  University of Richmond
                </Link>
                <Link
                  href="/william-mary"
                  className="block px-4 py-2 hover:bg-primary hover:text-white text-black font-semibold border-b-2 border-black last:border-b-0"
                >
                  William & Mary
                </Link>
                <Link
                  href="/radford"
                  className="block px-4 py-2 hover:bg-primary hover:text-white text-black font-semibold border-b-2 border-black last:border-b-0"
                >
                  Radford
                </Link>
                <Link
                  href="/longwood"
                  className="block px-4 py-2 hover:bg-primary hover:text-white text-black font-semibold border-b-2 border-black last:border-b-0"
                >
                  Longwood
                </Link>
              </div>
            </div>
            <Link
              href="/about"
              className="text-black hover:text-primary transition-colors font-bold text-lg"
            >
              About
            </Link>
          </div>

          <Link href="/cart" className="relative ml-auto mr-6">
            <svg
              className="w-8 h-8 text-black hover:text-accent transition-colors"
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
              <span className="absolute -top-2 -right-2 bg-accent text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-black">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
