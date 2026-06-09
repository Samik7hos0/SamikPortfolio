import { motion } from 'framer-motion'

const STATS = [
  { label: 'Target Range', value: '12–14 LPA',  sub: 'annual'      },
  { label: 'Location',     value: 'Bangalore',   sub: 'preferred'   },
  { label: 'Role Type',    value: 'Full-time',   sub: 'on-site / hybrid' },
  { label: 'Notice',       value: 'Immediate',   sub: 'available now' },
]

function StatChip({ stat, delay }: { stat: typeof STATS[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
      className="rounded-2xl p-4 sm:p-5"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <p className="font-mono text-[9px] tracking-[0.15em] uppercase mb-2" style={{ color: 'rgba(224,235,240,0.3)' }}>
        {stat.label}
      </p>
      <p className="font-serif text-lg sm:text-xl font-semibold leading-tight mb-0.5" style={{ color: '#F6FCFF' }}>
        {stat.value}
      </p>
      <p className="font-mono text-[9px]" style={{ color: 'rgba(224,235,240,0.28)' }}>
        {stat.sub}
      </p>
    </motion.div>
  )
}

export default function LookingForSection() {
  return (
    <section className="w-full py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-8 sm:mb-10"
        >
          <div className="w-5 h-[1px]" style={{ background: 'var(--border-mid)' }} />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--fg-45)' }}>
            Opportunities
          </span>
        </motion.div>

        {/* Full-width dark card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[32px] sm:rounded-[40px] relative overflow-hidden"
          style={{
            background: '#051A24',
            border: '1px solid rgba(0,255,163,0.1)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.2)',
          }}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,163,0.5), rgba(0,170,255,0.3), transparent)' }}
          />

          {/* Background radial glow */}
          <div
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 50% 60% at 0% 0%, rgba(0,255,163,0.05), transparent 60%)' }}
          />

          {/* Background grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{
              backgroundImage: 'linear-gradient(rgba(0,255,163,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,163,1) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          <div className="relative z-10 p-8 sm:p-12 md:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-start">

              {/* Left: heading + description + CTAs */}
              <div>
                {/* Status badge */}
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-7"
                  style={{ background: 'rgba(0,255,163,0.1)', border: '1px solid rgba(0,255,163,0.25)' }}
                >
                  <span className="w-[7px] h-[7px] rounded-full bg-[#00ffa3] animate-pulse" />
                  <span className="font-mono text-[10px] tracking-[0.12em]" style={{ color: '#00ffa3' }}>
                    AVAILABLE NOW · BANGALORE
                  </span>
                </motion.div>

                {/* Big heading */}
                <div style={{ overflow: 'hidden' }}>
                  <motion.h2
                    initial={{ y: '100%' }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif leading-[1.0] tracking-tight mb-5"
                    style={{ fontSize: 'clamp(40px, 7vw, 80px)', color: '#F6FCFF' }}
                  >
                    Ready to{' '}
                    <span style={{ color: '#00ffa3', textShadow: '0 0 40px rgba(0,255,163,0.3)' }}>
                      ship.
                    </span>
                  </motion.h2>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="text-sm sm:text-base leading-relaxed mb-9 max-w-md"
                  style={{ color: 'rgba(224,235,240,0.55)' }}
                >
                  Junior Data Engineer or Associate DE. Two end-to-end pipelines shipped,
                  dbt Fundamentals certified, currently at Kinaxs.
                  Targeting fintech &amp; GCC teams in Bangalore.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.25 }}
                  className="flex flex-col xs:flex-row gap-3"
                >
                  <a
                    href="mailto:samik.r.gt@gmail.com"
                    className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
                    style={{ background: '#00ffa3', color: '#051A24', boxShadow: '0 0 24px rgba(0,255,163,0.25)' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    Get in touch
                  </a>
                  <a
                    href="#work"
                    className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all duration-200 hover:bg-white/5 active:scale-[0.97]"
                    style={{ border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(224,235,240,0.75)' }}
                  >
                    See my work →
                  </a>
                </motion.div>
              </div>

              {/* Right: 2×2 stat grid */}
              <div className="grid grid-cols-2 gap-3 lg:w-72">
                {STATS.map((stat, i) => (
                  <StatChip key={stat.label} stat={stat} delay={0.1 + i * 0.06} />
                ))}
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
