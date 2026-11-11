import axios from "axios"
import type { InternalAxiosRequestConfig } from "axios"
import { useAuthStore } from "@/store/auth-store"
import type { RefreshResponse } from '@/features/auth/types/index';

const baseURL = "/api/v1"

export const api = axios.create({ baseURL })

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().access_token
  if (token)
    config.headers.set("Authorization", `Bearer ${token}`)

  return config
})

let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = async (): Promise<string> => {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const { refresh_token } = useAuthStore.getState();
    if (!refresh_token) throw new Error("No refresh token");

    const { data } = await axios.post<RefreshResponse>(
      "/auth/refresh",
      { refresh_token },
      { baseURL },
    );

    useAuthStore.setState({
      access_token: data.access_token,
      refresh_token: data.refresh_token ?? refresh_token,
    });

    return data.access_token;
  })().finally(() => {
    refreshPromise = null;
  });

  return refreshPromise;
}

api.interceptors.response.use(null, async (error) => {
  if (!axios.isAxiosError(error)) return Promise.reject(error);

  const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

  if (
    error.response?.status !== 401 ||
    original?._retry ||
    original?.url?.includes("/auth/refresh")
  ) {
    return Promise.reject(error);
  }

  original._retry = true;

  try {
    await refreshAccessToken();
    return api(original);
  } catch {
    useAuthStore.getState().clearTokens();
    return Promise.reject(error);
  }
});