import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const university = searchParams.get('university')
    const major = searchParams.get('major')
    const size = searchParams.get('size')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const inStockOnly = searchParams.get('inStockOnly') === 'true'

    let products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    })

    // Filter by university
    if (university) {
      products = products.filter((p) => p.university === university)
    }

    // Filter by major
    if (major) {
      products = products.filter((p) => p.major === major)
    }

    // Filter by price range
    if (minPrice) {
      const min = parseInt(minPrice)
      products = products.filter((p) => p.price >= min)
    }
    if (maxPrice) {
      const max = parseInt(maxPrice)
      products = products.filter((p) => p.price <= max)
    }

    // Filter by size availability
    if (size || inStockOnly) {
      products = products.filter((product) => {
        try {
          const sizes = JSON.parse(product.sizes)
          if (size) {
            return sizes[size] && sizes[size] > 0
          }
          if (inStockOnly) {
            return Object.values(sizes).some((qty: any) => qty > 0)
          }
        } catch {
          return false
        }
        return true
      })
    }

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
