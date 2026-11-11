import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/client';
import type { FeedbacksResponse } from '../types';

// все отзывы текущего покупателя, новые первыми
export const useMyFeedbacks = () => {
  return useQuery({
    queryKey: ['my-feedbacks'],
    queryFn: async () => {
      const response = await api.get<FeedbacksResponse>('/catalog/feedbacks/my')
      return response.data
    },
    select: (data) => data.feedbacks
  })
}
