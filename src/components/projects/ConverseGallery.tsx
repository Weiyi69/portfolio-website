import { converseScreens } from '../../data/converseScreens'

export function ConverseGallery() {
  return (
    <div className="converse-screen-gallery" aria-label="Converse application screens">
      {converseScreens.map(({ title, src }, index) => (
        <figure className="converse-screen" key={src}>
          <figcaption>
            <span>{String(index + 1).padStart(2, '0')}</span>
            {title}
          </figcaption>
          <img src={src} alt={`${title} screenshot`} width={1367} height={768} loading="lazy" decoding="async" />
        </figure>
      ))}
    </div>
  )
}
