import { api } from "@/api/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { CatalogueResponse } from "../types";

export const useCatalogue = () => {
  return useInfiniteQuery({
    queryKey: ["catalogue"],
    queryFn: async ({ pageParam }) => {
      const response = await api.get<CatalogueResponse>("/catalog", {
        params: {
          limit: 25,
          cursor: pageParam
        },
      });

      return response.data;
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    select: (data) => ({
      ...data,
      pages: data.pages.flatMap((page) => page.products),
    }),
  });
};
