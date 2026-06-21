import { api } from '@/lib/axios'
import type { Category } from '@/types'

export const categoryApi = {
  list: (activeOnly = true) => api.get<Category[]>('/categories', { params: { active_only: activeOnly } }).then((r) => r.data),
  create: (payload: Partial<Category>) => api.post<Category>('/categories', payload).then((r) => r.data),
  update: (id: number, payload: Partial<Category>) => api.patch<Category>(`/categories/${id}`, payload).then((r) => r.data),
  remove: (id: number) => api.delete(`/categories/${id}`),
}
