import { useState } from 'react'

export function ParticlePortrait() {
  const [imageUnavailable, setImageUnavailable] = useState(false)

  return (
    <div className="portrait-art">
      {imageUnavailable ? (
        <div className="portrait-fallback" role="img" aria-label="Portrait image unavailable">VS</div>
      ) : (
        <img
          className="portrait-photo"
          src="/images/profile.png"
          alt="Portrait of Vincent Sebastian"
          onError={() => setImageUnavailable(true)}
        />
      )}
    </div>
  )
}
