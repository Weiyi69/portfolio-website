import { useEffect } from 'react'
import { About, Hero, Skills } from './components/sections/PortfolioSections'
import { ProjectSection } from './components/projects/ProjectSection'
import { ProjectsPage } from './components/projects/ProjectsPage'
import { ProjectDetailPage } from './components/projects/ProjectDetailPage'
import { NotFoundPage } from './components/pages/NotFoundPage'
import { Contact } from './components/sections/Contact'
import { SiteFooter } from './components/layout/SiteFooter'
import { SiteHeader } from './components/layout/SiteHeader'
import { projects } from './data/projects'
import { portfolio } from './data/portfolio'

function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/'
  const projectMatch = pathname.match(/^\/projects\/([^/]+)$/)
  const currentProject = projectMatch
    ? projects.find((item) => item.slug === projectMatch[1])
    : undefined

  useEffect(() => {
    const previousTitle = document.title
    const siteOrigin = portfolio.siteUrl ? new URL(`${portfolio.siteUrl.replace(/\/+$/, '')}/`) : undefined
    const socialImage = siteOrigin ? new URL('/images/profile.png', siteOrigin).toString() : '/images/profile.png'
    const metaValues = [
      ['meta[name="description"]', currentProject?.summary ?? 'A full-stack developer building modern, user-friendly web applications and practical digital products.'],
      ['meta[property="og:title"]', currentProject ? `${currentProject.name} — ${currentProject.category} | ${portfolio.name}` : `${portfolio.name} — ${portfolio.role}`],
      ['meta[property="og:description"]', currentProject?.summary ?? 'A full-stack developer building modern, user-friendly web applications and practical digital products.'],
      ['meta[property="og:image"]', socialImage],
      ['meta[name="twitter:title"]', currentProject ? `${currentProject.name} — ${currentProject.category} | ${portfolio.name}` : `${portfolio.name} — ${portfolio.role}`],
      ['meta[name="twitter:description"]', currentProject?.summary ?? 'A full-stack developer building modern, user-friendly web applications and practical digital products.'],
      ['meta[name="twitter:image"]', socialImage],
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
      link.href = new URL(pathname, siteOrigin).toString()
      const meta = ogUrl ?? document.createElement('meta')
      if (!ogUrl) {
        meta.setAttribute('property', 'og:url')
        document.head.append(meta)
        createdOgUrl = meta
      }
      meta.content = link.href
    }

    document.title = currentProject
      ? `${currentProject.name} — ${currentProject.category} | ${portfolio.name}`
      : pathname === '/projects'
        ? `Projects | ${portfolio.name}`
        : pathname === '/'
          ? `${portfolio.name} — ${portfolio.role}`
          : `Page not found | ${portfolio.name}`

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
      <SiteFooter />
    </>
  )
}

export default App
