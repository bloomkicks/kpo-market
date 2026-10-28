import type { AddImageResponse } from '../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { api } from '@/api/client';

export const useAddImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, file }: { productId: string, file: File }) => {
      const format = file.type === "image/png" ? "png" : "jpeg"

      const response = await api.post<AddImageResponse>(`/catalog/${productId}/image`, null, {
        params: { format }
      })

      const url = response.data.product.url
      if (!url) throw new Error("catalog не вернул ссылку для загрузки")
      await axios.put(url, file, { headers: { "Content-Type": file.type } })

      return response.data.product
    },
    onSuccess(product) {
      queryClient.invalidateQueries({ queryKey: ["product", product.productId] })
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })
}
