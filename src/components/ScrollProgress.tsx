import { useEffect, useState } from 'react'

const SECTION_IDS = ['about', 'work', 'notes', 'contact'] as const

interface Mark {
  id: string
  label: string
  pct: number
}

export default function ScrollProgress() {
  const [p,       setP]       = useState(0)
  const [marks,   setMarks]   = useState<Mark[]>([])
  const [active,  setActive]  = useState('')

  useEffect(() => {
    const computeMarks = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (total <= 0) return
      const next: Mark[] = []
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el) next.push({ id, label: id.charAt(0).toUpperCase() + id.slice(1), pct: Math.min(el.offsetTop / total, 0.97) })
      }
      setMarks(next)
    }

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const prog  = total > 0 ? window.scrollY / total : 0
      setP(prog)

      const y = window.scrollY + 130
      let cur = ''
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= y) cur = id
      }
      setActive(cur)
    }

    const t = setTimeout(computeMarks, 600)
    window.addEventListener('scroll', onScroll,  { passive: true })
    window.addEventListener('resize', computeMarks, { passive: true })
    return () => {
      clearTimeout(t)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', computeMarks)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[9990] pointer-events-none" style={{ height: 3 }}>
      {/* Fill bar */}
      <div
        style={{
          height: '100%',
          width:  `${p * 100}%`,
          background: 'linear-gradient(90deg, #00ffa3, #0af)',
          boxShadow: '0 0 8px #00ffa3, 0 0 20px rgba(0,255,163,0.55)',
          transition: 'width 0.06s linear',
        }}
      />

      {/* Section markers */}
      {marks.map(mark => {
        const passed = p >= mark.pct
        const isActive = active === mark.id
        return (
          <div
            key={mark.id}
            className="absolute top-0 flex flex-col items-center"
            style={{ left: `${mark.pct * 100}%`, transform: 'translateX(-50%)' }}
          >
            <div
              className="rounded-full"
              style={{
                width:     5,
                height:    5,
                marginTop: -1,
                background: passed ? '#00ffa3' : 'rgba(255,255,255,0.18)',
                boxShadow:  passed ? '0 0 7px #00ffa3' : 'none',
                transition: 'background 0.3s, box-shadow 0.3s',
              }}
            />
            <span
              className="font-mono text-[7px] tracking-widest uppercase mt-1 whitespace-nowrap"
              style={{
                color:   isActive ? '#00ffa3' : 'rgba(255,255,255,0.22)',
                opacity: p > mark.pct - 0.06 ? 1 : 0,
                transition: 'color 0.3s, opacity 0.3s',
              }}
            >
              {mark.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
