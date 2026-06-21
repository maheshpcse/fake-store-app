import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { env } from '@/config/env'
import { storage } from './storage'

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean }

export const api = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = storage.getAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as RetryConfig | undefined
    const refreshToken = storage.getRefreshToken()

    if (error.response?.status === 401 && original && !original._retry && refreshToken) {
      original._retry = true
      try {
        const response = await axios.post(`${env.VITE_API_BASE_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        })
        const accessToken = response.data.access_token
        storage.setTokens(accessToken, response.data.refresh_token ?? refreshToken)
        original.headers.Authorization = `Bearer ${accessToken}`
        return api(original)
      } catch {
        storage.clearAuth()
      }
    }

    if (error.response?.status === 401) {
      storage.clearAuth()
      if (!window.location.pathname.startsWith('/login')) {
        window.location.assign('/login')
      }
    }
    return Promise.reject(error)
  },
)

export const getApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const detail = error.response?.data?.detail
    if (typeof detail === 'string') return detail
    if (error.response?.status === 404) return 'This backend route is not available yet.'
    return error.message
  }
  return error instanceof Error ? error.message : 'Something went wrong.'
}
