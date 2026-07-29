import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { SkillGraph } from '@/components/skill-graph'
import { skillGroups } from '@/lib/portfolio-data'

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-20 border-y border-border bg-card/30">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <SectionHeading
          index="02 / skills"
          title="Stack & capabilities"
          subtitle="A full-stack toolkit sharpened on secure, high-availability systems."
        />

        <div className="mb-12">
          <Reveal withDepth>
            <SkillGraph skillGroups={skillGroups} />
          </Reveal>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.06} withDepth>
              <div className="h-full rounded-xl border border-border bg-background/60 p-6 transition-colors hover:border-primary/40">
                <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-primary" />
                  {group.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-border bg-card/60 px-2.5 py-1 font-mono text-xs text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
