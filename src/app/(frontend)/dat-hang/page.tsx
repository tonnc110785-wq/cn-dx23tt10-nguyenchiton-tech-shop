'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Package, Truck, CreditCard, ArrowRight, ChevronLeft } from 'lucide-react'
import { useCart } from '@/lib/CartContext'
import { formatPrice } from '@/lib/format'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, count, total, clearCart } = useCart()

  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    address: '',
    note: '',
    paymentMethod: 'cod' as 'cod' | 'transfer',
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (count === 0) router.replace('/gio-hang')
  }, [count, router])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.customerName.trim()) e.customerName = 'Vui lòng nhập họ tên'
    if (!form.phone.trim()) e.phone = 'Vui lòng nhập số điện thoại'
    else if (!/^(0|\+84)[0-9]{9}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Số điện thoại không hợp lệ'
    if (!form.address.trim()) e.address = 'Vui lòng nhập địa chỉ giao hàng'
    return e
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setLoading(true)

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          items: items.map(i => ({
            productId: i.id,
            name: i.name,
            slug: i.slug,
            price: i.price,
            quantity: i.quantity,
            image: i.image,
          })),
          totalAmount: total,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message || 'Đặt hàng thất bại')
      clearCart()
      router.push(`/dat-hang/thanh-cong?code=${data.orderCode}`)
    } catch (err: any) {
      setErrors({ submit: err.message || 'Có lỗi xảy ra, vui lòng thử lại.' })
      setLoading(false)
    }
  }

  const field = (name: keyof typeof form) => ({
    value: form[name],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [name]: e.target.value })),
  })

  if (count === 0) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-400">
        <Link href="/gio-hang" className="flex items-center gap-1 hover:text-amber-600 transition">
          <ChevronLeft size={14} /> Giỏ hàng
        </Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">Đặt hàng</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Thông tin đặt hàng</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Form */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">Thông tin người nhận</h2>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...field('customerName')}
                    placeholder="Nguyễn Văn A"
                    className={`w-full border rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition ${errors.customerName ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                  />
                  {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    {...field('phone')}
                    placeholder="0901 234 567"
                    className={`w-full border rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Địa chỉ giao hàng <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...field('address')}
                    placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
                    className={`w-full border rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition ${errors.address ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>

                {/* Note */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Ghi chú (tùy chọn)</label>
                  <textarea
                    {...field('note')}
                    placeholder="Giao giờ hành chính, gọi trước khi giao..."
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">Phương thức thanh toán</h2>
              <div className="space-y-3">
                {[
                  {
                    value: 'cod',
                    label: 'Thanh toán khi nhận hàng (COD)',
                    desc: 'Trả tiền mặt khi nhận được hàng tại nhà',
                    icon: <Truck size={20} className="text-amber-500" />,
                  },
                  {
                    value: 'transfer',
                    label: 'Chuyển khoản ngân hàng',
                    desc: 'Chúng tôi sẽ xác nhận sau khi nhận được thanh toán',
                    icon: <CreditCard size={20} className="text-amber-500" />,
                  },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-start gap-3 border rounded-xl p-4 cursor-pointer transition ${
                      form.paymentMethod === opt.value
                        ? 'border-amber-400 bg-amber-50'
                        : 'border-gray-200 hover:border-amber-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={opt.value}
                      checked={form.paymentMethod === opt.value}
                      onChange={() => setForm(f => ({ ...f, paymentMethod: opt.value as 'cod' | 'transfer' }))}
                      className="mt-0.5 accent-amber-500"
                    />
                    <div className="flex-shrink-0 mt-0.5">{opt.icon}</div>
                    <div>
                      <div className="text-sm font-semibold text-gray-800">{opt.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{opt.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 sticky top-24">
              <h2 className="font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">
                Đơn hàng ({count} sản phẩm)
              </h2>

              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden relative border border-gray-100">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-contain p-0.5" sizes="48px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-200">
                          <Package size={18} strokeWidth={1} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-gray-700 line-clamp-2">{item.name}</div>
                      <div className="text-xs text-gray-400">x{item.quantity}</div>
                    </div>
                    <div className="text-xs font-bold text-gray-900 flex-shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-3 space-y-2 text-sm mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính</span>
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

              {errors.submit && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
                  {errors.submit}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 disabled:bg-amber-300 text-white font-bold py-3.5 rounded-xl transition"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Đang xử lý...
                  </>
                ) : (
                  <>Đặt hàng ngay <ArrowRight size={18} /></>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
