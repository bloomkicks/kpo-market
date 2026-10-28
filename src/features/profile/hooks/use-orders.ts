import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/client';
import { useAuthStore } from '@/store/auth-store';
import type { OrdersResponse } from '../types';

export const hasPendingOrders = (orders?: OrdersResponse) =>
  !!orders?.some((order) => order.status.toLowerCase() === 'created')

export const useOrders = () => {
  const isAuth = useAuthStore((s) => !!s.tokens);

  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await api.get<OrdersResponse>('/profiles/orders')
      return response.data
    },
    enabled: isAuth,
    refetchInterval: (query) => hasPendingOrders(query.state.data) ? 2000 : false,
  })
}
