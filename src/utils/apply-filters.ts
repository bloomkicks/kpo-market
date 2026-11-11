import type { Product } from '@/types';

export const applyFilters = (params: URLSearchParams, products: Product[]): Product[] => {
  const sortBy = params.get("sort-by");
  const lowestPrice = Number(params.get("lowest") || 0);
  const highestPrice = Number(params.get("highest") || Infinity);
  const search = params.get("search")

  let newProducts = products.filter(product =>
  (lowestPrice <= product.price && product.price <= highestPrice &&
    (search ? product.title.toLowerCase().replaceAll(" ", "").includes(search.toLowerCase().replaceAll(" ", "")) : true)))

  if (!sortBy) return newProducts

  return newProducts.sort((a, b) => {
    const coefficient = sortBy.includes("ascend") ? -1 : 1;
    if (sortBy === "new")
      return b.createdAt.localeCompare(a.createdAt);

    return coefficient * (b.price - a.price);
  })
}