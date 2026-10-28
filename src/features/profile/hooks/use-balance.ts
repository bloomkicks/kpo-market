import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api/client';
import { useAuthStore } from '@/store/auth-store';
import type { BalanceResponse, OrdersResponse } from '../types';
import { hasPendingOrders } from './use-orders';

export const useBalance = () => {
  const isAuth = useAuthStore((s) => !!s.tokens);
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      const response = await api.get<BalanceResponse>('/profiles/balance')
      return response.data
    },
    enabled: isAuth,
    refetchInterval: () =>
      hasPendingOrders(queryClient.getQueryData<OrdersResponse>(['orders'])) ? 2000 : false,
  })
}
