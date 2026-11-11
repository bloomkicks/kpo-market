import { useMutation } from '@tanstack/react-query';
import type { RegisterBusinessRequest, RegisterBusinessResponse } from '../types';
import { api, refreshAccessToken } from '@/api/client';
import { queryClient } from '@/api/query-client';

export const useRegisterBusiness = () => {
  return useMutation({
    mutationFn: async (data: RegisterBusinessRequest) => {
      const response = await api.post<RegisterBusinessResponse>("/profiles/business", data)
      return response.data
    },
    async onSuccess() {
      // бизнес-профиль создаётся рядом с клиентским, а не заменяет его - перечитываем список профилей
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      // роль business попадает в токен только после refresh, без него ручки бизнеса отвечают 403
      await refreshAccessToken().catch(() => undefined)
    }
  })
}
