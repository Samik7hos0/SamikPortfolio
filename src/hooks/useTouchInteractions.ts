import { useEffect } from 'react'
import { haptic } from '../utils/haptics'

/**
 * Mobile-only interaction layer. The desktop experience leans on the custom
 * cursor (ripple on click, magnetic CTAs); touch devices get the equivalent
 * tactile language instead:
 *   - a tap ripple at the finger position (reuses the `.cursor-ripple` style)
 *   - a short haptic pulse on every interactive tap
 *
 * Attached once at the document level so every <a>/<button>/[data-cursor]
 * benefits without per-component wiring.
 */
export function useTouchInteractions() {
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      const el = e.target as HTMLElement | null
      if (!el?.closest('a, button, [data-cursor], [data-hover]')) return
      const t = e.touches[0]
      if (!t) return

      haptic(8)

      const ripple = document.createElement('div')
      ripple.className = 'cursor-ripple touch-ripple'
      ripple.style.cssText = `left:${t.clientX}px;top:${t.clientY}px;`
      document.body.appendChild(ripple)
      setTimeout(() => ripple.remove(), 700)
    }

    document.addEventListener('touchstart', onTouchStart, { passive: true })
    return () => document.removeEventListener('touchstart', onTouchStart)
  }, [])
}
