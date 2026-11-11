import { useMutation } from '@tanstack/react-query';
import { api } from '@/api/client';
import type { OrderRequest, OrderResponse } from '../types';

export const useOrder = () => {
  return useMutation({
    mutationFn: async (data: OrderRequest) => {
      const response = await api.post<OrderResponse>("/orders", data)
      return response.data
    }
  })
}