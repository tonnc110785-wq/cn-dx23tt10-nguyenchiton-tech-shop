import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CartProvider } from '@/lib/CartContext'
import { WishlistProvider } from '@/lib/WishlistContext'
import '../globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: 'TechShop - Điện Máy Chính Hãng', template: '%s | TechShop' },
  description: 'Mua sắm điện máy chính hãng: Tivi, Điều hòa, Tủ lạnh, Máy giặt, Laptop với giá tốt nhất',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50">
        <WishlistProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  )
}
