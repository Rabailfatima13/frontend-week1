import { NavLink, Outlet } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function MainLayout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <nav className="site-nav" aria-label="Primary Navigation">
          <span className="brand">Week 1 SPA</span>
          <div className="nav-links">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>© 2026 My React Assignment</p>
      </footer>
    </div>
  )
}

export default MainLayout
