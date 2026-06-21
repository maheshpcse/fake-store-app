import { api } from '@/lib/axios'
import type { Order } from '@/types'

export const orderApi = {
  list: (params?: { user_id?: number; limit?: number; offset?: number }) =>
    api.get<Order[]>('/orders', { params }).then((r) => r.data),
  get: (id: number) => api.get<Order>(`/orders/${id}`).then((r) => r.data),
  create: (payload: unknown) => api.post<Order>('/orders', payload).then((r) => r.data),
  update: (id: number, payload: Partial<Order>) => api.patch<Order>(`/orders/${id}`, payload).then((r) => r.data),
  remove: (id: number) => api.delete(`/orders/${id}`),
}
