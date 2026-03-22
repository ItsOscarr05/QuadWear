'use client'

import ProductCard from './ProductCard'
import { EmptyStateCatalog } from '@/components/empty-state'
import type { ProductCatalog } from '@/lib/types/product'

interface ProductGridProps {
  products: ProductCatalog[]
  /** When set (e.g. on a university shop page), tinted grad-cap matches school branding. */
  schoolPrimaryColor?: string
  /** Square product tiles for school/major browse pages */
  cardVariant?: 'default' | 'square'
}

export default function ProductGrid({
  products,
  schoolPrimaryColor,
  cardVariant = 'default',
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="max-w-lg mx-auto py-8">
        <EmptyStateCatalog
          schoolPrimaryColor={schoolPrimaryColor}
          title="Filters cranked, racks empty"
          description="Nothing matches that combo—loosen a filter or browse another school or major."
        />
      </div>
    )
  }

  const gridClass =
    cardVariant === 'square'
      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-7'
      : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'

  return (
    <div className={gridClass}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} variant={cardVariant} />
      ))}
    </div>
  )
}
