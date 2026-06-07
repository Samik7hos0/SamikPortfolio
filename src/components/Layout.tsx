import { motion } from 'framer-motion'

const EMAIL = 'samik.r.gt@gmail.com'

export function Footer() {
  return (
    <footer className="w-full px-6 pt-14 pb-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-[1200px] mx-auto"
      >
        <div className="section-divider mb-12" />

        <div className="flex flex-col md:flex-row md:items-start gap-10 md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <span className="font-serif text-3xl font-semibold" style={{ color: '#051A24' }}>
              Samik Sengupta
            </span>
            <p className="font-mono text-xs mt-2" style={{ color: 'rgba(5,26,36,0.4)' }}>
              Data Engineer · Dharmanagar → Bangalore
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="font-mono text-xs mt-2 block group relative inline-block"
              style={{ color: 'rgba(5,26,36,0.45)' }}
            >
              <span className="group-hover:text-[#051A24] transition-colors duration-200">{EMAIL}</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 mt-5 rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
              style={{ background: '#051A24', color: '#F6FCFF', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}
            >
              Get in touch
            </a>
          </div>

          <div className="flex gap-12" style={{ color: '#051A24' }}>
            <div className="flex flex-col gap-2">
              <p className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: 'rgba(5,26,36,0.35)' }}>
                Navigate
              </p>
              {[['#about', 'About'], ['#projects', 'Projects'], ['#contact', 'Contact']].map(([href, label]) => (
                <a key={href} href={href}
                  className="text-sm hover:opacity-60 transition-opacity relative group inline-block">
                  {label}
                  <span className="absolute -bottom-px left-0 h-px w-0 group-hover:w-full transition-all duration-300 bg-[#051A24]" />
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: 'rgba(5,26,36,0.35)' }}>
                Connect
              </p>
              <a href="https://github.com/Samik7hos0" target="_blank" rel="noopener noreferrer"
                className="text-sm hover:opacity-60 transition-opacity relative group inline-block">
                GitHub
                <span className="absolute -bottom-px left-0 h-px w-0 group-hover:w-full transition-all duration-300 bg-[#051A24]" />
              </a>
              <a href="https://www.linkedin.com/in/samik-sengupta" target="_blank" rel="noopener noreferrer"
                className="text-sm hover:opacity-60 transition-opacity relative group inline-block">
                LinkedIn
                <span className="absolute -bottom-px left-0 h-px w-0 group-hover:w-full transition-all duration-300 bg-[#051A24]" />
              </a>
              <a href={`mailto:${EMAIL}`}
                className="text-sm hover:opacity-60 transition-opacity relative group inline-block">
                Email
                <span className="absolute -bottom-px left-0 h-px w-0 group-hover:w-full transition-all duration-300 bg-[#051A24]" />
              </a>
              <a href="/resume/Samik_Sengupta_Data_Engineer_Resume.pdf" target="_blank" rel="noopener noreferrer"
                className="text-sm hover:opacity-60 transition-opacity relative group inline-block">
                Resume ↗
                <span className="absolute -bottom-px left-0 h-px w-0 group-hover:w-full transition-all duration-300 bg-[#051A24]" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}

export function CopyrightBar() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-4">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-xs font-mono" style={{ color: 'rgba(5,26,36,0.3)' }}>
        <span>© {new Date().getFullYear()} Samik Sengupta</span>
        <span>Designed &amp; developed by Samik Sengupta</span>
      </div>
    </div>
  )
}

export function BottomNav() {
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="flex items-center gap-3 rounded-full px-5 py-2.5"
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          background: 'rgba(5,26,36,0.88)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,255,163,0.06)',
        }}
      >
        <span className="font-serif text-lg font-semibold" style={{ color: '#F6FCFF' }}>S</span>
        <div className="w-[1px] h-4 bg-white/10" />
        <div className="flex items-center gap-3 text-xs" style={{ color: 'rgba(224,235,240,0.55)' }}>
          <a href="#about" className="hover:text-[#00ffa3] transition-colors duration-200">About</a>
          <a href="#projects" className="hover:text-[#00ffa3] transition-colors duration-200">Work</a>
        </div>
        <a
          href="#contact"
          className="rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 hover:brightness-110 active:scale-95"
          style={{ background: '#00ffa3', color: '#051A24', boxShadow: '0 0 14px rgba(0,255,163,0.45)' }}
        >
          Hire me
        </a>
      </motion.div>
    </div>
  )
}
