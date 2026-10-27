import { ArrowUpRight, Mail } from 'lucide-react'
import { portfolio } from '../../data/portfolio'

export function Contact() {
  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="page-width contact-inner">
        <div>
          <p className="section-kicker">GET IN TOUCH</p>
          <h2 id="contact-title">Let&apos;s build something useful.</h2>
          <p className="contact-copy">
            I&apos;m seeking full-time opportunities and welcome conversations about thoughtful web products and engineering teams.
          </p>
        </div>
        <div className="contact-links">
          {portfolio.email ? (
            <a href={`mailto:${portfolio.email}`}>
              <Mail size={18} aria-hidden="true" />
              {portfolio.email}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ) : (
            <p className="contact-placeholder"><Mail size={18} aria-hidden="true" /> Add a professional email before publishing.</p>
          )}
          <a href={portfolio.githubUrl} target="_blank" rel="noreferrer">
            <span className="social-monogram" aria-hidden="true">GH</span>
            GitHub
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a href={portfolio.linkedinUrl} target="_blank" rel="noreferrer">
            <span className="social-monogram" aria-hidden="true">in</span>
            LinkedIn
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          {portfolio.resumeUrl && (
            <a href={portfolio.resumeUrl} target="_blank" rel="noreferrer">
              Resume
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
