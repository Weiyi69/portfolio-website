import type { Project } from '../../types'

interface ProjectCardProps {
  project: Project
  variant?: 'website-promo' | 'messaging-promo' | 'retail-promo'
  showArtworkIndex?: boolean
}

interface ProjectArtworkProps {
  project: Project
  className?: string
  showIndex?: boolean
}

export function ProjectArtwork({ project, className = '', showIndex = true }: ProjectArtworkProps) {
  return (
    <div
      className={`project-art art-${project.accent}${className ? ` ${className}` : ''}`}
      aria-hidden="true"
    >
      <img
        className="project-art-image"
        src={
          project.visual === 'retail'
            ? '/images/projects/retailflow-project-art.jpg'
            : project.visual === 'chat'
              ? '/images/projects/converse-project-art.jpg'
              : '/images/projects/sab-builders-project-art.jpg'
        }
        alt=""
        width={1024}
        height={project.visual === 'construction' ? 579 : 575}
        loading="lazy"
        decoding="async"
      />
      {showIndex && <span className="art-index">{project.number} / 03</span>}
    </div>
  )
}

export function ProjectCard({
  project,
  variant,
  showArtworkIndex = true,
}: ProjectCardProps) {
  if (variant === 'retail-promo') {
    return (
      <article className="project-card retail-promo-card">
        <span className="retail-promo-badge">#{project.number} RETAIL PLATFORM</span>
        <div className="retail-promo-brand">
          <img src="/images/projects/retailflow-icon.png" alt="RetailFlow logo" width={515} height={426} loading="lazy" decoding="async" />
          <div>
            <h3>{project.name}</h3>
            <span>Inventory, POS &amp; Order Management System</span>
          </div>
        </div>
        <p>{project.summary}</p>
        <div className="retail-store-preview">
          <img
            src="/images/projects/retailflow-project-art.jpg"
            alt="RetailFlow application screenshot"
            width={1024}
            height={575}
            loading="lazy"
            decoding="async"
          />
        </div>
        <ul className="retail-promo-features" aria-label="RetailFlow features">
          <li>Product catalog</li>
          <li>Inventory &amp; sales</li>
          <li>Expenses &amp; reports</li>
        </ul>
      </article>
    )
  }

  if (variant === 'messaging-promo') {
    return (
      <article className="project-card converse-promo-card">
        <span className="converse-promo-badge">#{project.number} REAL-TIME MESSAGING</span>
        <div className="converse-promo-brand">
          <img src="/images/projects/converse-icon.png" alt="Converse app icon" width={742} height={754} loading="lazy" decoding="async" />
          <div>
            <h3>{project.name}</h3>
            <span>Full-Stack Messaging App</span>
          </div>
        </div>
        <p>{project.summary}</p>
        <div className="converse-app-preview">
          <img
            className="converse-project-art-image"
            src="/images/projects/converse-project-art.jpg"
            alt="Converse project artwork showing its messaging app on a laptop"
            width={1024}
            height={575}
            loading="lazy"
            decoding="async"
          />
        </div>
        <ul className="converse-promo-features" aria-label="Messaging features">
          <li>Conversation search</li>
          <li>Image messaging</li>
          <li>Real-time chat</li>
        </ul>
      </article>
    )
  }

  if (variant === 'website-promo') {
    return (
      <article className="project-card sab-website-card">
        <span className="sab-website-badge">#{project.number} WEBSITE PROJECT</span>
        <div className="sab-website-brand">
          <img src="/images/projects/sab-builders-logo.png" alt="SAB Builders logo" width={683} height={305} loading="lazy" decoding="async" />
          <div>
            <h3>{project.name}</h3>
            <span>Construction Company Website</span>
          </div>
        </div>
        <p>{project.summary}</p>
        <div className="sab-website-preview">
          <img src="/images/projects/sab-builders-project-art.jpg" alt="SAB Builders website displayed on a laptop" width={1024} height={579} loading="lazy" decoding="async" />
        </div>
        <ul className="sab-website-features" aria-label="Website sections">
          <li>Services</li>
          <li>Completed projects</li>
          <li>Leadership</li>
          <li>Contact</li>
        </ul>
      </article>
    )
  }

  return (
    <article className="project-card">
      <ProjectArtwork project={project} showIndex={showArtworkIndex} />
      <div className="project-info">
        <div className="project-meta"><span>{project.category}</span>{project.year && <span>{project.year}</span>}</div>
        <div className="project-title-row">
          <h3>{project.name}</h3>
        </div>
        <p>{project.summary}</p>
        <ul className="tag-list">
          {project.stack?.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
      </div>
    </article>
  )
}

interface ProjectCardLinkProps {
  project: Project
  variant?: ProjectCardProps['variant']
  showArtworkIndex?: boolean
  className?: string
}

export function ProjectCardLink({ project, variant, showArtworkIndex = true, className = '' }: ProjectCardLinkProps) {
  return (
    <a className={`project-card-link${className ? ` ${className}` : ''}`} href={`/projects/${project.slug}`}>
      <ProjectCard project={project} variant={variant} showArtworkIndex={showArtworkIndex} />
    </a>
  )
}
