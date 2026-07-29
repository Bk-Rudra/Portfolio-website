import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { CountUp } from '@/components/count-up'
import { achievements, profile } from '@/lib/portfolio-data'

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 md:py-28">
      <SectionHeading index="01 / about" title="Building trust into every layer" subtitle={profile.focus} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((item, i) => (
          <Reveal key={item.label} delay={i * 0.08}>
            <div className="h-full rounded-xl border border-border bg-card/60 p-6 transition-colors hover:border-primary/40">
              <p className="font-mono text-4xl font-semibold text-primary">
                {item.animation ? (
                  <>
                    <CountUp 
                      end={item.endValue || parseInt(item.metric)} 
                      suffix={item.suffix || ''} 
                      start={item.startValue || 0}
                      formatAsK={item.suffix === 'K+'}
                    />
                    {!item.suffix && item.metric.includes('%') && '%'}
                  </>
                ) : (
                  item.metric
                )}
              </p>
              <p className="mt-3 font-medium text-foreground">{item.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
