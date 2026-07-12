import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { company, navItems } from '../../data/siteData'
import useTheme from '../../hooks/useTheme'
import './Header.css'

function DesktopNav({ className }) {
  // Tracks a menu item whose dropdown should be force-hidden right after a
  // submenu link is clicked, so only the destination page shows — the
  // dropdown doesn't linger open just because the mouse hasn't moved yet.
  const [closedLabel, setClosedLabel] = useState(null)

  return (
    <nav className={className}>
      <ul>
        {navItems.map((item) => (
          <li
            key={item.label}
            className={[item.children ? 'menu-item-has-children' : '', closedLabel === item.label ? 'force-close-submenu' : '']
              .filter(Boolean)
              .join(' ') || undefined}
            onMouseLeave={() => closedLabel === item.label && setClosedLabel(null)}
          >
            {item.href === '#' ? (
              <a href={item.href}>{item.label}</a>
            ) : (
              <NavLink to={item.href} end={item.href === '/'}>
                {item.label}
              </NavLink>
            )}
            {item.children && (
              <ul className="sub-menu">
                {item.children.map((child) => (
                  <li key={child.label}>
                    <Link to={child.href} onClick={() => setClosedLabel(item.label)}>
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

function MobileNav({ openLabel, onToggle, onNavigate }) {
  return (
    <div className="vs-mobile-menu">
      <ul>
        {navItems.map((item) => (
          <li
            key={item.label}
            className={[
              item.children ? 'menu-item-has-children vs-item-has-children' : '',
              openLabel === item.label ? 'vs-active' : '',
            ]
              .filter(Boolean)
              .join(' ') || undefined}
          >
            {item.children ? (
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  onToggle(item.label)
                }}
              >
                {item.label}
                <span className="vs-mean-expand" />
              </a>
            ) : (
              <Link to={item.href} onClick={onNavigate}>
                {item.label}
              </Link>
            )}
            {item.children && openLabel === item.label && (
              <ul className="sub-menu">
                {item.children.map((child) => (
                  <li key={child.label}>
                    <Link to={child.href} onClick={onNavigate}>
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function SearchForm({ className, inputId }) {
  const [term, setTerm] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/search?q=${encodeURIComponent(term.trim())}`)
  }

  return (
    <form className={className} onSubmit={handleSubmit} role="search">
      <label htmlFor={inputId} className="sr-only">
        Search
      </label>
      <input
        id={inputId}
        type="text"
        placeholder="Search"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button type="submit" aria-label="Search">
        <i className="fas fa-search" />
      </button>
    </form>
  )
}

export default function Header() {
  const [isSticky, setIsSticky] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openLabel, setOpenLabel] = useState(null)
  const [theme, toggleTheme] = useTheme()

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 200)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const toggleMenu = () => setIsMenuOpen((open) => !open)
  const closeMenu = () => setIsMenuOpen(false)
  const toggleSubmenu = (label) => setOpenLabel((current) => (current === label ? null : label))

  return (
    <>
      {/* Mobile Menu Drawer */}
      <div className={`vs-menu-wrapper${isMenuOpen ? ' vs-body-visible' : ''}`} onClick={closeMenu}>
        <div className="vs-menu-area text-center" onClick={(e) => e.stopPropagation()}>
          <button className="vs-menu-toggle" onClick={closeMenu}>
            <i className="fal fa-times" />
          </button>
          <div className="mobile-logo">
            <Link to="/">
              <img src={company.logo} alt={company.name} />
            </Link>
          </div>
          <SearchForm className="mobile-search-form" inputId="mobile-search" />
          <MobileNav openLabel={openLabel} onToggle={toggleSubmenu} onNavigate={closeMenu} />
        </div>
      </div>

      {/* Main Header */}
      <header className="vs-header header-compact">
        {/* Top bar: logo + account icons */}
        <div className="header-top-bar">
          <div className="container-fluid header-container">
            <div className="row align-items-center">
              <div className="col-auto">
                <div className="header-logo">
                  <Link to="/">
                    <img src={company.logo} alt={company.name} />
                  </Link>
                </div>
              </div>
              <div className="col d-flex justify-content-end align-items-center header-top-icons">
                <Link to="/my-account" aria-label="My Account">
                  <i className="far fa-user" />
                </Link>
                <Link to="/cart" aria-label="Cart">
                  <i className="far fa-shopping-cart" />
                </Link>
                <button
                  className="theme-toggle-btn"
                  onClick={toggleTheme}
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {theme === 'dark' ? (
                    <svg viewBox="0 0 24 24" width="1.1em" height="1.1em" fill="currentColor" aria-hidden="true">
                      <circle cx="12" cy="12" r="4.5" />
                      <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                        <line x1="12" y1="1" x2="12" y2="4" />
                        <line x1="12" y1="20" x2="12" y2="23" />
                        <line x1="1" y1="12" x2="4" y2="12" />
                        <line x1="20" y1="12" x2="23" y2="12" />
                      </g>
                    </svg>
                  ) : (
                    <i className="fas fa-moon" />
                  )}
                </button>
                <button className="vs-menu-toggle d-lg-none" onClick={toggleMenu} aria-label="Open menu">
                  <i className="fal fa-bars" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Nav bar: dark, nav links + inline search. Sticks to the top of the
            viewport once the page is scrolled, so it stays reachable without
            the white logo bar above it. */}
        {isSticky && <div className="header-nav-bar-spacer d-none d-lg-block" />}
        <div className={`header-nav-bar d-none d-lg-block${isSticky ? ' is-sticky' : ''}`}>
          <div className="container-fluid header-container">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <DesktopNav className="main-menu menu-style1 d-none d-lg-block" />
              </div>
              <div className="col-auto d-none d-lg-block">
                <SearchForm className="header-search-form" inputId="desktop-search" />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
