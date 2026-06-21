import { api } from '@/lib/axios'
import type { Payment } from '@/types'

export const paymentApi = {
  list: (userId?: number) => api.get<Payment[]>('/payments', { params: { user_id: userId } }).then((r) => r.data),
  create: (payload: Partial<Payment>) => api.post<Payment>('/payments', payload).then((r) => r.data),
  update: (id: number, payload: Partial<Payment>) => api.patch<Payment>(`/payments/${id}`, payload).then((r) => r.data),
  remove: (id: number) => api.delete(`/payments/${id}`),
}
