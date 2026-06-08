'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Package, X, ZoomIn } from 'lucide-react'

type GalleryImage = {
  url: string
  alt?: string
}

interface Props {
  images: GalleryImage[]
  productName: string
  discount?: number | null
}

export default function ProductImageGallery({ images, productName, discount }: Props) {
  const [current, setCurrent] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const prev = useCallback(() => setCurrent(i => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setCurrent(i => (i + 1) % images.length), [images.length])

  // Close lightbox on Escape key
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false)
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    // Prevent body scroll while lightbox open
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, prev, next])

  if (images.length === 0) {
    return (
      <div className="relative bg-gray-50 rounded-xl overflow-hidden aspect-square flex items-center justify-center text-gray-200">
        <Package size={80} strokeWidth={1} />
      </div>
    )
  }

  return (
    <>
      {/* ── Thumbnail gallery ── */}
      <div>
        {/* Main image */}
        <div
          className="relative bg-gray-50 rounded-xl overflow-hidden aspect-square mb-3 group cursor-zoom-in"
          onClick={() => setLightbox(true)}
          title="Click để xem ảnh lớn"
        >
          <Image
            key={current}
            src={images[current].url}
            alt={images[current].alt || productName}
            fill
            className="object-contain p-6 transition-opacity duration-200"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={current === 0}
          />

          {discount && (
            <span className="absolute top-3 left-3 bg-amber-400 text-white font-bold text-sm px-3 py-1 rounded z-10">
              -{discount}%
            </span>
          )}

          {/* Zoom hint */}
          <span className="absolute bottom-3 right-3 z-10 bg-black/40 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition">
            <ZoomIn size={16} />
          </span>

          {/* Prev / Next */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                aria-label="Ảnh trước"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-white/80 hover:bg-white border border-gray-200 rounded-full shadow transition opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft size={20} className="text-gray-700" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                aria-label="Ảnh tiếp"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-white/80 hover:bg-white border border-gray-200 rounded-full shadow transition opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={20} className="text-gray-700" />
              </button>

              {/* Dot indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
                    aria-label={`Ảnh ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === current ? 'bg-amber-500 w-4' : 'bg-gray-300 hover:bg-gray-400 w-1.5'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`relative flex-shrink-0 w-16 h-16 bg-gray-50 rounded-lg overflow-hidden border-2 transition ${
                  i === current
                    ? 'border-amber-400 shadow-sm'
                    : 'border-gray-200 hover:border-amber-300'
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.alt || `${productName} ${i + 1}`}
                  fill
                  className="object-contain p-1"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          {/* Image container — stop propagation so clicking image doesn't close */}
          <div
            className="relative w-full h-full max-w-4xl max-h-[90vh] mx-auto flex items-center justify-center px-14 py-10"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[current].url}
              alt={images[current].alt || productName}
              fill
              className="object-contain"
              sizes="100vw"
              quality={100}
            />
          </div>

          {/* Close */}
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition"
            aria-label="Đóng"
          >
            <X size={22} />
          </button>

          {/* Counter */}
          {images.length > 1 && (
            <span className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
              {current + 1} / {images.length}
            </span>
          )}

          {/* Prev / Next */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                aria-label="Ảnh trước"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/25 text-white rounded-full transition"
              >
                <ChevronLeft size={26} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                aria-label="Ảnh tiếp"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/25 text-white rounded-full transition"
              >
                <ChevronRight size={26} />
              </button>
            </>
          )}

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
                  className={`relative flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition ${
                    i === current ? 'border-amber-400' : 'border-white/20 hover:border-white/50'
                  }`}
                >
                  <Image src={img.url} alt="" fill className="object-contain bg-white/10 p-0.5" sizes="56px" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
