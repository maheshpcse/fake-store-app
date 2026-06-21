import { api } from '@/lib/axios'
import type { Product, Review } from '@/types'

export const productApi = {
  list: (params?: { category?: string; search?: string; limit?: number; offset?: number }) =>
    api.get<Product[]>('/products', { params }).then((r) => r.data),
  get: (id: number) => api.get<Product>(`/products/${id}`).then((r) => r.data),
  reviews: (id: number) => api.get<Review[]>(`/products/${id}/reviews`).then((r) => r.data),
  create: (payload: Partial<Product>) => api.post<Product>('/products', payload).then((r) => r.data),
  update: (id: number, payload: Partial<Product>) => api.patch<Product>(`/products/${id}`, payload).then((r) => r.data),
  remove: (id: number) => api.delete(`/products/${id}`),
}
