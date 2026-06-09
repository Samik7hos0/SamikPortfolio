import { useRef, useCallback } from 'react'

interface Props {
  children: React.ReactNode
  strength?: number
  className?: string
}

export default function MagneticWrapper({ children, strength = 0.38, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width  / 2
    const cy = rect.top  + rect.height / 2
    el.style.transform = `translate(${(e.clientX - cx) * strength}px, ${(e.clientY - cy) * strength}px)`
  }, [strength])

  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = ''
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ display: 'inline-flex', transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1)' }}
    >
      {children}
    </div>
  )
}
