import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import { portfolio } from './src/data/portfolio.ts'
import { projects } from './src/data/projects.ts'
import { getAbsoluteSiteUrl, replaceSeoHead } from './src/seo.ts'

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function staticSeoPages() {
  return {
    name: 'static-seo-pages',
    apply: 'build' as const,
    closeBundle() {
      const outputDirectory = resolve(process.cwd(), 'dist')
      const indexPath = resolve(outputDirectory, 'index.html')
      const template = readFileSync(indexPath, 'utf8')
      writeFileSync(indexPath, replaceSeoHead(template, portfolio, '/'))

      for (const project of projects) {
        const projectDirectory = resolve(outputDirectory, 'projects', project.slug)
        mkdirSync(projectDirectory, { recursive: true })
        writeFileSync(
          resolve(projectDirectory, 'index.html'),
          replaceSeoHead(template, portfolio, `/projects/${project.slug}`, project),
        )
      }

      const sitemapUrls = ['/', '/projects', ...projects.map(({ slug }) => `/projects/${slug}`)]
      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...sitemapUrls.map((pathname) => `  <url><loc>${escapeXml(getAbsoluteSiteUrl(portfolio.siteUrl, pathname))}</loc></url>`),
        '</urlset>',
        '',
      ].join('\n')
      writeFileSync(resolve(outputDirectory, 'sitemap.xml'), sitemap)
      writeFileSync(
        resolve(outputDirectory, 'robots.txt'),
        `User-agent: *\nAllow: /\nSitemap: ${getAbsoluteSiteUrl(portfolio.siteUrl, '/sitemap.xml')}\n`,
      )
    },
  }
}

export default defineConfig({
  plugins: [tailwindcss(), react(), staticSeoPages()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    clearMocks: true,
  },
})
