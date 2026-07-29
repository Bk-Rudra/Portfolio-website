import { SiteNav } from '@/components/site-nav'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { SkillsSection } from '@/components/skills-section'
import { ProjectsSection } from '@/components/projects-section'
import { ExperienceSection } from '@/components/experience-section'
import { ContactSection } from '@/components/contact-section'
import { SiteFooter } from '@/components/site-footer'
import { CustomCursor } from '@/components/custom-cursor'

export default function App() {
  return (
    <div className="min-h-dvh">
      <CustomCursor />
      <SiteNav />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  )
}
