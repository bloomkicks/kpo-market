import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/client';
import type { ProfileOrdersResponse } from '../types';

export const useProfileOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await api.get<ProfileOrdersResponse>('/profiles/orders')
      return response.data
    }
  })
}