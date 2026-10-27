import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/types';

export interface CartLine {
  product: Product;
  amount: number
}

export interface CartStore {
  items: CartLine[];
  addItem(product: Product, amount: number): void;
  setAmount(itemId: number, amount: number): void;
  removeItem(itemId: number): void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product: Product, amount: number) => set((state) => {
        const exists = state.items.some(item => item.product.id === product.id)

        if (exists)
          return { items: state.items.map(item => item.product.id === product.id ? { ...item, amount: item.amount + amount } : item) }

        return { items: [...state.items, { product, amount }] }
      }),
      removeItem: (itemId: number) => set((state) => ({ items: state.items.filter(item => item.product.id !== itemId) })),
      setAmount: (itemId: number, amount: number) => set((state) =>
        ({ items: amount === 0 ? state.items.filter(item => item.product.id !== itemId) : state.items.map(item => item.product.id === itemId ? { ...item, amount } : item) })
      )
    }),
    {
      name: 'cart-storage',
      version: 1,
      partialize: (state) => ({ items: state.items })
    },
  )
)