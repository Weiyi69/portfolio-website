import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../../data/projects'
import { ProjectCard } from './ProjectCard'
import type { Project } from '../../types'

function cardVariant(visual: Project['visual']): 'website-promo' | 'messaging-promo' | 'retail-promo' | undefined {
  if (visual === 'construction') return 'website-promo'
  if (visual === 'chat') return 'messaging-promo'
  return visual === 'retail' ? 'retail-promo' : undefined
}

export function ProjectSection() {
  const [selectedProjectSlug, setSelectedProjectSlug] = useState(projects[0]?.slug)
  const selectedIndex = projects.findIndex((project) => project.slug === selectedProjectSlug)

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
          {projects.map((project, index) => {
            const position = index === selectedIndex
              ? 'center'
              : (index - selectedIndex + projects.length) % projects.length === 1
                ? 'right'
                : 'left'

            return (
              <button
                key={project.slug}
                type="button"
                className={`project-card-link featured-project-card is-${position}`}
                aria-pressed={index === selectedIndex}
                onClick={() => setSelectedProjectSlug(project.slug)}
              >
                <ProjectCard
                  project={project}
                  variant={cardVariant(project.visual)}
                  showArtworkIndex
                />
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
