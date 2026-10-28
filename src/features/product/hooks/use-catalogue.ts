import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { useProducts } from "./use-products";

export type SortBy = "none" | "price-descend" | "price-ascend" | "new"

// фильтры живут в query-параметрах: q (поиск), sort-by, lowest, highest
export const useCatalogueParams = () => {
  const [params, setParams] = useSearchParams();

  const lowest = params.get("lowest");
  const highest = params.get("highest");

  return {
    query: params.get("q")?.trim() ?? "",
    sortBy: (params.get("sort-by") ?? "none") as SortBy,
    lowest: lowest === null ? null : Number(lowest),
    highest: highest === null ? null : Number(highest),
    update(values: Record<string, string | null>) {
      setParams((prev) => {
        const next = new URLSearchParams(prev);
        for (const [key, value] of Object.entries(values))
          if (value === null || value === "") next.delete(key);
          else next.set(key, value);
        return next;
      }, { replace: true });
    },
  };
};

// поиска и фильтров на бэке нет, поэтому всё считается на клиенте. Чтобы не искать
// только по первой странице, при активном фильтре догружаем каталог целиком
export const useCatalogue = () => {
  const products = useProducts();
  const { query, sortBy, lowest, highest } = useCatalogueParams();
  const { hasNextPage, isFetchingNextPage, fetchNextPage } = products;

  const isFiltered = !!query || sortBy !== "none" || lowest !== null || highest !== null;

  useEffect(() => {
    if (isFiltered && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [isFiltered, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const all = products.data?.pages.flatMap((page) => page.products.map((item) => item.product)) ?? [];
  const maxPrice = Math.max(0, ...all.map((p) => p.price));

  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  let filtered = all.filter((p) => {
    if (lowest !== null && p.price < lowest) return false;
    if (highest !== null && p.price > highest) return false;
    const text = `${p.title} ${p.description ?? ""}`.toLowerCase();
    return words.every((word) => text.includes(word));
  });

  if (sortBy !== "none")
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === "new") return b.createdAt.localeCompare(a.createdAt);
      return sortBy === "price-ascend" ? a.price - b.price : b.price - a.price;
    });

  return {
    ...products,
    products: filtered,
    maxPrice,
    isFiltered,
    // пока догружаем каталог под фильтр, результат неполный
    isFilling: isFiltered && (hasNextPage || isFetchingNextPage),
  };
};
