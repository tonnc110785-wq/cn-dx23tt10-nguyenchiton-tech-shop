'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('Gửi thất bại')

      setStatus('success')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      setStatus('error')
      setErrorMsg('Có lỗi xảy ra. Vui lòng thử lại hoặc gọi hotline 1800 1234.')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-10">
        <div className="flex justify-center mb-4 text-green-600"><CheckCircle size={52} strokeWidth={1.5} /></div>
        <h3 className="text-xl font-bold text-green-700 mb-2">Gửi thành công!</h3>
        <p className="text-gray-600 mb-4">Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
        <button
          onClick={() => setStatus('idle')}
          className="text-amber-600 hover:underline text-sm"
        >
          Gửi yêu cầu khác
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Họ tên <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Nguyễn Văn A"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="0912 345 678"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="email@example.com"
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Chủ đề</label>
        <select
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          <option value="">-- Chọn chủ đề --</option>
          <option value="tu-van-san-pham">Tư vấn sản phẩm</option>
          <option value="dat-hang">Đặt hàng</option>
          <option value="bao-hanh">Bảo hành / Sửa chữa</option>
          <option value="doi-tra">Đổi trả hàng</option>
          <option value="khac">Khác</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nội dung <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Mô tả yêu cầu của bạn..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
        />
      </div>

      {errorMsg && (
        <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-amber-400 hover:bg-amber-500 disabled:bg-gray-300 text-white font-semibold py-3 rounded-xl transition-colors duration-200"
      >
        {status === 'loading' ? 'Đang gửi...' : 'Gửi yêu cầu'}
      </button>
    </form>
  )
}
