const ACCESS_TOKEN = 'fake_store_access_token'
const REFRESH_TOKEN = 'fake_store_refresh_token'
const USER = 'fake_store_user'

export const storage = {
  getAccessToken: () => localStorage.getItem(ACCESS_TOKEN),
  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN),
  setTokens: (accessToken: string, refreshToken?: string) => {
    localStorage.setItem(ACCESS_TOKEN, accessToken)
    if (refreshToken) localStorage.setItem(REFRESH_TOKEN, refreshToken)
  },
  getUser: <T>() => {
    const value = localStorage.getItem(USER)
    return value ? (JSON.parse(value) as T) : null
  },
  setUser: (user: unknown) => localStorage.setItem(USER, JSON.stringify(user)),
  clearAuth: () => {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
    localStorage.removeItem(USER)
  },
}
