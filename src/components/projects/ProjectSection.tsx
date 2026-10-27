import { ArrowUpRight } from 'lucide-react'
import { projects } from '../../data/projects'
import { ProjectCardLink } from './ProjectCard'
import type { Project } from '../../types'

function cardVariant(visual: Project['visual']): 'website-promo' | 'messaging-promo' | 'retail-promo' | undefined {
  if (visual === 'construction') return 'website-promo'
  if (visual === 'chat') return 'messaging-promo'
  return visual === 'retail' ? 'retail-promo' : undefined
}

export function ProjectSection() {
  return (
    <section className="section work-section" id="work" aria-labelledby="projects-title">
      <div className="page-width">
        <div className="section-heading work-heading">
          <div>
            <p className="section-kicker">SELECTED WORK</p>
            <h2 id="projects-title">Projects</h2>
          </div>
          <a className="text-link" href="/projects">All projects <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
        <div className="featured-project-grid" aria-label="Featured project cards">
          {projects.map((project, index) => (
            <ProjectCardLink
              key={project.slug}
              project={project}
              variant={cardVariant(project.visual)}
              showArtworkIndex
              className={`featured-project-card is-${index === 0 ? 'center' : index === 1 ? 'right' : 'left'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
