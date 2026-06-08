'use client'

import { Heart } from 'lucide-react'
import { useWishlist, type WishlistItem } from '@/lib/WishlistContext'

interface Props {
  product: WishlistItem
  variant?: 'card' | 'outline'
}

export default function WishlistButton({ product, variant = 'card' }: Props) {
  const { isInWishlist, toggleWishlist } = useWishlist()
  const saved = isInWishlist(product.id)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
  }

  if (variant === 'outline') {
    return (
      <button
        onClick={handleClick}
        className={`w-full flex items-center justify-center gap-2 border font-semibold py-3 rounded-xl transition ${
          saved
            ? 'border-red-300 bg-red-50 text-red-500 hover:bg-red-100'
            : 'border-gray-300 bg-white text-gray-700 hover:border-amber-400'
        }`}
      >
        <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
        {saved ? 'Đã yêu thích' : 'Thêm vào yêu thích'}
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      title={saved ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
      className={`w-8 h-8 flex items-center justify-center rounded-full shadow-sm border transition ${
        saved
          ? 'bg-red-500 border-red-500 text-white'
          : 'bg-white border-gray-100 text-gray-400 hover:text-red-500 hover:border-red-300'
      }`}
    >
      <Heart size={14} fill={saved ? 'currentColor' : 'none'} />
    </button>
  )
}
