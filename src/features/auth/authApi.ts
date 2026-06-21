import { api } from '@/lib/axios'
import type { User } from '@/types'

export interface AuthResponse {
  access_token: string
  refresh_token?: string
  user: User
}

export const authApi = {
  login: (payload: { email: string; password: string }) =>
    api.post<AuthResponse>('/auth/login', payload).then((r) => r.data),
  signup: (payload: Record<string, unknown>) =>
    api.post<AuthResponse>('/auth/signup', payload).then((r) => r.data),
  logout: (refreshToken?: string | null) =>
    api.post('/auth/logout', { refresh_token: refreshToken }),
}
