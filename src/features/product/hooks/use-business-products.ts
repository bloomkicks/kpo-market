import { api } from "@/api/client";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import type { BusinessProductsResponse } from "../types";
import type { Product } from '@/types/index';

const selectBusinessProducts = (data: InfiniteData<BusinessProductsResponse>) => ({
  ...data,
  pages: data.pages.flatMap((page) =>
    page.products.map((product) => ({
      ...product,
      productId: product.product_id,
      url: product.image_url ?? undefined,
      feedbacksCount: product.feedbacks_count,
      createdAt: product.created_at,
      updatedAt: product.updated_at,
    })),
  ),
});

export const useBusinessProducts = () => {
  return useInfiniteQuery({
    queryKey: ["business-products"],
    queryFn: async ({ pageParam }) => {
      const response = await api.get<BusinessProductsResponse>("/profiles/business/products", {
        params: { limit: 25, cursor: pageParam },
      });

      return response.data;
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.next_cursor ?? undefined,

    select: selectBusinessProducts
  });
};
