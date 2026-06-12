import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { href: '#about',   label: 'about'   },
  { href: '#work',    label: 'work'    },
  { href: '#notes',   label: 'notes'   },
  { href: '#contact', label: 'contact' },
]

const SECTION_IDS = ['hero', 'about', 'work', 'notes', 'contact']

function NodeIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M5 0.5L9.5 5L5 9.5L0.5 5L5 0.5Z" stroke="#00ffa3" strokeWidth="1" fill="rgba(0,255,163,0.12)" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  )
}

function Sep() {
  return (
    <div
      className="shrink-0 self-stretch my-[9px]"
      style={{ width: 1, background: 'rgba(255,255,255,0.06)' }}
    />
  )
}

export default function FloatingNav() {
  const [visible, setVisible] = useState(false)
  const [active,  setActive]  = useState('')
  // Cached offsetTop positions — updated on resize, no DOM reads in scroll handler
  const positions = useRef<Map<string, number>>(new Map())

  const computePositions = useCallback(() => {
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id)
      if (el) positions.current.set(id, el.offsetTop)
    }
  }, [])

  useEffect(() => {
    // Compute once after first paint, then again after images/fonts settle
    computePositions()
    const t = setTimeout(computePositions, 800)

    const onScroll = () => {
      const y = window.scrollY
      setVisible(y > window.innerHeight * 0.42)
      const offset = 120
      let cur = ''
      for (const id of SECTION_IDS) {
        if (y + offset >= (positions.current.get(id) ?? 0)) cur = id
      }
      setActive(cur)
    }

    window.addEventListener('scroll',  onScroll,         { passive: true })
    window.addEventListener('resize',  computePositions, { passive: true })
    return () => {
      clearTimeout(t)
      window.removeEventListener('scroll',  onScroll)
      window.removeEventListener('resize',  computePositions)
    }
  }, [computePositions])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="nav"
          initial={{ y: -16, opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: 0,   opacity: 1, filter: 'blur(0px)' }}
          exit={{    y: -10, opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-4 sm:top-5 left-0 right-0 z-50 flex justify-center px-4"
          style={{ pointerEvents: 'none' }}
        >
          <nav
            className="relative rounded-[14px]"
            style={{
              pointerEvents: 'auto',
              // backdrop-filter removed: the 96%-opaque bg made the blur invisible
              // while forcing a full-screen backdrop repaint every frame (cursor jank).
              background: 'rgba(4,9,18,0.97)',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: [
                '0 0 0 0.5px rgba(0,255,163,0.07)',
                '0 16px 48px rgba(0,0,0,0.65)',
                '0 2px 8px rgba(0,0,0,0.5)',
                'inset 0 1px 0 rgba(255,255,255,0.04)',
              ].join(', '),
            }}
          >
            {/* Scan-line — rendered once, CSS handles the animation */}
            <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden rounded-t-[14px] pointer-events-none z-10">
              <div
                className="nav-scan absolute top-0 h-full w-[40%]"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,163,0.55), rgba(0,170,255,0.25), transparent)' }}
              />
            </div>

            {/* Single flex row */}
            <div className="flex items-stretch h-[40px]">

              {/* Logo */}
              <a
                href="#hero"
                className="flex items-center gap-1.5 pl-3 pr-2.5 hover:bg-white/[0.025] transition-colors duration-150 rounded-l-[14px]"
              >
                <NodeIcon />
                <span
                  className="font-mono text-[11px] tracking-[0.12em] hidden sm:block"
                  style={{ color: 'rgba(224,235,240,0.45)' }}
                >
                  samik.s
                </span>
                <span
                  className="w-[6px] h-[6px] rounded-full shrink-0"
                  style={{ background: '#00ffa3', boxShadow: '0 0 6px #00ffa3', animation: 'glowPulse 2.5s ease-in-out infinite' }}
                />
              </a>

              <Sep />

              {/* Nav links — all 4 visible on every screen size */}
              {LINKS.map(({ href, label }) => {
                const id      = href.replace('#', '')
                const isActive = active === id
                return (
                  <a
                    key={href}
                    href={href}
                    className="relative flex items-center h-full px-2.5 sm:px-3.5 group hover:bg-white/[0.02] transition-colors duration-150"
                  >
                    <span
                      className="font-mono text-[10px] sm:text-[11px] tracking-[0.06em] transition-colors duration-200 whitespace-nowrap"
                      style={{ color: isActive ? '#00ffa3' : 'rgba(224,235,240,0.32)' }}
                    >
                      {label}
                    </span>

                    {/* Animated underline that slides between active links */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute bottom-0 left-1.5 right-1.5 h-[1.5px] rounded-full"
                        style={{ background: 'linear-gradient(90deg, transparent, #00ffa3, transparent)' }}
                        transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                      />
                    )}

                    {/* Hover hint on inactive links */}
                    {!isActive && (
                      <span
                        className="absolute bottom-0 left-2 right-2 h-[1px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ background: 'rgba(224,235,240,0.07)' }}
                      />
                    )}
                  </a>
                )
              })}

              <Sep />

              {/* Hire me CTA */}
              <div className="flex items-center px-2">
                <a
                  href="#contact"
                  data-cursor="HIRE →"
                  className="group flex items-center gap-1.5 rounded-[9px] px-3 py-1.5 font-mono text-[10px] sm:text-[11px] font-semibold tracking-wide whitespace-nowrap transition-all duration-200 hover:brightness-110 active:scale-[0.95]"
                  style={{
                    background: 'linear-gradient(135deg, #00ffa3 0%, #00d98a 100%)',
                    color: '#040912',
                    boxShadow: '0 0 12px rgba(0,255,163,0.18), inset 0 1px 0 rgba(255,255,255,0.2)',
                  }}
                >
                  hire me
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowRight />
                  </span>
                </a>
              </div>

            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
