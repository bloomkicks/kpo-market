import { useMutation } from '@tanstack/react-query';
import type { RegisterBusinessRequest, RegisterBusinessResponse, ProfileResponse } from '../types';
import { api } from '@/api/client';
import { queryClient } from '@/api/query-client';

export const useRegisterBusiness = () => {
  return useMutation({
    mutationFn: async (data: RegisterBusinessRequest) => {
      const response = await api.post<RegisterBusinessResponse>("/profiles/business", data)
      return response.data
    },
    onSuccess(updated) {
      queryClient.setQueryData<ProfileResponse>(['profile'], (old) =>
        old?.map((p) => p.id === updated.id ? updated : p)
      )
    }
  })
}