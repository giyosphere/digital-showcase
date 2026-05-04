import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

const navLinks = ['Work', 'About', 'Contact']

export function Navbar({ dark, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Prevent body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 flex justify-between items-center px-5 sm:px-8 md:px-12 h-16 transition-all duration-300 ${
          scrolled
            ? 'bg-bg/90 backdrop-blur-md border-b border-border'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <a
          href="#hero"
          className="font-display text-lg sm:text-xl font-bold tracking-tight text-text hover:text-accent transition-colors flex-shrink-0"
        >
          Gio<span className="text-accent">Visuals</span>
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex gap-8 lg:gap-10 font-body text-sm font-medium text-muted">
          {navLinks.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="relative group hover:text-text transition-colors duration-200 py-1"
              >
                {item}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop right controls */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle dark={dark} toggle={toggleTheme} />
          <a
            href="mailto:giodalaoyan@gmail.com"
            className="flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-full border border-border text-muted hover:border-accent hover:text-accent transition-all duration-200 h-10"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile right controls */}
        <div className="flex md:hidden items-center gap-1">
          <ThemeToggle dark={dark} toggle={toggleTheme} />
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-text hover:text-accent transition-colors"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-bg flex flex-col justify-center items-center gap-10 md:hidden"
          >
            {/* Close */}
            <button
              onClick={closeMenu}
              className="absolute top-4 right-5 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-muted hover:text-text transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            {/* Logo in drawer */}
            <span className="absolute top-5 left-5 font-display text-lg font-bold text-text">
              Gio<span className="text-accent">Visuals</span>
            </span>

            {/* Nav links */}
            {navLinks.map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={closeMenu}
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i + 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-5xl sm:text-6xl font-bold text-text hover:text-accent transition-colors min-h-[44px] flex items-center"
              >
                {item}
              </motion.a>
            ))}

            {/* Email */}
            <motion.a
              href="mailto:giodalaoyan@gmail.com"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="font-mono text-sm text-muted hover:text-accent transition-colors mt-2 min-h-[44px] flex items-center"
            >
              giodalaoyan@gmail.com
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
