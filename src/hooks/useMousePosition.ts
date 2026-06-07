import { useState, useEffect } from 'react'

export function useMousePosition() {
  const [pos, setPos] = useState({ x: -200, y: -200 })
  useEffect(() => {
    const h = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [])
  return pos
}
