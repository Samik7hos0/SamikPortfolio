import { motion } from 'framer-motion'

interface Skill { name: string; level: number; note?: string }
interface Category { label: string; color: string; skills: Skill[] }

const CATEGORIES: Category[] = [
  {
    label: 'Ingestion & Streaming',
    color: '#0af',
    skills: [
      { name: 'Apache Kafka', level: 4, note: 'dual-listener, Docker' },
      { name: 'Alpha Vantage API', level: 4 },
      { name: 'Python', level: 5, note: 'primary language' },
    ],
  },
  {
    label: 'Processing',
    color: '#00ffa3',
    skills: [
      { name: 'PySpark', level: 4, note: 'Structured Streaming' },
      { name: 'Apache Spark', level: 4, note: 'foreachBatch' },
      { name: 'pandas', level: 4 },
      { name: 'SQL', level: 5, note: 'complex queries' },
    ],
  },
  {
    label: 'Orchestration & Transform',
    color: '#ffaa44',
    skills: [
      { name: 'Apache Airflow', level: 4, note: '4 production DAGs' },
      { name: 'dbt', level: 4, note: 'Certified · RAW→MARTS' },
    ],
  },
  {
    label: 'Storage & Cloud',
    color: '#00ffa3',
    skills: [
      { name: 'Snowflake', level: 4, note: 'warehouse layer' },
      { name: 'PostgreSQL', level: 4 },
      { name: 'AWS S3', level: 3, note: 'sink from Spark' },
    ],
  },
  {
    label: 'Infrastructure',
    color: '#0af',
    skills: [
      { name: 'Docker', level: 4, note: 'Compose, multi-service' },
      { name: 'git', level: 4 },
    ],
  },
]

const LEVEL_LABELS = ['', 'Familiar', 'Learning', 'Comfortable', 'Proficient', 'Expert']

function SkillCard({ skill, color, delay }: { skill: Skill; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
      className="group rounded-xl p-4 relative overflow-hidden"
      style={{
        background: '#fff',
        border: '1px solid rgba(5,26,36,0.06)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.borderColor = `${color}30`
        el.style.boxShadow = `0 4px 24px rgba(0,0,0,0.08), 0 0 0 1px ${color}20`
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.borderColor = 'rgba(5,26,36,0.06)'
        el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="font-medium text-sm" style={{ color: '#051A24' }}>{skill.name}</span>
        <span className="font-mono text-[9px] shrink-0 mt-0.5" style={{ color: 'rgba(5,26,36,0.35)' }}>
          {LEVEL_LABELS[skill.level]}
        </span>
      </div>

      {/* Level dots */}
      <div className="flex gap-1 mb-2">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: 20,
              height: 4,
              background: i < skill.level ? color : 'rgba(5,26,36,0.08)',
              boxShadow: i < skill.level ? `0 0 6px ${color}60` : 'none',
            }}
          />
        ))}
      </div>

      {skill.note && (
        <p className="font-mono text-[10px] mt-1" style={{ color: 'rgba(5,26,36,0.38)' }}>
          {skill.note}
        </p>
      )}
    </motion.div>
  )
}

export default function SkillsSection() {
  return (
    <section className="py-16 px-6" style={{ background: '#F6FCFF' }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-3"
        >
          <div className="w-5 h-[1px] bg-[#051A24]/30" />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(5,26,36,0.45)' }}>
            Tech Stack
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-[28px] md:text-[36px] leading-[1.15] tracking-tight mb-12"
          style={{ color: '#051A24' }}
        >
          Everything I use to{' '}
          <span className="font-serif">ship pipelines.</span>
        </motion.h2>

        <div className="space-y-10">
          {CATEGORIES.map((cat, ci) => (
            <div key={cat.label}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="flex items-center gap-2 mb-4"
              >
                <div className="w-2 h-2 rounded-full" style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}` }} />
                <span className="font-mono text-xs font-medium" style={{ color: 'rgba(5,26,36,0.6)' }}>
                  {cat.label}
                </span>
              </motion.div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {cat.skills.map((skill, si) => (
                  <SkillCard key={skill.name} skill={skill} color={cat.color} delay={si * 0.05} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex items-center gap-6 flex-wrap"
        >
          <span className="font-mono text-[10px]" style={{ color: 'rgba(5,26,36,0.35)' }}>Proficiency:</span>
          {[1, 2, 3, 4, 5].map((l) => (
            <div key={l} className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="w-3 h-1.5 rounded-full" style={{ background: i < l ? '#051A24' : 'rgba(5,26,36,0.12)' }} />
                ))}
              </div>
              <span className="font-mono text-[10px]" style={{ color: 'rgba(5,26,36,0.4)' }}>{LEVEL_LABELS[l]}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
