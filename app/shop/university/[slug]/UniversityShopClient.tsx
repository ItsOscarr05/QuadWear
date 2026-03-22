"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import {
  EmptyStateCatalog,
  EmptyStateSchoolMissing,
} from "@/components/empty-state";
import { getUniversityBySlug } from "@/lib/universities";
import { majorSlugFromName } from "@/lib/majors";
import type { ProductCatalog } from "@/lib/types/product";

export default function UniversityShopClient() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const universityConfig = getUniversityBySlug(slug);
  const majorFilterSlug = searchParams.get("major");

  const [products, setProducts] = useState<ProductCatalog[]>([]);
  const [loading, setLoading] = useState(true);

  const universityName = universityConfig?.name ?? "";

  useEffect(() => {
    if (!universityName) {
      setLoading(false);
      return;
    }
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `/api/products?university=${encodeURIComponent(universityName)}`
        );
        const data = (await res.json()) as unknown;
        setProducts(Array.isArray(data) ? (data as ProductCatalog[]) : []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [universityName]);

  const majorsOnPage = useMemo(() => {
    const set = new Set(products.map((p) => p.major));
    return Array.from(set).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!majorFilterSlug) return products;
    return products.filter(
      (p) => majorSlugFromName(p.major) === majorFilterSlug
    );
  }, [products, majorFilterSlug]);

  if (!universityConfig) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto">
          <EmptyStateSchoolMissing>
            <Link href="/shop/university" className="btn-primary inline-block">
              Back to schools
            </Link>
          </EmptyStateSchoolMissing>
        </div>
      </div>
    );
  }

  const basePath = `/shop/university/${slug}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/shop/university"
        className="text-sm font-semibold text-primary hover:underline mb-6 inline-block"
      >
        ← All schools
      </Link>

      <div
        className="rounded-lg border-4 border-black p-6 md:p-8 mb-8"
        style={{
          borderLeftWidth: "12px",
          borderLeftColor: universityConfig.primaryColor,
        }}
      >
        <h1 className="text-4xl font-bold text-black mb-2">
          {universityConfig.fullName}
        </h1>
        <p className="text-gray-600">
          Hand-drawn major shirts for {universityConfig.fullName} students -{" "}
          {universityConfig.mascotCheer}
        </p>
      </div>

      {majorsOnPage.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-black mb-3">Filter by major</h2>
          <div className="flex flex-wrap gap-2">
            <Link
              href={basePath}
              className={`px-4 py-2 rounded-lg border-2 font-semibold transition-colors ${
                !majorFilterSlug
                  ? "border-primary bg-primary/10 text-black"
                  : "border-black/20 bg-white hover:border-primary"
              }`}
            >
              All majors
            </Link>
            {majorsOnPage.map((major) => {
              const mSlug = majorSlugFromName(major);
              const active = majorFilterSlug === mSlug;
              return (
                <Link
                  key={major}
                  href={`${basePath}?major=${encodeURIComponent(mSlug)}`}
                  className={`px-4 py-2 rounded-lg border-2 font-semibold transition-colors ${
                    active
                      ? "border-primary bg-primary/10 text-black"
                      : "border-black/20 bg-white hover:border-primary"
                  }`}
                >
                  {major}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="max-w-lg mx-auto py-8">
          <EmptyStateCatalog
            schoolPrimaryColor={universityConfig.primaryColor}
            title={
              majorFilterSlug
                ? "This major’s rack is still in the studio"
                : `${universityConfig.fullName} — coming soon...`
            }
            description={
              majorFilterSlug
                ? "No tees for that combo yet. Try another major filter or clear it to see everything for this school."
                : `We’re stocking designs for ${universityConfig.fullName}. Check another campus or pop back soon.`
            }
          />
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-6">
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""}
          </p>
          <ProductGrid
            products={filteredProducts}
            schoolPrimaryColor={universityConfig.primaryColor}
          />
        </>
      )}
    </div>
  );
}
