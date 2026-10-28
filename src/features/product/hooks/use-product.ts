import { api } from "@/api/client";
import { useQuery } from "@tanstack/react-query";
import type { ProductResponse } from "../types";

export const useProduct = (productId?: string) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await api.get<ProductResponse>(`/catalog/${productId}`);

      return response.data;
    },
    enabled: !!productId
  });
};
