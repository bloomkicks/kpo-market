import axios, { type InternalAxiosRequestConfig } from "axios"
import { useAuthStore } from "@/store/auth-store"
import type { RefreshResponse } from "@/features/auth/types"

const baseURL = "http://localhost:80/api/v1"

export const api = axios.create({ baseURL })

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().tokens?.access_token

  if (token)
    config.headers.Authorization = `Bearer ${token}`

  return config
})

let refreshing: Promise<string | null> | null = null

export const refreshTokens = () => {
  const { tokens, setTokens, logout } = useAuthStore.getState()
  if (!tokens) return Promise.resolve(null)

  refreshing ??= axios
    .post<RefreshResponse>(`${baseURL}/auth/refresh`, { refresh_token: tokens.refresh_token })
    .then(({ data }) => {
      setTokens(data)
      return data.access_token
    })
    .catch(() => {
      logout()
      return null
    })
    .finally(() => {
      refreshing = null
    })

  return refreshing
}

api.interceptors.response.use(undefined, async (error) => {
  const config = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined
  if (error.response?.status !== 401 || !config || config._retry || config.url?.startsWith("/auth/"))
    throw error

  config._retry = true
  const token = await refreshTokens()
  if (!token) throw error

  config.headers.Authorization = `Bearer ${token}`
  return api(config)
})
