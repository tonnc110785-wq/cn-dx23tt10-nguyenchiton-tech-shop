export const dynamic = 'force-dynamic'

import { getPayloadClient } from '@/lib/payload'
import { formatPrice, calcDiscount } from '@/lib/format'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Phone, MessageCircle, Truck, BadgeCheck, Wrench, RefreshCw } from 'lucide-react'
import AddToCartButton from '@/components/AddToCartButton'
import WishlistButton from '@/components/WishlistButton'
import ProductCard from '@/components/ProductCard'
import ProductImageGallery from '@/components/ProductImageGallery'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const product = result.docs[0]
  if (!product) return { title: 'Sản phẩm không tồn tại' }
  return {
    title: product.name,
    description: product.shortDescription || product.name,
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })

  const product = result.docs[0]
  if (!product) notFound()

  const category = product.category as any
  const images: any[] = product.images || []
  const specs: any[] = product.specifications || []

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? calcDiscount(product.originalPrice as number, product.price as number)
      : null

  const related = category?.id
    ? await payload.find({
        collection: 'products',
        where: {
          and: [
            { category: { equals: category.id } },
            { slug: { not_equals: slug } },
          ],
        },
        limit: 4,
        depth: 2,
      })
    : { docs: [] }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-amber-600">Trang chủ</Link>
        <span className="mx-2">/</span>
        <Link href="/san-pham" className="hover:text-amber-600">Sản phẩm</Link>
        {category?.name && (
          <>
            <span className="mx-2">/</span>
            <Link href={`/san-pham?danh-muc=${category.slug}`} className="hover:text-amber-600">
              {category.name}
            </Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="text-gray-700 line-clamp-1">{product.name}</span>
      </nav>

      {/* Product main */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Images */}
          <div>
            <ProductImageGallery
              images={images.map((img: any) => ({ url: img.image.url, alt: img.image.alt || product.name }))}
              productName={product.name}
              discount={discount}
            />
          </div>

          {/* Info */}
          <div>
            {product.brand && (
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-widest">{product.brand}</span>
            )}
            <h1 className="text-2xl font-bold text-gray-900 mt-1 mb-3 leading-snug">{product.name}</h1>

            {product.shortDescription && (
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">{product.shortDescription}</p>
            )}

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-4">
              <div className="text-3xl font-extrabold text-amber-600">{formatPrice(product.price as number)}</div>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-gray-400 line-through text-sm">
                    {formatPrice(product.originalPrice as number)}
                  </span>
                  <span className="bg-amber-400 text-white text-xs font-bold px-2 py-0.5 rounded">
                    -{discount}% · Tiết kiệm {formatPrice((product.originalPrice as number) - (product.price as number))}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 mb-5">
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                product.inStock
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {product.inStock ? '● Còn hàng' : '● Hết hàng'}
              </span>
            </div>

            <div className="space-y-2.5">
              <AddToCartButton product={{
                id: String(product.id),
                name: product.name,
                slug: product.slug as string,
                price: product.price as number,
                image: images[0]?.image?.url,
              }} />
              <WishlistButton
                variant="outline"
                product={{
                  id: String(product.id),
                  name: product.name,
                  slug: product.slug as string,
                  price: product.price as number,
                  originalPrice: product.originalPrice as number | undefined,
                  brand: product.brand as string | undefined,
                  image: images[0]?.image?.url,
                }}
              />
              <a
                href="tel:18001234"
                className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition"
              >
                <Phone size={16} /> Gọi đặt hàng: 1800 1234
              </a>
              <Link
                href="/lien-he"
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:border-amber-400 text-gray-700 font-semibold py-3 rounded-xl transition"
              >
                <MessageCircle size={16} /> Liên hệ tư vấn
              </Link>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              {[
                { icon: <Truck size={13} className="text-amber-500 flex-shrink-0" />, text: 'Giao hàng miễn phí' },
                { icon: <BadgeCheck size={13} className="text-amber-500 flex-shrink-0" />, text: 'Hàng chính hãng' },
                { icon: <Wrench size={13} className="text-amber-500 flex-shrink-0" />, text: 'Bảo hành tận nơi' },
                { icon: <RefreshCw size={13} className="text-amber-500 flex-shrink-0" />, text: 'Đổi trả 7 ngày' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                  {icon} {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Specifications */}
      {specs.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-5 bg-amber-400 rounded-full" />
            <h2 className="text-lg font-bold text-gray-900">Thông số kỹ thuật</h2>
          </div>
          <table className="w-full text-sm">
            <tbody>
              {specs.map((spec: any, i: number) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-2.5 px-4 font-medium text-gray-500 w-1/3">{spec.key}</td>
                  <td className="py-2.5 px-4 text-gray-800">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Related products */}
      {related.docs.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-5 bg-amber-400 rounded-full" />
            <h2 className="text-lg font-bold text-gray-900">Sản phẩm liên quan</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.docs.map((p: any) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
