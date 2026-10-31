import React, { useEffect, useState } from 'react'
import './Navbar.css'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About Me', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
]

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''} ${open ? 'open' : ''}`}>
      <a href="#home" className="nav-brand">
        Ham<span>Za</span><i className="nav-dot"></i>
      </a>

      <ul className="nav-menu">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          </li>
        ))}
        <li className="menu-connect">
          <a href="#contact" className="nav-connect" onClick={() => setOpen(false)}>
            Connect With Me
          </a>
        </li>
      </ul>

      <a href="#contact" className="nav-connect nav-connect-desktop">Connect With Me</a>

      <button
        className="nav-burger"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span /><span /><span />
      </button>
    </header>
  )
}

export default Navbar