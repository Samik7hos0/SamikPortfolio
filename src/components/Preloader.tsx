import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0)   // 0=logo, 1=name, 2=done

  useEffect(() => {
    // Increment progress bar
    const start = Date.now()
    const duration = 2200
    const frame = () => {
      const p = Math.min((Date.now() - start) / duration, 1)
      setProgress(p)
      if (p < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)

    const t1 = setTimeout(() => setPhase(1), 500)
    const t2 = setTimeout(() => setPhase(2), 1600)
    const t3 = setTimeout(() => onDone(), 2700)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onDone])

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ background: '#051A24' }}
          exit={{ y: '-100%', transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(0,255,163,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,163,1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* SS Monogram */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-20 h-20 rounded-2xl flex items-center justify-center relative"
              style={{
                background: 'rgba(0,255,163,0.08)',
                border: '1px solid rgba(0,255,163,0.3)',
                boxShadow: '0 0 40px rgba(0,255,163,0.15)',
              }}
            >
              <span
                className="font-serif text-3xl font-semibold"
                style={{ color: '#00ffa3', textShadow: '0 0 20px rgba(0,255,163,0.6)' }}
              >
                SS
              </span>
            </motion.div>

            {/* Name */}
            <AnimatePresence>
              {phase >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center"
                >
                  <p className="font-serif text-2xl font-semibold" style={{ color: '#F6FCFF' }}>
                    Samik Sengupta
                  </p>
                  <p className="font-mono text-xs mt-1 tracking-widest" style={{ color: 'rgba(224,235,240,0.4)' }}>
                    DATA ENGINEER
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48">
            <div className="h-[1px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress * 100}%`,
                  background: 'linear-gradient(90deg, #00ffa3, #0af)',
                  boxShadow: '0 0 8px #00ffa3',
                }}
              />
            </div>
            <p className="font-mono text-[10px] mt-2 text-center" style={{ color: 'rgba(224,235,240,0.25)' }}>
              {Math.round(progress * 100)}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
