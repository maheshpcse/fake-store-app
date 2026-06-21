import { api } from '@/lib/axios'
import type { Cart } from '@/types'

export const cartApi = {
  getByUser: (userId: number) => api.get<Cart[]>(`/carts/user/${userId}`).then((r) => r.data),
  addItem: (payload: { user_id: number; product_id: number; quantity: number }) => api.post('/carts/items', payload).then((r) => r.data),
  updateItem: (itemId: number, quantity: number) => api.patch(`/carts/items/${itemId}`, { quantity }).then((r) => r.data),
  removeItem: (itemId: number) => api.delete(`/carts/items/${itemId}`),
}
