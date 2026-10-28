import { isAxiosError } from "axios"

export const errorMessage = (error: unknown, byStatus: Record<number, string> = {}) => {
  if (!isAxiosError(error)) return "Что-то пошло не так"

  const status = error.response?.status
  if (status && byStatus[status]) return byStatus[status]

  const data = error.response?.data
  if (typeof data?.error === "string") return data.error
  if (typeof data?.message === "string") return data.message
  if (typeof data?.detail === "string") return data.detail
  if (Array.isArray(data?.detail) && data.detail[0]?.msg) return data.detail[0].msg

  if (!error.response) return "Сервер недоступен"
  return "Что-то пошло не так"
}
