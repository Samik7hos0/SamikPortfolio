import { ReactNode, useRef } from 'react'

type Variant = 'primary' | 'secondary' | 'tertiary'

interface ButtonProps {
  variant?: Variant
  children: ReactNode
  href?: string
  className?: string
  external?: boolean
}

export default function Button({
  variant = 'primary',
  children,
  href = '#',
  className = '',
  external = false,
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.35
    const y = (e.clientY - rect.top - rect.height / 2) * 0.35
    el.style.transform = `translate(${x}px, ${y}px)`
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0px, 0px)'
  }

  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium transition-transform duration-300 active:scale-[0.98] whitespace-nowrap'

  const variants: Record<Variant, string> = {
    primary: 'bg-[#051A24] text-white shadow-primary hover:brightness-110',
    secondary: 'bg-white text-[#051A24] shadow-secondary hover:bg-[#F6FCFF]',
    tertiary: 'bg-white text-[#051A24] shadow-soft hover:shadow-secondary',
  }

  return (
    <a
      ref={ref}
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      style={{ transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)' }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}
