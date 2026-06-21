import { api } from '@/lib/axios'
import type { Wishlist } from '@/types'

export const wishlistApi = {
  getByUser: (userId: number) => api.get<Wishlist>(`/wishlists/user/${userId}`).then((r) => r.data),
  add: (payload: { user_id: number; product_id: number }) => api.post('/wishlists/items', payload).then((r) => r.data),
  remove: (itemId: number) => api.delete(`/wishlists/items/${itemId}`),
}
