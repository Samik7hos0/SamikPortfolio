import { useEffect } from 'react'

const SECTIONS = ['hero', 'about', 'work', 'notes', 'contact']

function getActiveIndex(): number {
  const y = window.scrollY + 130
  let idx = 0
  SECTIONS.forEach((id, i) => {
    const el = document.getElementById(id)
    if (el && el.offsetTop <= y) idx = i
  })
  return idx
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function useKeyNav() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Don't hijack text inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      // Don't fire with modifiers
      if (e.metaKey || e.ctrlKey || e.altKey) return

      const active = getActiveIndex()

      switch (e.key) {
        case 'ArrowDown':
        case 'j':
          e.preventDefault()
          if (active < SECTIONS.length - 1) scrollTo(SECTIONS[active + 1])
          break
        case 'ArrowUp':
        case 'k':
          e.preventDefault()
          if (active > 0) scrollTo(SECTIONS[active - 1])
          break
        case '1': scrollTo('hero');    break
        case '2': scrollTo('about');   break
        case '3': scrollTo('work');    break
        case '4': scrollTo('notes');   break
        case '5': scrollTo('contact'); break
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
}
