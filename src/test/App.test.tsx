import { fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from '../App'
import { ProjectDetailPage } from '../components/projects/ProjectDetailPage'
import { portfolio } from '../data/portfolio'
import { projects } from '../data/projects'
import { stackCategories } from '../data/techStack'

const originalEmail = portfolio.email
const originalResumeUrl = portfolio.resumeUrl

afterEach(() => {
  window.history.pushState({}, '', '/')
  portfolio.email = originalEmail
  portfolio.resumeUrl = originalResumeUrl
})

describe('portfolio application', () => {
  it('renders the home sections and configured social links', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: portfolio.name })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Main navigation' }).querySelector('a[href="#skills"]')).toHaveTextContent('Stack')
    expect(screen.getByRole('heading', { name: /Curious across the stack.*Grounded in useful work/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Tech Stack' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: "Let's build something useful." })).toBeInTheDocument()
    expect(document.title).toBe('Vincent Sebastian — Full-Stack Developer')
    expect(screen.getAllByRole('link', { name: /GitHub/ })[0]).toHaveAttribute('href', portfolio.githubUrl)
    expect(screen.getAllByRole('link', { name: /LinkedIn/ })[0]).toHaveAttribute('href', portfolio.linkedinUrl)
    expect(screen.getByRole('link', { name: /vjsebastiaaan@gmail\.com/ })).toHaveAttribute(
      'href',
      'mailto:vjsebastiaaan@gmail.com',
    )
    expect(screen.queryByRole('link', { name: /resume/i })).not.toBeInTheDocument()
    expect(screen.queryByText(/Thoughtful digital products|from interface to backend/)).not.toBeInTheDocument()
    expect(screen.queryByText(/no professional cloud deployment experience is implied/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument()
  })

  it('shows restrained, categorized skills including cloud and security', () => {
    render(<App />)

    const skills = document.getElementById('skills')
    expect(skills).not.toBeNull()
    for (const { title, items } of stackCategories) {
      const group = within(skills as HTMLElement).getByRole('region', { name: title })
      expect(within(group).getByRole('heading', { name: title })).toBeInTheDocument()
      for (const item of items) {
        expect(within(group).getByText(item, { exact: true })).toBeInTheDocument()
      }
    }
    expect(within(skills as HTMLElement).queryByText(/no professional cloud deployment experience is implied/i)).not.toBeInTheDocument()
  })

  it('selects and centers each home project card without navigating away', () => {
    render(<App />)

    const work = document.getElementById('work')
    expect(work).not.toBeNull()
    const section = within(work as HTMLElement)
    const converse = section.getByRole('button', { name: /Converse/ })
    const sabBuilders = section.getByRole('button', { name: /SAB Builders/ })
    const retailFlow = section.getByRole('button', { name: /RetailFlow/ })
    expect(converse).toHaveClass('featured-project-card', 'is-center')
    expect(sabBuilders).toHaveClass('featured-project-card', 'is-right')
    expect(retailFlow).toHaveClass('featured-project-card', 'is-left')
    expect(converse).toHaveAttribute('aria-pressed', 'true')

    for (const project of projects) {
      const card = section.getByRole('button', { name: new RegExp(project.name) })
      fireEvent.click(card)
      expect(card).toHaveClass('is-center')
      expect(card).toHaveAttribute('aria-pressed', 'true')
      expect(window.location.pathname).toBe('/')
    }

    expect(within(work as HTMLElement).getByRole('img', { name: /Converse project artwork/ })).toHaveAttribute(
      'src',
      '/images/projects/converse-project-art.jpg',
    )
    expect(within(work as HTMLElement).queryByText('View project')).not.toBeInTheDocument()
    expect(work?.querySelector('.project-card-link-label')).toBeNull()
    expect(work?.querySelector('a[href^="/projects/"]')).toBeNull()
  })

  it('renders all projects on the projects page with full-card navigation', () => {
    window.history.pushState({}, '', '/projects')
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument()
    for (const project of projects) {
      expect(screen.getByRole('link', { name: new RegExp(project.name), })).toHaveAttribute('href', `/projects/${project.slug}`)
    }
    expect(screen.queryByRole('heading', { name: 'Project Management System' })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Vincent.' })).toHaveAttribute('href', '/')
  })

  it('renders each project detail route with its stack, scope, features, and gallery state', () => {
    for (const project of projects) {
      window.history.pushState({}, '', `/projects/${project.slug}`)
      const { unmount } = render(<App />)

      expect(screen.getByRole('heading', { name: project.name, level: 1 })).toBeInTheDocument()
      expect(document.title).toContain(project.name)
      expect(screen.getByRole('heading', { name: 'My contribution' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Tools for the job' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Project highlights' })).toBeInTheDocument()
      expect(screen.queryByRole('heading', { name: 'My role' })).not.toBeInTheDocument()
      if (project.slug !== 'sab-builders') {
        const { problem, keyDecisionsAndChallenges, outcome } = project
        if (!problem || !keyDecisionsAndChallenges || !outcome) {
          throw new Error(`Expected ${project.name} project detail copy to be defined.`)
        }
        expect(screen.getByRole('heading', { name: 'The problem' })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: 'Key decisions & challenges' })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: 'Outcome' })).toBeInTheDocument()
        expect(screen.getByText(problem)).toBeInTheDocument()
        expect(screen.getByText(project.contribution)).toBeInTheDocument()
        expect(screen.getByText(keyDecisionsAndChallenges)).toBeInTheDocument()
        expect(screen.getByText(outcome)).toBeInTheDocument()
      } else {
        const { problem, keyDecisionsAndChallenges, outcome } = project
        if (!problem || !keyDecisionsAndChallenges || !outcome) {
          throw new Error('Expected SAB Builders project detail copy to be defined.')
        }
        expect(screen.getByRole('heading', { name: 'The problem' })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: 'Key decisions & challenges' })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: 'Outcome' })).toBeInTheDocument()
        expect(screen.getByText(problem)).toBeInTheDocument()
        expect(screen.getByText(project.contribution)).toBeInTheDocument()
        expect(screen.getByText(keyDecisionsAndChallenges)).toBeInTheDocument()
        expect(screen.getByText(outcome)).toBeInTheDocument()
      }
      expect(screen.queryByText('TODO')).not.toBeInTheDocument()
      expect(screen.queryByRole('heading', { name: 'Year' })).not.toBeInTheDocument()
      expect(screen.getByText(project.technicalApproach)).toBeInTheDocument()
      for (const technology of project.stack ?? []) {
        expect(screen.getByText(technology, { exact: true })).toBeInTheDocument()
      }
      expect(screen.getAllByRole('link', { name: /all projects/i }).every((link) => link.getAttribute('href') === '/projects')).toBe(true)

      expect(document.querySelectorAll('.project-detail-main figure img').length).toBeGreaterThan(0)
      if (project.slug === 'sab-builders') {
        expect(screen.getByRole('link', { name: /live demo/i })).toHaveAttribute(
          'href',
          'https://sab-builders.vercel.app',
        )
      } else {
        expect(screen.queryByRole('link', { name: /live demo|source code/i })).not.toBeInTheDocument()
      }
      unmount()
    }
  })

  it('omits optional project details and technology when they are empty', () => {
    const project = projects[0]
    if (!project) throw new Error('Expected at least one project for optional-detail coverage.')
    render(
      <ProjectDetailPage
        project={{
          ...project,
          problem: undefined,
          keyDecisionsAndChallenges: undefined,
          outcome: undefined,
          stack: [],
        }}
      />,
    )

    expect(screen.queryByRole('heading', { name: 'The problem' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'My role' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Key decisions & challenges' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Outcome' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Technology' })).not.toBeInTheDocument()
  })

  it('hides email and résumé links when those details are blank', () => {
    portfolio.email = ''
    portfolio.resumeUrl = ''
    render(<App />)

    expect(screen.queryByRole('link', { name: /vjsebastiaaan@gmail\.com/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /resume/i })).not.toBeInTheDocument()
    expect(screen.queryByText(/add a professional email/i)).not.toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /GitHub/ })).not.toHaveLength(0)
  })

  it('shows a useful not-found page for unknown project and route paths', () => {
    window.history.pushState({}, '', '/projects/not-a-project')
    const { unmount } = render(<App />)
    expect(screen.getByRole('heading', { name: "This page isn't here." })).toBeInTheDocument()
    unmount()

    window.history.pushState({}, '', '/unknown')
    render(<App />)
    expect(screen.getByRole('link', { name: 'Return to portfolio' })).toHaveAttribute('href', '/')
  })

  it('provides an accessible mobile navigation toggle', () => {
    render(<App />)

    const toggle = screen.getByRole('button', { name: 'Open navigation menu' })
    fireEvent.click(toggle)
    expect(screen.getByRole('button', { name: 'Close navigation menu' })).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(screen.getByRole('navigation', { name: 'Main navigation' }).querySelector('a[href="#about"]') as HTMLAnchorElement)
    expect(screen.getByRole('button', { name: 'Open navigation menu' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('uses the portrait fallback when the local portrait image cannot load', () => {
    render(<App />)
    fireEvent.error(screen.getByRole('img', { name: 'Portrait of Vincent Sebastian' }))
    expect(screen.getByText('Portrait image unavailable')).toBeInTheDocument()
  })
})
