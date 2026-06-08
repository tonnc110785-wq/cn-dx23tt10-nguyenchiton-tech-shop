'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function SortSelect({ currentSort }: { currentSort: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', e.target.value)
    params.delete('page')
    router.push(`/san-pham?${params.toString()}`)
  }

  return (
    <select
      className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      defaultValue={currentSort}
      onChange={handleChange}
    >
      <option value="-createdAt">Mới nhất</option>
      <option value="price">Giá tăng dần</option>
      <option value="-price">Giá giảm dần</option>
    </select>
  )
}
