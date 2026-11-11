import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/client';
import type { LikesResponse } from '../types';

export const useLikes = () => {
  return useQuery({
    queryKey: ['likes'],
    queryFn: async () => {
      const response = await api.get<LikesResponse>('/profiles/likes')
      return response.data
    }
  })
}