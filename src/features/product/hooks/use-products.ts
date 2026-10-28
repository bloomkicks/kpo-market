import { api } from "@/api/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { ProductsResponse } from "../types";

export const useProducts = () => {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: async ({ pageParam }) => {
      const response = await api.get<ProductsResponse>("/catalog", {
        params: { limit: 20, cursor: pageParam },
      });

      return response.data;
    },
    initialPageParam: "0",
    getNextPageParam: (lastPage) => lastPage.cursor ?? undefined
  });
};
