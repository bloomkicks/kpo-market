import type { AddProductRequest, AddProductResponse } from '../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api/client';

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddProductRequest) => {
      const response = await api.post<AddProductResponse>("/catalog", data)
      return response.data.product
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })
}
