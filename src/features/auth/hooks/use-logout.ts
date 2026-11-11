import { useMutation } from "@tanstack/react-query";
import { api } from "@/api/client";
import { useAuthStore } from '@/store/auth-store';
import { queryClient } from '@/api/query-client';

export const useLogout = () => {
  const clearTokens = useAuthStore(s => s.clearTokens)

  return useMutation({
    mutationFn: async () => {
      const response = await api.post("/auth/logout", {
        refresh: useAuthStore.getState().refresh_token
      });
      return response.data;
    },
    onSettled() {
      clearTokens()
      queryClient.clear()
    }
  });
};
