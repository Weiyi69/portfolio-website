import { stackCategories } from '../../data/techStack'

const techStack = stackCategories.flatMap(({ items }) => items)

export function TechStackTicker() {
  return (
    <div className="ticker" aria-label={`Technology stack: ${techStack.join(', ')}`}>
      <div className="ticker-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="ticker-group" key={copy}>
            {techStack.map((technology) => (
              <span className="ticker-item" key={`${copy}-${technology}`}>
                <span className="ticker-star">✳</span>
                {technology}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
