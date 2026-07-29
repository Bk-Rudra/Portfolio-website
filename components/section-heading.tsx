import { Reveal } from '@/components/reveal'

export function SectionHeading({
  index,
  title,
  subtitle,
}: {
  index: string
  title: string
  subtitle?: string
}) {
  return (
    <Reveal>
      <div className="mb-10 flex flex-col gap-3">
        <span className="font-mono text-xs text-primary">{index}</span>
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        {subtitle ? (
          <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
    </Reveal>
  )
}
