import { motion } from 'framer-motion'

const PRINCIPLES = [
  {
    label: 'Build first, read second',
    body: 'Every tool I list — Kafka, Spark, dbt, Airflow — I used in a working, Dockerised system before I called myself proficient. No tutorial trophies.',
    accent: '#00ffa3',
    icon: '01',
  },
  {
    label: 'Production standards from day one',
    body: 'Env-var secrets, git-filter-repo to purge leaked credentials, health checks on every service, idempotent DAGs. I build like the code will go to prod.',
    accent: '#0af',
    icon: '02',
  },
  {
    label: 'Data quality is the product',
    body: 'A pipeline that runs but delivers wrong numbers is worse than no pipeline. RAW → STAGING → MARTS exists because untested data destroys trust.',
    accent: '#ffaa44',
    icon: '03',
  },
]

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ y: '105%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default function StatementSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 overflow-hidden" style={{ background: 'var(--bg-surface)' }}>
      <div className="max-w-[1200px] mx-auto">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-14 sm:mb-16"
        >
          <div className="w-5 h-[1px]" style={{ background: 'var(--border-mid)' }} />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--fg-45)' }}>
            Philosophy
          </span>
        </motion.div>

        {/* Quote block */}
        <div className="max-w-4xl mb-14 sm:mb-20">
          {/* Giant quote mark */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif leading-none select-none mb-0 -ml-1"
            style={{
              fontSize: 'clamp(80px, 14vw, 160px)',
              color: 'var(--fg-08)',
              lineHeight: 0.75,
            }}
          >
            "
          </motion.div>

          <div className="mt-4 sm:mt-6">
            <Reveal>
              <h2
                className="font-sans leading-[1.08] tracking-tight"
                style={{
                  fontSize: 'clamp(26px, 5vw, 68px)',
                  color: 'var(--fg)',
                }}
              >
                I learn by building systems that{' '}
                <span className="font-serif italic" style={{ color: '#00ffa3', textShadow: '0 0 40px rgba(0,255,163,0.2)' }}>
                  actually run
                </span>
                {' '}—{' '}
                <span style={{ color: 'var(--fg-60)' }}>
                  not by collecting tutorials.
                </span>
              </h2>
            </Reveal>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-3 mt-6 sm:mt-8"
          >
            <div className="w-8 h-[1px]" style={{ background: 'rgba(0,255,163,0.3)' }} />
            <span className="font-mono text-xs sm:text-sm italic" style={{ color: 'var(--fg-38)' }}>
              Samik Sengupta
            </span>
          </motion.div>
        </div>

        {/* Principles grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 mb-8 sm:mb-10">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.icon}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className="group rounded-2xl p-6 sm:p-7 relative overflow-hidden transition-shadow duration-300"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--card-border)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, ${p.accent}, transparent 60%)` }}
              />

              {/* Ambient glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 0% 0%, ${p.accent}06, transparent 60%)` }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="font-mono text-[11px] font-semibold"
                    style={{ color: p.accent }}
                  >
                    {p.icon}
                  </span>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity duration-300"
                    style={{ background: `${p.accent}15`, border: `1px solid ${p.accent}30` }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.accent }} />
                  </div>
                </div>

                <h3 className="font-medium text-[15px] leading-snug mb-3" style={{ color: 'var(--fg)' }}>
                  {p.label}
                </h3>
                <p className="text-[13px] sm:text-sm leading-relaxed" style={{ color: 'var(--fg-60)' }}>
                  {p.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recruiter callout — always dark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-2xl px-6 sm:px-8 py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 relative overflow-hidden"
          style={{
            background: '#051A24',
            border: '1px solid rgba(0,255,163,0.12)',
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,163,0.4), transparent)' }}
          />
          <div className="flex items-center gap-3 shrink-0">
            <span className="w-[7px] h-[7px] rounded-full bg-[#00ffa3] animate-pulse" />
            <span className="font-mono text-[10px] tracking-widest" style={{ color: '#00ffa3' }}>
              FOR RECRUITERS
            </span>
          </div>
          <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(224,235,240,0.65)' }}>
            Two end-to-end pipelines shipped and public on GitHub. dbt Fundamentals certified.
            Currently a Trainee DE at Kinaxs. Targeting a Junior / Associate Data Engineer role in
            Bangalore at{' '}
            <span style={{ color: '#F6FCFF' }}>12–14 LPA</span>.
          </p>
          <a
            href="#contact"
            className="shrink-0 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-xs font-semibold transition-all duration-200 hover:brightness-110 active:scale-95 whitespace-nowrap"
            style={{ background: '#00ffa3', color: '#051A24' }}
          >
            Get in touch →
          </a>
        </motion.div>

      </div>
    </section>
  )
}
