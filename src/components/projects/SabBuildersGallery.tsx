import { sabBuildersScreens } from '../../data/sabBuildersScreens'

export function SabBuildersGallery() {
  return (
    <div className="sab-builders-screen-gallery" aria-label="SAB Builders website screens">
      {sabBuildersScreens.map(({ title, src }, index) => (
        <figure className="sab-builders-screen" key={src}>
          <figcaption>
            <span>{String(index + 1).padStart(2, '0')}</span>
            {title}
          </figcaption>
          <img src={src} alt={`${title} screenshot`} loading="lazy" decoding="async" />
        </figure>
      ))}
    </div>
  )
}
