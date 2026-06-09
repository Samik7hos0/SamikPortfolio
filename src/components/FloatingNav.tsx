import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { href: '#about',   label: 'about',   mobileShow: true  },
  { href: '#work',    label: 'work',    mobileShow: true  },
  { href: '#notes',   label: 'notes',   mobileShow: false },
  { href: '#contact', label: 'contact', mobileShow: false },
]

const SECTIONS = ['hero', 'about', 'work', 'notes', 'contact']

/* Small diamond / node icon — references the pipeline visual language */
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
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  )
}

export default function FloatingNav() {
  const [visible, setVisible] = useState(false)
  const [active, setActive]   = useState('')

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5)
      let cur = ''
      for (const id of SECTIONS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 100) cur = id
      }
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="nav"
          initial={{ y: -18, opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: 0,   opacity: 1, filter: 'blur(0px)' }}
          exit={{    y: -10, opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-4 sm:top-5 left-0 right-0 z-50 flex justify-center px-4"
        >
          <nav className="relative">

            {/* ── Outer glow: very faint accent ring ── */}
            <div
              className="absolute -inset-[1px] rounded-[15px] pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(0,255,163,0.08) 0%, transparent 40%, rgba(0,170,255,0.05) 100%)',
              }}
            />

            {/* ── Main pill ── */}
            <div
              className="relative grid items-center rounded-[14px] overflow-hidden"
              style={{
                gridTemplateColumns: 'auto 1fr auto',
                height: 40,
                backdropFilter: 'blur(32px) saturate(260%)',
                WebkitBackdropFilter: 'blur(32px) saturate(260%)',
                background: 'rgba(4, 9, 18, 0.96)',
                border: '1px solid rgba(255,255,255,0.055)',
                boxShadow: '0 0 0 0.5px rgba(0,255,163,0.06), 0 12px 40px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
              }}
            >
              {/* Animated scan line across top edge */}
              <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden pointer-events-none">
                <div
                  className="nav-scan absolute top-0 h-full w-[40%]"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,163,0.55), rgba(0,170,255,0.3), transparent)' }}
                />
              </div>

              {/* ── Col 1: Logo ── */}
              <a
                href="#hero"
                className="flex items-center gap-2 pl-3 pr-3 h-full hover:bg-white/[0.025] transition-colors duration-150"
              >
                <NodeIcon />
                <span
                  className="font-mono text-[11px] tracking-[0.12em] hidden sm:block"
                  style={{ color: 'rgba(224,235,240,0.5)' }}
                >
                  samik.s
                </span>
                {/* Availability dot */}
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
                  style={{ background: '#00ffa3', boxShadow: '0 0 5px #00ffa3' }}
                />
              </a>

              {/* Vertical rule */}
              <div className="w-[1px] h-4 self-center" style={{ background: 'rgba(255,255,255,0.05)' }} />

              {/* ── Col 2: Nav links ── */}
              <div className="flex items-center justify-center h-full">
                {LINKS.map(({ href, label, mobileShow }) => {
                  const id = href.replace('#', '')
                  const isActive = active === id
                  return (
                    <a
                      key={href}
                      href={href}
                      className={`relative flex flex-col items-center justify-center h-full px-3 sm:px-4 group ${!mobileShow ? 'hidden sm:flex' : 'flex'}`}
                    >
                      {/* Link label */}
                      <span
                        className="font-mono text-[10px] sm:text-[11px] tracking-[0.06em] transition-colors duration-150"
                        style={{ color: isActive ? '#00ffa3' : 'rgba(224,235,240,0.32)' }}
                      >
                        {isActive && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mr-0.5"
                            style={{ color: '#00ffa3' }}
                          >
                            _
                          </motion.span>
                        )}
                        {label}
                      </span>

                      {/* Sliding bottom underline */}
                      {isActive && (
                        <motion.div
                          layoutId="nav-underline"
                          className="absolute bottom-0 left-2 right-2 h-[1.5px] rounded-full"
                          style={{ background: 'linear-gradient(90deg, transparent, #00ffa3, transparent)' }}
                          transition={{ type: 'spring', bounce: 0.12, duration: 0.38 }}
                        />
                      )}

                      {/* Hover underline (when not active) */}
                      {!isActive && (
                        <span
                          className="absolute bottom-0 left-3 right-3 h-[1px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          style={{ background: 'rgba(224,235,240,0.1)' }}
                        />
                      )}
                    </a>
                  )
                })}
              </div>

              {/* Vertical rule */}
              <div className="w-[1px] h-4 self-center" style={{ background: 'rgba(255,255,255,0.05)' }} />

              {/* ── Col 3: CTA ── */}
              <div className="flex items-center pl-2 pr-2 h-full">
                <a
                  href="#contact"
                  className="group flex items-center gap-1.5 rounded-[9px] px-3 py-1.5 font-mono text-[10px] sm:text-[11px] font-semibold tracking-wide whitespace-nowrap transition-all duration-200 hover:brightness-110 active:scale-[0.96]"
                  style={{
                    background: 'linear-gradient(135deg, #00ffa3 0%, #00d98a 100%)',
                    color: '#040912',
                    boxShadow: '0 0 12px rgba(0,255,163,0.25), inset 0 1px 0 rgba(255,255,255,0.25)',
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
