import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { ParticlePortrait } from '../animations/ParticlePortrait'
import { stackCategories } from '../../data/techStack'
import { portfolio } from '../../data/portfolio'

export function Hero() {
  return (
    <section className="hero-section page-width" id="home" aria-labelledby="hero-title">
      <div className="hero-content">
        <p className="section-kicker"><span className="status-dot" /> {portfolio.availability}</p>
        <h1 id="hero-title">{portfolio.name}</h1>
        <p className="hero-role">{portfolio.role}</p>
        <p className="hero-introduction">{portfolio.introduction}</p>
        <div className="hero-actions">
          <a className="button button-dark" href="#work">View projects <ArrowDownRight size={17} aria-hidden="true" /></a>
          <a className="button button-light" href="#contact">Contact me <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
        <div className="hero-socials" aria-label="Social profiles">
          <a href={portfolio.githubUrl} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} aria-hidden="true" /></a>
          <a href={portfolio.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14} aria-hidden="true" /></a>
        </div>
      </div>
      <div className="hero-visual">
        <ParticlePortrait />
      </div>
    </section>
  )
}

export function About() {
  return (
    <section className="section about-section" id="about" aria-labelledby="about-title">
      <div className="page-width about-grid">
        <div>
          <p className="section-kicker">A LITTLE ABOUT ME</p>
          <h2 id="about-title">Curious across the stack.<br />Grounded in useful work.</h2>
        </div>
        <div className="about-copy">
          <p>{portfolio.about}</p>
          <a className="text-link" href="#contact">Let&apos;s connect <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  )
}

export function Skills() {
  return (
    <section className="section skills-section" id="skills" aria-labelledby="skills-title">
      <div className="page-width">
        <div className="section-heading skills-heading">
          <div>
            <h2 id="skills-title">Tech Stack</h2>
          </div>
        </div>
        <div className="stack-groups">
          {stackCategories.map(({ title, items }, index) => (
            <section className="stack-category" key={title} aria-labelledby={`stack-category-${index}`}>
              <h3 id={`stack-category-${index}`}>{title}</h3>
              <ul className="stack-chips">
                {items.map((technology) => (
                  <li className="stack-chip" key={technology}>{technology}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
