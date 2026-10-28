import type { PortfolioProfile, Project } from './types/index.js'

export const SITE_URL_PLACEHOLDER = 'TODO_SET_SITE_URL'

const defaultDescription =
  'A full-stack developer building modern, user-friendly web applications and practical digital products.'

export interface PageSeo {
  title: string
  description: string
  url: string
  image: string
  imageAlt: string
}

export function getSiteOrigin(siteUrl: string): URL | undefined {
  try {
    const url = new URL(siteUrl)
    if ((url.protocol !== 'https:' && url.protocol !== 'http:') || url.username || url.password) return undefined
    return new URL('/', url.origin)
  } catch {
    return undefined
  }
}

export function getAbsoluteSiteUrl(siteUrl: string, pathname: string): string {
  const origin = getSiteOrigin(siteUrl)
  return origin
    ? new URL(pathname.replace(/^\/+/, ''), origin).toString()
    : `${SITE_URL_PLACEHOLDER}${pathname.startsWith('/') ? pathname : `/${pathname}`}`
}

export function getPageSeo(
  profile: PortfolioProfile,
  pathname: string,
  project?: Project,
): PageSeo {
  const title = project
    ? `${project.name} — ${project.category} | ${profile.name}`
    : pathname === '/projects'
      ? `Projects | ${profile.name}`
      : `${profile.name} — ${profile.role}`

  return {
    title,
    description: project?.summary ?? defaultDescription,
    url: getAbsoluteSiteUrl(profile.siteUrl, pathname),
    image: getAbsoluteSiteUrl(profile.siteUrl, '/images/og-image.jpg'),
    imageAlt: `Portrait of ${profile.name}`,
  }
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

export function createSeoHead(
  profile: PortfolioProfile,
  pathname: string,
  project?: Project,
): string {
  const seo = getPageSeo(profile, pathname, project)
  const structuredData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    url: getAbsoluteSiteUrl(profile.siteUrl, '/'),
    sameAs: [profile.githubUrl, profile.linkedinUrl].filter(Boolean),
  }).replaceAll('<', '\\u003c')

  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<link rel="canonical" href="${escapeHtml(seo.url)}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:url" content="${escapeHtml(seo.url)}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:image" content="${escapeHtml(seo.image)}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(seo.imageAlt)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(seo.image)}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(seo.imageAlt)}" />`,
    `<script type="application/ld+json">${structuredData}</script>`,
  ].join('\n    ')
}

export function replaceSeoHead(
  html: string,
  profile: PortfolioProfile,
  pathname: string,
  project?: Project,
): string {
  const seoHead = createSeoHead(profile, pathname, project)
  return html.replace(
    /<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/,
    `<!-- SEO:START -->\n    ${seoHead}\n    <!-- SEO:END -->`,
  )
}
