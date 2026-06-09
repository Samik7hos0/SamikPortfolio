import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface Note {
  text: string
  topic: string
  tag: string
  accent: string
}

const NOTES: Note[] = [
  {
    text: 'Found hardcoded database credentials sitting in a public repo. Rotated the password, refactored everything to python-dotenv, and purged the secret from git history with git-filter-repo. Security is part of the pipeline, not an afterthought.',
    topic: 'Secrets management',
    tag: 'market-pipeline',
    accent: '#00ffa3',
  },
  {
    text: 'Built the Kafka layer with a dual-listener config so producers inside Docker and clients on the host both connect cleanly. Health checks and an init-kafka service mean the stack comes up in the right order every time.',
    topic: 'Streaming infra',
    tag: 'streaming-pipeline',
    accent: '#0af',
  },
  {
    text: 'Used foreachBatch with a 30-second micro-batch window to land Spark output into both S3 and Snowflake. Verified 25 records end-to-end across 4 live stock symbols before calling it done.',
    topic: 'Spark Structured Streaming',
    tag: 'streaming-pipeline',
    accent: '#0af',
  },
  {
    text: 'Modelled the warehouse as RAW → STAGING → MARTS in dbt. Staging cleans and types; marts are the business-ready layer. Earned the dbt Fundamentals cert while building it for real, not just watching the course.',
    topic: 'Data modelling',
    tag: 'dbt',
    accent: '#ffaa44',
  },
  {
    text: 'Wrote four Airflow DAGs following production scheduling patterns, all running locally in Docker Compose. The point was to build something that mirrors how teams actually orchestrate, not a toy example.',
    topic: 'Orchestration',
    tag: 'airflow',
    accent: '#00ffa3',
  },
]

export default function BuildNotesCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [transitioning, setTransitioning] = useState(true)
  const cardWidth = typeof window !== 'undefined' && window.innerWidth < 640 ? Math.min(window.innerWidth - 32, 360) : 440
  const gap = 16

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setIndex((i) => i + 1), 3500)
    return () => clearInterval(id)
  }, [paused])

  // Seamless infinite loop: when we reach the cloned tail, silently jump back
  useEffect(() => {
    if (index >= NOTES.length * 2) {
      const t = setTimeout(() => {
        setTransitioning(false)
        setIndex((i) => i - NOTES.length)
      }, 850)
      return () => clearTimeout(t)
    }
    if (!transitioning) {
      requestAnimationFrame(() => setTransitioning(true))
    }
  }, [index, transitioning])

  const tripled = [...NOTES, ...NOTES, ...NOTES]
  const realIndex = index % NOTES.length

  return (
    <section
      id="notes"
      className="w-full py-12 sm:py-20 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="md:max-w-4xl md:ml-auto px-4 sm:px-6 mb-8 sm:mb-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-3"
        >
          <div className="w-5 h-[1px]" style={{ background: 'var(--border-mid)' }} />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--fg-45)' }}>
            Build Notes
          </span>
        </motion.div>

        <div className="flex items-end justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-[24px] sm:text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] tracking-tight"
            style={{ color: 'var(--fg-mid)' }}
          >
            What I learned{' '}
            <span className="font-serif">building</span>
          </motion.h2>

          {/* Dots + controls */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex gap-1.5">
              {NOTES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === realIndex ? 20 : 6,
                    height: 6,
                    background: i === realIndex ? 'var(--fg)' : 'var(--fg-30)',
                  }}
                />
              ))}
            </div>
            <button
              aria-label="Previous"
              onClick={() => setIndex((i) => (i <= 0 ? NOTES.length - 1 : i - 1))}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95"
              style={{ border: '1px solid var(--border-mid)' }}
            >
              <ChevronLeft className="w-4 h-4" style={{ color: 'var(--fg-mid)' }} />
            </button>
            <button
              aria-label="Next"
              onClick={() => setIndex((i) => i + 1)}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95"
              style={{ border: '1px solid var(--border-mid)' }}
            >
              <ChevronRight className="w-4 h-4" style={{ color: 'var(--fg-mid)' }} />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6">
        <div
          className="flex gap-6"
          style={{
            transform: `translateX(-${index * (cardWidth + gap)}px)`,
            transition: transitioning ? 'transform 0.85s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }}
        >
          {tripled.map((note, i) => {
            const isActive = i % NOTES.length === realIndex
            return (
              <div
                key={i}
                className="flex-shrink-0 relative rounded-[32px] overflow-hidden"
                style={{
                  width: `min(${cardWidth}px, calc(100vw - 48px))`,
                  background: 'var(--card)',
                  border: isActive ? `1px solid ${note.accent}30` : '1px solid var(--card-border)',
                  boxShadow: isActive
                    ? `0 20px 60px rgba(0,0,0,0.10), 0 0 0 1px ${note.accent}15`
                    : 'var(--card-shadow)',
                  transition: 'border-color 0.4s, box-shadow 0.4s',
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${note.accent}, transparent)`,
                    opacity: isActive ? 1 : 0,
                  }}
                />

                <div className="px-8 md:px-10 py-8">
                  {/* Quote mark */}
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="mb-5">
                    <path
                      d="M9 7H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v3H4v2h5v-7a2 2 0 0 0-2-2H5V9h4V7zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v3h-3v2h5v-7a2 2 0 0 0-2-2h-2V9h4V7z"
                      fill={note.accent}
                      opacity="0.6"
                    />
                  </svg>

                  <p className="text-base leading-relaxed" style={{ color: 'var(--fg-mid)' }}>
                    {note.text}
                  </p>

                  <div className="mt-7 flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: '#051A24', boxShadow: `0 0 12px ${note.accent}30` }}
                    >
                      <span className="font-serif text-base" style={{ color: note.accent }}>SS</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm" style={{ color: 'var(--fg-mid)' }}>{note.topic}</p>
                      <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--fg-38)' }}>
                        → {note.tag}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <span
                        className="font-mono text-[10px] px-2.5 py-1 rounded-full"
                        style={{ background: `${note.accent}12`, color: note.accent, border: `1px solid ${note.accent}25` }}
                      >
                        {note.tag}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
