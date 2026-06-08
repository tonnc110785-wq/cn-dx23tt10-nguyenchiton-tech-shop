export const dynamic = 'force-dynamic'

import { getPayloadClient } from '@/lib/payload'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Search, Lightbulb } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tìm kiếm sản phẩm',
}

type SearchParams = { q?: string; page?: string }

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const query = params.q?.trim() || ''
  const page = Number(params.page) || 1

  let results = { docs: [] as any[], totalDocs: 0, totalPages: 0 }

  if (query.length > 0) {
    const payload = await getPayloadClient()
    const data = await payload.find({
      collection: 'products',
      where: {
        or: [
          { name: { contains: query } },
          { brand: { contains: query } },
          { shortDescription: { contains: query } },
        ],
      },
      limit: 12,
      page,
      depth: 2,
    })
    results = data as any
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Tìm kiếm sản phẩm</h1>
        <form action="/tim-kiem" method="get">
          <div className="flex">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Nhập tên sản phẩm, thương hiệu..."
              className="flex-1 border border-gray-300 rounded-l-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              autoFocus
            />
            <button
              type="submit"
              className="bg-amber-400 hover:bg-amber-500 text-white font-semibold px-6 py-3 rounded-r-xl transition"
            >
              <Search size={16} /> Tìm
            </button>
          </div>
        </form>
      </div>

      {query ? (
        <>
          <p className="text-gray-600 mb-6">
            {results.totalDocs > 0 ? (
              <>
                Tìm thấy <span className="font-semibold text-gray-800">{results.totalDocs}</span> sản phẩm
                cho từ khóa &quot;<span className="text-amber-600">{query}</span>&quot;
              </>
            ) : (
              <>
                Không tìm thấy sản phẩm nào cho &quot;<span className="text-amber-600">{query}</span>&quot;
              </>
            )}
          </p>

          {results.docs.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {results.docs.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {results.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: results.totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={`/tim-kiem?q=${encodeURIComponent(query)}&page=${p}`}
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
            <div className="text-center py-16 text-gray-400">
              <div className="flex justify-center mb-4"><Search size={56} strokeWidth={1} /></div>
              <p className="text-lg mb-2">Không tìm thấy kết quả phù hợp.</p>
              <p className="text-sm">Thử tìm với từ khóa khác hoặc</p>
              <Link href="/san-pham" className="text-amber-600 hover:underline text-sm">
                xem tất cả sản phẩm
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <div className="flex justify-center mb-4"><Lightbulb size={56} strokeWidth={1} /></div>
          <p className="text-lg">Nhập từ khóa để tìm kiếm sản phẩm.</p>
          <p className="text-sm mt-2">Ví dụ: Samsung, Tivi 55 inch, Tủ lạnh Panasonic...</p>
        </div>
      )}
    </div>
  )
}
