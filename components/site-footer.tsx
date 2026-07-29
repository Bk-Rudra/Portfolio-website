import { profile } from '@/lib/portfolio-data'

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 sm:flex-row">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}. Built with React.js & Tailwind.
        </p>
        <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
          <a href={`mailto:${profile.email}`} className="transition-colors hover:text-foreground">
            Email
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
          <a href="/Bhupendra-Kumar-Resume.pdf" download className="transition-colors hover:text-foreground">
            Resume
          </a>
        </div>
      </div>
    </footer>
  )
}
