import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { ScrollProgress } from '@/components/scroll-progress'
import { TiltCard } from '@/components/tilt-card'
import { CountUp } from '@/components/count-up'
import { projects } from '@/lib/portfolio-data'

export function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 md:py-28">
      <SectionHeading
        index="03 / projects"
        title="Selected work log"
        subtitle="Mission-critical platforms spanning quantum networks, blockchain security, and large-scale web systems."
      />

      <div className="relative">
        {/* Scroll-linked progress spine */}
        <ScrollProgress totalNodes={projects.length} />

        <div className="space-y-6">
          {projects.map((project, i) => (
            <Reveal key={project.index} delay={i * 0.05} withDepth>
              <article className="relative sm:pl-12" data-card-index={i}>
                <TiltCard className="relative">
                  <div className="rounded-xl border border-border bg-card/60 p-6 sm:p-7 transition-colors hover:border-primary/40">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                      <span className="mr-2 font-mono text-sm text-primary">{project.index}</span>
                      {project.title}
                    </h3>
                    <span className="font-mono text-xs text-muted-foreground">{project.timeframe}</span>
                  </div>
                  <p className="mt-1 font-mono text-xs text-primary/90">{project.org}</p>

                  <p className="mt-4 max-w-3xl text-pretty text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border bg-background/60 px-2.5 py-1 font-mono text-xs text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <dl className="mt-5 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
                    {project.stats.map((stat) => {
                      // Parse numeric value for count-up animation
                      const numericMatch = stat.value.match(/([\d,]+)([%+]*)/)
                      const numericValue = numericMatch ? parseInt(numericMatch[1].replace(/,/g, ''), 10) : null
                      const suffix = numericMatch ? numericMatch[2] : ''
                      
                      return (
                        <div key={stat.label} className="bg-card px-4 py-3">
                          <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                            {stat.label}
                          </dt>
                          <dd className="mt-1 font-mono text-sm font-medium text-primary">
                            {numericValue !== null ? (
                              <CountUp 
                                end={numericValue} 
                                suffix={suffix} 
                                start={stat.startValue || (stat.animation === 'decrease' ? 100 : 0)}
                              />
                            ) : (
                              stat.value
                            )}
                          </dd>
                        </div>
                      )
                    })}
                  </dl>
                  </div>
                </TiltCard>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
