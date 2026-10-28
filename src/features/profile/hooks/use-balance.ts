import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/client';
import type { BalanceResponse } from '../types';

export const useBalance = () => {
  return useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      const response = await api.get<BalanceResponse>('/profiles/balance')
      return response.data
    }
  })
}