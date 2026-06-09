import { motion } from 'framer-motion'

const EMAIL = 'samik.r.gt@gmail.com'

const NAV_LINKS = [
  { href: '#about',   label: 'About' },
  { href: '#work',    label: 'Work' },
  { href: '#notes',   label: 'Build Notes' },
  { href: '#contact', label: 'Contact' },
]

const SOCIAL_LINKS = [
  { href: 'https://github.com/Samik7hos0',               label: 'GitHub',   arrow: true },
  { href: 'https://www.linkedin.com/in/samik-sengupta',  label: 'LinkedIn', arrow: true },
  { href: `mailto:${EMAIL}`,                             label: 'Email',    arrow: false },
  { href: '/resume/Samik_Sengupta_Data_Engineer_Resume.pdf', label: 'Resume', arrow: true },
]

const STATS = [
  { value: '2', label: 'Systems shipped' },
  { value: '4', label: 'Live symbols tracked' },
  { value: '30s', label: 'Micro-batch latency' },
]

export function Footer() {
  return (
    <footer className="w-full relative overflow-hidden" style={{ background: '#040f17' }}>
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(0,255,163,0.5) 40%, rgba(0,170,255,0.3) 70%, transparent 100%)' }}
      />

      {/* Background grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,255,163,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,163,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Large decorative background name */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-end justify-center pointer-events-none select-none overflow-hidden"
        style={{ height: '55%' }}
        aria-hidden="true"
      >
        <span
          className="font-serif font-semibold whitespace-nowrap leading-none"
          style={{
            fontSize: 'clamp(80px, 18vw, 260px)',
            color: 'rgba(246,252,255,0.025)',
            letterSpacing: '-0.03em',
          }}
        >
          Samik
        </span>
      </div>

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* ── SECTION 1: CTA Headline ── */}
        <div className="pt-20 sm:pt-24 pb-14 sm:pb-16">
          <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-12 justify-between">
            {/* Big headline */}
            <div className="max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-mono text-[10px] tracking-[0.25em] uppercase mb-4"
                style={{ color: 'rgba(0,255,163,0.7)' }}
              >
                ● Open to work · Bangalore · 12–14 LPA
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif leading-[1.08] tracking-tight"
                style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: '#F6FCFF' }}
              >
                The data flows.
                <br />
                <span style={{ color: 'rgba(224,235,240,0.45)' }}>Let's build something</span>
                <br />
                that actually <span style={{ color: '#00ffa3' }}>runs.</span>
              </motion.h2>
            </div>

            {/* CTA block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-col gap-3 lg:items-end shrink-0"
            >
              <a
                href={`mailto:${EMAIL}`}
                className="group inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:brightness-110 active:scale-[0.97]"
                style={{
                  background: '#00ffa3',
                  color: '#051A24',
                  boxShadow: '0 0 32px rgba(0,255,163,0.25)',
                }}
              >
                Get in touch
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-200 group-hover:translate-x-0.5">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="font-mono text-xs text-center lg:text-right transition-colors duration-200 hover:text-[#00ffa3]"
                style={{ color: 'rgba(224,235,240,0.35)' }}
              >
                {EMAIL}
              </a>
            </motion.div>
          </div>

          {/* Pipeline stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-10 sm:mt-12 flex items-center gap-8 sm:gap-12 flex-wrap"
          >
            {STATS.map((s, i) => (
              <div key={s.label} className="flex items-center gap-4">
                {i > 0 && (
                  <div className="h-6 w-[1px]" style={{ background: 'rgba(255,255,255,0.06)' }} />
                )}
                <div>
                  <p className="font-serif text-xl font-semibold" style={{ color: '#00ffa3' }}>{s.value}</p>
                  <p className="font-mono text-[9px] tracking-wider mt-0.5" style={{ color: 'rgba(224,235,240,0.3)' }}>
                    {s.label.toUpperCase()}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <div className="h-[1px]" style={{ background: 'rgba(255,255,255,0.05)' }} />

        {/* ── SECTION 2: Info Grid ── */}
        <div className="py-12 sm:py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto] gap-10 lg:gap-20">

          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-serif text-2xl font-semibold" style={{ color: '#F6FCFF' }}>
              Samik Sengupta
            </span>
            <div className="mt-2 space-y-1">
              <p className="font-mono text-xs" style={{ color: 'rgba(224,235,240,0.35)' }}>
                Data Engineer · Bangalore, India
              </p>
              <p className="font-mono text-xs" style={{ color: 'rgba(224,235,240,0.35)' }}>
                Kafka · Spark · Airflow · dbt · Snowflake
              </p>
            </div>

            {/* Status badge */}
            <div
              className="inline-flex items-center gap-2 mt-5 rounded-full px-3 py-1.5"
              style={{
                background: 'rgba(0,255,163,0.06)',
                border: '1px solid rgba(0,255,163,0.18)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ffa3] animate-pulse" />
              <span className="font-mono text-[10px]" style={{ color: '#00ffa3' }}>
                Available for hire
              </span>
            </div>
          </motion.div>

          {/* Navigate column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <p className="font-mono text-[9px] tracking-[0.22em] uppercase mb-4" style={{ color: 'rgba(224,235,240,0.22)' }}>
              Navigate
            </p>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="group flex items-center gap-2 w-fit text-sm transition-colors duration-200"
                  style={{ color: 'rgba(224,235,240,0.45)' }}
                >
                  <span
                    className="w-0 h-[1px] bg-[#00ffa3] group-hover:w-3 transition-all duration-200"
                  />
                  <span className="group-hover:text-[#F6FCFF] transition-colors duration-200">{label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Connect column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.14 }}
          >
            <p className="font-mono text-[9px] tracking-[0.22em] uppercase mb-4" style={{ color: 'rgba(224,235,240,0.22)' }}>
              Connect
            </p>
            <div className="flex flex-col gap-2">
              {SOCIAL_LINKS.map(({ href, label, arrow }) => (
                <a
                  key={label}
                  href={href}
                  target={arrow ? '_blank' : undefined}
                  rel={arrow ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-1.5 w-fit text-sm transition-colors duration-200 hover:text-[#F6FCFF]"
                  style={{ color: 'rgba(224,235,240,0.45)' }}
                >
                  {label}
                  {arrow && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="opacity-0 group-hover:opacity-100 -translate-y-0.5 group-hover:translate-y-0 transition-all duration-200">
                      <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <div className="h-[1px]" style={{ background: 'rgba(255,255,255,0.04)' }} />

        {/* ── SECTION 3: Bottom bar ── */}
        <div className="py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span className="font-mono text-[10px]" style={{ color: 'rgba(224,235,240,0.2)' }}>
            © {new Date().getFullYear()} Samik Sengupta
          </span>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px]" style={{ color: 'rgba(224,235,240,0.2)' }}>
              Designed &amp; built by Samik Sengupta · Bangalore
            </span>
            <span
              className="font-mono text-[10px] px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(0,255,163,0.06)', color: 'rgba(0,255,163,0.4)', border: '1px solid rgba(0,255,163,0.1)' }}
            >
              v1.0
            </span>
          </div>
        </div>

      </div>
    </footer>
  )
}

export function CopyrightBar() {
  return null
}

/* BottomNav kept for reference — not rendered in App.tsx */
export function BottomNav() {
  return null
}
