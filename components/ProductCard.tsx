"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { addToCart } from "@/lib/cart";
import {
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
} from "@/lib/wishlist";
import QuickViewModal from "./QuickViewModal";
import ColorSwatchRow from "./ColorSwatchRow";
import { parseColorVariants } from "@/lib/colorVariants";
import { PRODUCT_CARD_IMAGE_DISPLAY_CLASS } from "@/lib/productImageDisplay";
import type { ProductCatalog } from "@/lib/types/product";

interface ProductCardProps {
  product: ProductCatalog;
  /**
   * Square tile: image fills most of the card with tighter type/actions (shop-by-school/major grids).
   */
  variant?: "default" | "square";
}

export default function ProductCard({
  product,
  variant = "default",
}: ProductCardProps) {
  const [showQuickView, setShowQuickView] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const [previewColorIndex, setPreviewColorIndex] = useState<number | null>(
    null,
  );
  const badges = JSON.parse(product.badges || "[]");

  const colorVariants = useMemo(
    () => parseColorVariants(product.colorVariants),
    [product.colorVariants],
  );

  const imageColorIndex =
    previewColorIndex !== null ? previewColorIndex : colorIndex;

  const displayImage =
    colorVariants.length > 0
      ? (colorVariants[imageColorIndex]?.front ?? product.mockupImage)
      : product.mockupImage || product.designImage;

  useEffect(() => {
    setIsWishlisted(isInWishlist(product.id));
    const handleWishlistUpdate = () =>
      setIsWishlisted(isInWishlist(product.id));
    window.addEventListener("wishlistUpdated", handleWishlistUpdate);
    return () =>
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
  }, [product.id]);

  useEffect(() => {
    setColorIndex(0);
    setPreviewColorIndex(null);
  }, [product.id]);

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: displayImage,
      });
    }
  };

  const handleAddToCart = () => {
    const v = colorVariants[colorIndex];
    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      size: "M", // Default size
      image: displayImage,
      color: v?.name,
    });
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const isSquare = variant === "square";
  const productHref = `/shop/${product.slug}`;

  return (
    <>
      <div
        className={
          isSquare
            ? "card-sticker group flex aspect-square min-h-0 flex-col overflow-hidden !p-2 sm:!p-3"
            : "card-sticker group"
        }
      >
        <Link
          href={productHref}
          className={isSquare ? "flex min-h-0 flex-1 flex-col" : "block"}
        >
          {badges.length > 0 && !isSquare && (
            <div className="mb-2 flex flex-wrap gap-1">
              {badges.map((badge: string) => (
                <span
                  key={badge}
                  className="bg-accent text-neutral-charcoal text-xs font-bold px-2 py-1 rounded-full font-accent"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
          <div
            className={
              isSquare
                ? "relative mb-1.5 min-h-0 w-full flex-1 overflow-hidden rounded-lg bg-transparent"
                : "relative mb-4 aspect-square overflow-hidden rounded-lg bg-transparent"
            }
          >
            {badges.length > 0 && isSquare && (
              <div className="absolute left-2 top-2 z-10 flex max-w-[calc(100%-3rem)] flex-wrap gap-0.5">
                {badges.map((badge: string) => (
                  <span
                    key={badge}
                    className="bg-accent font-accent text-[10px] font-bold leading-none text-neutral-charcoal px-1.5 py-0.5 rounded-full"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
            <Image
              src={displayImage}
              alt={product.name}
              fill
              className={`${PRODUCT_CARD_IMAGE_DISPLAY_CLASS} transition-transform duration-300 group-hover:brightness-[1.06]`}
            />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleWishlistToggle();
              }}
              className={`absolute ${isSquare ? "right-1.5 top-1.5 p-1.5" : "right-2 top-2 p-2"} z-10 rounded-full bg-white/90 transition-colors hover:bg-white`}
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              <svg
                className={`${isSquare ? "h-4 w-4" : "h-5 w-5"} ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                fill={isWishlisted ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </Link>

        {colorVariants.length > 0 && (
          <div className="mb-1.5 flex justify-center px-0.5">
            <ColorSwatchRow
              variants={colorVariants}
              selectedIndex={colorIndex}
              onSelect={setColorIndex}
              onPreviewIndexChange={setPreviewColorIndex}
              size="sm"
            />
          </div>
        )}

        <Link href={productHref} className="block min-h-0">
          <h3
            className={
              isSquare
                ? "line-clamp-2 shrink-0 text-sm font-semibold leading-tight text-black"
                : "mb-1 text-lg font-semibold"
            }
          >
            {product.name}
          </h3>
          <p
            className={
              isSquare
                ? "line-clamp-1 shrink-0 text-[11px] text-gray-600 sm:text-xs"
                : "mb-2 text-sm text-gray-600"
            }
          >
            {product.university} • {product.major}
          </p>
          <p
            className={
              isSquare
                ? "shrink-0 text-base font-bold text-primary"
                : "text-xl font-bold text-primary"
            }
          >
            ${(product.price / 100).toFixed(2)}
          </p>
        </Link>
        <div
          className={
            isSquare ? "mt-auto flex shrink-0 gap-1.5 pt-1" : "mt-4 flex gap-2"
          }
        >
          <button
            type="button"
            onClick={() => setShowQuickView(true)}
            className={
              isSquare
                ? "btn-secondary flex-1 py-1.5 text-[11px] sm:text-xs"
                : "btn-secondary flex-1 py-2 text-sm"
            }
          >
            Quick View
          </button>
          <button
            type="button"
            onClick={handleAddToCart}
            className={
              isSquare
                ? "btn-primary flex-1 py-1.5 text-[11px] sm:text-xs"
                : "btn-primary flex-1 py-2 text-sm"
            }
          >
            Add to Cart
          </button>
        </div>
      </div>

      {showQuickView && (
        <QuickViewModal
          product={product}
          onClose={() => setShowQuickView(false)}
          onAddToCart={() => {
            window.dispatchEvent(new Event("cartUpdated"));
          }}
        />
      )}
    </>
  );
}
