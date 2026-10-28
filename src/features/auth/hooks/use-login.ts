import type { LoginRequest, LoginResponse } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";
import { useAuthStore } from "@/store/auth-store";

export const useLogin = () => {
  const setTokens = useAuthStore((s) => s.setTokens);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await api.post<LoginResponse>(
        "/auth/login",
        data,
      );
      return response.data;
    },
    onSuccess(tokens) {
      setTokens(tokens);
      queryClient.invalidateQueries();
    },
  });
};
