import { useNavigate } from 'react-router-dom'
import { authApi } from '@/features/auth/authApi'
import { useAuthStore } from '@/features/auth/authStore'
import { storage } from '@/lib/storage'

export function Header({ onMenu }: { onMenu: () => void }) {
  const navigate = useNavigate()
  const { user, clearSession } = useAuthStore()
  const logout = async () => {
    try { await authApi.logout(storage.getRefreshToken()) } catch { /* local cleanup is still required */ }
    clearSession()
    navigate('/login')
  }
  return (
    <header className="topbar">
      <button className="menu-button" onClick={onMenu} aria-label="Open navigation">☰</button>
      <div className="topbar__search">⌕ <span>Connected to FastAPI</span></div>
      <div className="topbar__user">
        <div className="avatar">{user?.first_name?.[0] ?? user?.username?.[0] ?? 'U'}</div>
        <div><strong>{user ? `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim() || user.username : 'Store user'}</strong><small>{user?.email ?? 'Authenticated session'}</small></div>
        <button className="text-button" onClick={logout}>Logout</button>
      </div>
    </header>
  )
}
