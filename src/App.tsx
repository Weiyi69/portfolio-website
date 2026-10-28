import { useEffect } from 'react'
import { About, Hero, Skills } from './components/sections/PortfolioSections'
import { ProjectSection } from './components/projects/ProjectSection'
import { ProjectsPage } from './components/projects/ProjectsPage'
import { ProjectDetailPage } from './components/projects/ProjectDetailPage'
import { NotFoundPage } from './components/pages/NotFoundPage'
import { Contact } from './components/sections/Contact'
import { SiteHeader } from './components/layout/SiteHeader'
import { projects } from './data/projects'
import { portfolio } from './data/portfolio'
import { getAbsoluteSiteUrl, getPageSeo, getSiteOrigin } from './seo'

function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/'
  const projectMatch = pathname.match(/^\/projects\/([^/]+)$/)
  const currentProject = projectMatch
    ? projects.find((item) => item.slug === projectMatch[1])
    : undefined

  useEffect(() => {
    const previousTitle = document.title
    const siteOrigin = getSiteOrigin(portfolio.siteUrl)
    const seo = getPageSeo(portfolio, pathname, currentProject)
    const metaValues = [
      ['meta[name="description"]', seo.description],
      ['meta[property="og:title"]', seo.title],
      ['meta[property="og:description"]', seo.description],
      ['meta[property="og:image"]', seo.image],
      ['meta[property="og:image:alt"]', seo.imageAlt],
      ['meta[name="twitter:title"]', seo.title],
      ['meta[name="twitter:description"]', seo.description],
      ['meta[name="twitter:image"]', seo.image],
      ['meta[name="twitter:image:alt"]', seo.imageAlt],
    ] as const
    const previousMeta = metaValues.map(([selector, content]) => {
      const element = document.querySelector<HTMLMetaElement>(selector)
      const previousContent = element?.content
      if (element) element.content = content
      return { element, previousContent }
    })
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    const previousCanonical = canonical?.href
    let createdCanonical: HTMLLinkElement | undefined
    const ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]')
    const previousOgUrl = ogUrl?.content
    let createdOgUrl: HTMLMetaElement | undefined

    if (siteOrigin) {
      const link = canonical ?? document.createElement('link')
      if (!canonical) {
        link.rel = 'canonical'
        document.head.append(link)
        createdCanonical = link
      }
      link.href = getAbsoluteSiteUrl(portfolio.siteUrl, pathname)
      const meta = ogUrl ?? document.createElement('meta')
      if (!ogUrl) {
        meta.setAttribute('property', 'og:url')
        document.head.append(meta)
        createdOgUrl = meta
      }
      meta.content = link.href
    }

    document.title = pathname !== '/' && pathname !== '/projects' && !currentProject
      ? `Page not found | ${portfolio.name}`
      : seo.title

    return () => {
      document.title = previousTitle
      for (const { element, previousContent } of previousMeta) {
        if (element && previousContent !== undefined) element.content = previousContent
      }
      if (createdCanonical) createdCanonical.remove()
      else if (canonical && previousCanonical) canonical.href = previousCanonical
      if (createdOgUrl) createdOgUrl.remove()
      else if (ogUrl && previousOgUrl) ogUrl.content = previousOgUrl
    }
  }, [currentProject, pathname])

  if (pathname === '/projects') {
    return <ProjectsPage />
  }

  if (projectMatch) {
    return currentProject ? <ProjectDetailPage project={currentProject} /> : <NotFoundPage />
  }

  if (pathname !== '/') return <NotFoundPage />

  return (
    <>
      <SiteHeader currentPage="home" />
      <main id="main-content">
        <Hero />
        <About />
        <ProjectSection />
        <Skills />
        <Contact />
      </main>
    </>
  )
}

export default App
