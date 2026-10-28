import type { LoginRequest, LoginResponse } from "../types";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/api/client";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await api.post<LoginResponse>(
        "/login",
        data,
      );
      return response.data;
    },
  });
};
