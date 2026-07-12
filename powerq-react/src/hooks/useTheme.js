import { useEffect, useState } from 'react'

export default function useTheme() {
  // Always starts on light/sun mode for every fresh page load or new tab —
  // toggling is intentionally not persisted (no localStorage), so a dark
  // mode choice never carries over to a new visit.
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return [theme, toggleTheme]
}
