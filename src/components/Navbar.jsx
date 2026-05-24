import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Phone, HelpCircle, MapPin, Users, MessageCircle } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const links = [
    { to: '/', label: 'Home' },
    { to: '/contact', label: 'Contacts' },
    { to: '/about', label: 'About Us' },
    { to: '/admin', label: 'Admin' },
  ]

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="main-nav">
      <Link to="/" className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img 
          src="/logo.png" 
          alt="Mactee Homes Logo" 
          className="nav-logo"
        />
        <span>Mactee Homes</span>
      </Link>

      <div className={`nav-links${menuOpen ? ' open' : ''}`}>
        {links.map(l => (
          <Link key={l.to} to={l.to} className={location.pathname === l.to ? 'active' : ''}>
            {l.label}
          </Link>
        ))}
        <a
          href="https://wa.me/233505814053"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta"
        >
          <MessageCircle size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
          WhatsApp Us
        </a>
      </div>

      <button
        className="mobile-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        id="mobile-menu-toggle"
      >
        <span style={menuOpen ? { transform: 'rotate(45deg) translate(5px,5px)' } : {}} />
        <span style={menuOpen ? { opacity: 0 } : {}} />
        <span style={menuOpen ? { transform: 'rotate(-45deg) translate(5px,-5px)' } : {}} />
      </button>
    </nav>
  )
}
