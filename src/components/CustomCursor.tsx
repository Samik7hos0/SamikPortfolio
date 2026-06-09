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
  const dotRef   = useRef<HTMLDivElement>(null)
  const ringRef  = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<(HTMLDivElement | null)[]>([])

  const target      = useRef({ x: -200, y: -200 })
  const prevTarget  = useRef({ x: -200, y: -200 })
  const dotPos      = useRef({ x: -200, y: -200 })
  const ringPos     = useRef({ x: -200, y: -200 })
  const trailPos    = useRef(Array.from({ length: TRAIL_COUNT }, () => ({ x: -200, y: -200 })))
  const raf         = useRef(0)
  const stateRef    = useRef<CursorState>({ hovered: false, clicking: false, label: '', color: '#00ffa3' })

  const [cs, setCs] = useState<CursorState>(stateRef.current)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      prevTarget.current = { ...target.current }
      target.current     = { x: e.clientX, y: e.clientY }
    }

    const onDown = () => {
      stateRef.current = { ...stateRef.current, clicking: true }
      setCs(s => ({ ...s, clicking: true }))
    }
    const onUp = () => {
      stateRef.current = { ...stateRef.current, clicking: false }
      setCs(s => ({ ...s, clicking: false }))
    }

    const onOver = (e: MouseEvent) => {
      const el          = e.target as HTMLElement
      const interactive = el.closest('a, button, [data-hover], [data-cursor]') as HTMLElement | null
      if (!interactive) return
      const label = interactive.dataset?.cursor ?? ''
      const color = interactive.dataset?.cursorColor ?? '#00ffa3'
      stateRef.current = { ...stateRef.current, hovered: true, label, color }
      setCs(s => ({ ...s, hovered: true, label, color }))
    }

    const onOut = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (!el.closest('a, button, [data-hover], [data-cursor]')) return
      stateRef.current = { ...stateRef.current, hovered: false, label: '', color: '#00ffa3' }
      setCs(s => ({ ...s, hovered: false, label: '', color: '#00ffa3' }))
    }

    // Pure-DOM ripple — zero React overhead
    const onClick = (e: MouseEvent) => {
      const r = document.createElement('div')
      r.className = 'cursor-ripple'
      r.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;`
      document.body.appendChild(r)
      setTimeout(() => r.remove(), 750)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)
    window.addEventListener('click',     onClick)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout',  onOut)

    const tick = () => {
      const { hovered, clicking } = stateRef.current

      dotPos.current.x  = lerp(dotPos.current.x,  target.current.x, 0.2)
      dotPos.current.y  = lerp(dotPos.current.y,  target.current.y, 0.2)
      ringPos.current.x = lerp(ringPos.current.x, target.current.x, 0.1)
      ringPos.current.y = lerp(ringPos.current.y, target.current.y, 0.1)

      // Velocity-based ring stretch in direction of movement
      const vx     = target.current.x - prevTarget.current.x
      const vy     = target.current.y - prevTarget.current.y
      const speed  = Math.sqrt(vx * vx + vy * vy)
      const angle  = Math.atan2(vy, vx) * (180 / Math.PI)
      const str    = Math.min(speed * 0.035, 0.28)

      if (dotRef.current) {
        dotRef.current.style.left = dotPos.current.x + 'px'
        dotRef.current.style.top  = dotPos.current.y + 'px'
      }
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + 'px'
        ringRef.current.style.top  = ringPos.current.y + 'px'
        if (!hovered && !clicking && speed > 1.5) {
          ringRef.current.style.transform = `translate(-50%,-50%) rotate(${angle}deg) scaleX(${1 + str}) scaleY(${1 - str * 0.5})`
        } else {
          ringRef.current.style.transform = 'translate(-50%,-50%)'
        }
      }

      // Trail particles
      trailPos.current.forEach((pos, i) => {
        const src = i === 0 ? dotPos.current : trailPos.current[i - 1]
        pos.x = lerp(pos.x, src.x, TRAIL_LAGS[i])
        pos.y = lerp(pos.y, src.y, TRAIL_LAGS[i])
        const el = trailRefs.current[i]
        if (el) {
          el.style.left    = pos.x + 'px'
          el.style.top     = pos.y + 'px'
          el.style.opacity = (hovered ? 0 : (TRAIL_COUNT - i) / TRAIL_COUNT * 0.5).toString()
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
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout',  onOut)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  const { hovered, clicking, label, color } = cs
  const dotSize  = hovered ? 0 : clicking ? 4 : 8
  const ringSize = label ? 74 : hovered ? 58 : clicking ? 26 : 40

  return (
    <>
      {/* Trail */}
      {Array.from({ length: TRAIL_COUNT }, (_, i) => (
        <div
          key={i}
          ref={el => { trailRefs.current[i] = el }}
          className="fixed pointer-events-none z-[9996] rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            width:      TRAIL_SIZES[i],
            height:     TRAIL_SIZES[i],
            background: color,
            opacity:    0,
            top:  0,
            left: 0,
            transition: 'opacity 0.18s ease, background 0.2s ease',
          }}
        />
      ))}

      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          width:     dotSize,
          height:    dotSize,
          background: color,
          boxShadow: `0 0 10px ${color}, 0 0 22px ${color}88`,
          transition: 'width 0.15s ease, height 0.15s ease, background 0.2s ease, box-shadow 0.2s ease',
          top:  0,
          left: 0,
        }}
      />

      {/* Ring + inline label */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] rounded-full flex items-center justify-center"
        style={{
          width:     ringSize,
          height:    ringSize,
          transform: 'translate(-50%,-50%)',
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
    </>
  )
}
