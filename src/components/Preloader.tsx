import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NODES = [
  { sub: 'API', label: 'Source',  color: '#00ffa3' },
  { sub: 'ETL', label: 'Process', color: '#0af'    },
  { sub: 'DW',  label: 'Store',   color: '#29b5e8' },
]

const STATUS = [
  'Connecting sources...',
  'Transforming records...',
  'Loading warehouse...',
  'Pipeline ready ✓',
]

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [nodeStep, setNodeStep]   = useState(1)   // nodes 1..3 appear
  const [lineStep, setLineStep]   = useState(0)   // lines 1..2 draw
  const [statusIdx, setStatusIdx] = useState(0)
  const [showName, setShowName]   = useState(false)
  const [progress, setProgress]   = useState(0)

  useEffect(() => {
    const totalDuration = 2500
    const start = Date.now()
    const raf = () => {
      const p = Math.min((Date.now() - start) / totalDuration, 1)
      setProgress(p)
      if (p < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    const timers = [
      setTimeout(() => { setLineStep(1); setNodeStep(2); setStatusIdx(1) }, 360),
      setTimeout(() => { setLineStep(2); setNodeStep(3); setStatusIdx(2) }, 720),
      setTimeout(() => { setStatusIdx(3); setShowName(true) }, 1100),
      setTimeout(() => onDone(), 2700),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onDone])

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none"
        style={{ background: '#040f17' }}
        exit={{ y: '-100%', transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } }}
      >
        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,255,163,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,163,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Top scan line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden">
          <div
            className="nav-scan absolute top-0 h-full w-[30%]"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,163,0.5), transparent)' }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-10">

          {/* Pipeline nodes */}
          <div className="flex items-center">
            {NODES.map((node, i) => (
              <div key={node.label} className="flex items-center">
                {/* Connecting line before node (except first) */}
                {i > 0 && (
                  <div className="relative w-12 sm:w-20 h-[1px] overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <motion.div
                      className="absolute inset-y-0 left-0 h-full"
                      initial={{ width: '0%' }}
                      animate={{ width: lineStep >= i ? '100%' : '0%' }}
                      transition={{ duration: 0.32, ease: 'easeInOut' }}
                      style={{ background: `linear-gradient(90deg, ${NODES[i - 1].color}, ${node.color})`, boxShadow: lineStep >= i ? `0 0 6px ${node.color}` : 'none' }}
                    />
                  </div>
                )}

                {/* Node */}
                <motion.div
                  className="flex flex-col items-center gap-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={nodeStep > i ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${node.color}12`,
                      border: `1.5px solid ${node.color}40`,
                      boxShadow: nodeStep > i ? `0 0 20px ${node.color}25, inset 0 0 20px ${node.color}05` : 'none',
                    }}
                  >
                    <span className="font-mono text-[11px] font-semibold" style={{ color: node.color }}>
                      {node.sub}
                    </span>
                  </div>
                  <span className="font-mono text-[9px]" style={{ color: 'rgba(224,235,240,0.3)' }}>
                    {node.label}
                  </span>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Status text */}
          <AnimatePresence mode="wait">
            <motion.p
              key={statusIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="font-mono text-[11px]"
              style={{ color: statusIdx === 3 ? '#00ffa3' : 'rgba(224,235,240,0.4)' }}
            >
              {STATUS[statusIdx]}
            </motion.p>
          </AnimatePresence>

          {/* Name + role reveal */}
          <AnimatePresence>
            {showName && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <p className="font-serif text-2xl sm:text-3xl font-semibold" style={{ color: '#F6FCFF' }}>
                  Samik Sengupta
                </p>
                <p className="font-mono text-[10px] tracking-[0.25em] mt-1.5" style={{ color: 'rgba(224,235,240,0.35)' }}>
                  DATA ENGINEER
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 w-40 sm:w-52">
          <div className="h-[1px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${Math.round(progress * 100)}%`,
                background: 'linear-gradient(90deg, #00ffa3, #0af)',
                boxShadow: '0 0 8px rgba(0,255,163,0.6)',
              }}
            />
          </div>
          <p className="font-mono text-[9px] mt-2 text-center" style={{ color: 'rgba(224,235,240,0.18)' }}>
            {Math.round(progress * 100)}%
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
