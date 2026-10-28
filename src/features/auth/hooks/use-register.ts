import type { LoginResponse, RegisterRequest, RegisterResponse } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";
import { useAuthStore } from "@/store/auth-store";

// после регистрации сразу логинимся, чтобы пользователь не вводил данные второй раз
export const useRegister = () => {
  const setTokens = useAuthStore((s) => s.setTokens);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      await api.post<RegisterResponse>("/auth/register", data);
      const response = await api.post<LoginResponse>("/auth/login", data);
      return response.data;
    },
    onSuccess(tokens) {
      setTokens(tokens);
      queryClient.invalidateQueries();
    },
  });
};
