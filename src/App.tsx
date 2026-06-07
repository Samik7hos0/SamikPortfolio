import { lazy, Suspense, useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useLenis } from './hooks/useLenis'
import StatementSection from './components/StatementSection'
import LookingForSection from './components/LookingForSection'
import BuildNotesCarousel from './components/BuildNotesCarousel'
import ProjectsSection from './components/ProjectsSection'
import PartnerSection from './components/PartnerSection'
import { Footer, CopyrightBar, BottomNav } from './components/Layout'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import FloatingNav from './components/FloatingNav'
import Preloader from './components/Preloader'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import { useCounter } from './hooks/useCounter'

const HeroScene = lazy(() => import('./components/HeroScene'))

// Only render Three.js on non-touch devices to protect mobile perf
const isTouchDevice = () =>
  typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)

const TECH = [
  'Python', 'Apache Kafka', 'PySpark', 'Apache Spark', 'Apache Airflow',
  'dbt', 'Snowflake', 'AWS S3', 'PostgreSQL', 'Docker', 'SQL', 'pandas',
]

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay },
  } as const
}

function HeroNameChar({ char, index }: { char: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 30, rotateX: -60 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.1 + index * 0.04 }}
      style={{ display: 'inline-block', transformOrigin: 'bottom' }}
    >
      {char === ' ' ? ' ' : char}
    </motion.span>
  )
}

function StatCounter({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
  const { ref, count } = useCounter(value, 1600)
  return (
    <div className="text-center" ref={ref as React.RefObject<HTMLDivElement>}>
      <div
        className="font-serif text-3xl md:text-4xl font-semibold"
        style={{ color: '#00ffa3', textShadow: '0 0 20px rgba(0,255,163,0.4)' }}
      >
        {count}{suffix}
      </div>
      <div className="font-mono text-[10px] md:text-xs mt-1" style={{ color: 'rgba(224,235,240,0.5)' }}>
        {label}
      </div>
    </div>
  )
}

function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 80])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const [touch] = useState(isTouchDevice)

  const [typed, setTyped] = useState('')
  const full = 'Data Engineer · Dharmanagar, India'

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      setTyped(full.slice(0, i + 1))
      i++
      if (i >= full.length) clearInterval(id)
    }, 38)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-gradient scanline"
      id="hero"
    >
      {/* 3D Canvas — desktop only */}
      {!touch && (
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      )}

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(5,26,36,0.55) 100%)' }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,255,163,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,163,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
        style={{ y, opacity }}
      >
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-xs font-mono"
          style={{ background: 'rgba(0,255,163,0.08)', border: '1px solid rgba(0,255,163,0.25)', color: '#00ffa3' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ffa3] glow-pulse" />
          Available for opportunities
        </motion.div>

        {/* Name */}
        <h1
          className="font-serif text-[52px] md:text-[72px] lg:text-[88px] font-semibold tracking-tight mb-4"
          style={{ color: '#F6FCFF', lineHeight: 1.0, perspective: '800px' }}
        >
          {'Samik Sengupta'.split('').map((ch, i) => (
            <HeroNameChar key={i} char={ch} index={i} />
          ))}
        </h1>

        {/* Typed subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="font-mono text-xs md:text-sm mb-8"
          style={{ color: 'rgba(224,235,240,0.6)' }}
        >
          {typed}
          {typed.length < full.length && <span className="terminal-cursor" />}
        </motion.p>

        {/* Tagline */}
        <motion.h2
          {...fadeUp(0.75)}
          className="font-sans text-[32px] md:text-[44px] lg:text-[52px] leading-[1.1] tracking-tight mb-6"
          style={{ color: '#E0EBF0' }}
        >
          Build the{' '}
          <span className="font-serif" style={{ color: '#00ffa3', textShadow: '0 0 30px rgba(0,255,163,0.4)' }}>
            data flow,
          </span>
          <br />
          the <span className="font-serif" style={{ color: '#F6FCFF' }}>right way.</span>
        </motion.h2>

        {/* Description */}
        <motion.div
          {...fadeUp(0.95)}
          className="flex flex-col gap-3 text-sm md:text-base leading-relaxed mb-8 text-left max-w-lg mx-auto"
          style={{ color: 'rgba(224,235,240,0.72)' }}
        >
          <p>
            I build batch and real-time data pipelines for financial data — ingestion,
            transformation, orchestration and warehousing.
          </p>
          <p>
            Stack: Kafka, Spark, Airflow, dbt, Snowflake, AWS. Ships in Docker.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          {...fadeUp(1.1)}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-200 active:scale-[0.97] hover:brightness-110"
            style={{ background: '#00ffa3', color: '#051A24', boxShadow: '0 0 30px rgba(0,255,163,0.35)' }}
          >
            Get in touch
          </a>
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium transition-all duration-200 active:scale-[0.97] hover:bg-white/10"
            style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#F6FCFF' }}
          >
            View projects
          </a>
          <a
            href="/resume/Samik_Sengupta_Data_Engineer_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium transition-all duration-200 active:scale-[0.97] hover:bg-white/5"
            style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(224,235,240,0.65)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Resume
          </a>
        </motion.div>

        {/* Animated stats */}
        <motion.div
          {...fadeUp(1.3)}
          className="mt-14 flex items-center justify-center gap-8 md:gap-14"
        >
          <StatCounter value={2} label="End-to-end systems" />
          <StatCounter value={4} label="Live stock symbols" />
          <div className="text-center">
            <div className="font-serif text-3xl md:text-4xl font-semibold" style={{ color: '#00ffa3', textShadow: '0 0 20px rgba(0,255,163,0.4)' }}>
              30s
            </div>
            <div className="font-mono text-[10px] md:text-xs mt-1" style={{ color: 'rgba(224,235,240,0.5)' }}>Micro-batch window</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Pipeline node labels — positioned to match the 3D canvas */}
      {!touch && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-[18%] left-0 right-0 pointer-events-none hidden md:flex items-end justify-center gap-0"
          style={{ paddingLeft: '4%', paddingRight: '4%' }}
        >
          {[
            { label: 'Alpha Vantage', sub: 'Source API', color: '#00ffa3' },
            { label: 'Kafka', sub: 'Stream Broker', color: '#0af' },
            { label: 'Spark', sub: 'Processing', color: '#ff8c42' },
            { label: 'dbt', sub: 'Transform', color: '#ffaa44' },
            { label: 'Snowflake', sub: 'Warehouse', color: '#29b5e8' },
          ].map(({ label, sub, color }, i) => (
            <div key={label} className="flex-1 flex flex-col items-center gap-1">
              <span className="font-serif text-xs font-medium" style={{ color }}>{label}</span>
              <span className="font-mono text-[9px]" style={{ color: 'rgba(224,235,240,0.3)' }}>{sub}</span>
            </div>
          ))}
        </motion.div>
      )}

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-widest" style={{ color: 'rgba(224,235,240,0.35)' }}>
          SCROLL
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-[#00ffa3]/60 to-transparent animate-float" />
      </motion.div>
    </section>
  )
}

function TechMarquee() {
  return (
    <div className="w-full py-6 md:py-8 overflow-hidden" style={{ background: '#F6FCFF' }}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-6 mb-5 flex items-center gap-3"
      >
        <div className="w-5 h-[1px] bg-[#051A24]/30" />
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(5,26,36,0.45)' }}>
          Tech Stack
        </span>
      </motion.div>

      <div className="flex animate-marquee whitespace-nowrap">
        {[...TECH, ...TECH].map((tech, i) => (
          <div
            key={i}
            className="mx-3 flex items-center justify-center h-[100px] md:h-[140px] min-w-[180px] md:min-w-[280px] rounded-2xl overflow-hidden relative group"
            style={{ background: '#051A24' }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(90deg, transparent, #00ffa3, transparent)' }}
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'radial-gradient(circle at 50% 50%, rgba(0,255,163,0.06) 0%, transparent 70%)' }}
            />
            <span
              className="font-serif text-xl md:text-3xl relative z-10 transition-colors duration-300 group-hover:text-[#00ffa3]"
              style={{ color: '#F6FCFF' }}
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

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <AnimatePresence>{loading && <Preloader onDone={() => setLoading(false)} />}</AnimatePresence>

      {!touch && <CustomCursor />}
      <ScrollProgress />
      <FloatingNav />

      <HeroSection />
      <TechMarquee />

      <div id="about" />
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
      <div className="h-24" />
      <BottomNav />
    </div>
  )
}
