'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, Package } from 'lucide-react'
import { useCart } from '@/lib/CartContext'
import { formatPrice } from '@/lib/format'

export default function CartPage() {
  const { items, count, total, removeFromCart, updateQty } = useCart()

  if (count === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-gray-400">
        <div className="flex justify-center mb-4"><ShoppingCart size={64} strokeWidth={1} /></div>
        <h2 className="text-xl font-semibold text-gray-600 mb-2">Giỏ hàng trống</h2>
        <p className="text-sm mb-6">Hãy thêm sản phẩm vào giỏ để tiến hành mua sắm.</p>
        <Link href="/san-pham" className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-white font-bold px-6 py-3 rounded-xl transition">
          Tiếp tục mua sắm <ArrowRight size={16} />
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Giỏ hàng <span className="text-gray-400 font-normal text-lg">({count} sản phẩm)</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4">
              {/* Image */}
              <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden relative">
                {item.image ? (
                  <Image src={item.image} alt={item.name} fill className="object-contain p-1" sizes="80px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-200">
                    <Package size={28} strokeWidth={1} />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <Link href={`/san-pham/${item.slug}`} className="text-sm font-semibold text-gray-800 hover:text-amber-600 line-clamp-2 transition">
                  {item.name}
                </Link>
                <div className="text-amber-600 font-bold mt-1">{formatPrice(item.price)}</div>

                <div className="flex items-center justify-between mt-3">
                  {/* Qty controls */}
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center text-sm font-semibold text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Subtotal + delete */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 sticky top-24">
            <h2 className="font-bold text-gray-900 text-lg mb-4">Tóm tắt đơn hàng</h2>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính ({count} sản phẩm)</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Phí vận chuyển</span>
                <span className="text-green-600 font-medium">Miễn phí</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-3 mb-5">
              <div className="flex justify-between font-bold text-lg text-gray-900">
                <span>Tổng cộng</span>
                <span className="text-amber-600">{formatPrice(total)}</span>
              </div>
            </div>

            <Link
              href="/dat-hang"
              className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-white font-bold py-3.5 rounded-xl transition"
            >
              Tiến hành đặt hàng <ArrowRight size={18} />
            </Link>

            <Link href="/san-pham" className="block text-center text-sm text-gray-400 hover:text-amber-600 mt-3 transition">
              ← Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
