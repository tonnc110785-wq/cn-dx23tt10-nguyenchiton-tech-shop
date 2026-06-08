export function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price)
}

export function calcDiscount(original: number, sale: number): number {
  return Math.round(((original - sale) / original) * 100)
}
