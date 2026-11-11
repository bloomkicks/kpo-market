import type { EditProductRequest, EditProductResponse } from '../types';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/api/client';
import { queryClient } from '@/api/query-client';

export const useEditProduct = (
  productId: string
) => {
  return useMutation({
    mutationFn: async (data: EditProductRequest) => {
      const response = await api.patch<EditProductResponse>(`/catalog/${productId}`, data)
      return response.data
    },
    onSuccess(data) {
      queryClient.setQueryData(["product", productId], { product: data.product })
    }
  })
}