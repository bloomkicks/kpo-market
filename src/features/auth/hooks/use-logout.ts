import type { LogoutRequest } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";
import { useAuthStore } from "@/store/auth-store";

export const useLogout = () => {
  const logout = useAuthStore((s) => s.logout);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const refresh_token = useAuthStore.getState().tokens?.refresh_token;
      if (refresh_token)
        await api.post("/auth/logout", { refresh_token } satisfies LogoutRequest);
    },

    onSettled() {
      logout();
      queryClient.removeQueries({ queryKey: ["profile"] });
      queryClient.removeQueries({ queryKey: ["orders"] });
      queryClient.removeQueries({ queryKey: ["balance"] });
    },
  });
};
