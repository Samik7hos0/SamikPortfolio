import { motion } from 'framer-motion'

const TIMELINE = [
  {
    id: '00',
    phase: 'The Start',
    desc: 'Decided to pivot hard into data engineering. Picked up Python from scratch — no bootcamp, no shortcuts.',
    tag: 'Origin',
    color: '#00ffa3',
  },
  {
    id: '01',
    phase: 'First System Shipped',
    desc: 'Built market-pipeline end-to-end: Alpha Vantage → PostgreSQL → Airflow DAGs → dbt → Snowflake. Batch ELT in production-grade Docker.',
    tag: 'market-pipeline',
    color: '#00ffa3',
  },
  {
    id: '02',
    phase: 'Levelled Up',
    desc: 'Tackled real-time. Kafka dual-listener config, PySpark Structured Streaming, 30-second micro-batches verified across 4 live symbols.',
    tag: 'streaming-pipeline',
    color: '#0af',
  },
  {
    id: '03',
    phase: 'Industry',
    desc: 'Joined Kinaxs as Trainee Data Engineer. Taking on real data tasks with production-grade standards.',
    tag: 'Kinaxs · Current',
    color: '#ffaa44',
  },
  {
    id: '04',
    phase: 'Certified',
    desc: 'Earned dbt Fundamentals certification — built the exact model layer it taught while taking the course. RAW → STAGING → MARTS on real financial data.',
    tag: 'dbt Fundamentals',
    color: '#00ffa3',
  },
  {
    id: '05',
    phase: 'Open to Opportunities',
    desc: 'Targeting fintech and GCC teams in Bangalore. Two shipped pipelines, one prod cert, real infra experience. Ready to contribute from day one.',
    tag: '12–14 LPA · Bangalore',
    color: '#ffaa44',
  },
]

const CERTS = [
  { name: 'dbt Fundamentals', issuer: 'dbt Labs', color: '#ff6b35', icon: 'dbt' },
]

function TimelineItem({ item, index, isLast }: { item: typeof TIMELINE[0]; index: number; isLast: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
      className="relative group"
    >
      {/* Left column: ID + line */}
      <div className="absolute left-0 top-0 bottom-0 flex flex-col items-center" style={{ width: 32 }}>
        {/* Numbered node */}
        <div
          className="relative w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `${item.color}14`,
            border: `1.5px solid ${item.color}40`,
            boxShadow: `0 0 12px ${item.color}20`,
          }}
        >
          <span
            className="font-mono text-[9px] font-semibold leading-none"
            style={{ color: item.color }}
          >
            {item.id}
          </span>
        </div>
        {/* Connector line */}
        {!isLast && (
          <div
            className="flex-1 w-[1px] mt-1"
            style={{ background: `linear-gradient(180deg, ${item.color}20, var(--border))` }}
          />
        )}
      </div>

      {/* Content */}
      <div className="pl-10 pb-7">
        <div className="flex items-start gap-2 mb-1.5 flex-wrap">
          <span className="font-medium text-[15px] leading-snug" style={{ color: 'var(--fg)' }}>
            {item.phase}
          </span>
          <span
            className="font-mono text-[9px] px-2 py-0.5 rounded-full leading-tight shrink-0 mt-0.5"
            style={{
              background: `${item.color}10`,
              color: item.color,
              border: `1px solid ${item.color}20`,
            }}
          >
            {item.tag}
          </span>
        </div>
        <p className="text-[13px] sm:text-sm leading-relaxed" style={{ color: 'var(--fg-60)' }}>
          {item.desc}
        </p>
      </div>
    </motion.div>
  )
}

export default function AboutSection() {
  return (
    <section id="about" className="py-14 sm:py-20 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-14 sm:mb-16"
        >
          <div className="w-5 h-[1px]" style={{ background: 'var(--border-mid)' }} />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--fg-45)' }}>
            Journey
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24">

          {/* Left: narrative */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-[28px] sm:text-[36px] md:text-[42px] leading-[1.1] tracking-tight mb-6"
              style={{ color: 'var(--fg)' }}
            >
              From zero to{' '}
              <span className="font-serif italic">two shipped systems.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-4 text-sm md:text-[15px] leading-relaxed mb-8"
              style={{ color: 'var(--fg-60)' }}
            >
              <p>
                I didn't go through a bootcamp or a structured course path. I decided I wanted to
                be a data engineer and went all-in — Python, then the full modern DE stack,
                then two production-grade systems built from scratch in Docker.
              </p>
              <p>
                Everything I know I built. The pipelines run. The data flows. The certs came from
                doing the work, not just watching it.
              </p>
              <p>
                Now at Kinaxs as a Trainee Data Engineer, taking on real data tasks and continuing to ship.
              </p>
            </motion.div>

            {/* Currently card — always dark */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="rounded-2xl p-5 relative overflow-hidden mb-6"
              style={{
                background: '#051A24',
                border: '1px solid rgba(0,255,163,0.14)',
                boxShadow: '0 0 0 1px rgba(0,255,163,0.04)',
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,163,0.4), transparent)' }}
              />
              <div className="flex items-center gap-2 mb-3">
                <span className="w-[7px] h-[7px] rounded-full bg-[#00ffa3] animate-pulse" />
                <span className="font-mono text-[10px] tracking-widest" style={{ color: '#00ffa3' }}>
                  CURRENTLY
                </span>
              </div>
              <p className="text-sm font-medium mb-1" style={{ color: '#F6FCFF' }}>
                Trainee Data Engineer @ Kinaxs
              </p>
              <p className="font-mono text-[11px]" style={{ color: 'rgba(224,235,240,0.38)' }}>
                Targeting Bangalore · 12–14 LPA
              </p>
            </motion.div>

            {/* Certs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase mb-3" style={{ color: 'var(--fg-38)' }}>
                Certifications
              </p>
              <div className="flex flex-wrap gap-3">
                {CERTS.map((cert) => (
                  <div
                    key={cert.name}
                    className="flex items-center gap-2.5 rounded-xl px-4 py-2.5"
                    style={{
                      background: 'var(--card)',
                      border: '1px solid var(--card-border)',
                      boxShadow: 'var(--card-shadow)',
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{ background: cert.color, color: '#fff' }}
                    >
                      {cert.icon}
                    </div>
                    <div>
                      <p className="text-xs font-medium" style={{ color: 'var(--fg)' }}>{cert.name}</p>
                      <p className="font-mono text-[10px]" style={{ color: 'var(--fg-38)' }}>{cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: timeline */}
          <div className="mt-2 lg:mt-14">
            <p className="font-mono text-[9px] tracking-[0.22em] uppercase mb-6 sm:mb-8" style={{ color: 'var(--fg-30)' }}>
              Pipeline · Build Log
            </p>
            {TIMELINE.map((item, i) => (
              <TimelineItem key={item.id} item={item} index={i} isLast={i === TIMELINE.length - 1} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
