import { motion } from 'motion/react'
import { ArrowUpRight, Download, Mail } from 'lucide-react'
import { profile } from '@/lib/portfolio-data'
import { DecryptText } from '@/components/decrypt-text'
import { NodeNetwork } from '@/components/node-network'
import { TypingTerminal } from '@/components/typing-terminal'
import { MagneticButton } from '@/components/magnetic-button'

const logLines = [
  { t: '00:00', k: 'System Init', v: 'Loading core competencies — full-stack, security, data integrity.' },
  { t: '01:14', k: 'Focus', v: 'Browser extensions, developer tools, VS Code/Figma plugins, and real-time dashboards.' },
  { t: '03:42', k: 'Status', v: 'Available for new opportunities.' },
]

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Interactive node network background */}
      <div className="absolute inset-0 opacity-40">
        <NodeNetwork className="size-full" />
      </div>

      {/* subtle grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(to right, color-mix(in oklch, var(--border) 60%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--border) 60%, transparent) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)',
        }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-32 md:pt-40 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-10">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 font-mono text-xs text-muted-foreground"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/70" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            Open to work · {profile.tagline}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
            data-profile-name
          >
            <DecryptText text={profile.name} startDelay={300} speed={1.2} />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-3 font-mono text-sm text-primary sm:text-base"
          >
            {profile.role} · {profile.years}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              data-interactive
            >
              View Projects
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href="/Bhupendra-Kumar-Resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              data-interactive
            >
              <Download className="size-4" />
              Download Resume
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              data-interactive
            >
              <Mail className="size-4" />
              Email
            </a>
          </motion.div>
        </div>

        {/* Terminal / project-log panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glow-ring rounded-xl border border-border bg-card/70 p-1 backdrop-blur"
        >
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="size-3 rounded-full bg-destructive/70" />
            <span className="size-3 rounded-full bg-primary/70" />
            <span className="size-3 rounded-full bg-muted-foreground/40" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">~/profile — session.log</span>
          </div>
          <div className="p-4">
            <TypingTerminal />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
