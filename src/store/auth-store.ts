import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Tokens } from '@/features/auth/types';
import { useCartStore } from './create-store';

export type Role = "customer" | "business"

export interface AuthStore {
  tokens: Tokens | null;
  role: Role | null;
  setTokens(tokens: Tokens): void;
  logout(): void;
}

const roleFromToken = (token: string): Role | null => {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")
    return JSON.parse(atob(payload)).role ?? null
  } catch {
    return null
  }
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      tokens: null,
      role: null,
      setTokens: (tokens: Tokens) => set({ tokens, role: roleFromToken(tokens.access_token) }),
      logout: () => {
        useCartStore.getState().clear()
        set({ tokens: null, role: null })
      },
    }),
    {
      name: 'auth-storage',
      version: 1,
    },
  )
)
