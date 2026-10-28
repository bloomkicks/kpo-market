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

      // роль business auth выдаёт асинхронно (через kafka), а в токен она попадает
      // только после refresh — ждём её, иначе ручки продавца ответят 403
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
