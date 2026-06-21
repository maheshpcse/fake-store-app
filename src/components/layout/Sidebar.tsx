import { NavLink } from 'react-router-dom'

const items = [
  ['Dashboard', '/', '⌂'], ['Products', '/products', '▦'], ['Categories', '/categories', '◫'],
  ['Cart', '/cart', '🛒'], ['Wishlist', '/wishlist', '♡'], ['Orders', '/orders', '▤'],
  ['Payments', '/payments', '◉'], ['Reviews', '/reviews', '☆'], ['Coupons', '/coupons', '⌁'],
  ['Reports', '/reports', '⇧'], ['Profile', '/profile', '○'], ['Addresses', '/addresses', '⌖'],
]

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open ? <button className="sidebar-overlay" onClick={onClose} aria-label="Close menu" /> : null}
      <aside className={`sidebar ${open ? 'sidebar--open' : ''}`}>
        <NavLink to="/" className="brand" onClick={onClose}><span className="brand__mark">F</span><span>Fake Store<small>System console</small></span></NavLink>
        <nav>
          {items.map(([label, to, icon]) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={onClose} className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}>
              <span>{icon}</span>{label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
