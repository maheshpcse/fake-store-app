import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className="app-shell">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="app-shell__body">
        <Header onMenu={() => setMenuOpen(true)} />
        <main className="main-content"><Outlet /></main>
        <Footer />
      </div>
    </div>
  )
}
