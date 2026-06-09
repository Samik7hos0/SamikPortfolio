import { motion } from 'framer-motion'

export default function LookingForSection() {
  return (
    <section className="w-full py-10 sm:py-12 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-10"
      >
        <div className="w-5 h-[1px]" style={{ background: 'var(--border-mid)' }} />
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--fg-45)' }}>
          Opportunities
        </span>
      </motion.div>

      <div className="max-w-2xl">
        {/* Main card — intentionally always dark */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 md:p-12 relative overflow-hidden"
          style={{
            background: '#051A24',
            border: '1px solid rgba(0,255,163,0.12)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.15)',
          }}
        >
          {/* Top glow */}
          <div
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,163,0.5), transparent)' }}
          />
          {/* Corner glow */}
          <div
            className="absolute top-0 right-0 w-52 h-52 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 100% 0%, rgba(0,255,163,0.07), transparent 70%)' }}
          />

          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-6 text-[10px] font-mono"
            style={{ background: 'rgba(0,255,163,0.1)', border: '1px solid rgba(0,255,163,0.25)', color: '#00ffa3' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ffa3] animate-pulse" />
            Actively looking
          </div>

          <h3 className="text-[26px] md:text-[30px] font-medium mb-3" style={{ color: '#F6FCFF' }}>
            Full-time roles
          </h3>
          <p className="text-sm leading-relaxed mb-8 max-w-sm" style={{ color: 'rgba(224,235,240,0.65)' }}>
            Junior Data Engineer or Associate DE.
            Fintech &amp; GCC teams in Bangalore.
          </p>

          <div className="flex items-end gap-8 mb-10 flex-wrap">
            <div>
              <span className="text-4xl font-serif font-semibold" style={{ color: '#F6FCFF' }}>12–14</span>
              <span className="text-xl ml-1.5" style={{ color: 'rgba(224,235,240,0.5)' }}>LPA</span>
              <p className="text-xs mt-1 font-mono" style={{ color: 'rgba(224,235,240,0.35)' }}>Target range</p>
            </div>
            <div className="h-10 w-[1px]" style={{ background: 'rgba(255,255,255,0.07)' }} />
            <div>
              <span className="text-xl font-serif font-medium" style={{ color: 'rgba(224,235,240,0.7)' }}>Bangalore</span>
              <p className="text-xs mt-1 font-mono" style={{ color: 'rgba(224,235,240,0.35)' }}>Preferred location</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:samik.r.gt@gmail.com"
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
              style={{ background: '#00ffa3', color: '#051A24', boxShadow: '0 0 20px rgba(0,255,163,0.25)' }}
            >
              Get in touch
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium transition-all duration-200 hover:bg-white/5"
              style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(224,235,240,0.8)' }}
            >
              See my work
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
