// Lightweight haptic feedback for touch devices.
// navigator.vibrate is a no-op / undefined on desktop and iOS Safari, so we
// guard it — callers can fire freely without worrying about support.
export function haptic(pattern: number | number[] = 8) {
  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
    try {
      navigator.vibrate(pattern)
    } catch {
      /* some browsers throw if called outside a user gesture — ignore */
    }
  }
}
