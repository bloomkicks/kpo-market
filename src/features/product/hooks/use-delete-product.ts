import { useMutation } from '@tanstack/react-query';
import { api } from '@/api/client';
import { queryClient } from '@/api/query-client';

export const useDeleteProduct = (
  productId: string
) => {
  return useMutation({
    mutationFn: async () => {
      const response = await api.delete(`/catalog/${productId}`)
      return response.data
    },
    onSuccess() {
      queryClient.removeQueries({ queryKey: ["product", productId] });
      queryClient.invalidateQueries({ queryKey: ["business-products"] })
    }
  })
}