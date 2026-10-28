import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api, refreshTokens } from '@/api/client';
import { useAuthStore } from '@/store/auth-store';
import type { BusinessRequest, BusinessResponse } from '../types';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const useBusiness = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BusinessRequest) => {
      const response = await api.post<BusinessResponse>('/profiles/business', data)

      for (let i = 0; i < 10 && useAuthStore.getState().role !== 'business'; i++) {
        await sleep(1000)
        await refreshTokens()
      }

      return response.data
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    }
  })
}
