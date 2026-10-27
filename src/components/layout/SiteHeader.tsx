import { useState } from 'react'
import { Menu, X } from 'lucide-react'

interface SiteHeaderProps {
  currentPage: 'home' | 'projects' | 'project-detail' | 'not-found'
}

export function SiteHeader({ currentPage }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const homePrefix = currentPage === 'home' ? '' : '/'

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="site-header-inner page-width">
        <a className="wordmark" href={currentPage === 'home' ? '#home' : '/'} onClick={closeMenu}>
          Vincent<span>.</span>
        </a>
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
        <nav
          className={`primary-navigation${menuOpen ? ' is-open' : ''}`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          <a href={`${homePrefix}#about`} onClick={closeMenu}>About</a>
          <a href={`${homePrefix}#skills`} onClick={closeMenu}>Stack</a>
          <a href={currentPage === 'home' ? '#work' : '/projects'} onClick={closeMenu}>Projects</a>
          <a className="navigation-contact" href={`${homePrefix}#contact`} onClick={closeMenu}>Contact</a>
        </nav>
      </div>
    </header>
  )
}
