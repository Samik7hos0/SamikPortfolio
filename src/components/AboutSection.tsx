import { motion } from 'framer-motion'

const TIMELINE = [
  {
    phase: 'The Start',
    desc: 'Decided to pivot hard into data engineering. Picked up Python from scratch — no bootcamp, no shortcuts.',
    tag: 'Origin',
    color: '#00ffa3',
  },
  {
    phase: 'First System Shipped',
    desc: 'Built market-pipeline end-to-end: Alpha Vantage → PostgreSQL → Airflow DAGs → dbt → Snowflake. Batch ELT in production-grade Docker.',
    tag: 'market-pipeline',
    color: '#00ffa3',
  },
  {
    phase: 'Levelled Up',
    desc: 'Tackled real-time. Kafka dual-listener config, PySpark Structured Streaming, 30-second micro-batches verified across 4 live symbols.',
    tag: 'streaming-pipeline',
    color: '#0af',
  },
  {
    phase: 'Industry',
    desc: 'Joined Kinaxs as Trainee Data Engineer. Taking on real data tasks with production-grade standards.',
    tag: 'Kinaxs · Current',
    color: '#ffaa44',
  },
  {
    phase: 'Certified',
    desc: 'Earned dbt Fundamentals certification — built the exact model layer it taught while taking the course. RAW → STAGING → MARTS on real financial data.',
    tag: 'dbt Fundamentals',
    color: '#00ffa3',
  },
  {
    phase: 'Open to Junior DE Roles',
    desc: 'Targeting fintech and GCC teams in Bangalore. Two shipped pipelines, one prod cert, real infra experience. Ready to contribute from day one.',
    tag: 'Bangalore · 12–14 LPA',
    color: '#ffaa44',
  },
]

const CERTS = [
  { name: 'dbt Fundamentals', issuer: 'dbt Labs', color: '#ff6b35', icon: 'dbt' },
]

function TimelineItem({ item, index }: { item: typeof TIMELINE[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      className="relative pl-8"
    >
      {/* Left line + dot */}
      <div className="absolute left-0 top-0 bottom-0 flex flex-col items-center">
        <div
          className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
          style={{ background: item.color, boxShadow: `0 0 10px ${item.color}80` }}
        />
        {index < TIMELINE.length - 1 && (
          <div className="flex-1 w-[1px] mt-1" style={{ background: 'rgba(5,26,36,0.12)' }} />
        )}
      </div>

      <div className="pb-8">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="font-medium text-base" style={{ color: '#051A24' }}>{item.phase}</span>
          <span
            className="font-mono text-[10px] px-2 py-0.5 rounded-full"
            style={{ background: `${item.color}12`, color: item.color, border: `1px solid ${item.color}25` }}
          >
            {item.tag}
          </span>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(5,26,36,0.6)' }}>
          {item.desc}
        </p>
      </div>
    </motion.div>
  )
}

export default function AboutSection() {
  return (
    <section id="about-story" className="py-16 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-5 h-[1px] bg-[#051A24]/30" />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(5,26,36,0.45)' }}>
            Journey
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: narrative */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-[28px] md:text-[36px] lg:text-[40px] leading-[1.15] tracking-tight mb-6"
              style={{ color: '#051A24' }}
            >
              From zero to{' '}
              <span className="font-serif">two shipped systems.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-4 text-sm md:text-base leading-relaxed"
              style={{ color: 'rgba(5,26,36,0.65)' }}
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

            {/* Current status card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-8 rounded-2xl p-5"
              style={{
                background: '#051A24',
                border: '1px solid rgba(0,255,163,0.15)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#00ffa3] animate-pulse" />
                <span className="font-mono text-[11px] tracking-widest" style={{ color: '#00ffa3' }}>
                  CURRENTLY
                </span>
              </div>
              <p className="text-sm font-medium mb-1" style={{ color: '#F6FCFF' }}>
                Trainee Data Engineer @ Kinaxs
              </p>
              <p className="font-mono text-xs" style={{ color: 'rgba(224,235,240,0.4)' }}>
                Dharmanagar → targeting Bangalore
              </p>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-6"
            >
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase mb-3" style={{ color: 'rgba(5,26,36,0.4)' }}>
                Certifications
              </p>
              <div className="flex flex-wrap gap-3">
                {CERTS.map((cert) => (
                  <div
                    key={cert.name}
                    className="flex items-center gap-2.5 rounded-xl px-4 py-2.5"
                    style={{
                      background: '#fff',
                      border: '1px solid rgba(5,26,36,0.08)',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{ background: cert.color, color: '#fff' }}
                    >
                      {cert.icon}
                    </div>
                    <div>
                      <p className="text-xs font-medium" style={{ color: '#051A24' }}>{cert.name}</p>
                      <p className="font-mono text-[10px]" style={{ color: 'rgba(5,26,36,0.4)' }}>{cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: timeline */}
          <div className="mt-4 lg:mt-12">
            {TIMELINE.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
