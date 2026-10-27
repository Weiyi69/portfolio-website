import { projects } from '../../data/projects'
import { ProjectCardLink } from './ProjectCard'
import { SiteHeader } from '../layout/SiteHeader'

export function ProjectsPage() {
  return (
    <>
      <SiteHeader currentPage="projects" />
      <main className="projects-page page-width" id="main-content">
        <header className="projects-page-heading">
          <p className="section-kicker">SELECTED WORK</p>
          <h1>Projects</h1>
          <p>A selection of applications and websites built to solve practical problems.</p>
        </header>
        <div className="projects-page-grid">
          {projects.map((project) => (
            <ProjectCardLink key={project.slug} project={project} showArtworkIndex={false} />
          ))}
        </div>
      </main>
    </>
  )
}
