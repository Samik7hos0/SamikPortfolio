import { useRef, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
          <span className="font-mono text-xs" style={{ color: '#00ffa3' }}>Email copied to clipboard</span>
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
    if (now - lastSpawn.current < 70) return
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
      transform: translate(-50%,-50%) rotate(${(Math.random()*20-10).toFixed(1)}deg) scale(1);
      font-family:'JetBrains Mono',monospace; font-size:11px; font-weight:500;
      color:${color}; background:rgba(5,26,36,0.9); padding:5px 12px; border-radius:9999px;
      border:1px solid ${color}40; box-shadow:0 4px 20px rgba(0,0,0,0.3), 0 0 10px ${color}30;
      pointer-events:none; opacity:1; z-index:5;
      transition:opacity 0.9s ease, transform 0.9s ease;
      backdrop-filter:blur(8px);
    `
    container.appendChild(el)
    requestAnimationFrame(() => {
      el.style.opacity = '0'
      el.style.transform = `translate(-50%,-80%) rotate(${(Math.random()*30-15).toFixed(1)}deg) scale(0.65)`
    })
    setTimeout(() => el.remove(), 1000)
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <section id="contact" className="w-full py-12 px-6">
      <CopyToast visible={copied} />

      <div
        ref={containerRef}
        onMouseMove={handleMove}
        className="relative rounded-[44px] md:rounded-[56px] overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #051A24 0%, #071e2b 60%, #051A24 100%)',
          minHeight: 560,
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
        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 55% at 50% 55%, rgba(0,255,163,0.07) 0%, transparent 70%)' }} />

        {/* Orbit rings */}
        <OrbitRing radius={130} speed={14} color="#00ffa3" delay={0} />
        <OrbitRing radius={210} speed={22} color="#0af" delay={4} />
        <OrbitRing radius={300} speed={32} color="#ffaa44" delay={8} />

        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,163,0.5), transparent)' }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center py-24 px-6">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-8 rounded-full px-4 py-1.5"
            style={{ background: 'rgba(0,255,163,0.08)', border: '1px solid rgba(0,255,163,0.2)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ffa3] animate-pulse" />
            <span className="font-mono text-[11px] tracking-widest" style={{ color: 'rgba(0,255,163,0.8)' }}>
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
              className="font-serif text-[52px] md:text-[72px] lg:text-[96px] leading-none mb-3"
              style={{ color: '#F6FCFF' }}
            >
              Let's{' '}
              <span style={{ color: '#00ffa3', textShadow: '0 0 50px rgba(0,255,163,0.4)' }}>
                talk
              </span>
            </motion.h2>
          </div>

          {/* Email address — large, prominent, clickable */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-10"
          >
            <a
              href={`mailto:${EMAIL}`}
              className="group font-mono text-base md:text-xl relative"
              style={{ color: 'rgba(224,235,240,0.55)' }}
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

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            {/* Primary CTA */}
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-3 rounded-full pl-3 pr-6 py-2.5 transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
              style={{
                background: 'rgba(246,252,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 0 30px rgba(0,255,163,0.08)',
              }}
            >
              <span
                className="w-10 h-10 rounded-full flex items-center justify-center font-serif text-base flex-shrink-0"
                style={{ background: '#00ffa3', color: '#051A24', boxShadow: '0 0 18px rgba(0,255,163,0.5)' }}
              >
                SS
              </span>
              <span className="text-sm font-medium" style={{ color: '#F6FCFF' }}>
                Start a conversation
              </span>
            </a>

            {/* Copy email button */}
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-mono transition-all duration-200 hover:bg-white/5 active:scale-[0.97]"
              style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(224,235,240,0.55)' }}
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
            className="flex gap-8 mt-10"
          >
            {[
              { href: 'https://github.com/Samik7hos0', label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/samik-sengupta', label: 'LinkedIn' },
              { href: `/resume/Samik_Sengupta_Data_Engineer_Resume.pdf`, label: 'Resume ↗', external: true },
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
