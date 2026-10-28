import type { AddImageRequest, AddImageResponse } from '../types';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/api/client';

export const useAddImage = (productId: string) => {
  return useMutation({
    mutationFn: async (data: AddImageRequest) => {
      const response = await api.post<AddImageResponse>(`/catalog/${productId}/image`, data, {
        params: {
          format: "jpeg|png"
        }
      })
      return response.data
    },
    onSuccess() { },
    onError() { }
  })
}