export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import { Search } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'
import ProductCard from '@/components/ProductCard'
import SortSelect from './SortSelect'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sản phẩm',
  description: 'Tất cả sản phẩm điện máy chính hãng',
}

const CATEGORIES = [
  { label: 'Tất cả', slug: '' },
  { label: 'Tivi', slug: 'tivi' },
  { label: 'Điều hòa', slug: 'dieu-hoa' },
  { label: 'Tủ lạnh', slug: 'tu-lanh' },
  { label: 'Máy giặt', slug: 'may-giat' },
  { label: 'Laptop', slug: 'may-tinh-xach-tay' },
  { label: 'Điện thoại', slug: 'dien-thoai' },
  { label: 'Lò vi sóng', slug: 'lo-vi-song' },
  { label: 'Máy lọc nước', slug: 'may-loc-nuoc' },
]

type SearchParams = {
  'danh-muc'?: string
  sort?: string
  page?: string
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const categorySlug = params['danh-muc'] || ''
  const sort = params.sort || '-createdAt'
  const page = Number(params.page) || 1

  const payload = await getPayloadClient()

  let categoryId: string | undefined
  if (categorySlug) {
    const cats = await payload.find({
      collection: 'categories',
      where: { slug: { equals: categorySlug } },
      limit: 1,
    })
    if (cats.docs.length > 0) {
      categoryId = String(cats.docs[0].id)
    }
  }

  const where = categoryId ? { category: { equals: categoryId } } : undefined

  const products = await payload.find({
    collection: 'products',
    where,
    sort,
    limit: 12,
    page,
    depth: 2,
  })

  const currentCat = CATEGORIES.find((c) => c.slug === categorySlug)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-amber-600">Trang chủ</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{currentCat?.label || 'Sản phẩm'}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="md:w-52 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h3 className="font-bold text-zinc-800 text-sm uppercase tracking-wider mb-3">Danh mục</h3>
            <ul className="space-y-0.5">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={cat.slug ? `/san-pham?danh-muc=${cat.slug}` : '/san-pham'}
                    className={`block px-3 py-2 rounded-lg text-sm transition ${
                      categorySlug === cat.slug
                        ? 'bg-amber-400 text-white font-medium'
                        : 'text-gray-600 hover:bg-amber-50 hover:text-amber-700'
                    }`}
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-zinc-500 text-sm">
              <span className="font-semibold text-zinc-800">{products.totalDocs}</span> sản phẩm
              {currentCat && currentCat.slug ? ` trong "${currentCat.label}"` : ''}
            </p>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Sắp xếp:</label>
              <Suspense fallback={<div className="w-32 h-8 bg-gray-100 rounded-lg animate-pulse" />}>
                <SortSelect currentSort={sort} />
              </Suspense>
            </div>
          </div>

          {/* Products Grid */}
          {products.docs.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.docs.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {products.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: products.totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={`/san-pham?${categorySlug ? `danh-muc=${categorySlug}&` : ''}page=${p}`}
                      className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition ${
                        p === page
                          ? 'bg-amber-400 text-white'
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-amber-50'
                      }`}
                    >
                      {p}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <div className="flex justify-center mb-4"><Search size={56} strokeWidth={1} /></div>
              <p className="text-lg">Không tìm thấy sản phẩm nào.</p>
              <Link href="/san-pham" className="text-amber-600 hover:underline text-sm mt-2 inline-block">
                Xem tất cả sản phẩm
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
