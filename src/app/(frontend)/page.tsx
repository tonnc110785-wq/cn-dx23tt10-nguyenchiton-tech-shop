export const dynamic = 'force-dynamic'

import Link from 'next/link'
import Image from 'next/image'
import { Truck, BadgeCheck, Wrench, RefreshCw, Package } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'
import ProductCard from '@/components/ProductCard'

const CATEGORIES = [
  { label: 'Tivi',        slug: 'tivi',              img: '/icons/icon_cate_tivi.png' },
  { label: 'Điều hòa',   slug: 'dieu-hoa',           img: '/icons/icon_cate_maylanh.png' },
  { label: 'Tủ lạnh',    slug: 'tu-lanh',            img: '/icons/icon_cate_tulanh.png' },
  { label: 'Máy giặt',   slug: 'may-giat',           img: '/icons/icon_cate_maygiat.png' },
  { label: 'Laptop',     slug: 'may-tinh-xach-tay',  img: '/icons/icon_cate_laptop.png' },
  { label: 'Điện thoại', slug: 'dien-thoai',         img: '/icons/icon_cate_dienthoai.png' },
]

export default async function HomePage() {
  const payload = await getPayloadClient()

  const featuredProducts = await payload.find({
    collection: 'products',
    where: { featured: { equals: true } },
    limit: 8,
    depth: 2,
  })

  const allProducts = await payload.find({
    collection: 'products',
    limit: 8,
    depth: 2,
    sort: '-createdAt',
  })

  const displayProducts = featuredProducts.docs.length >= 4
    ? featuredProducts.docs
    : allProducts.docs

  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#f0e8d8] via-[#f7f0e6] to-white border-b border-stone-200 overflow-hidden">
        <div className="w-full max-w-[1280px] mx-auto px-8 py-10 md:py-0 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full max-w-[520px] md:py-16">
            <span className="inline-block bg-amber-400 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4">
              Điện máy chính hãng
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-gray-900">
              Công nghệ đỉnh cao<br />
              <span className="text-amber-500">Giá cực tốt</span>
            </h1>
            <p className="text-gray-500 text-lg mb-6 max-w-md">
              Hàng nghìn sản phẩm điện máy chính hãng, bảo hành dài hạn, giao hàng toàn quốc trong 24h.
            </p>
            <div className="flex gap-3 flex-wrap mb-8">
              <Link
                href="/san-pham"
                className="bg-amber-400 hover:bg-amber-500 text-white font-bold px-6 py-3 rounded-lg transition"
              >
                Mua sắm ngay →
              </Link>
              <Link
                href="/lien-he"
                className="border border-gray-300 hover:border-amber-400 text-gray-600 hover:text-amber-600 font-medium px-6 py-3 rounded-lg transition"
              >
                Tư vấn miễn phí
              </Link>
            </div>
            {/* Stat counters */}
            <div className="flex gap-6">
              {[
                { n: '18+',  l: 'Sản phẩm' },
                { n: '8',    l: 'Danh mục' },
                { n: '24h',  l: 'Giao hàng' },
                { n: '100%', l: 'Chính hãng' },
              ].map((s, i) => (
                <div key={s.l} className={`text-center ${i < 3 ? 'pr-6 border-r border-stone-300' : ''}`}>
                  <div className="text-2xl font-extrabold text-amber-500 leading-none">{s.n}</div>
                  <div className="text-gray-500 text-xs mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Hero banner image */}
          <div className="flex-shrink-0 flex items-end justify-center">
            <Image
              src="/images/hero-banner.png"
              alt="TechShop - Điện máy chính hãng"
              width={512}
              height={512}
              className="h-[512px] w-auto object-contain drop-shadow-lg"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="bg-white border-b border-gray-100 py-5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { icon: <Truck size={42} strokeWidth={1.4} className="text-amber-500" />, title: 'Miễn phí vận chuyển', sub: 'Đơn hàng từ 500.000đ' },
              { icon: <BadgeCheck size={42} strokeWidth={1.4} className="text-amber-500" />, title: 'Hàng chính hãng 100%', sub: 'Cam kết xuất xứ rõ ràng' },
              { icon: <Wrench size={42} strokeWidth={1.4} className="text-amber-500" />, title: 'Bảo hành tận nhà', sub: 'Kỹ thuật viên đến nơi' },
              { icon: <RefreshCw size={42} strokeWidth={1.4} className="text-amber-500" />, title: 'Đổi trả trong 7 ngày', sub: 'Hoàn tiền nếu lỗi nhà SX' },
            ].map((f) => (
              <div key={f.title} className="flex items-center gap-3 px-4 py-3">
                <div className="flex-shrink-0">{f.icon}</div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{f.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{f.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-amber-400 rounded-full" />
          <h2 className="text-xl font-bold text-gray-900">Danh mục sản phẩm</h2>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/san-pham?danh-muc=${cat.slug}`}
              className="flex flex-col items-center gap-3 py-5 px-2 bg-white rounded-xl border border-gray-100 hover:border-amber-300 hover:shadow-md transition group"
            >
              <div className="w-20 h-20 relative group-hover:scale-105 transition-transform duration-200">
                <Image src={cat.img} alt={cat.label} fill className="object-contain" sizes="80px" />
              </div>
              <span className="text-xs font-semibold text-gray-600 group-hover:text-amber-600 transition text-center leading-tight">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="container mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-amber-400 rounded-full" />
            <h2 className="text-xl font-bold text-gray-900">
              {featuredProducts.docs.length >= 4 ? 'Sản phẩm nổi bật' : 'Sản phẩm mới nhất'}
            </h2>
          </div>
          <Link
            href="/san-pham"
            className="text-sm text-amber-600 hover:text-amber-500 font-medium"
          >
            Xem tất cả →
          </Link>
        </div>

        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {displayProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <div className="flex justify-center mb-4 text-gray-300"><Package size={48} strokeWidth={1} /></div>
            <p>Chưa có sản phẩm nào.</p>
            <p className="text-sm mt-2">
              Vào{' '}
              <Link href="/admin" className="text-amber-600 hover:underline">
                trang quản trị
              </Link>{' '}
              để thêm sản phẩm.
            </p>
          </div>
        )}
      </section>

      {/* Promo Banner */}
      <section className="bg-amber-400 text-white py-12 mb-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white/80 text-sm font-bold uppercase tracking-wider mb-1">Ưu đãi hôm nay</p>
            <h2 className="text-2xl md:text-3xl font-extrabold">Giảm đến 30% Điện lạnh</h2>
            <p className="text-white/80 mt-1">Áp dụng cho điều hòa, tủ lạnh, máy giặt – chỉ hôm nay!</p>
          </div>
          <Link
            href="/san-pham?danh-muc=dieu-hoa"
            className="bg-white text-amber-600 hover:bg-amber-50 font-bold px-8 py-3 rounded-lg transition flex-shrink-0"
          >
            Xem ngay
          </Link>
        </div>
      </section>
    </div>
  )
}
