import { useEffect, useState } from 'react'

export function useTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return true
    const stored = localStorage.getItem('geovisuals-theme')
    if (stored) return stored === 'dark'
    // Default to dark for cinematic feel
    return true
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('geovisuals-theme', dark ? 'dark' : 'light')
  }, [dark])

  return { dark, toggle: () => setDark((d) => !d) }
}
