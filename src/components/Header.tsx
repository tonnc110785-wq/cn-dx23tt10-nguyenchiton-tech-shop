'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useCart } from '@/lib/CartContext'
import { useWishlist } from '@/lib/WishlistContext'
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  ChevronDown,
  Settings,
  Truck,
} from 'lucide-react'

const CATEGORIES = [
  { label: 'Tất cả danh mục', slug: '' },
  { label: 'Tivi', slug: 'tivi' },
  { label: 'Điều hòa', slug: 'dieu-hoa' },
  { label: 'Tủ lạnh', slug: 'tu-lanh' },
  { label: 'Máy giặt', slug: 'may-giat' },
  { label: 'Laptop', slug: 'may-tinh-xach-tay' },
  { label: 'Điện thoại', slug: 'dien-thoai' },
  { label: 'Lò vi sóng', slug: 'lo-vi-song' },
]

const NAV_LINKS = [
  { href: '/', label: 'Trang chủ' },
  { href: '/san-pham', label: 'Sản phẩm' },
  { href: '/san-pham?danh-muc=tivi', label: 'Tivi' },
  { href: '/san-pham?danh-muc=dieu-hoa', label: 'Điều hòa' },
  { href: '/san-pham?danh-muc=tu-lanh', label: 'Tủ lạnh' },
  { href: '/san-pham?danh-muc=may-giat', label: 'Máy giặt' },
  { href: '/san-pham?danh-muc=may-tinh-xach-tay', label: 'Laptop' },
  { href: '/lien-he', label: 'Liên hệ' },
]

export default function Header() {
  const { count: cartCount } = useCart()
  const { count: wishlistCount } = useWishlist()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchCatOpen, setSearchCatOpen] = useState(false)
  const [navCatOpen, setNavCatOpen] = useState(false)
  const [selectedCat, setSelectedCat] = useState(CATEGORIES[0])
  const [search, setSearch] = useState('')
  const navCatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navCatRef.current && !navCatRef.current.contains(e.target as Node)) {
        setNavCatOpen(false)
      }
    }
    if (navCatOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [navCatOpen])

  const handleSearch = (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    const q = search.trim()
    if (!q) return
    const url = selectedCat.slug
      ? `/tim-kiem?q=${encodeURIComponent(q)}&danh-muc=${selectedCat.slug}`
      : `/tim-kiem?q=${encodeURIComponent(q)}`
    window.location.href = url
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* ── Top info bar ── */}
      <div className="bg-gray-100 text-xs py-1.5 border-b border-gray-200">
        <div className="container mx-auto px-4 flex justify-between text-gray-500">
          <span className="flex items-center gap-1.5">
              <Truck size={12} className="text-gray-500" />
              Miễn phí vận chuyển đơn từ 500.000đ
            </span>
          <div className="flex items-center gap-4">
            <span>Hotline: <span className="text-gray-900 font-semibold">1800 1234</span></span>
            <Link href="/admin" className="hover:text-gray-900 transition flex items-center gap-1">
              <Settings size={11} />
              Quản trị
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main header: Logo | Search+Category | Icons ── */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-6">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-1.5">
            <span className="bg-amber-400 text-white px-2 py-0.5 rounded font-extrabold tracking-tight text-lg">TECH</span>
            <span className="text-gray-900 font-semibold tracking-wide text-lg">SHOP</span>
          </Link>

          {/* Search bar — desktop */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-auto hidden md:flex">
            <div className="flex w-full border border-gray-300 rounded-lg focus-within:border-amber-400 focus-within:ring-1 focus-within:ring-amber-400">

              {/* Input */}
              <div className="flex-1 flex items-center rounded-l-lg overflow-hidden">
                <span className="pl-3 text-gray-400"><Search size={16} /></span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm yêu thích..."
                  className="flex-1 px-3 py-2.5 text-sm text-gray-900 focus:outline-none bg-transparent"
                />
              </div>

              {/* Category picker */}
              <div className="relative border-l border-gray-200 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setSearchCatOpen(!searchCatOpen)}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 transition whitespace-nowrap h-full"
                >
                  <span className="max-w-[7rem] truncate">{selectedCat.label}</span>
                  <ChevronDown size={13} />
                </button>
                {searchCatOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-48 py-1">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.slug}
                        type="button"
                        onClick={() => { setSelectedCat(cat); setSearchCatOpen(false) }}
                        className={`w-full text-left px-4 py-2 text-sm transition ${
                          selectedCat.slug === cat.slug
                            ? 'bg-amber-50 text-amber-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="bg-amber-400 hover:bg-amber-500 text-white font-semibold px-5 py-2.5 transition text-sm flex-shrink-0 rounded-r-lg"
              >
                Tìm kiếm
              </button>
            </div>
          </form>

          {/* Right icons */}
          <div className="flex items-center gap-1 flex-shrink-0 ml-auto md:ml-0">
            <Link
              href="/admin"
              className="flex flex-col items-center gap-0.5 px-2 py-1.5 text-gray-600 hover:text-amber-600 transition group"
              title="Tài khoản"
            >
              <User size={22} strokeWidth={1.6} />
              <span className="text-[10px] hidden md:block">Tài khoản</span>
            </Link>

            <Link
              href="/yeu-thich"
              className="flex flex-col items-center gap-0.5 px-2 py-1.5 text-gray-600 hover:text-amber-600 transition group"
              title="Yêu thích"
            >
              <div className="relative">
                <Heart size={22} strokeWidth={1.6} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] hidden md:block mt-0.5">Yêu thích</span>
            </Link>

            <Link
              href="/gio-hang"
              className="flex flex-col items-center gap-0.5 px-2 py-1.5 text-gray-600 hover:text-amber-600 transition group"
              title="Giỏ hàng"
            >
              <div className="relative">
                <ShoppingCart size={22} strokeWidth={1.6} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] hidden md:block mt-0.5">Giỏ hàng</span>
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="md:hidden mt-3">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:border-amber-400 focus-within:ring-1 focus-within:ring-amber-400">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
              className="flex-1 px-4 py-2.5 text-sm text-gray-900 focus:outline-none bg-white"
            />
            <button type="submit" className="bg-amber-400 hover:bg-amber-500 text-white px-4 py-2.5 transition">
              <Search size={16} />
            </button>
          </div>
        </form>
      </div>

      {/* ── Nav bar ── */}
      <nav className={`bg-amber-400 ${menuOpen ? 'block' : 'hidden md:block'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center">

            {/* All Categories */}
            <div ref={navCatRef} className="relative flex-shrink-0 border-r border-amber-300">
              <button
                type="button"
                onClick={() => setNavCatOpen(!navCatOpen)}
                className="flex items-center gap-2 px-4 py-2.5 text-gray-900 font-semibold text-sm hover:bg-amber-500 transition"
              >
                <Menu size={16} />
                Tất cả danh mục
                <ChevronDown size={13} />
              </button>
              {navCatOpen && (
                <div className="absolute left-0 top-full mt-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 w-52 py-1">
                  {CATEGORIES.slice(1).map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/san-pham?danh-muc=${cat.slug}`}
                      onClick={() => setNavCatOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Nav links */}
            <ul className="flex flex-col md:flex-row md:items-center flex-1">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-2.5 px-4 text-gray-900 font-semibold hover:bg-amber-500 hover:text-white text-sm transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Shop now */}
            <Link
              href="/san-pham"
              className="hidden md:inline-flex items-center mx-3 bg-white text-amber-700 font-bold px-5 py-1.5 rounded text-sm hover:bg-amber-50 transition flex-shrink-0"
            >
              Mua ngay
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
