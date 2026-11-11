import type { AddProductRequest, AddProductResponse } from '../types';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/api/client';
import { queryClient } from '@/api/query-client';

export const useAddProduct = () => {
  return useMutation({
    mutationFn: async (data: AddProductRequest) => {
      const response = await api.post<AddProductResponse>("/catalog", data)
      return response.data
    },
    onSuccess(data) {
      queryClient.setQueryData(["product", data.product.productId], { product: data.product })
    }
  })
}