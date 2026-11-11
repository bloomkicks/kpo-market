import type { LoginRequest, LoginResponse } from "../types";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/api/client";
import { useAuthStore } from '@/store/auth-store';
import { queryClient } from '@/api/query-client';

export const useLogin = () => {
  const setTokens = useAuthStore((s) => s.setTokens)

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await api.post<LoginResponse>("/auth/login", data);
      return response.data;
    },
    onSuccess({ access_token, refresh_token }: LoginResponse) {
      setTokens({ access_token, refresh_token })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    }
  });
};
