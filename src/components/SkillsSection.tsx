import { motion } from 'framer-motion'

const LAYERS = [
  {
    id: 'ingest',
    layer: '01 · Ingest',
    label: 'Data Ingestion',
    color: '#00ffa3',
    description: 'Pull from external APIs and message queues into the pipeline.',
    skills: [
      { name: 'Apache Kafka',     note: 'dual-listener · Docker', level: 4 },
      { name: 'Alpha Vantage API',note: 'financial data source',  level: 4 },
      { name: 'Python',           note: 'primary language',       level: 5 },
    ],
  },
  {
    id: 'process',
    layer: '02 · Process',
    label: 'Stream Processing',
    color: '#ff8c42',
    description: 'Transform raw events in real-time or micro-batch windows.',
    skills: [
      { name: 'PySpark',  note: 'Structured Streaming', level: 4 },
      { name: 'Apache Spark', note: 'foreachBatch · S3', level: 4 },
      { name: 'pandas',   note: 'batch transforms',     level: 4 },
      { name: 'SQL',      note: 'complex queries',       level: 5 },
    ],
  },
  {
    id: 'orchestrate',
    layer: '03 · Orchestrate',
    label: 'Orchestration',
    color: '#ffaa44',
    description: 'Schedule, monitor and retry pipeline runs reliably.',
    skills: [
      { name: 'Apache Airflow', note: '4 production DAGs',    level: 4 },
      { name: 'dbt',            note: 'Certified · RAW→MARTS', level: 4 },
    ],
  },
  {
    id: 'store',
    layer: '04 · Store',
    label: 'Storage & Warehouse',
    color: '#29b5e8',
    description: 'Land clean, modelled data where it can be queried at scale.',
    skills: [
      { name: 'Snowflake',  note: 'warehouse layer', level: 4 },
      { name: 'PostgreSQL', note: 'staging & ops',   level: 4 },
      { name: 'AWS S3',     note: 'data lake sink',  level: 3 },
    ],
  },
  {
    id: 'infra',
    layer: '05 · Infra',
    label: 'Infrastructure',
    color: '#a78bfa',
    description: 'Package and ship reproducible environments.',
    skills: [
      { name: 'Docker', note: 'Compose · multi-svc', level: 4 },
      { name: 'git',    note: 'version control',     level: 4 },
    ],
  },
]

const LEVEL_LABELS = ['', 'Familiar', 'Learning', 'Comfortable', 'Proficient', 'Expert']

function LevelBar({ level, color }: { level: number; color: string }) {
  return (
    <div className="flex gap-[5px] items-center">
      {Array.from({ length: 5 }, (_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.08 + i * 0.065, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-full origin-left"
          style={{
            width: 14,
            height: 3,
            background: i < level ? color : 'var(--fg-08)',
            boxShadow: i < level ? `0 0 5px ${color}70` : 'none',
          }}
        />
      ))}
      <span className="font-mono text-[9px] ml-1" style={{ color: 'var(--fg-35)' }}>
        {LEVEL_LABELS[level]}
      </span>
    </div>
  )
}

export default function SkillsSection() {
  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6" style={{ background: 'var(--bg-surface)' }}>
      <div className="max-w-[1200px] mx-auto">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-3"
        >
          <div className="w-5 h-[1px]" style={{ background: 'var(--border-mid)' }} />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--fg-45)' }}>
            Stack · by pipeline layer
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-[26px] md:text-[36px] leading-[1.15] tracking-tight mb-12"
          style={{ color: 'var(--fg)' }}
        >
          Every layer of the{' '}
          <span className="font-serif italic">data pipeline.</span>
        </motion.h2>

        {/* Stack layers */}
        <div className="space-y-3">
          {LAYERS.map((layer, li) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: li * 0.07 }}
              className="group rounded-2xl overflow-hidden"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--card-border)',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
            >
              {/* Layer header */}
              <div
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 px-5 sm:px-6 py-4"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                <div className="flex items-center gap-3 shrink-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: li * 0.07 + 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: layer.color, boxShadow: `0 0 8px ${layer.color}` }}
                  />
                  <span
                    className="font-mono text-[10px] font-semibold tracking-widest"
                    style={{ color: layer.color }}
                  >
                    {layer.layer}
                  </span>
                </div>

                <div className="hidden sm:block h-4 w-[1px]" style={{ background: 'var(--border-mid)' }} />

                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 min-w-0">
                  <span className="font-medium text-sm" style={{ color: 'var(--fg)' }}>
                    {layer.label}
                  </span>
                  <span className="font-mono text-[10px] hidden sm:block" style={{ color: 'var(--fg-35)' }}>·</span>
                  <span className="text-xs" style={{ color: 'var(--fg-45)' }}>
                    {layer.description}
                  </span>
                </div>
              </div>

              {/* Skills grid — gap+background creates borders without divide-x artifacts */}
              <div
                className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                style={{ gap: '1px', background: 'var(--border)' }}
              >
                {layer.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="relative flex flex-col gap-2.5 px-4 sm:px-5 py-4 overflow-hidden group/skill"
                    style={{ background: 'var(--card)' }}
                  >
                    {/* Hover accent top line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[1.5px] opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(90deg, ${layer.color}60, transparent)` }}
                    />

                    <span className="font-medium text-[13px] sm:text-sm leading-tight" style={{ color: 'var(--fg)' }}>
                      {skill.name}
                    </span>
                    <LevelBar level={skill.level} color={layer.color} />
                    {skill.note && (
                      <p className="font-mono text-[9px] leading-snug" style={{ color: 'var(--fg-38)' }}>
                        {skill.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Flow footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 flex items-center gap-3 overflow-hidden"
        >
          <div className="h-[1px] flex-1" style={{ background: 'var(--border)' }} />
          <span className="font-mono text-[9px] tracking-widest whitespace-nowrap" style={{ color: 'var(--fg-30)' }}>
            SOURCE → INGEST → PROCESS → TRANSFORM → STORE
          </span>
          <div className="h-[1px] flex-1" style={{ background: 'var(--border)' }} />
        </motion.div>

      </div>
    </section>
  )
}
