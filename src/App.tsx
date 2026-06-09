import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import { useLenis } from './hooks/useLenis'
import { useKeyNav } from './hooks/useKeyNav'
import StatementSection from './components/StatementSection'
import LookingForSection from './components/LookingForSection'
import BuildNotesCarousel from './components/BuildNotesCarousel'
import ProjectsSection from './components/ProjectsSection'
import PartnerSection from './components/PartnerSection'
import { Footer, CopyrightBar } from './components/Layout'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import FloatingNav from './components/FloatingNav'
import MagneticWrapper from './components/MagneticWrapper'
import Preloader from './components/Preloader'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import PipelineFlow from './components/PipelineFlow'
import { useCounter } from './hooks/useCounter'

const isTouchDevice = () =>
  typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)

const TECH = [
  'Python', 'Apache Kafka', 'PySpark', 'Apache Spark', 'Apache Airflow',
  'dbt', 'Snowflake', 'AWS S3', 'PostgreSQL', 'Docker', 'SQL', 'pandas',
]

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay },
  } as const
}

function HeroNameChar({ char, index }: { char: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 28, rotateX: -50 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.08 + index * 0.035 }}
      style={{ display: 'inline-block', transformOrigin: 'bottom' }}
    >
      {char === ' ' ? ' ' : char}
    </motion.span>
  )
}

function StatCounter({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
  const { ref, count } = useCounter(value, 1600)
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}>
      <div className="font-mono text-2xl sm:text-3xl font-semibold" style={{ color: '#00ffa3' }}>
        {count}{suffix}
      </div>
      <div className="font-mono text-[9px] sm:text-[10px] mt-1 tracking-wider" style={{ color: 'rgba(224,235,240,0.38)' }}>
        {label.toUpperCase()}
      </div>
    </div>
  )
}

function HeroSection() {
  const heroRef  = useRef<HTMLElement>(null)
  const glowRef  = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  // Ambient glow follows mouse — direct DOM update, no state
  const onHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!glowRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width)  * 100
    const y = ((e.clientY - rect.top)  / rect.height) * 100
    glowRef.current.style.background = `radial-gradient(ellipse 640px 420px at ${x}% ${y}%, rgba(0,255,163,0.065) 0%, transparent 60%)`
  }

  const [typed, setTyped] = useState('')
  const full = 'Data Engineer · Bangalore, India'

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      setTyped(full.slice(0, i + 1))
      i++
      if (i >= full.length) clearInterval(id)
    }, 36)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      onMouseMove={onHeroMouseMove}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(0,255,163,0.06) 0%, transparent 60%), linear-gradient(180deg, #040f17 0%, #071e2b 100%)',
      }}
    >
      {/* Mouse-tracked ambient glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 640px 420px at 50% 30%, rgba(0,255,163,0.04) 0%, transparent 60%)', transition: 'background 0.15s ease' }}
      />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,255,163,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 80%)',
        }}
      />

      {/* Horizontal data-flow lines — subtle background detail */}
      {[15, 35, 55, 75].map((pct) => (
        <div
          key={pct}
          className="absolute left-0 right-0 h-[1px] pointer-events-none"
          style={{
            top: `${pct}%`,
            background: 'linear-gradient(90deg, transparent 0%, rgba(0,255,163,0.04) 30%, rgba(0,170,255,0.04) 70%, transparent 100%)',
          }}
        />
      ))}

      {/* ── Main content — centred vertically ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-5 sm:px-8 pt-24 pb-12"
        style={{ opacity }}
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-10 text-xs font-mono"
          style={{ background: 'rgba(0,255,163,0.07)', border: '1px solid rgba(0,255,163,0.2)', color: '#00ffa3' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ffa3] glow-pulse" />
          Available · Junior DE roles · 12–14 LPA
        </motion.div>

        {/* Name */}
        <h1
          className="font-serif text-[42px] sm:text-[60px] md:text-[76px] lg:text-[90px] font-semibold tracking-tight mb-3"
          style={{ color: '#F6FCFF', lineHeight: 1.0, perspective: '600px' }}
        >
          {'Samik Sengupta'.split('').map((ch, i) => (
            <HeroNameChar key={i} char={ch} index={i} />
          ))}
        </h1>

        {/* Typed role */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="font-mono text-sm sm:text-base mb-10"
          style={{ color: 'rgba(224,235,240,0.45)' }}
        >
          {typed}
          {typed.length < full.length && <span className="terminal-cursor" />}
        </motion.p>

        {/* Tagline */}
        <motion.h2
          {...fadeUp(0.75)}
          className="font-sans text-[22px] sm:text-[30px] md:text-[38px] lg:text-[44px] leading-[1.12] tracking-tight mb-5 max-w-2xl"
          style={{ color: 'rgba(224,235,240,0.88)' }}
        >
          Batch &amp; real-time pipelines
          <br />
          <span className="font-serif" style={{ color: '#00ffa3' }}>built to run in production.</span>
        </motion.h2>

        {/* One-liner */}
        <motion.p
          {...fadeUp(0.9)}
          className="text-sm sm:text-base leading-relaxed max-w-lg mb-9"
          style={{ color: 'rgba(224,235,240,0.48)' }}
        >
          Kafka · Spark · Airflow · dbt · Snowflake · AWS.
          Two end-to-end systems shipped. Ships in Docker.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(1.05)}
          className="flex flex-wrap gap-3 justify-center mb-12 sm:mb-14"
        >
          <MagneticWrapper>
            <a
              href="#contact"
              data-cursor="HIRE →"
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.97] hover:brightness-110"
              style={{ background: '#00ffa3', color: '#051A24', boxShadow: '0 0 28px rgba(0,255,163,0.28)' }}
            >
              Get in touch
            </a>
          </MagneticWrapper>
          <MagneticWrapper>
            <a
              href="#work"
              data-cursor="WORK ↓"
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium transition-all duration-200 active:scale-[0.97] hover:bg-white/8"
              style={{ border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(224,235,240,0.8)' }}
            >
              View projects
            </a>
          </MagneticWrapper>
          <a
            href="/resume/Samik_Sengupta_Data_Engineer_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="PDF ↗"
            data-cursor-color="#ffaa44"
            className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium transition-all duration-200 active:scale-[0.97] hover:bg-white/5"
            style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(224,235,240,0.45)' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Resume
          </a>
        </motion.div>

        {/* Stats row — grid on mobile so it never overflows */}
        <motion.div
          {...fadeUp(1.2)}
          className="grid grid-cols-3 gap-2 xs:gap-0 xs:flex xs:items-center xs:gap-10 sm:gap-14 justify-center mb-12 sm:mb-16 w-full max-w-sm xs:max-w-none"
        >
          <StatCounter value={2} label="Systems shipped" />
          <div className="hidden xs:block h-8 w-[1px]" style={{ background: 'rgba(255,255,255,0.07)' }} />
          <StatCounter value={4} label="Live symbols" />
          <div className="hidden xs:block h-8 w-[1px]" style={{ background: 'rgba(255,255,255,0.07)' }} />
          <div>
            <div className="font-mono text-2xl sm:text-3xl font-semibold" style={{ color: '#00ffa3' }}>30s</div>
            <div className="font-mono text-[9px] sm:text-[10px] mt-1 tracking-wider" style={{ color: 'rgba(224,235,240,0.38)' }}>
              MICRO-BATCH
            </div>
          </div>
        </motion.div>

        {/* ── Pipeline flow diagram ── */}
        <motion.div
          {...fadeUp(1.35)}
          className="w-full max-w-4xl"
        >
          {/* Label */}
          <p className="font-mono text-[9px] tracking-[0.25em] uppercase mb-4 text-center" style={{ color: 'rgba(224,235,240,0.22)' }}>
            Live Architecture · Streaming Pipeline
          </p>
          <PipelineFlow />
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#00ffa3]/40 to-transparent" />
      </motion.div>
    </section>
  )
}

function TechMarquee() {
  return (
    <div className="w-full py-5 md:py-6 overflow-hidden border-y" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
      <div className="flex animate-marquee whitespace-nowrap">
        {[...TECH, ...TECH].map((tech, i) => (
          <div
            key={i}
            className="mx-3 sm:mx-4 flex items-center gap-2.5 shrink-0"
          >
            <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(0,255,163,0.4)' }} />
            <span
              className="font-mono text-xs sm:text-sm font-medium"
              style={{ color: 'var(--fg-45)' }}
            >
              {tech}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [touch] = useState(isTouchDevice)
  useLenis()
  useKeyNav()

  return (
    <ThemeProvider>
      <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--bg)' }}>
        <AnimatePresence>{loading && <Preloader onDone={() => setLoading(false)} />}</AnimatePresence>

        {!touch && <CustomCursor />}
        <ScrollProgress />
        <FloatingNav />

        <HeroSection />
        <TechMarquee />

        <AboutSection />

        <div className="section-divider mx-6" />

        <SkillsSection />

        <div className="section-divider mx-6" />

        <StatementSection />
        <LookingForSection />
        <BuildNotesCarousel />

        <div id="work" />
        <ProjectsSection />
        <PartnerSection />
        <Footer />
        <CopyrightBar />
      </div>
    </ThemeProvider>
  )
}
