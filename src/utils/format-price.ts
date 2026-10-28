export function formatPrice(price: number, hideFraction?: boolean): string {
  return Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: hideFraction ? 0 : 2
  }).format(price)
}