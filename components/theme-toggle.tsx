import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const [light, setLight] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const isLight = stored === 'light'
    setLight(isLight)
    document.documentElement.classList.toggle('light', isLight)
  }, [])

  function toggle() {
    const next = !light
    setLight(next)
    
    // Start view transition if supported
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        document.documentElement.classList.toggle('light', next)
        localStorage.setItem('theme', next ? 'light' : 'dark')
      })
    } else {
      document.documentElement.classList.toggle('light', next)
      localStorage.setItem('theme', next ? 'light' : 'dark')
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
      className="relative flex size-9 items-center justify-center rounded-md border border-border bg-card/60 text-muted-foreground transition-colors hover:text-foreground hover:border-primary/40 overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={light ? 'moon' : 'sun'}
          initial={{ rotate: -90, scale: 0, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {light ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </motion.div>
      </AnimatePresence>
    </button>
  )
}
