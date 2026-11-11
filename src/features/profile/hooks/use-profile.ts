import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/client';
import type { ProfileResponse, MergedProfile } from '../types';

export const useProfile = <T = MergedProfile>({ select }: { select: (data: ProfileResponse) => T }) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await api.get<ProfileResponse>('/profiles/me')
      return response.data
    },
    select
  })
}