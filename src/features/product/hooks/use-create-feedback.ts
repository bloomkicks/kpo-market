import type { FeedbackRequest, FeedbackResponse } from '../types';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/api/client';
import { queryClient } from '@/api/query-client';

export const useCreateFeedback = () => {
  return useMutation({
    mutationFn: async (data: FeedbackRequest) => {
      const response = await api.post<FeedbackResponse>("/catalog/feedbacks", data)
      return response.data
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["my-feedbacks"] })
      // рейтинг и число отзывов в карточке поменялись
      queryClient.invalidateQueries({ queryKey: ["product", data.productId] })
    }
  })
}
