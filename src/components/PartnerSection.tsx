import { useRef, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MagneticWrapper from './MagneticWrapper'

const EMAIL = 'samik.r.gt@gmail.com'
const TAGS = ['Kafka', 'Spark', 'Airflow', 'dbt', 'Snowflake', 'AWS S3', 'PySpark', 'PostgreSQL', 'Docker', 'Python']

function OrbitRing({ radius, speed, color, delay }: { radius: number; speed: number; color: string; delay: number }) {
  return (
    <div
      className="absolute top-1/2 left-1/2 rounded-full pointer-events-none"
      style={{ width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius, border: `1px solid ${color}15` }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity, delay }}
        style={{ width: radius * 2, height: radius * 2, position: 'absolute', top: 0, left: 0 }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full"
          style={{ marginTop: -5, background: color, boxShadow: `0 0 10px ${color}, 0 0 24px ${color}60` }}
        />
      </motion.div>
    </div>
  )
}

function CopyToast({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[9000] rounded-full px-5 py-2.5 flex items-center gap-2 pointer-events-none"
          style={{
            background: 'rgba(0,255,163,0.12)',
            border: '1px solid rgba(0,255,163,0.35)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 0 30px rgba(0,255,163,0.15)',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00ffa3" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className="font-mono text-xs" style={{ color: '#00ffa3' }}>Email copied</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function PartnerSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lastSpawn = useRef(0)
  const [copied, setCopied] = useState(false)

  const handleMove = useCallback((e: React.MouseEvent) => {
    const now = Date.now()
    if (now - lastSpawn.current < 80) return
    lastSpawn.current = now
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const el = document.createElement('div')
    const tag = TAGS[Math.floor(Math.random() * TAGS.length)]
    const colors = ['#00ffa3', '#0af', '#ffaa44']
    const color = colors[Math.floor(Math.random() * colors.length)]
    el.textContent = tag
    el.style.cssText = `
      position:absolute; left:${x}px; top:${y}px;
      transform: translate(-50%,-50%) scale(1);
      font-family:'JetBrains Mono',monospace; font-size:11px;
      color:${color}; background:rgba(5,26,36,0.9); padding:4px 10px; border-radius:9999px;
      border:1px solid ${color}40; pointer-events:none; opacity:1; z-index:5;
      transition:opacity 0.8s ease, transform 0.8s ease;
    `
    container.appendChild(el)
    requestAnimationFrame(() => {
      el.style.opacity = '0'
      el.style.transform = `translate(-50%,-80%) scale(0.7)`
    })
    setTimeout(() => el.remove(), 900)
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <section id="contact" className="w-full py-8 sm:py-12 px-4 sm:px-6">
      <CopyToast visible={copied} />

      <div
        ref={containerRef}
        onMouseMove={handleMove}
        className="relative rounded-[32px] sm:rounded-[44px] md:rounded-[56px] overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #051A24 0%, #071e2b 60%, #051A24 100%)',
          minHeight: 480,
          border: '1px solid rgba(0,255,163,0.1)',
          boxShadow: '0 60px 120px rgba(0,0,0,0.3)',
        }}
      >
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 55% at 50% 55%, rgba(0,255,163,0.07) 0%, transparent 70%)' }} />

        {/* Orbit rings — hidden on small screens for perf */}
        <div className="hidden sm:block">
          <OrbitRing radius={110} speed={14} color="#00ffa3" delay={0} />
          <OrbitRing radius={190} speed={22} color="#0af" delay={4} />
          <OrbitRing radius={270} speed={32} color="#ffaa44" delay={8} />
        </div>

        <div className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,163,0.5), transparent)' }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center py-16 sm:py-24 px-5 sm:px-8">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-7 rounded-full px-4 py-1.5"
            style={{ background: 'rgba(0,255,163,0.08)', border: '1px solid rgba(0,255,163,0.2)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ffa3] animate-pulse" />
            <span className="font-mono text-[10px] tracking-widest" style={{ color: 'rgba(0,255,163,0.8)' }}>
              OPEN TO WORK · BANGALORE
            </span>
          </motion.div>

          {/* Heading */}
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="font-serif text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] leading-none mb-4"
              style={{ color: '#F6FCFF' }}
            >
              Let's{' '}
              <span style={{ color: '#00ffa3', textShadow: '0 0 50px rgba(0,255,163,0.4)' }}>
                talk
              </span>
            </motion.h2>
          </div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-9"
          >
            <a
              href={`mailto:${EMAIL}`}
              className="group font-mono text-sm sm:text-base md:text-lg relative"
              style={{ color: 'rgba(224,235,240,0.5)' }}
            >
              <span className="group-hover:text-[#00ffa3] transition-colors duration-300">
                {EMAIL}
              </span>
              <span
                className="absolute -bottom-0.5 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-500"
                style={{ background: 'linear-gradient(90deg, #00ffa3, #0af)' }}
              />
            </a>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col xs:flex-row items-center gap-3 w-full xs:w-auto"
          >
            {/* Primary CTA */}
            <MagneticWrapper>
            <a
              href={`mailto:${EMAIL}`}
              data-cursor="EMAIL →"
              className="w-full xs:w-auto inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
              style={{
                background: '#00ffa3',
                color: '#051A24',
                boxShadow: '0 0 30px rgba(0,255,163,0.3)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Send me an email
            </a>
            </MagneticWrapper>

            {/* Copy email */}
            <button
              onClick={copyEmail}
              data-cursor="COPY"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-mono transition-all duration-200 hover:bg-white/5 active:scale-[0.97]"
              style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(224,235,240,0.6)' }}
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span key="copied" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2" style={{ color: '#00ffa3' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    Copied!
                  </motion.span>
                ) : (
                  <motion.span key="copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                    Copy email
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-6 sm:gap-8 mt-9"
          >
            {[
              { href: 'https://github.com/Samik7hos0', label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/samik-sengupta', label: 'LinkedIn' },
              { href: '/resume/Samik_Sengupta_Data_Engineer_Resume.pdf', label: 'Resume ↗', external: true },
            ].map(({ href, label, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="font-mono text-xs relative group transition-colors duration-200"
                style={{ color: 'rgba(224,235,240,0.35)' }}
              >
                <span className="group-hover:text-[#00ffa3] transition-colors duration-200">{label}</span>
                <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-300"
                  style={{ background: '#00ffa3' }} />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
