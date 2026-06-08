'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingCart, Trash2, Package, ArrowRight } from 'lucide-react'
import { useWishlist } from '@/lib/WishlistContext'
import { useCart } from '@/lib/CartContext'
import { formatPrice, calcDiscount } from '@/lib/format'

export default function WishlistPage() {
  const { items, count, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  if (count === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-gray-400">
        <div className="flex justify-center mb-4">
          <Heart size={64} strokeWidth={1} />
        </div>
        <h2 className="text-xl font-semibold text-gray-600 mb-2">Chưa có sản phẩm yêu thích</h2>
        <p className="text-sm mb-6">Nhấn vào biểu tượng tim trên sản phẩm để lưu vào danh sách yêu thích.</p>
        <Link
          href="/san-pham"
          className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-white font-bold px-6 py-3 rounded-xl transition"
        >
          Khám phá sản phẩm <ArrowRight size={16} />
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Sản phẩm yêu thích{' '}
        <span className="text-gray-400 font-normal text-lg">({count} sản phẩm)</span>
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => {
          const discount =
            item.originalPrice && item.originalPrice > item.price
              ? calcDiscount(item.originalPrice, item.price)
              : null

          return (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <Link href={`/san-pham/${item.slug}`} className="block relative bg-gray-50 aspect-square overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
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
              </Link>

              {/* Info */}
              <div className="p-3 flex-1 flex flex-col">
                {item.brand && (
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">{item.brand}</span>
                )}
                <Link href={`/san-pham/${item.slug}`} className="text-sm font-medium text-gray-800 mt-0.5 line-clamp-2 flex-1 leading-snug hover:text-amber-600 transition">
                  {item.name}
                </Link>

                <div className="mt-2 mb-3">
                  <div className="text-amber-600 font-bold">{formatPrice(item.price)}</div>
                  {item.originalPrice && item.originalPrice > item.price && (
                    <div className="text-gray-400 text-xs line-through">{formatPrice(item.originalPrice)}</div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      addToCart({ id: item.id, name: item.name, slug: item.slug, price: item.price, image: item.image })
                    }
                    className="flex-1 flex items-center justify-center gap-1.5 bg-amber-400 hover:bg-amber-500 text-white text-xs font-bold py-2 rounded-lg transition"
                  >
                    <ShoppingCart size={13} /> Thêm vào giỏ
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-400 hover:text-red-500 hover:border-red-300 transition"
                    title="Bỏ yêu thích"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
