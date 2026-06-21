export type Id = number | string

export interface User {
  id: number
  email: string
  username: string
  first_name: string
  last_name: string
  phone?: string
  street?: string
  street_number?: number
  city?: string
  zipcode?: string
  is_active?: boolean
  created_at?: string
}

export interface Product {
  id: number
  title: string
  description: string
  price: number | string
  image: string
  rating_rate: number | string
  rating_count: number
  stock_quantity: number
  category_id: number
  category: string
  is_active?: boolean
}

export interface Category {
  id: number
  name: string
  description?: string
  image?: string
  is_active: boolean
  created_at?: string
}

export interface CartItem {
  id: number
  product_id: number
  title: string
  price: number | string
  quantity: number
  subtotal: number | string
}

export interface Cart {
  id: number
  user_id: number
  status: string
  cart_date: string
  items: CartItem[]
}

export interface WishlistItem {
  id: number
  product_id: number
  title: string
  price: number | string
  image: string
  category: string
  added_at: string
}

export interface Wishlist {
  id: number
  user_id: number
  created_at: string
  items: WishlistItem[]
}

export interface Order {
  id: number
  user_id: number
  address_id: number
  status: string
  total_amount: number | string
  discount: number | string
  final_amount: number | string
  currency: string
  payment_method: string
  ordered_at: string
  delivered_at?: string
  items?: Array<{ id: number; product_id: number; title: string; price: number; quantity: number; subtotal: number }>
}

export interface Payment {
  id: number
  order_id: number
  user_id: number
  method: string
  card_last4?: string
  amount: number | string
  currency: string
  status: string
  transaction_id: string
  paid_at?: string
}

export interface Review {
  id: number
  rating: number
  title: string
  comment: string
  is_verified_purchase: boolean
  created_at: string
  user_id: number
  username: string
}

export interface Coupon {
  id: number
  code: string
  discount_type: string
  discount_value: number | string
  min_order_amount: number | string
  max_discount: number | string
  usage_limit: number
  used_count: number
  is_active: boolean
  valid_from: string
  valid_until: string
}

export interface ReportBatch {
  id: number
  file_name: string
  status: string
  total_rows: number
  valid_rows: number
  invalid_rows: number
  total_amount: number | string
  success_count: number
  failed_count: number
  pending_count: number
  refunded_count: number
  error_message?: string
  started_at: string
  completed_at?: string
}
