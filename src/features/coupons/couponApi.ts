import { api } from '@/lib/axios'
import type { Coupon } from '@/types'

export const couponApi = {
  get: (code: string) => api.get<Coupon>(`/coupons/${code}`).then((r) => r.data),
  list: () => api.get<Coupon[]>('/coupons').then((r) => r.data),
  create: (payload: Partial<Coupon>) => api.post<Coupon>('/coupons', payload).then((r) => r.data),
  update: (id: number, payload: Partial<Coupon>) => api.patch<Coupon>(`/coupons/${id}`, payload).then((r) => r.data),
  remove: (id: number) => api.delete(`/coupons/${id}`),
}
