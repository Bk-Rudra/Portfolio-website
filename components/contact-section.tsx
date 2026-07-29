import { useState, type FormEvent } from 'react'
import { Copy, Check, ExternalLink, Mail, Phone, Send } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { profile } from '@/lib/portfolio-data'

export function ContactSection() {
  const [copied, setCopied] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  function copyEmail() {
    navigator.clipboard.writeText(profile.email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio message from ${form.name || 'someone'}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  const contactLinks = [
    { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
    { icon: ExternalLink, label: profile.linkedinLabel, href: profile.linkedin },
  ]

  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 md:py-28">
      <SectionHeading
        index="05 / contact"
        title="Let's build something secure"
        subtitle="Open to full-stack and security-focused roles. Drop a message or reach out directly."
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <div className="space-y-3">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                className="flex items-center gap-4 rounded-xl border border-border bg-card/60 p-4 transition-colors hover:border-primary/40"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-accent text-primary">
                  <link.icon className="size-4" />
                </span>
                <span className="truncate font-mono text-sm text-foreground">{link.label}</span>
              </a>
            ))}
            <button
              type="button"
              onClick={copyEmail}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-3 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
              {copied ? 'Copied to clipboard' : 'Copy email address'}
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-border bg-card/60 p-6 sm:p-7"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block font-mono text-xs text-muted-foreground">Name</span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary/60"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block font-mono text-xs text-muted-foreground">Email</span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary/60"
                  placeholder="you@company.com"
                />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="mb-1.5 block font-mono text-xs text-muted-foreground">Message</span>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full resize-none rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary/60"
                placeholder="Tell me about the role or project…"
              />
            </label>
            <button
              type="submit"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              {sent ? <Check className="size-4" /> : <Send className="size-4" />}
              {sent ? 'Opening your mail client…' : 'Send message'}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
