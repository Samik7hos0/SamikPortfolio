import { motion } from 'framer-motion'

const PRINCIPLES = [
  {
    label: 'Build first, read second',
    body: 'Every tool I list on this portfolio — Kafka, Spark, dbt, Airflow — I used in a working, Dockerised system before I called myself proficient. No tutorial trophies.',
    accent: '#00ffa3',
    icon: '01',
  },
  {
    label: 'Production standards from day one',
    body: 'Env-var secrets, git-filter-repo to purge leaked credentials, health checks on every service, idempotent DAGs. I build like the code will go to prod, because it should.',
    accent: '#0af',
    icon: '02',
  },
  {
    label: 'Data quality is the product',
    body: 'A pipeline that runs but delivers wrong numbers is worse than no pipeline. RAW → STAGING → MARTS in dbt exists because untested data destroys trust.',
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
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default function StatementSection() {
  return (
    <section className="py-20 px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-5 h-[1px]" style={{ background: 'var(--border-mid)' }} />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--fg-45)' }}>
            Philosophy
          </span>
        </motion.div>

        {/* Quote */}
        <div className="max-w-3xl mb-16">
          <div className="relative mb-4">
            <span
              className="absolute -top-6 -left-2 font-serif text-[80px] leading-none select-none pointer-events-none"
              style={{ color: 'var(--fg-08)' }}
            >
              "
            </span>
            <Reveal>
              <h2
                className="font-sans text-[26px] sm:text-[34px] md:text-[42px] lg:text-[48px] leading-[1.12] tracking-tight"
                style={{ color: 'var(--fg-mid)' }}
              >
                I learn by building systems that{' '}
                <span className="font-serif italic" style={{ color: 'var(--fg)' }}>actually run</span>
                {' '}— not by collecting tutorials.
              </h2>
            </Reveal>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="italic text-sm"
            style={{ color: 'var(--fg-38)' }}
          >
            — Samik Sengupta
          </motion.p>
        </div>

        {/* Principles grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.icon}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className="rounded-2xl p-6 relative overflow-hidden"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--card-border)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }}
              />
              <span
                className="font-mono text-[11px] font-semibold mb-4 block"
                style={{ color: p.accent }}
              >
                {p.icon}
              </span>
              <h3 className="font-medium text-base mb-3" style={{ color: 'var(--fg)' }}>
                {p.label}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-60)' }}>
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Recruiter callout — intentionally always dark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 rounded-2xl px-7 py-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8"
          style={{
            background: '#051A24',
            border: '1px solid rgba(0,255,163,0.12)',
          }}
        >
          <div className="flex items-center gap-3 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#00ffa3] animate-pulse" />
            <span className="font-mono text-[11px] tracking-widest" style={{ color: '#00ffa3' }}>
              FOR RECRUITERS
            </span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(224,235,240,0.65)' }}>
            Two end-to-end pipelines shipped and public on GitHub. dbt Fundamentals certified.
            Currently a Trainee DE at Kinaxs. Targeting a Junior / Associate Data Engineer role in
            Bangalore at <span style={{ color: '#F6FCFF' }}>12–14 LPA</span>.
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
