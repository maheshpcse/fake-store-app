import { create } from 'zustand'

export interface ToastItem { id: number; type: 'success' | 'error' | 'info'; message: string }

interface ToastState {
  items: ToastItem[]
  show: (message: string, type?: ToastItem['type']) => void
  remove: (id: number) => void
}

export const useToastStore = create<ToastState>((set) => ({
  items: [],
  show: (message, type = 'info') => {
    const id = Date.now()
    set((state) => ({ items: [...state.items, { id, type, message }] }))
    window.setTimeout(() => set((state) => ({ items: state.items.filter((item) => item.id !== id) })), 3500)
  },
  remove: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
}))
