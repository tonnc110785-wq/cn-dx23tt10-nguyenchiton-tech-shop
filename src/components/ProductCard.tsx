import Link from 'next/link'
import Image from 'next/image'
import { Package } from 'lucide-react'
import { formatPrice, calcDiscount } from '@/lib/format'
import WishlistButton from '@/components/WishlistButton'

type Product = {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  brand?: string
  shortDescription?: string
  featured?: boolean
  inStock?: boolean
  images?: Array<{ image: { url: string; alt?: string } }>
}

export default function ProductCard({ product }: { product: Product }) {
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? calcDiscount(product.originalPrice, product.price)
      : null

  const imageUrl = product.images?.[0]?.image?.url

  return (
    <div className="group relative">
      {/* Wishlist button — outside Link so it doesn't trigger navigation */}
      <div className="absolute top-2 right-2 z-10">
        <WishlistButton
          product={{
            id: String(product.id),
            name: product.name,
            slug: product.slug,
            price: product.price,
            originalPrice: product.originalPrice,
            brand: product.brand,
            image: imageUrl,
          }}
        />
      </div>

      <Link href={`/san-pham/${product.slug}`} className="block h-full">
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100 h-full flex flex-col">
          {/* Image */}
          <div className="relative bg-gray-50 aspect-square overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-200">
                <Package size={48} strokeWidth={1} />
              </div>
            )}
            {discount && (
              <span className="absolute top-2 left-2 bg-amber-400 text-white text-xs font-bold px-2 py-0.5 rounded">
                -{discount}%
              </span>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                <span className="bg-white text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
                  Hết hàng
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-3 flex-1 flex flex-col">
            {product.brand && (
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                {product.brand}
              </span>
            )}
            <h3 className="text-sm font-medium text-gray-800 mt-0.5 line-clamp-2 flex-1 leading-snug">
              {product.name}
            </h3>
            <div className="mt-2">
              <div className="text-amber-600 font-bold text-base">
                {formatPrice(product.price)}
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="text-gray-400 text-xs line-through">
                  {formatPrice(product.originalPrice)}
                </div>
              )}
            </div>
            <button className="mt-2.5 w-full bg-amber-400 hover:bg-amber-500 text-white text-xs py-2 rounded-lg transition-colors duration-200 font-medium">
              Xem chi tiết
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}
