import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { jwtDecode } from "jwt-decode"
import type { Tokens, TokenPayload } from '@/types';

export type AuthStore = {
  setTokens: (tokens: Tokens) => void;
  clearTokens: () => void;
  decodeToken: () => TokenPayload | null
} & Tokens

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      setTokens(tokens) { set(tokens); },
      clearTokens() { set({ access_token: undefined, refresh_token: undefined }); },
      decodeToken() {
        const token = get().access_token;
        return token ? jwtDecode<TokenPayload>(token) : null;
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        access_token: state.access_token,
        refresh_token: state.refresh_token,
      }),
    },
  ),
);