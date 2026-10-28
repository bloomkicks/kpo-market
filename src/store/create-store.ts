import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/types';

export interface CartLine {
  product: Product;
  quantity: number
}

export interface CartStore {
  lines: CartLine[];
  addLine(product: Product, quantity: number): void;
  setQuantity(productId: string, quantity: number): void;
  removeLine(productId: string): void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      lines: [],
      addLine: (product: Product, quantity: number) => set((state) => {
        const exists = state.lines.some(line => line.product.productId === product.productId)

        if (exists)
          return { lines: state.lines.map(line => line.product.productId === product.productId ? { ...line, quantity: line.quantity + quantity } : line) }

        return { lines: [...state.lines, { product, quantity: quantity }] }
      }),
      removeLine: (productId: string) => set((state) =>
        ({ lines: state.lines.filter(line => line.product.productId !== productId) })
      ),
      setQuantity: (productId: string, quantity: number) => set((state) => {
        if (quantity === 0)
          return { lines: state.lines.filter(line => line.product.productId !== productId) }

        return { lines: state.lines.map(line => line.product.productId === productId ? { ...line, quantity } : line) }
      })
    }),
    {
      name: 'cart-storage',
      version: 1,
      partialize: (state) => ({ lines: state.lines })
    },
  )
)