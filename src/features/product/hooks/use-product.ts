import { api } from "@/api/client";
import { useAuthStore } from "@/store/auth-store";
import { useQuery, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import type { ProductResponse, ProductsResponse } from "../types";

export const useProduct = (productId?: string) => {
  const queryClient = useQueryClient();
  const isAuth = useAuthStore((s) => !!s.tokens);

  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await api.get<ProductResponse>(`/catalog/${productId}`);

      return response.data.product?.title ? response.data.product : null;
    },
    initialData: () =>
      queryClient
        .getQueryData<InfiniteData<ProductsResponse>>(["products"])
        ?.pages.flatMap((page) => page.products)
        .find((item) => item.product.productId === productId)?.product,
    initialDataUpdatedAt: 0,
    enabled: !!productId && isAuth
  });
};
