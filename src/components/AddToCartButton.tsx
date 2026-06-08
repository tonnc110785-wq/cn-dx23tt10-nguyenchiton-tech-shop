'use client'

import { useState } from 'react'
import { ShoppingCart, Check } from 'lucide-react'
import { useCart, type CartItem } from '@/lib/CartContext'

export default function AddToCartButton({ product }: { product: CartItem }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      onClick={handleAdd}
      className={`w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl transition-all duration-200 ${
        added
          ? 'bg-green-500 text-white'
          : 'bg-amber-400 hover:bg-amber-500 text-white'
      }`}
    >
      {added ? <Check size={18} /> : <ShoppingCart size={18} />}
      {added ? 'Đã thêm vào giỏ!' : 'Thêm vào giỏ hàng'}
    </button>
  )
}
