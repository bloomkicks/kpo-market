import { useMutation } from '@tanstack/react-query';
import { api } from '@/api/client';
import type { BusinessRequest, BusinessResponse } from '../types';

export const useBusiness = () => {
  return useMutation({
    mutationFn: async (data: BusinessRequest) => {
      const response = await api.post<BusinessResponse>('/profiles/business', data)
      return response.data
    }
  })
}