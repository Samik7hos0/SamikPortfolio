import { motion } from 'framer-motion'
import Button from './Button'

export default function LookingForSection() {
  return (
    <section className="w-full py-12 px-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-10"
      >
        <div className="w-5 h-[1px] bg-[#051A24]/30" />
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(5,26,36,0.45)' }}>
          Opportunities
        </span>
      </motion.div>

      <div className="md:max-w-4xl md:ml-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dark card — Full-time */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="rounded-[36px] pl-10 pr-10 md:pr-20 pt-8 pb-10 relative overflow-hidden"
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
            {/* Radial glow */}
            <div
              className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 100% 0%, rgba(0,255,163,0.08), transparent 70%)' }}
            />

            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-5 text-[10px] font-mono"
              style={{ background: 'rgba(0,255,163,0.1)', border: '1px solid rgba(0,255,163,0.25)', color: '#00ffa3' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ffa3] animate-pulse" />
              Actively looking
            </div>

            <h3 className="text-[22px] font-medium mb-3" style={{ color: '#F6FCFF' }}>
              Full-time roles
            </h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(224,235,240,0.65)' }}>
              Junior Data Engineer or Associate DE.
              <br />
              Fintech &amp; GCC teams in Bangalore.
            </p>
            <div className="mb-8">
              <span className="text-3xl font-serif font-semibold" style={{ color: '#F6FCFF' }}>12–14</span>
              <span className="text-lg ml-1" style={{ color: 'rgba(224,235,240,0.5)' }}>LPA</span>
              <p className="text-xs mt-1 font-mono" style={{ color: 'rgba(224,235,240,0.35)' }}>Target range</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:samik.r.gt@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
                style={{ background: '#00ffa3', color: '#051A24', boxShadow: '0 0 20px rgba(0,255,163,0.25)' }}
              >
                Get in touch
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 hover:bg-white/5"
                style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(224,235,240,0.8)' }}
              >
                See my work
              </a>
            </div>
          </motion.div>

          {/* Light card — Contract */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="rounded-[36px] pl-10 pr-10 md:pr-20 pt-8 pb-10 relative overflow-hidden glass-white"
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-5 text-[10px] font-mono"
              style={{ background: 'rgba(5,26,36,0.06)', border: '1px solid rgba(5,26,36,0.12)', color: 'rgba(5,26,36,0.6)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#051A24]/60 animate-pulse" />
              Remote-friendly
            </div>

            <h3 className="text-[22px] font-medium mb-3" style={{ color: '#0D212C' }}>
              Contract / freelance
            </h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(5,26,36,0.6)' }}>
              ETL builds, pipeline work, data
              <br />
              modelling. Remote-friendly.
            </p>
            <div className="mb-8">
              <span className="text-3xl font-serif font-semibold" style={{ color: '#0D212C' }}>Available</span>
              <p className="text-xs mt-1 font-mono" style={{ color: 'rgba(5,26,36,0.4)' }}>Open now</p>
            </div>
            <a
              href="mailto:samik.r.gt@gmail.com"
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 hover:shadow-secondary"
              style={{ background: '#051A24', color: '#F6FCFF', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}
            >
              Start a conversation
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
