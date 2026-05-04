import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle({ dark, toggle, className = '' }) {
  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative w-10 h-10 rounded-full flex items-center justify-center border border-border text-muted hover:text-accent hover:border-accent/50 transition-all duration-200 min-h-[44px] min-w-[44px] ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {dark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="absolute flex items-center justify-center"
          >
            <Sun size={16} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="absolute flex items-center justify-center"
          >
            <Moon size={16} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
