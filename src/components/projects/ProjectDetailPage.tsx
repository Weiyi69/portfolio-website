import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { ConverseGallery } from './ConverseGallery'
import { RetailFlowGallery } from './RetailFlowGallery'
import { SabBuildersGallery } from './SabBuildersGallery'
import { projects } from '../../data/projects'
import type { Project } from '../../types'
import { SiteHeader } from '../layout/SiteHeader'

interface ProjectDetailPageProps {
  project: Project
}

function ProjectGallery({ project }: ProjectDetailPageProps) {
  if (project.visual === 'chat') return <ConverseGallery />
  if (project.visual === 'construction') return <SabBuildersGallery />
  if (project.visual === 'retail') return <RetailFlowGallery />

  return null
}

function ProjectNavigation({ project }: ProjectDetailPageProps) {
  const index = projects.findIndex((item) => item.slug === project.slug)
  const previous = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]
  if (!previous || !next) return null

  return (
    <nav className="project-pagination" aria-label="Project navigation">
      <a href={`/projects/${previous.slug}`} aria-label={`Previous project: ${previous.name}`}>
        <ArrowLeft size={17} aria-hidden="true" />
        <span>{previous.name}</span>
      </a>
      <a href="/projects">All projects</a>
      <a href={`/projects/${next.slug}`} aria-label={`Next project: ${next.name}`}>
        <span>{next.name}</span>
        <ArrowUpRight size={17} aria-hidden="true" />
      </a>
    </nav>
  )
}

export function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  return (
    <>
      <SiteHeader currentPage="project-detail" />
      <main className="project-detail page-width" id="main-content">
        <a className="text-back-link" href="/projects">
          <ArrowLeft size={16} aria-hidden="true" />
          All projects
        </a>
        <header className="project-detail-heading">
          <p className="section-kicker">{project.category}</p>
          <h1>{project.name}</h1>
          <p>{project.summary}</p>
        </header>

        <div className="project-detail-layout">
          <div className="project-detail-main">
            <section className="detail-copy-block" aria-labelledby="project-overview">
              <p className="section-kicker">OVERVIEW</p>
              <h2 id="project-overview">The project</h2>
              <p>{project.overview}</p>
            </section>
            <section className="detail-copy-block" aria-labelledby="project-contribution">
              <p className="section-kicker">SCOPE</p>
              <h2 id="project-contribution">My contribution</h2>
              <p>{project.contribution}</p>
            </section>
            <section className="detail-copy-block" aria-labelledby="project-approach">
              <p className="section-kicker">TECHNICAL APPROACH</p>
              <h2 id="project-approach">Tools for the job</h2>
              <p>{project.technicalApproach}</p>
            </section>
            {project.problem && (
              <section className="detail-copy-block" aria-labelledby="project-problem">
                <p className="section-kicker">PROBLEM</p>
                <h2 id="project-problem">The problem</h2>
                <p>{project.problem}</p>
              </section>
            )}
            {project.keyDecisionsAndChallenges && (
              <section className="detail-copy-block" aria-labelledby="project-decisions">
                <p className="section-kicker">DECISIONS &amp; CHALLENGES</p>
                <h2 id="project-decisions">Key decisions &amp; challenges</h2>
                <p>{project.keyDecisionsAndChallenges}</p>
              </section>
            )}
            {project.outcome && (
              <section className="detail-copy-block" aria-labelledby="project-outcome">
                <p className="section-kicker">OUTCOME</p>
                <h2 id="project-outcome">Outcome</h2>
                <p>{project.outcome}</p>
              </section>
            )}
            {project.features.length > 0 && (
              <section className="detail-copy-block" aria-labelledby="project-features">
                <p className="section-kicker">CAPABILITIES</p>
                <h2 id="project-features">Project highlights</h2>
                <ul className="feature-list">
                  {project.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
              </section>
            )}
            <section className="detail-copy-block" aria-labelledby="project-screenshots">
              <p className="section-kicker">SELECTED SCREENS</p>
              <h2 id="project-screenshots">A closer look</h2>
              <ProjectGallery project={project} />
            </section>
          </div>

          <aside className="project-detail-aside">
            {project.stack && project.stack.length > 0 && (
              <div className="detail-aside-block">
                <h2>Technology</h2>
                <ul className="tag-list" aria-label={`${project.name} technologies`}>
                  {project.stack.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
              </div>
            )}
            <div className="detail-aside-block">
              <h2>Project links</h2>
              {project.demoUrl || project.sourceUrl ? (
                <ul className="project-external-links">
                  {project.demoUrl && <li><a href={project.demoUrl} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={15} aria-hidden="true" /></a></li>}
                  {project.sourceUrl && <li><a href={project.sourceUrl} target="_blank" rel="noreferrer">Source code <ArrowUpRight size={15} aria-hidden="true" /></a></li>}
                </ul>
              ) : (
                <p>No public demo or source link has been provided.</p>
              )}
            </div>
          </aside>
        </div>
        <ProjectNavigation project={project} />
      </main>
    </>
  )
}
