import { useMutation, useQueryClient } from '@tanstack/react-query';
import { v7 as uuidv7 } from 'uuid';
import { api } from '@/api/client';
import type { CartLine } from '@/store/create-store';
import type { OrderRequest, OrderResponse } from '../types';

export const useOrder = () => {
  return useMutation({
    mutationFn: async (data: OrderRequest) => {
      const response = await api.post<OrderResponse>("/orders", data)
      return response.data.order
    }
  })
}

// orders принимает один товар на заказ — оформляем по заказу на каждую позицию корзины.
// operationId — ключ идемпотентности: повтор того же запроса не создаст второй заказ
export const useCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (lines: CartLine[]) => {
      const results = await Promise.allSettled(
        lines.map((line) =>
          api.post<OrderResponse>("/orders", {
            operationId: uuidv7(),
            productId: line.product.productId,
            quantity: line.quantity,
          } satisfies OrderRequest)
        )
      )

      return lines.map((line, i) => ({ line, result: results[i] }))
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ['balance'] })
    }
  })
}
