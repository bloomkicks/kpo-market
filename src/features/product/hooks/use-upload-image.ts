import type { UploadImageRequest, UploadImageResponse } from '../types';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/api/client';
import axios from 'axios';
import { queryClient } from '@/api/query-client';

export const useUploadImage = (productId: string) => {
  return useMutation({
    mutationFn: async (file: UploadImageRequest) => {
      const format = file.type === "image/png" ? "png" : "jpeg"

      const response = await api.post<UploadImageResponse>(`/catalog/${productId}/image`, null, {
        params: { format }
      })

      const url = response.data.product.url
      if (!url) throw new Error("Не удалось загрузить изображение")

      await axios.put(url, file)

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", productId] })
      queryClient.invalidateQueries({ queryKey: ["business-products"] })
    }
  })
}