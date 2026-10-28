import { api } from "@/api/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { ProductsResponse } from "../types";

export const useProducts = () => {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: async ({ pageParam }) => {
      // первая страница — без курсора, дальше курсор = nextCursor с бэка
      const response = await api.get<ProductsResponse>("/catalog", {
        params: { limit: 20, cursor: pageParam },
      });

      return response.data;
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined
  });
};
