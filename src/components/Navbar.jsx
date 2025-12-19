import { useState } from 'react'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navItems = [
    { label: 'Home', icon: 'home', active: true },
    { label: 'Scouters', icon: 'travel_explore' },
    { label: 'Listers', icon: 'inventory_2' },
    { label: 'Scrapers', icon: 'content_cut' },
    { label: 'Favorites', icon: 'favorite' },
  ]

  return (
    <header className="top-nav">
      <div className="nav-bar">
        <div className="brand">
          <span className="material-icons-outlined" aria-hidden="true">
            smart_toy
          </span>
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
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`nav-link${item.active ? ' active' : ''}`}
            type="button"
          >
            <span className="material-icons-round" aria-hidden="true">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </header>
  )
}

export default Navbar
