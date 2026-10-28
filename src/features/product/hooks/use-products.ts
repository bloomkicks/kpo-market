import { api } from "@/api/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { ProductsResponse } from "../types";

export const useProducts = () => {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: async ({ pageParam }) => {
      const response = await api.get<ProductsResponse>("/catalog", {
        params: { limit: 25, cursor: pageParam },
      });

      return response.data;
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined
  });
};
