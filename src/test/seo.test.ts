import { describe, expect, it } from 'vitest'
import { portfolio } from '../data/portfolio'
import { projects } from '../data/projects'
import { createSeoHead, getAbsoluteSiteUrl, getPageSeo } from '../seo'

describe('SEO metadata', () => {
  it('creates absolute canonical and image URLs from the configured site origin', () => {
    expect(getAbsoluteSiteUrl('https://portfolio.example/', '/projects/converse')).toBe(
      'https://portfolio.example/projects/converse',
    )
    expect(getPageSeo({ ...portfolio, siteUrl: 'https://portfolio.example' }, '/').image).toBe(
      'https://portfolio.example/images/og-image.jpg',
    )
  })

  it('keeps an explicit placeholder visible when no production origin is supplied', () => {
    expect(getAbsoluteSiteUrl('TODO_SET_SITE_URL', '/projects')).toBe('TODO_SET_SITE_URL/projects')
  })

  it('renders route-specific social tags with the production origin and Person structured data', () => {
    const project = projects[0]
    if (!project) throw new Error('Expected at least one project for SEO coverage.')
    const head = createSeoHead(portfolio, `/projects/${project.slug}`, project)

    expect(head).toContain(`<title>${project.name} — ${project.category} | ${portfolio.name}</title>`)
    expect(head).toContain('property="og:url"')
    expect(head).toContain('property="og:image:alt"')
    expect(head).toContain('name="twitter:image:alt"')
    expect(head).toContain('"@type":"Person"')
    expect(head).toContain(`${portfolio.siteUrl}/images/og-image.jpg`)
  })

  it('escapes metadata values before inserting them into HTML', () => {
    const head = createSeoHead(
      { ...portfolio, name: 'Vincent <Sebastian>' },
      '/',
    )

    expect(head).toContain('Vincent &lt;Sebastian&gt;')
    expect(head).not.toContain('Vincent <Sebastian>')
  })
})
