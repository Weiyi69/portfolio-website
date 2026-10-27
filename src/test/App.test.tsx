import { fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from '../App'
import { portfolio } from '../data/portfolio'
import { projects } from '../data/projects'
import { stackCategories } from '../data/techStack'

afterEach(() => {
  window.history.pushState({}, '', '/')
})

describe('portfolio application', () => {
  it('renders the home sections and configured social links', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: portfolio.name })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Curious across the stack.*Grounded in useful work/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Skills & technologies' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: "Let's build something useful." })).toBeInTheDocument()
    expect(document.title).toBe('Vincent Sebastian — Full-Stack Developer')
    expect(screen.getAllByRole('link', { name: /GitHub/ })[0]).toHaveAttribute('href', portfolio.githubUrl)
    expect(screen.getAllByRole('link', { name: /LinkedIn/ })[0]).toHaveAttribute('href', portfolio.linkedinUrl)
    expect(screen.getByText('Add a professional email before publishing.')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /resume/i })).not.toBeInTheDocument()
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
    expect(within(skills as HTMLElement).getByText(/no professional cloud deployment experience is implied/i)).toBeInTheDocument()
  })

  it('makes all four home project cards link to their detail pages', () => {
    render(<App />)

    const work = document.getElementById('work')
    expect(work).not.toBeNull()
    for (const project of projects) {
      const card = within(work as HTMLElement).getByRole('link', { name: new RegExp(project.name) })
      expect(card).toHaveAttribute('href', `/projects/${project.slug}`)
    }
    expect(within(work as HTMLElement).getAllByRole('link', { name: /view project/i })).toHaveLength(4)
  })

  it('renders all projects on the projects page with full-card navigation', () => {
    window.history.pushState({}, '', '/projects')
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument()
    for (const project of projects) {
      expect(screen.getByRole('link', { name: new RegExp(project.name), })).toHaveAttribute('href', `/projects/${project.slug}`)
    }
    expect(screen.queryByRole('heading', { name: 'Planwise' })).not.toBeInTheDocument()
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
      expect(screen.getByText(project.technicalApproach)).toBeInTheDocument()
      for (const technology of project.stack) {
        expect(screen.getByText(technology, { exact: true })).toBeInTheDocument()
      }
      expect(screen.getAllByRole('link', { name: /all projects/i }).every((link) => link.getAttribute('href') === '/projects')).toBe(true)

      if (project.visual === 'management') {
        expect(screen.getByText('Project screenshots have not been added yet.')).toBeInTheDocument()
      } else {
        expect(document.querySelectorAll('.project-detail-main figure img').length).toBeGreaterThan(0)
      }
      expect(screen.queryByRole('link', { name: /live demo|source code/i })).not.toBeInTheDocument()
      unmount()
    }
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
    expect(screen.getByRole('img', { name: 'Portrait image unavailable' })).toBeInTheDocument()
  })
})
