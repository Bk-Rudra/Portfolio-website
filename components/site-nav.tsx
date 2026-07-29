import { useEffect, useState } from 'react'
import { ThemeToggle } from '@/components/theme-toggle'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-border bg-background/80 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary font-semibold text-primary-foreground">
            BK
          </span>
          <span className="hidden font-medium text-foreground sm:inline">bhupendra.dev</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/Bhupendra-Kumar-Resume.pdf"
            download
            className="hidden rounded-md border border-border px-3 py-1.5 font-mono text-xs text-foreground transition-colors hover:border-primary/40 hover:text-primary sm:inline-flex"
          >
            Resume
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
