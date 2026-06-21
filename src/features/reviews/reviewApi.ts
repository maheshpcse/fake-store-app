import { api } from '@/lib/axios'
import type { Review } from '@/types'

export const reviewApi = {
  list: () => api.get<Review[]>('/reviews').then((r) => r.data),
  create: (payload: Partial<Review>) => api.post<Review>('/reviews', payload).then((r) => r.data),
  update: (id: number, payload: Partial<Review>) => api.patch<Review>(`/reviews/${id}`, payload).then((r) => r.data),
  remove: (id: number) => api.delete(`/reviews/${id}`),
}
