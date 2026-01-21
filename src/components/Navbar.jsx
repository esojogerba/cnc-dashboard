import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import cncLogo from '../assets/images/cnc_logo.png'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navItems = [
    { label: 'Home', icon: 'home', to: '/' },
    { label: 'Scouters', icon: 'travel_explore', to: '/scouters' },
    { label: 'Listers', icon: 'inventory_2' },
    { label: 'Scrapers', icon: 'content_cut' },
    { label: 'Favorites', icon: 'favorite' },
  ]

  return (
    <header className="top-nav">
      <div className="nav-bar">
        <div className="brand">
          <img src={cncLogo} alt="CNC Dashboard" />
        </div>
        <button
          className="nav-toggle"
          type="button"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="material-icons-round" aria-hidden="true">
            {isOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>
      <nav className={`nav-links${isOpen ? ' open' : ''}`} aria-label="Primary">
        {navItems.map((item) =>
          item.to ? (
            <NavLink
              key={item.label}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              to={item.to}
              onClick={() => setIsOpen(false)}
            >
              <span className="material-icons-round" aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </NavLink>
          ) : (
            <button
              key={item.label}
              className="nav-link disabled"
              type="button"
              disabled
            >
              <span className="material-icons-round" aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          ),
        )}
      </nav>
    </header>
  )
}

export default Navbar
