import { useState } from 'react'

export function ParticlePortrait() {
  const [imageUnavailable, setImageUnavailable] = useState(false)

  return (
    <div className="portrait-art">
      {imageUnavailable ? (
        <>
          <div className="portrait-fallback" aria-hidden="true">VS</div>
          <output className="sr-only">Portrait image unavailable</output>
        </>
      ) : (
        <img
          className="portrait-photo"
          src="/images/profile.jpg"
          alt="Portrait of Vincent Sebastian"
          width={1254}
          height={1254}
          decoding="async"
          onError={() => setImageUnavailable(true)}
        />
      )}
    </div>
  )
}
