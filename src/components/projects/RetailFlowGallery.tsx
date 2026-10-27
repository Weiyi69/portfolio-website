import { retailFlowScreens } from '../../data/retailFlowScreens'

export function RetailFlowGallery() {
  return (
    <div className="retailflow-screen-gallery" aria-label="RetailFlow application screens">
      {retailFlowScreens.map(({ title, src }, index) => (
        <figure className="retailflow-screen" key={src}>
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
