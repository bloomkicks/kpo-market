import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/client';
import type { ProfileResponse } from '../types';

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await api.get<ProfileResponse>('/profiles/me')
      return response.data
    }
  })
}