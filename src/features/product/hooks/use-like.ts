import { useMutation } from '@tanstack/react-query';
import type { LikeRequest } from '../types';
import { api } from '@/api/client';
import { queryClient } from '@/api/query-client';

export const useLike = () => {
  return useMutation({
    mutationFn: async (data: LikeRequest) => {
      const response = await api.post('/catalog/like', data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likes'] })
    }
  })
}