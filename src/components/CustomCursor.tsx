import { useEffect, useRef, useState } from 'react'

const TRAIL_COUNT = 5
const TRAIL_LAGS  = [0.18, 0.14, 0.11, 0.08, 0.06]
const TRAIL_SIZES = [5,    4,    3.2,  2.5,  2   ]
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

interface CursorState {
  hovered: boolean
  clicking: boolean
  label: string
  color: string
}

export default function CustomCursor() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const dotRef   = useRef<HTMLDivElement>(null)
  const ringRef  = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<(HTMLDivElement | null)[]>([])
  const visible  = useRef(true)

  const target      = useRef({ x: -200, y: -200 })
  const prevTarget  = useRef({ x: -200, y: -200 })
  const dotPos      = useRef({ x: -200, y: -200 })
  const ringPos     = useRef({ x: -200, y: -200 })
  const trailPos    = useRef(Array.from({ length: TRAIL_COUNT }, () => ({ x: -200, y: -200 })))
  const raf         = useRef(0)
  const stateRef    = useRef<CursorState>({ hovered: false, clicking: false, label: '', color: '#00ffa3' })

  const [cs, setCs] = useState<CursorState>(stateRef.current)

  useEffect(() => {
    const SELECTOR = 'a, button, [data-hover], [data-cursor]'

    const onMove = (e: MouseEvent) => {
      prevTarget.current = { ...target.current }
      target.current     = { x: e.clientX, y: e.clientY }

      // Hover detection lives here (not on mouseover/mouseout) — those bubble
      // and fire on every nested child, causing the ring to flicker. We resolve
      // the interactive ancestor once per move and only re-render on a real change.
      const interactive = (e.target as HTMLElement).closest(SELECTOR) as HTMLElement | null
      const s = stateRef.current
      if (interactive) {
        const label = interactive.dataset.cursor ?? ''
        const color = interactive.dataset.cursorColor ?? '#00ffa3'
        if (!s.hovered || s.label !== label || s.color !== color) {
          stateRef.current = { ...s, hovered: true, label, color }
          setCs(stateRef.current)
        }
      } else if (s.hovered) {
        stateRef.current = { ...s, hovered: false, label: '', color: '#00ffa3' }
        setCs(stateRef.current)
      }
    }

    const onDown = () => {
      stateRef.current = { ...stateRef.current, clicking: true }
      setCs(stateRef.current)
    }
    const onUp = () => {
      stateRef.current = { ...stateRef.current, clicking: false }
      setCs(stateRef.current)
    }

    // Pure-DOM ripple — zero React overhead
    const onClick = (e: MouseEvent) => {
      const r = document.createElement('div')
      r.className = 'cursor-ripple'
      r.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;`
      document.body.appendChild(r)
      setTimeout(() => r.remove(), 750)
    }

    // Fade the whole cursor out when the pointer leaves the window so it never
    // freezes stranded at an edge; restore on re-entry.
    const onLeave = () => { visible.current = false }
    const onEnter = () => { visible.current = true }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)
    window.addEventListener('click',     onClick)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    const tick = () => {
      const { hovered, clicking } = stateRef.current

      if (wrapRef.current) wrapRef.current.style.opacity = visible.current ? '1' : '0'

      // Dot tracks the pointer almost 1:1 so it never feels laggy; the ring
      // and trail keep a softer follow for the comet effect.
      dotPos.current.x  = lerp(dotPos.current.x,  target.current.x, 0.45)
      dotPos.current.y  = lerp(dotPos.current.y,  target.current.y, 0.45)
      ringPos.current.x = lerp(ringPos.current.x, target.current.x, 0.24)
      ringPos.current.y = lerp(ringPos.current.y, target.current.y, 0.24)

      // Velocity-based ring stretch in direction of movement
      const vx     = target.current.x - prevTarget.current.x
      const vy     = target.current.y - prevTarget.current.y
      const speed  = Math.sqrt(vx * vx + vy * vy)
      const angle  = Math.atan2(vy, vx) * (180 / Math.PI)
      const str    = Math.min(speed * 0.035, 0.28)

      // Positioning is done with translate3d (GPU compositor) instead of
      // left/top — animating left/top forces layout+paint every frame on all
      // 7 shadowed elements, which is what was freezing the cursor under load.
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%,-50%)`
      }
      if (ringRef.current) {
        let t = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%,-50%)`
        if (!hovered && !clicking && speed > 1.5) {
          t += ` rotate(${angle}deg) scaleX(${1 + str}) scaleY(${1 - str * 0.5})`
        }
        ringRef.current.style.transform = t
      }

      // Trail particles
      trailPos.current.forEach((pos, i) => {
        const src = i === 0 ? dotPos.current : trailPos.current[i - 1]
        pos.x = lerp(pos.x, src.x, TRAIL_LAGS[i])
        pos.y = lerp(pos.y, src.y, TRAIL_LAGS[i])
        const el = trailRefs.current[i]
        if (el) {
          el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%,-50%)`
          // Keep the comet alive over interactive elements — just dim it so it
          // doesn't fight the expanded ring/label. (Was 0 → looked like it died.)
          const base = (TRAIL_COUNT - i) / TRAIL_COUNT * 0.5
          el.style.opacity = (hovered ? base * 0.45 : base).toString()
        }
      })

      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      window.removeEventListener('click',     onClick)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  const { hovered, clicking, label, color } = cs
  // Hide the dot only when a label occupies the ring; otherwise it stays visible
  // so there's always a green point following the pointer.
  const dotSize  = label ? 0 : clicking ? 4 : 8
  const ringSize = label ? 74 : hovered ? 58 : clicking ? 26 : 40

  return (
    <div ref={wrapRef} style={{ transition: 'opacity 0.25s ease', pointerEvents: 'none' }}>
      {/* Trail */}
      {Array.from({ length: TRAIL_COUNT }, (_, i) => (
        <div
          key={i}
          ref={el => { trailRefs.current[i] = el }}
          className="fixed pointer-events-none z-[9996] rounded-full"
          style={{
            width:      TRAIL_SIZES[i],
            height:     TRAIL_SIZES[i],
            background: color,
            opacity:    0,
            top:  0,
            left: 0,
            willChange: 'transform, opacity',
            transition: 'opacity 0.18s ease, background 0.2s ease',
          }}
        />
      ))}

      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          width:     dotSize,
          height:    dotSize,
          background: color,
          boxShadow: `0 0 10px ${color}, 0 0 22px ${color}88`,
          transition: 'width 0.15s ease, height 0.15s ease, background 0.2s ease, box-shadow 0.2s ease',
          top:  0,
          left: 0,
          willChange: 'transform',
        }}
      />

      {/* Ring + inline label */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] rounded-full flex items-center justify-center"
        style={{
          width:     ringSize,
          height:    ringSize,
          transform: 'translate3d(-200px,-200px,0) translate(-50%,-50%)',
          willChange: 'transform',
          border:    `1.5px solid ${hovered ? color : `${color}70`}`,
          background: label ? `${color}0c` : 'transparent',
          boxShadow:  hovered
            ? `0 0 24px ${color}44, inset 0 0 24px ${color}08`
            : 'none',
          transition: [
            'width 0.3s cubic-bezier(0.16,1,0.3,1)',
            'height 0.3s cubic-bezier(0.16,1,0.3,1)',
            'border-color 0.2s ease',
            'box-shadow 0.25s ease',
            'background 0.2s ease',
          ].join(', '),
          top:  0,
          left: 0,
        }}
      >
        {label && (
          <span
            className="font-mono text-[9px] tracking-[0.14em] uppercase font-medium select-none whitespace-nowrap pointer-events-none"
            style={{ color, lineHeight: 1 }}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
