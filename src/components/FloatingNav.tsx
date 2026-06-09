import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme, type ThemeMode } from '../context/ThemeContext'

const LINKS = [
  { href: '#about',   label: 'About',   mobileShow: true  },
  { href: '#work',    label: 'Work',    mobileShow: true  },
  { href: '#notes',   label: 'Notes',   mobileShow: false },
  { href: '#contact', label: 'Contact', mobileShow: false },
]

const SECTIONS = ['hero', 'about', 'work', 'notes', 'contact']

function SunIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/>
      <line x1="4.93" y1="4.93" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/>
      <line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/>
      <line x1="4.93" y1="19.07" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.07" y2="4.93"/>
    </svg>
  )
}
function MoonIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}
function MonitorIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  )
}

const CYCLE: ThemeMode[] = ['system', 'light', 'dark']
const THEME_ICONS: Record<ThemeMode, React.ReactNode> = {
  light: <SunIcon />, dark: <MoonIcon />, system: <MonitorIcon />,
}
const THEME_LABELS: Record<ThemeMode, string> = {
  light: 'Light', dark: 'Dark', system: 'System',
}

export default function FloatingNav() {
  const [visible, setVisible] = useState(false)
  const [active, setActive]   = useState('')
  const { theme, setTheme }   = useTheme()

  const cycleTheme = () => {
    const next = CYCLE[(CYCLE.indexOf(theme) + 1) % CYCLE.length]
    setTheme(next)
  }

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
          initial={{ y: -20, opacity: 0, scale: 0.97 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -12, opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-4 sm:top-5 left-0 right-0 z-50 flex justify-center px-3"
        >
          <nav
            className="relative w-full sm:w-auto"
            style={{ maxWidth: 680 }}
          >
            {/* Outer glow ring — purely decorative */}
            <div
              className="absolute -inset-[1px] rounded-[20px] pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(0,255,163,0.12) 0%, transparent 50%, rgba(0,170,255,0.08) 100%)',
              }}
            />

            {/* Pill shell */}
            <div
              className="relative grid grid-cols-3 items-center px-2 py-1.5 rounded-[18px]"
              style={{
                backdropFilter: 'blur(28px) saturate(220%)',
                WebkitBackdropFilter: 'blur(28px) saturate(220%)',
                background: 'rgba(5,18,28,0.92)',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 0 0 0.5px rgba(0,255,163,0.08), 0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              {/* ── Col 1: Logo (left-aligned) ── */}
              <div className="flex items-center justify-start">
                <a
                  href="#hero"
                  className="group flex items-center gap-2 rounded-xl px-2 py-1.5 transition-all duration-200 hover:bg-white/[0.04]"
                >
                  {/* Monogram with pulsing ring */}
                  <div className="relative shrink-0">
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0,255,163,0.18) 0%, rgba(0,170,255,0.12) 100%)',
                        color: '#00ffa3',
                        border: '1px solid rgba(0,255,163,0.22)',
                      }}
                    >
                      S
                    </div>
                    {/* Live dot */}
                    <span
                      className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-[rgba(5,18,28,0.9)] bg-[#00ffa3]"
                      style={{ boxShadow: '0 0 6px #00ffa3' }}
                    />
                  </div>
                  <span
                    className="hidden sm:block font-mono text-[11px] font-medium tracking-wide"
                    style={{ color: 'rgba(224,235,240,0.55)' }}
                  >
                    samik
                  </span>
                </a>
              </div>

              {/* ── Col 2: Nav links (perfectly centered) ── */}
              <div className="flex items-center justify-center gap-0.5">
                {LINKS.map(({ href, label, mobileShow }) => {
                  const id = href.replace('#', '')
                  const isActive = active === id
                  return (
                    <a
                      key={href}
                      href={href}
                      className={`relative flex items-center justify-center rounded-xl px-3 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-medium transition-colors duration-150 ${!mobileShow ? 'hidden sm:flex' : 'flex'}`}
                      style={{ color: isActive ? '#F6FCFF' : 'rgba(224,235,240,0.38)' }}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="pill-active"
                          className="absolute inset-0 rounded-xl"
                          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)' }}
                          transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                        />
                      )}
                      <span className="relative z-10">{label}</span>
                    </a>
                  )
                })}
              </div>

              {/* ── Col 3: Actions (right-aligned) ── */}
              <div className="flex items-center justify-end gap-0.5">
                {/* Theme toggle */}
                <button
                  onClick={cycleTheme}
                  title={`${THEME_LABELS[theme]} mode`}
                  className="flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-200 hover:bg-white/[0.05] active:scale-90"
                  style={{ color: 'rgba(224,235,240,0.38)' }}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={theme}
                      initial={{ opacity: 0, rotate: -20, scale: 0.6 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 20, scale: 0.6 }}
                      transition={{ duration: 0.18 }}
                      className="flex"
                    >
                      {THEME_ICONS[theme]}
                    </motion.span>
                  </AnimatePresence>
                </button>

                {/* Thin separator */}
                <div className="hidden sm:block w-px h-3.5 mx-0.5" style={{ background: 'rgba(255,255,255,0.07)' }} />

                {/* Hire me CTA */}
                <a
                  href="#contact"
                  className="relative flex items-center gap-1.5 rounded-xl pl-2.5 pr-3 py-1.5 text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all duration-200 hover:brightness-110 active:scale-95 overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #00ffa3 0%, #00e693 100%)',
                    color: '#051A24',
                    boxShadow: '0 0 14px rgba(0,255,163,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: '#051A24', opacity: 0.5 }}
                  />
                  Hire me
                </a>
              </div>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
