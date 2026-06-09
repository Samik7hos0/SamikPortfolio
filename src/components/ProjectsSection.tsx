import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface PipeNode { label: string; role: string; color: string }
interface Metric    { value: string; label: string }

interface Project {
  name:         string
  description:  string
  tag:          string
  accent:       string
  href:         string
  pipeline:     PipeNode[]
  metrics:      Metric[]
  type:         'batch' | 'streaming'
  terminalLog:  string[]
}

const PROJECTS: Project[] = [
  {
    name: 'market-pipeline',
    tag: 'Batch · ELT',
    accent: '#00ffa3',
    href: 'https://github.com/Samik7hos0/market-pipeline',
    type: 'batch',
    description:
      'Batch ELT pipeline ingesting financial market data into Snowflake. Airflow-orchestrated DAGs with dbt transformations across RAW, STAGING and MARTS layers.',
    pipeline: [
      { label: 'Alpha Vantage', role: 'Source API',  color: '#00ffa3' },
      { label: 'PostgreSQL',    role: 'Staging DB',  color: '#0af'    },
      { label: 'Airflow',       role: 'Orchestrate', color: '#ff8c42' },
      { label: 'dbt',           role: 'Transform',   color: '#ffaa44' },
      { label: 'Snowflake',     role: 'Warehouse',   color: '#29b5e8' },
    ],
    metrics: [
      { value: '4',   label: 'Airflow DAGs'    },
      { value: '3',   label: 'dbt layers'      },
      { value: 'ELT', label: 'Pattern'         },
    ],
    terminalLog: [
      "$ airflow dags trigger market_elt_dag",
      "> [INFO] extract_task: 250 rows from Alpha Vantage API",
      "> [INFO] dbt run → staging.stg_market_data complete",
      "> [INFO] dbt run → marts.fct_daily_ohlcv complete",
      "> [SUCCESS] Loaded to Snowflake ✓  duration=18.4s",
    ],
  },
  {
    name: 'streaming-pipeline',
    tag: 'Real-time · Streaming',
    accent: '#0af',
    href: 'https://github.com/Samik7hos0/streaming-pipeline',
    type: 'streaming',
    description:
      'Real-time stock-tick pipeline with 30-second micro-batch processing. Docker Compose orchestration, dual-listener Kafka, PySpark Structured Streaming to S3 and Snowflake.',
    pipeline: [
      { label: 'Alpha Vantage', role: 'Live Feed',   color: '#00ffa3' },
      { label: 'Kafka',         role: 'Message Bus', color: '#0af'    },
      { label: 'PySpark',       role: 'Streaming',   color: '#ff8c42' },
      { label: 'S3',            role: 'Data Lake',   color: '#ffaa44' },
      { label: 'Snowflake',     role: 'Warehouse',   color: '#29b5e8' },
    ],
    metrics: [
      { value: '30s', label: 'Micro-batch'  },
      { value: '4',   label: 'Live symbols' },
      { value: '2',   label: 'Output sinks' },
    ],
    terminalLog: [
      "$ spark-submit pyspark_streaming_job.py",
      "> [INFO] Kafka consumer connected  topic=stock_ticks",
      "> [INFO] Micro-batch window=30s  records=25  symbols=4",
      "> [INFO] Writing to S3: s3://market-data/streaming/2024-01-15/",
      "> [SUCCESS] Snowflake sink flushed ✓  latency=28.1s",
    ],
  },
]

function TerminalLog({ lines, accent }: { lines: string[]; accent: string }) {
  const [shown, setShown] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          lines.forEach((_, i) => setTimeout(() => setShown(i + 1), i * 380))
          obs.disconnect()
        }
      },
      { threshold: 0.6 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [lines])

  return (
    <div
      ref={ref}
      className="hidden sm:block border-t px-6 sm:px-8 py-4"
      style={{
        borderColor: 'rgba(255,255,255,0.05)',
        background: 'rgba(0,0,0,0.25)',
        minHeight: 96,
      }}
    >
      <div className="font-mono text-[10px] space-y-1">
        {lines.slice(0, shown).map((line, i) => (
          <div
            key={i}
            className="transition-colors duration-300"
            style={{ color: i === shown - 1 ? accent : 'rgba(224,235,240,0.28)' }}
          >
            {line}
          </div>
        ))}
        {shown < lines.length && shown > 0 && (
          <span className="terminal-cursor" style={{ background: accent }} />
        )}
      </div>
    </div>
  )
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ y: '105%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/* Mini pipeline diagram rendered inside each project card */
function MiniPipeline({ nodes, accent }: { nodes: PipeNode[]; accent: string }) {
  return (
    /* overflow-x-auto so 5 nodes scroll horizontally on mobile instead of wrapping mid-arrow */
    <div className="pipeline-scroll-wrap w-full overflow-x-auto scrollbar-none">
      <div className="flex items-center py-2 w-max mx-auto px-4 sm:px-10">
        {nodes.map((node, i) => (
          <div key={node.label} className="flex items-center">
            {/* Node */}
            <div
              className="relative flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 text-center"
              style={{
                minWidth: 76,
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${node.color}28`,
                backdropFilter: 'blur(8px)',
              }}
            >
              <div className="absolute top-0 left-2 right-2 h-[2px] rounded-full" style={{ background: node.color }} />
              <p className="font-serif text-[11px] font-semibold leading-tight mt-1 whitespace-nowrap" style={{ color: '#F6FCFF' }}>
                {node.label}
              </p>
              <p className="font-mono text-[8px] whitespace-nowrap" style={{ color: node.color }}>
                {node.role}
              </p>
            </div>

            {/* Edge arrow */}
            {i < nodes.length - 1 && (
              <div className="flex items-center mx-1.5 shrink-0">
                <div
                  className="w-5 h-[1px]"
                  style={{ background: `linear-gradient(90deg, ${node.color}50, ${nodes[i + 1].color}50)` }}
                />
                <div
                  style={{
                    borderLeft: `5px solid ${nodes[i + 1].color}60`,
                    borderTop: '3px solid transparent',
                    borderBottom: '3px solid transparent',
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function TiltCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null)

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 18
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -12
    card.style.transform = `perspective(1200px) rotateY(${x}deg) rotateX(${y}deg) scale3d(1.015,1.015,1.015)`
    card.style.boxShadow = `0 40px 100px rgba(0,0,0,0.25), ${project.accent}18 0 0 80px`
    const shine = card.querySelector<HTMLDivElement>('.card-shine')
    if (shine) {
      const px = ((e.clientX - rect.left) / rect.width)  * 100
      const py = ((e.clientY - rect.top)  / rect.height) * 100
      shine.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.05) 0%, transparent 65%)`
    }
  }

  const handleLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)'
    card.style.boxShadow = ''
    const shine = card.querySelector<HTMLDivElement>('.card-shine')
    if (shine) shine.style.background = 'none'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
    >
      {/* Text header above the card */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2.5 flex-wrap">
          <Reveal delay={0.04}>
            <h3 className="font-serif text-2xl md:text-3xl font-semibold" style={{ color: 'var(--fg)' }}>
              {project.name}
            </h3>
          </Reveal>
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.18 }}
            className="font-mono text-[10px] px-2.5 py-1 rounded-full"
            style={{ background: `${project.accent}14`, color: project.accent, border: `1px solid ${project.accent}28` }}
          >
            {project.tag}
          </motion.span>
          {/* Processing type badge */}
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.26 }}
            className="font-mono text-[9px] px-2 py-0.5 rounded"
            style={{ color: 'var(--fg-38)', border: '1px solid var(--border)' }}
          >
            {project.type === 'streaming' ? '⚡ Real-time' : '⏱ Batch'}
          </motion.span>
        </div>
        <Reveal delay={0.1}>
          <p className="text-sm md:text-base max-w-2xl leading-relaxed" style={{ color: 'var(--fg-60)' }}>
            {project.description}
          </p>
        </Reveal>
      </div>

      {/* 3D tilt card with architecture diagram */}
      <a
        ref={cardRef}
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="VIEW ↗"
        data-cursor-color="#0af"
        className="block w-full rounded-[24px] overflow-hidden group active:scale-[0.99]"
        style={{
          transition: 'transform 0.15s ease-out, box-shadow 0.35s',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <div
          className="relative flex flex-col overflow-hidden"
          style={{ background: '#040f17', minHeight: 260 }}
        >
          {/* Shine layer */}
          <div className="card-shine absolute inset-0 pointer-events-none z-20" />

          {/* Background accent glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${project.accent}0d 0%, transparent 60%)`,
            }}
          />

          {/* Dot grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{ background: `linear-gradient(90deg, transparent, ${project.accent}70, transparent)` }}
          />

          {/* ── Card header bar ── */}
          <div
            className="relative z-10 flex items-center justify-between px-6 sm:px-8 py-4 border-b"
            style={{ borderColor: 'rgba(255,255,255,0.05)' }}
          >
            <div className="flex items-center gap-3">
              {/* Traffic-light dots */}
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: project.accent, boxShadow: `0 0 8px ${project.accent}` }} />
              </div>
              <span className="font-mono text-[10px]" style={{ color: 'rgba(224,235,240,0.35)' }}>
                architecture.yml
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: '#00ffa3', boxShadow: '0 0 5px #00ffa3' }}
              />
              <span className="font-mono text-[9px]" style={{ color: 'rgba(224,235,240,0.3)' }}>
                running
              </span>
            </div>
          </div>

          {/* ── Pipeline diagram ── */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center py-8 sm:py-10">
            <MiniPipeline nodes={project.pipeline} accent={project.accent} />
          </div>

          {/* ── Terminal log ── */}
          <TerminalLog lines={project.terminalLog} accent={project.accent} />

          {/* ── Metrics strip ── */}
          <div
            className="relative z-10 flex items-center justify-center gap-0 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}
          >
            {project.metrics.map((m, i) => (
              <div key={m.label} className="flex items-center">
                {i > 0 && <div className="h-8 w-[1px]" style={{ background: 'rgba(255,255,255,0.06)' }} />}
                <div className="flex flex-col items-center px-6 sm:px-10 py-3">
                  <span className="font-mono text-sm sm:text-base font-semibold" style={{ color: project.accent }}>
                    {m.value}
                  </span>
                  <span className="font-mono text-[8px] sm:text-[9px] tracking-wide mt-0.5" style={{ color: 'rgba(224,235,240,0.3)' }}>
                    {m.label.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
            <div className="ml-auto px-6 py-3 flex items-center gap-1.5">
              <span className="font-mono text-[10px] group-hover:text-white transition-colors duration-200" style={{ color: 'rgba(224,235,240,0.3)' }}>
                view repo
              </span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'rgba(224,235,240,0.3)' }}>
                <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
              </svg>
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  )
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-20">
      <div className="mb-14">
        <div style={{ overflow: 'hidden' }}>
          <motion.div
            initial={{ y: '105%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4"
          >
            <div className="w-8 h-[1px]" style={{ background: 'var(--border-mid)' }} />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--fg-45)' }}>
              Selected Work
            </span>
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col gap-20 sm:gap-28">
        {PROJECTS.map((p, i) => (
          <TiltCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
