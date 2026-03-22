"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import { getMajorBySlug } from "@/lib/majors";
import { getUniversityByName, getUniversityBySlug } from "@/lib/universities";
import type { ProductCatalog } from "@/lib/types/product";

export default function MajorShopClient() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const majorConfig = getMajorBySlug(slug);
  const universityFilterSlug = searchParams.get("university");

  const [products, setProducts] = useState<ProductCatalog[]>([]);
  const [loading, setLoading] = useState(true);

  const majorName = majorConfig?.name ?? "";

  useEffect(() => {
    if (!majorName) {
      setLoading(false);
      return;
    }
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `/api/products?major=${encodeURIComponent(majorName)}`
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
  }, [majorName]);

  const universitiesOnPage = useMemo(() => {
    const set = new Set(products.map((p) => p.university));
    return Array.from(set).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!universityFilterSlug) return products;
    const uni = getUniversityBySlug(universityFilterSlug);
    if (!uni) return products;
    return products.filter((p) => p.university === uni.name);
  }, [products, universityFilterSlug]);

  if (!majorConfig) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-lg text-gray-600 mb-6">Major not found.</p>
        <Link href="/shop/major" className="btn-primary inline-block">
          Back to majors
        </Link>
      </div>
    );
  }

  const basePath = `/shop/major/${slug}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/shop/major"
        className="text-sm font-semibold text-primary hover:underline mb-6 inline-block"
      >
        ← All majors
      </Link>

      <div className="rounded-lg border-4 border-black p-6 md:p-8 mb-8 bg-white">
        <h1 className="text-4xl font-bold text-black mb-2">
          {majorConfig.name}
        </h1>
        <p className="text-gray-600">
          Hand-drawn shirts for {majorConfig.name} students—browse by campus
          below.
        </p>
      </div>

      {universitiesOnPage.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-black mb-3">
            Filter by school
          </h2>
          <div className="flex flex-wrap gap-2">
            <Link
              href={basePath}
              className={`px-4 py-2 rounded-lg border-2 font-semibold transition-colors ${
                !universityFilterSlug
                  ? "border-primary bg-primary/10 text-black"
                  : "border-black/20 bg-white hover:border-primary"
              }`}
            >
              All schools
            </Link>
            {universitiesOnPage.map((uniName) => {
              const u = getUniversityByName(uniName);
              const uSlug = u?.slug ?? uniName.toLowerCase().replace(/\s+/g, "-");
              const active = universityFilterSlug === uSlug;
              return (
                <Link
                  key={uniName}
                  href={`${basePath}?university=${encodeURIComponent(uSlug)}`}
                  className={`px-4 py-2 rounded-lg border-2 font-semibold transition-colors ${
                    active
                      ? "border-primary bg-primary/10 text-black"
                      : "border-black/20 bg-white hover:border-primary"
                  }`}
                >
                  {u?.fullName ?? uniName}
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
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {universityFilterSlug
              ? "No products for this school in this major yet."
              : `No products found for ${majorConfig.name} yet.`}
          </p>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-6">
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""}
          </p>
          <ProductGrid products={filteredProducts} />
        </>
      )}
    </div>
  );
}
