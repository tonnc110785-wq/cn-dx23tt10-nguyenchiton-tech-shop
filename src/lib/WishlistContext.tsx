'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

export type WishlistItem = {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  brand?: string
  image?: string
}

type WishlistContextType = {
  items: WishlistItem[]
  count: number
  isInWishlist: (id: string) => boolean
  toggleWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: string) => void
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | null>(null)

const STORAGE_KEY = 'techshop_wishlist'

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setItems(JSON.parse(saved))
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const isInWishlist = useCallback((id: string) => items.some(i => i.id === id), [items])

  const toggleWishlist = useCallback((item: WishlistItem) => {
    setItems(prev =>
      prev.some(i => i.id === item.id)
        ? prev.filter(i => i.id !== item.id)
        : [...prev, item]
    )
  }, [])

  const removeFromWishlist = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const clearWishlist = useCallback(() => setItems([]), [])

  return (
    <WishlistContext.Provider value={{ items, count: items.length, isInWishlist, toggleWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
