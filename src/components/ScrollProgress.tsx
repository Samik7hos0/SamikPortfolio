import { useEffect, useRef, useState } from 'react'

const SECTION_IDS = ['about', 'work', 'notes', 'contact'] as const

interface Mark {
  id: string
  label: string
  pct: number
}

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  const [marks,  setMarks]  = useState<Mark[]>([])
  const [active, setActive] = useState('')
  // Integer-percent progress; only changes ~100× over a full scroll, not every frame
  const [pct, setPct] = useState(0)

  // Layout cached here and refreshed on resize only — never read during scroll
  const totalRef   = useRef(1)
  const offsetsRef = useRef<{ id: string; top: number }[]>([])

  useEffect(() => {
    const computeLayout = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      totalRef.current = total > 0 ? total : 1
      const offs: { id: string; top: number }[] = []
      const next: Mark[] = []
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el) {
          offs.push({ id, top: el.offsetTop })
          next.push({
            id,
            label: id.charAt(0).toUpperCase() + id.slice(1),
            pct: Math.min(el.offsetTop / totalRef.current, 0.97),
          })
        }
      }
      offsetsRef.current = offs
      setMarks(next)
    }

    let raf = 0
    let lastBucket = -1
    let lastActive = ''

    const update = () => {
      raf = 0
      const prog = Math.min(window.scrollY / totalRef.current, 1)

      // Smooth bar: write width directly, no React re-render
      if (barRef.current) barRef.current.style.width = `${prog * 100}%`

      // Markers/labels only need ~1% granularity → re-render rarely
      const bucket = Math.round(prog * 100)
      if (bucket !== lastBucket) {
        lastBucket = bucket
        setPct(prog)
      }

      const y = window.scrollY + 130
      let cur = ''
      for (const o of offsetsRef.current) if (o.top <= y) cur = o.id
      if (cur !== lastActive) {
        lastActive = cur
        setActive(cur)
      }
    }

    // Coalesce scroll events to one update per animation frame
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    const t = setTimeout(() => { computeLayout(); update() }, 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', computeLayout, { passive: true })
    return () => {
      clearTimeout(t)
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', computeLayout)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[9990] pointer-events-none" style={{ height: 3 }}>
      {/* Fill bar — width updated imperatively via ref */}
      <div
        ref={barRef}
        style={{
          height: '100%',
          width:  '0%',
          background: 'linear-gradient(90deg, #00ffa3, #0af)',
          boxShadow: '0 0 8px #00ffa3, 0 0 20px rgba(0,255,163,0.55)',
          willChange: 'width',
        }}
      />

      {/* Section markers */}
      {marks.map(mark => {
        const passed   = pct >= mark.pct
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
                opacity: pct > mark.pct - 0.06 ? 1 : 0,
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
