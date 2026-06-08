'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, ShoppingBag, Home, Phone } from 'lucide-react'
import { useCart } from '@/lib/CartContext'

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderCode = searchParams.get('code') || ''
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container mx-auto px-4 py-16 max-w-lg text-center">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10">
        <div className="flex justify-center mb-5">
          <CheckCircle size={72} strokeWidth={1.2} className="text-green-500" />
        </div>

        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Đặt hàng thành công!</h1>
        <p className="text-gray-500 text-sm mb-6">
          Cảm ơn bạn đã tin tưởng TechShop. Chúng tôi sẽ liên hệ xác nhận đơn hàng trong thời gian sớm nhất.
        </p>

        {orderCode && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <div className="text-xs text-amber-700 font-medium uppercase tracking-wide mb-1">Mã đơn hàng</div>
            <div className="text-2xl font-extrabold text-amber-600 tracking-widest">{orderCode}</div>
            <div className="text-xs text-gray-400 mt-1">Lưu lại mã này để tra cứu đơn hàng</div>
          </div>
        )}

        <div className="bg-gray-50 rounded-xl p-4 mb-7 text-left space-y-2">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Bước tiếp theo</div>
          {[
            'Nhân viên sẽ gọi điện xác nhận đơn trong vòng 30 phút',
            'Đơn hàng được đóng gói và bàn giao vận chuyển',
            'Giao hàng tận nơi trong 1–3 ngày làm việc',
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
              <span className="flex-shrink-0 w-5 h-5 bg-amber-400 text-white rounded-full text-[11px] font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              {step}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/san-pham"
            className="flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-white font-bold py-3 rounded-xl transition"
          >
            <ShoppingBag size={18} /> Tiếp tục mua sắm
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition"
          >
            <Home size={16} /> Về trang chủ
          </Link>
          <a
            href="tel:18001234"
            className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-amber-600 transition py-1"
          >
            <Phone size={14} /> Hotline hỗ trợ: 1800 1234
          </a>
        </div>
      </div>
    </div>
  )
}
