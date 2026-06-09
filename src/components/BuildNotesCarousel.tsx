import { useEffect, useRef, useState, useCallback } from 'react'
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

function getCardWidth() {
  if (typeof window === 'undefined') return 440
  return window.innerWidth < 640 ? Math.min(window.innerWidth - 32, 360) : 440
}

export default function BuildNotesCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [transitioning, setTransitioning] = useState(true)
  const [cardWidth, setCardWidth] = useState(getCardWidth)
  const touchStartX = useRef<number | null>(null)
  const gap = 16

  useEffect(() => {
    const onResize = () => setCardWidth(getCardWidth())
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setIndex((i) => i + 1), 3500)
    return () => clearInterval(id)
  }, [paused])

  /* Seamless infinite loop: when we reach the cloned tail, silently jump back */
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

  const prev = useCallback(() => setIndex((i) => (i <= 0 ? NOTES.length - 1 : i - 1)), [])
  const next = useCallback(() => setIndex((i) => i + 1), [])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) {
      dx < 0 ? next() : prev()
    }
    touchStartX.current = null
  }

  const tripled = [...NOTES, ...NOTES, ...NOTES]
  const realIndex = index % NOTES.length

  return (
    <section
      id="notes"
      className="w-full py-12 sm:py-20 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Header */}
      <div className="max-w-4xl ml-auto px-4 sm:px-6 mb-8 sm:mb-10">
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

        <div className="flex items-end justify-between gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-[24px] sm:text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] tracking-tight"
            style={{ color: 'var(--fg)' }}
          >
            What I learned{' '}
            <span className="font-serif italic">building</span>
          </motion.h2>

          {/* Dots + controls */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden md:flex gap-1.5">
              {NOTES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === realIndex ? 20 : 6,
                    height: 6,
                    background: i === realIndex ? '#00ffa3' : 'var(--fg-30)',
                  }}
                />
              ))}
            </div>
            <button
              aria-label="Previous"
              onClick={prev}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 hover:bg-white/5"
              style={{ border: '1px solid var(--border-mid)' }}
            >
              <ChevronLeft className="w-4 h-4" style={{ color: 'var(--fg-mid)' }} />
            </button>
            <button
              aria-label="Next"
              onClick={next}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 hover:bg-white/5"
              style={{ border: '1px solid var(--border-mid)' }}
            >
              <ChevronRight className="w-4 h-4" style={{ color: 'var(--fg-mid)' }} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dot indicator */}
      <div className="flex md:hidden justify-center gap-1.5 mb-5">
        {NOTES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === realIndex ? 18 : 5,
              height: 5,
              background: i === realIndex ? '#00ffa3' : 'var(--fg-30)',
            }}
          />
        ))}
      </div>

      {/* Cards */}
      <div
        className="px-4 sm:px-6"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex"
          style={{
            gap: gap,
            transform: `translateX(-${index * (cardWidth + gap)}px)`,
            transition: transitioning ? 'transform 0.85s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }}
        >
          {tripled.map((note, i) => {
            const isActive = i % NOTES.length === realIndex
            return (
              <div
                key={i}
                className="flex-shrink-0 relative rounded-[28px] sm:rounded-[32px] overflow-hidden"
                style={{
                  width: cardWidth,
                  background: 'var(--card)',
                  border: isActive ? `1px solid ${note.accent}30` : '1px solid var(--card-border)',
                  boxShadow: isActive
                    ? `0 24px 60px rgba(0,0,0,0.12), 0 0 0 1px ${note.accent}12`
                    : 'var(--card-shadow)',
                  transition: 'border-color 0.4s, box-shadow 0.4s',
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-400"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${note.accent}, transparent)`,
                    opacity: isActive ? 1 : 0,
                  }}
                />

                <div className="px-7 sm:px-9 py-7 sm:py-8">
                  {/* Quote icon */}
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${note.accent}10`, border: `1px solid ${note.accent}20` }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 7H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v3H4v2h5v-7a2 2 0 0 0-2-2H5V9h4V7zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v3h-3v2h5v-7a2 2 0 0 0-2-2h-2V9h4V7z"
                        fill={note.accent}
                      />
                    </svg>
                  </div>

                  <p className="text-[14px] sm:text-[15px] leading-relaxed" style={{ color: 'var(--fg-mid)' }}>
                    {note.text}
                  </p>

                  <div className="mt-7 pt-6 flex items-center gap-3" style={{ borderTop: '1px solid var(--border)' }}>
                    {/* Avatar */}
                    <div
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: '#051A24',
                        border: `1.5px solid ${note.accent}30`,
                        boxShadow: `0 0 12px ${note.accent}20`,
                      }}
                    >
                      <span className="font-serif text-sm" style={{ color: note.accent }}>SS</span>
                    </div>

                    <div className="min-w-0">
                      <p className="font-medium text-sm leading-tight" style={{ color: 'var(--fg)' }}>
                        {note.topic}
                      </p>
                      <p className="text-[11px] font-mono mt-0.5 truncate" style={{ color: 'var(--fg-38)' }}>
                        → {note.tag}
                      </p>
                    </div>

                    <div className="ml-auto shrink-0">
                      <span
                        className="font-mono text-[9px] sm:text-[10px] px-2.5 py-1 rounded-full whitespace-nowrap"
                        style={{
                          background: `${note.accent}10`,
                          color: note.accent,
                          border: `1px solid ${note.accent}22`,
                        }}
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
