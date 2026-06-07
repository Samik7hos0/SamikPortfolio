import { useRef } from 'react'
import { motion } from 'framer-motion'

interface Project {
  name: string
  description: string
  arch: string[]
  accent: string
  href: string
  tag: string
  detail: string
}

const PROJECTS: Project[] = [
  {
    name: 'market-pipeline',
    description: 'Batch ELT pipeline ingesting financial market data into Snowflake. Airflow-orchestrated DAGs with dbt transformations across RAW, STAGING and MARTS layers.',
    arch: ['Alpha Vantage', 'PostgreSQL', 'Airflow', 'dbt', 'Snowflake'],
    accent: '#00ffa3',
    href: 'https://github.com/Samik7hos0/market-pipeline',
    tag: 'Batch · ELT',
    detail: 'Batch · Orchestration · Warehouse',
  },
  {
    name: 'streaming-pipeline',
    description: 'Real-time stock-tick pipeline with 30-second micro-batch processing. Docker Compose orchestration, dual-listener Kafka, PySpark Structured Streaming to S3 and Snowflake.',
    arch: ['Alpha Vantage', 'Kafka', 'Spark', 'S3', 'Snowflake'],
    accent: '#0af',
    href: 'https://github.com/Samik7hos0/streaming-pipeline',
    tag: 'Streaming · Real-time',
    detail: 'Kafka · Spark · Micro-batch',
  },
]

// Reusable masked text reveal
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

function TiltCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null)

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 22
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -15
    card.style.transform = `perspective(1200px) rotateY(${x}deg) rotateX(${y}deg) scale3d(1.02,1.02,1.02)`
    card.style.boxShadow = `0 40px 100px rgba(0,0,0,0.25), ${project.accent}20 0 0 80px`
    // Shine follow
    const shine = card.querySelector<HTMLDivElement>('.card-shine')
    if (shine) {
      const px = ((e.clientX - rect.left) / rect.width)  * 100
      const py = ((e.clientY - rect.top)  / rect.height) * 100
      shine.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.06) 0%, transparent 65%)`
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
    >
      {/* Header */}
      <div className="ml-0 md:ml-28 mb-5">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <Reveal delay={0.05}>
            <h3 className="font-serif text-2xl md:text-3xl font-semibold" style={{ color: '#051A24' }}>
              {project.name}
            </h3>
          </Reveal>
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-mono text-[10px] px-2.5 py-1 rounded-full"
            style={{ background: `${project.accent}14`, color: project.accent, border: `1px solid ${project.accent}28` }}
          >
            {project.tag}
          </motion.span>
        </div>
        <Reveal delay={0.1}>
          <p className="text-sm md:text-base max-w-xl leading-relaxed" style={{ color: 'rgba(5,26,36,0.6)' }}>
            {project.description}
          </p>
        </Reveal>
      </div>

      {/* 3D tilt card */}
      <a
        ref={cardRef}
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full rounded-[28px] overflow-hidden"
        style={{
          transition: 'transform 0.15s ease-out, box-shadow 0.4s',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <div className="relative bg-[#051A24] h-[260px] md:h-[420px] flex flex-col items-center justify-center gap-5 overflow-hidden">
          {/* Shine layer */}
          <div className="card-shine absolute inset-0 pointer-events-none z-20" />

          {/* Animated gradient */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 30%, ${project.accent}1a 0%, transparent 55%),
                                radial-gradient(circle at 75% 70%, ${project.accent}0a 0%, transparent 50%)`,
            }}
          />

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.028]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1px]"
            style={{ background: `linear-gradient(90deg, transparent, ${project.accent}80, transparent)` }} />

          {/* Corner dot */}
          <div className="absolute top-5 right-5 w-2 h-2 rounded-full"
            style={{ background: project.accent, boxShadow: `0 0 12px ${project.accent}` }} />

          {/* Name badge */}
          <span
            className="font-mono text-[11px] tracking-widest relative z-10 px-3 py-1 rounded-full"
            style={{ color: project.accent, background: `${project.accent}10`, border: `1px solid ${project.accent}22` }}
          >
            {project.name}
          </span>

          {/* Architecture flow */}
          <div className="flex items-center gap-2 flex-wrap justify-center px-10 relative z-10 max-w-2xl">
            {project.arch.map((node, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="font-mono text-[11px] md:text-xs px-3 py-1.5 rounded-lg"
                  style={{
                    color: '#E0EBF0', border: '1px solid rgba(255,255,255,0.09)',
                    background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(4px)',
                  }}
                >
                  {node}
                </span>
                {i < project.arch.length - 1 && (
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                    style={{ color: project.accent, opacity: 0.7, fontSize: 13 }}
                  >
                    →
                  </motion.span>
                )}
              </div>
            ))}
          </div>

          {/* Detail tag */}
          <span className="font-mono text-[11px] relative z-10" style={{ color: 'rgba(224,235,240,0.3)' }}>
            {project.detail}
          </span>

          <span className="font-mono text-[11px] relative z-10" style={{ color: 'rgba(224,235,240,0.35)' }}>
            view repository ↗
          </span>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-20"
            style={{ background: 'linear-gradient(to top, rgba(5,26,36,0.5), transparent)' }} />
        </div>
      </a>
    </motion.div>
  )
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="max-w-[1200px] mx-auto px-6 py-16">
      <div className="mb-14">
        <div style={{ overflow: 'hidden' }}>
          <motion.div
            initial={{ y: '105%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4"
          >
            <div className="w-8 h-[1px] bg-[#051A24]/30" />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(5,26,36,0.45)' }}>
              Selected Work
            </span>
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col gap-24">
        {PROJECTS.map((p, i) => (
          <TiltCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
