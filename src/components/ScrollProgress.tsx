import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const fn = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setP(max > 0 ? window.scrollY / max : 0)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[9990] h-[2px] pointer-events-none">
      <div
        style={{
          height: '100%',
          width: `${p * 100}%`,
          background: 'linear-gradient(90deg, #00ffa3, #0af)',
          boxShadow: '0 0 8px #00ffa3, 0 0 20px rgba(0,255,163,0.6)',
          transition: 'width 0.08s linear',
        }}
      />
    </div>
  )
}
