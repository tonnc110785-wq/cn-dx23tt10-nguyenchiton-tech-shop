import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Truck, BadgeCheck, Wrench, RefreshCw } from 'lucide-react'

function IconFacebook() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function IconYoutube() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 mt-auto border-t border-gray-200">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-1.5 mb-4">
              <span className="bg-amber-400 text-white px-2 py-0.5 rounded font-extrabold tracking-tight">TECH</span>
              <span className="text-gray-900 font-semibold tracking-wide">SHOP</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Chuyên cung cấp sản phẩm điện máy chính hãng với giá tốt nhất và dịch vụ hậu mãi tận tâm.
            </p>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-amber-500" />
                <span>123 Nguyễn Huệ, TP. Trà Vinh</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="flex-shrink-0 text-amber-500" />
                <span className="text-gray-900 font-semibold">1800 1234</span>
                <span className="text-gray-400 text-xs">(Miễn phí)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="flex-shrink-0 text-amber-500" />
                <span>info@techshop.vn</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={14} className="flex-shrink-0 text-amber-500" />
                <span>8:00 – 21:00 (T2–T7)</span>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-3 text-sm uppercase tracking-wider">Danh mục</h4>
            <ul className="text-sm space-y-2">
              {['Tivi', 'Điều hòa', 'Tủ lạnh', 'Máy giặt', 'Laptop', 'Điện thoại'].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/san-pham?danh-muc=${cat.toLowerCase().replace(/\s/g, '-')}`}
                    className="hover:text-amber-600 transition"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-3 text-sm uppercase tracking-wider">Hỗ trợ</h4>
            <ul className="text-sm space-y-2">
              <li><Link href="/lien-he" className="hover:text-amber-600 transition">Liên hệ tư vấn</Link></li>
              <li><a href="#" className="hover:text-amber-600 transition">Chính sách bảo hành</a></li>
              <li><a href="#" className="hover:text-amber-600 transition">Chính sách đổi trả</a></li>
              <li><a href="#" className="hover:text-amber-600 transition">Hướng dẫn mua hàng</a></li>
              <li><Link href="/admin" className="hover:text-amber-600 transition">Trang quản trị</Link></li>
            </ul>
          </div>

          {/* About + Social */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-3 text-sm uppercase tracking-wider">Theo dõi</h4>
            <div className="flex gap-3 mb-6">
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-amber-600 hover:border-amber-300 transition">
                <IconFacebook />
              </a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-amber-600 hover:border-amber-300 transition">
                <IconInstagram />
              </a>
              <a href="#" aria-label="Youtube" className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-amber-600 hover:border-amber-300 transition">
                <IconYoutube />
              </a>
            </div>

            <h4 className="text-gray-900 font-semibold mb-3 text-sm uppercase tracking-wider">Cam kết</h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-center gap-2"><Truck size={14} className="text-amber-500 flex-shrink-0" /> Giao hàng miễn phí</li>
              <li className="flex items-center gap-2"><BadgeCheck size={14} className="text-amber-500 flex-shrink-0" /> Hàng chính hãng</li>
              <li className="flex items-center gap-2"><Wrench size={14} className="text-amber-500 flex-shrink-0" /> Bảo hành tận nơi</li>
              <li className="flex items-center gap-2"><RefreshCw size={14} className="text-amber-500 flex-shrink-0" /> Đổi trả 7 ngày</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4 text-center text-xs text-gray-400">
          © 2026 TechShop · Đồ án thực tập CNTT · Đại học Trà Vinh · Sinh viên: Nguyễn Chí Tôn – MSSV 170123297
        </div>
      </div>
    </footer>
  )
}
