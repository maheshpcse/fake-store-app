import { api } from '@/lib/axios'
import type { User } from '@/types'

export const userApi = {
  list: (params?: { limit?: number; offset?: number }) => api.get<User[]>('/users', { params }).then((r) => r.data),
  get: (id: number) => api.get<User>(`/users/${id}`).then((r) => r.data),
  update: (id: number, payload: Partial<User>) => api.patch<User>(`/users/${id}`, payload).then((r) => r.data),
  addresses: (userId: number) => api.get(`/users/${userId}/addresses`).then((r) => r.data),
  createAddress: (userId: number, payload: unknown) => api.post(`/users/${userId}/addresses`, payload).then((r) => r.data),
  updateAddress: (id: number, payload: unknown) => api.patch(`/addresses/${id}`, payload).then((r) => r.data),
  removeAddress: (id: number) => api.delete(`/addresses/${id}`),
}
