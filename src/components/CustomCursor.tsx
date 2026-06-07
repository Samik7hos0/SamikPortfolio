import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const target = useRef({ x: -200, y: -200 })
  const dotPos = useRef({ x: -200, y: -200 })
  const ringPos = useRef({ x: -200, y: -200 })
  const raf = useRef(0)
  const [hovered, setHovered] = useState(false)
  const [clicking, setClicking] = useState(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => { target.current = { x: e.clientX, y: e.clientY } }
    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('a, button, [data-hover]')) setHovered(true)
    }
    const onOut = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('a, button, [data-hover]')) setHovered(false)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    const tick = () => {
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t
      dotPos.current.x = lerp(dotPos.current.x, target.current.x, 0.18)
      dotPos.current.y = lerp(dotPos.current.y, target.current.y, 0.18)
      ringPos.current.x = lerp(ringPos.current.x, target.current.x, 0.08)
      ringPos.current.y = lerp(ringPos.current.y, target.current.y, 0.08)

      if (dotRef.current) {
        dotRef.current.style.left = dotPos.current.x + 'px'
        dotRef.current.style.top = dotPos.current.y + 'px'
      }
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + 'px'
        ringRef.current.style.top = ringPos.current.y + 'px'
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  const dotSize = hovered ? 0 : clicking ? 4 : 8
  const ringSize = hovered ? 56 : clicking ? 28 : 40

  return (
    <>
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          width: dotSize,
          height: dotSize,
          background: '#00ffa3',
          boxShadow: '0 0 10px #00ffa3, 0 0 20px #00ffa388',
          transition: 'width 0.15s, height 0.15s',
          top: 0,
          left: 0,
        }}
      />
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          width: ringSize,
          height: ringSize,
          border: `1.5px solid ${hovered ? '#00ffa3' : 'rgba(0,255,163,0.5)'}`,
          boxShadow: hovered ? '0 0 20px rgba(0,255,163,0.4), inset 0 0 20px rgba(0,255,163,0.05)' : 'none',
          transition: 'width 0.25s cubic-bezier(0.4,0,0.2,1), height 0.25s cubic-bezier(0.4,0,0.2,1), border-color 0.2s, box-shadow 0.2s',
          top: 0,
          left: 0,
        }}
      />
    </>
  )
}
