import { api } from "@/api/client";
import { useQuery } from "@tanstack/react-query";
import type { ProductResponse } from "../types";

// на удалённый или несуществующий товар каталог отвечает 200 с пустой карточкой (нулевой id)
const EMPTY_PRODUCT_ID = "00000000-0000-0000-0000-000000000000";

export const useProduct = (productId?: string) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await api.get<ProductResponse>(`/catalog/${productId}`);
      return response.data;
    },
    enabled: !!productId,
    select: (data) =>
      data.product.productId === EMPTY_PRODUCT_ID ? undefined : data.product,
  });
};
