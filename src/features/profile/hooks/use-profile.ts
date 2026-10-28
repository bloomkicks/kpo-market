import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/client';
import { useAuthStore } from '@/store/auth-store';
import type { ProfileResponse } from '../types';

export const useProfile = () => {
  const isAuth = useAuthStore((s) => !!s.tokens);

  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await api.get<ProfileResponse>('/profiles/me')
      return response.data
    },
    enabled: isAuth
  })
}