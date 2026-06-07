import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const TECH_ORBS = [
  { label: 'Kafka', color: '#0af' },
  { label: 'Spark', color: '#ff8c42' },
  { label: 'Snowflake', color: '#29b5e8' },
  { label: 'Airflow', color: '#00d6a3' },
  { label: 'dbt', color: '#ffaa44' },
]

// Masked text reveal
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ y: '105%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

function PipelineCard() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const current = useRef({ rx: 0, ry: 0 })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40])

  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 2200)
    return () => clearInterval(id)
  }, [])

  const statuses = [
    { text: 'verified ✓',   color: '#00ffa3' },
    { text: 'streaming ◉',  color: '#0af' },
    { text: 'synced ✓',     color: '#ffaa44' },
    { text: 'running ◉',    color: '#ff8c42' },
  ]

  // Mouse-reactive 3D tilt
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const card = cardRef.current
      if (!card) return
      const rect = card.getBoundingClientRect()
      mouse.current = {
        x: ((e.clientX - rect.left) / rect.width  - 0.5) * 2,
        y: ((e.clientY - rect.top)  / rect.height - 0.5) * 2,
      }
    }
    const onLeave = () => { mouse.current = { x: 0, y: 0 } }
    const card = cardRef.current
    card?.addEventListener('mousemove', onMove)
    card?.addEventListener('mouseleave', onLeave)
    return () => {
      card?.removeEventListener('mousemove', onMove)
      card?.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  useEffect(() => {
    let raf = 0
    const tick = () => {
      const card = cardRef.current
      if (!card) { raf = requestAnimationFrame(tick); return }
      current.current.rx += (mouse.current.y * -12 - current.current.rx) * 0.06
      current.current.ry += (mouse.current.x *  16 - current.current.ry) * 0.06
      card.style.transform = `perspective(900px) rotateX(${current.current.rx}deg) rotateY(${current.current.ry}deg)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const status = statuses[tick % statuses.length]

  return (
    <div ref={sectionRef} className="w-full max-w-xs mx-auto mt-14">
      <motion.div style={{ y }}>
        <div
          ref={cardRef}
          className="rounded-[28px] overflow-hidden relative"
          style={{
            background: '#051A24',
            border: '1px solid rgba(0,255,163,0.15)',
            boxShadow: '0 0 60px rgba(0,255,163,0.08), 0 40px 80px rgba(0,0,0,0.18)',
            willChange: 'transform',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Shine layer */}
          <div className="absolute inset-0 pointer-events-none z-10"
            style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,255,163,0.04), transparent)' }} />

          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-[1px]"
            style={{ background: 'linear-gradient(90deg, transparent, #00ffa3, transparent)' }} />

          <div className="aspect-[4/5] flex flex-col items-center justify-center gap-4 p-8 text-center">
            {/* Terminal titlebar */}
            <div className="w-full flex items-center gap-1.5 mb-1">
              {['bg-red-400/50', 'bg-yellow-400/50', 'bg-[#00ffa3]/50'].map(c => (
                <div key={c} className={`w-2.5 h-2.5 rounded-full ${c}`} />
              ))}
              <span className="ml-2 font-mono text-[10px]" style={{ color: 'rgba(224,235,240,0.25)' }}>
                pipeline.sh
              </span>
            </div>

            <span className="font-mono text-[11px] tracking-widest" style={{ color: 'rgba(0,255,163,0.65)' }}>
              // pipeline.status
            </span>

            <motion.div
              key={tick}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="font-serif text-3xl"
              style={{ color: status.color, textShadow: `0 0 20px ${status.color}60` }}
            >
              {status.text}
            </motion.div>

            <span className="font-mono text-[10px]" style={{ color: 'rgba(224,235,240,0.35)' }}>
              end-to-end · 4 symbols · 30s batch
            </span>

            {/* Fake terminal lines */}
            <div className="w-full mt-2 space-y-1.5">
              {['kafka_producer.send(tick)', 'spark.readStream().foreachBatch()', 'dbt.run("--models marts")'].map((l, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="font-mono text-[10px]" style={{ color: 'rgba(0,255,163,0.38)' }}>›</span>
                  <span className="font-mono text-[10px] text-left" style={{ color: 'rgba(224,235,240,0.3)' }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function StatementSection() {
  return (
    <section className="py-20 px-6 overflow-hidden" id="about">
      <div className="max-w-3xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-5 h-[1px] bg-[#051A24]/30" />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(5,26,36,0.45)' }}>
            Philosophy
          </span>
        </motion.div>

        {/* Quote — masked reveal */}
        <div className="relative mb-6">
          <span className="absolute -top-4 -left-2 font-serif text-[80px] leading-none select-none"
            style={{ color: 'rgba(5,26,36,0.05)' }}>
            "
          </span>
          <Reveal>
            <h2
              className="font-sans text-[28px] md:text-[38px] lg:text-[44px] leading-[1.15] tracking-tight"
              style={{ color: '#0D212C' }}
            >
              I learn by building systems that{' '}
              <span className="font-serif" style={{ fontStyle: 'italic' }}>actually run</span>{' '}
              — not by collecting tutorials.
            </h2>
          </Reveal>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="italic text-sm mb-14"
          style={{ color: 'rgba(5,26,36,0.4)' }}
        >
          — Samik Sengupta
        </motion.p>

        {/* Tech orbs */}
        <div className="flex flex-wrap gap-3 mb-6">
          {TECH_ORBS.map(({ label, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.05 + i * 0.07 }}
              className="flex items-center gap-2 rounded-full px-4 py-2"
              style={{ background: `${color}0e`, border: `1px solid ${color}28` }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
              <span className="font-serif text-lg font-medium" style={{ color: '#051A24' }}>{label}</span>
            </motion.div>
          ))}
        </div>

        {/* 3D mouse-reactive pipeline card */}
        <PipelineCard />
      </div>
    </section>
  )
}
