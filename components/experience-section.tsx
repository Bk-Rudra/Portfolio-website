import { GraduationCap, BadgeCheck } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { certifications, education, experience } from '@/lib/portfolio-data'

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-20 border-y border-border bg-card/30">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <SectionHeading
          index="04 / experience"
          title="Career timeline"
          subtitle="Four-plus years shipping secure products across research, HR tech, and government initiatives."
        />

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4">
            {experience.map((job, i) => (
              <Reveal key={job.company} delay={i * 0.06}>
                <div className="rounded-xl border border-border bg-background/60 p-6 transition-colors hover:border-primary/40">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-semibold text-foreground">{job.role}</h3>
                    <span className="font-mono text-xs text-muted-foreground">{job.period}</span>
                  </div>
                  <p className="mt-1 font-mono text-xs text-primary/90">{job.company}</p>
                  <ul className="mt-4 space-y-2">
                    {job.points.map((point) => (
                      <li key={point} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                        <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="space-y-4">
            <Reveal delay={0.1}>
              <div className="rounded-xl border border-border bg-background/60 p-6">
                <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  <GraduationCap className="size-4 text-primary" />
                  Education
                </h3>
                <ul className="space-y-4">
                  {education.map((edu) => (
                    <li key={edu.degree}>
                      <p className="text-sm font-medium text-foreground">{edu.degree}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">{edu.school}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="rounded-xl border border-border bg-background/60 p-6">
                <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  <BadgeCheck className="size-4 text-primary" />
                  Certifications
                </h3>
                <ul className="space-y-3">
                  {certifications.map((cert) => (
                    <li key={cert} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
