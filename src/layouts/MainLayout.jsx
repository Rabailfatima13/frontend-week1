import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function MainLayout() {
  const { isAuthenticated, user, logout } = useAuth()

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
            {isAuthenticated ? (
              <NavLink
                to="/tasks"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                Tasks
              </NavLink>
            ) : null}
          </div>
          <div className="nav-auth">
            {isAuthenticated ? (
              <>
                <span className="nav-user">{user?.email}</span>
                <button type="button" className="nav-logout" onClick={logout}>
                  Log Out
                </button>
              </>
            ) : (
              <NavLink to="/login" className="nav-link">
                Log In
              </NavLink>
            )}
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
