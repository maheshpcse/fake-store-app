import { create } from 'zustand'
import { storage } from '@/lib/storage'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  setSession: (accessToken: string, refreshToken: string | undefined, user: User) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>((set) => {
  const user = storage.getUser<User>()
  return {
    user,
    isAuthenticated: Boolean(storage.getAccessToken()),
    setSession: (accessToken, refreshToken, nextUser) => {
      storage.setTokens(accessToken, refreshToken)
      storage.setUser(nextUser)
      set({ user: nextUser, isAuthenticated: true })
    },
    clearSession: () => {
      storage.clearAuth()
      set({ user: null, isAuthenticated: false })
    },
  }
})
