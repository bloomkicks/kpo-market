import { useMutation } from "@tanstack/react-query"
import type { RegisterRequest, RegisterResponse } from '../types';
import { api } from '@/api/client';

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      const response = await api.post<RegisterResponse>('/auth/register', data)
      return response.data
    }
  })
}