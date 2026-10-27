import { SiteHeader } from '../layout/SiteHeader'

export function NotFoundPage() {
  return (
    <>
      <SiteHeader currentPage="not-found" />
      <main className="not-found page-width">
        <p className="section-kicker">404 · PAGE NOT FOUND</p>
        <h1>This page isn&apos;t here.</h1>
        <p>The address may have changed, or the page may not exist.</p>
        <a className="button button-dark" href="/">Return to portfolio</a>
      </main>
    </>
  )
}
