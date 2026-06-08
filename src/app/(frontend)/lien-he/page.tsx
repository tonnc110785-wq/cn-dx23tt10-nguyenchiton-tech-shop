import type { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Liên hệ',
  description: 'Liên hệ với TechShop để được tư vấn và hỗ trợ mua hàng',
}

const CONTACT_INFO = [
  {
    icon: <MapPin size={20} className="text-amber-500 mt-0.5 flex-shrink-0" />,
    title: 'Địa chỉ cửa hàng',
    content: '123 Đường Nguyễn Huệ, Phường 1, TP. Trà Vinh, Tỉnh Trà Vinh',
  },
  {
    icon: <Phone size={20} className="text-amber-500 mt-0.5 flex-shrink-0" />,
    title: 'Điện thoại',
    content: '1800 1234 (Miễn phí) | 0294.123.456',
  },
  {
    icon: <Mail size={20} className="text-amber-500 mt-0.5 flex-shrink-0" />,
    title: 'Email',
    content: 'info@techshop.vn | support@techshop.vn',
  },
  {
    icon: <Clock size={20} className="text-amber-500 mt-0.5 flex-shrink-0" />,
    title: 'Giờ làm việc',
    content: 'Thứ 2 – Thứ 7: 8:00 – 21:00\nChủ nhật: 9:00 – 18:00',
  },
]

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Liên hệ với chúng tôi</h1>
      <p className="text-gray-500 mb-8">Chúng tôi luôn sẵn sàng tư vấn và hỗ trợ bạn 24/7</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info + Map */}
        <div>
          <div className="space-y-5 mb-8">
            {CONTACT_INFO.map((item) => (
              <div key={item.title} className="flex gap-3">
                {item.icon}
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3>
                  <p className="text-gray-600 text-sm whitespace-pre-line mt-0.5">{item.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Google Maps embed */}
          <div className="rounded-xl overflow-hidden border border-gray-200 h-64">
            <iframe
              title="TechShop location"
              src="https://maps.google.com/maps?q=Tra+Vinh+City+Vietnam&t=m&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Gửi yêu cầu tư vấn</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
