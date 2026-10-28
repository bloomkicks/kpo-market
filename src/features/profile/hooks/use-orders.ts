import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/client';
import type { OrdersResponse } from '../types';

export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await api.get<OrdersResponse>('/profiles/orders')
      return response.data
    }
  })
}