import { portfolio } from '../../data/portfolio'

const currentYear = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner page-width">
        <a className="footer-wordmark" href="/#home">{portfolio.name}<span>.</span></a>
        <nav aria-label="Footer navigation">
          <a href="/#about">About</a>
          <a href="/#skills">Skills</a>
          <a href="/projects">Projects</a>
          <a href="/#contact">Contact</a>
        </nav>
        <div className="footer-socials" aria-label="Social profiles">
          <a href={portfolio.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub profile">
            GitHub
          </a>
          <a href={portfolio.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
            LinkedIn
          </a>
        </div>
        <p>© {currentYear} {portfolio.name}. Built with care.</p>
      </div>
    </footer>
  )
}
