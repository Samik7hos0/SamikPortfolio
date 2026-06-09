import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const STAGES = [
  {
    id: 'api',
    label: 'Alpha Vantage',
    role: 'Source API',
    color: '#00ffa3',
    stat: '4 symbols · live',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    id: 'kafka',
    label: 'Apache Kafka',
    role: 'Message Broker',
    color: '#0af',
    stat: 'dual-listener',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/>
        <line x1="12" y1="7" x2="5" y2="17"/><line x1="12" y1="7" x2="19" y2="17"/>
      </svg>
    ),
  },
  {
    id: 'spark',
    label: 'PySpark',
    role: 'Stream Processor',
    color: '#ff8c42',
    stat: '30s micro-batch',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    id: 'dbt',
    label: 'dbt',
    role: 'Transform Layer',
    color: '#ffaa44',
    stat: 'RAW → MARTS',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    id: 'snowflake',
    label: 'Snowflake',
    role: 'Data Warehouse',
    color: '#29b5e8',
    stat: 'final sink',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/><line x1="19.07" y1="4.93" x2="4.93" y2="19.07"/>
      </svg>
    ),
  },
]

/* Single animated data packet travelling along an edge */
function Packet({ color, delay, duration }: { color: string; delay: number; duration: number }) {
  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full pointer-events-none"
      style={{ background: color, boxShadow: `0 0 6px ${color}, 0 0 12px ${color}50`, left: 0 }}
      animate={{ left: ['0%', '105%'], opacity: [0, 1, 1, 0] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
        delay,
        times: [0, 0.04, 0.96, 1],
      }}
    />
  )
}

/* ── Full pipeline — desktop ── */
function DesktopPipeline() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.6 }}
      className="hidden md:flex items-center w-full px-0"
    >
      {STAGES.map((stage, i) => (
        <div key={stage.id} className="flex items-center flex-1 min-w-0">
          {/* Node card */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 1.8 + i * 0.1 }}
            className="relative shrink-0 rounded-xl overflow-hidden"
            style={{
              background: 'rgba(5,14,24,0.75)',
              border: `1px solid ${stage.color}22`,
              backdropFilter: 'blur(12px)',
              minWidth: 100,
            }}
          >
            {/* Coloured top bar */}
            <div className="h-[2px] w-full" style={{ background: stage.color }} />

            <div className="px-3 py-2.5">
              {/* Header row: icon + status */}
              <div className="flex items-center justify-between mb-1.5">
                <span style={{ color: stage.color }}>{stage.icon}</span>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: '#00ffa3', boxShadow: '0 0 5px #00ffa3' }}
                />
              </div>

              <p className="font-serif text-[11px] font-semibold leading-tight" style={{ color: '#F6FCFF' }}>
                {stage.label}
              </p>
              <p className="font-mono text-[9px] mt-0.5" style={{ color: stage.color }}>
                {stage.role}
              </p>
              <p className="font-mono text-[8px] mt-1.5 pt-1.5 border-t" style={{ color: 'rgba(224,235,240,0.28)', borderColor: 'rgba(255,255,255,0.05)' }}>
                {stage.stat}
              </p>
            </div>
          </motion.div>

          {/* Edge (connection line) — not after last node */}
          {i < STAGES.length - 1 && (
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.35, delay: 2.1 + i * 0.1, ease: 'easeOut' }}
              className="flex-1 relative mx-1 h-[1px]"
              style={{
                background: `linear-gradient(90deg, ${stage.color}30, ${STAGES[i + 1].color}30)`,
                originX: 0,
              }}
            >
              {/* Arrow tip */}
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-0.5"
                style={{ borderLeft: `5px solid ${STAGES[i + 1].color}50`, borderTop: '3px solid transparent', borderBottom: '3px solid transparent' }}
              />
              {/* Animated packets — staggered */}
              <Packet color={stage.color} duration={2.2} delay={2.4 + i * 0.3} />
              <Packet color={stage.color} duration={2.2} delay={3.5 + i * 0.3} />
            </motion.div>
          )}
        </div>
      ))}
    </motion.div>
  )
}

/* ── Compact 3-node strip — mobile ── */
const MOBILE_STAGES = [STAGES[0], STAGES[2], STAGES[4]] // Source, Spark, Snowflake

function MobilePipeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.4 }}
      className="flex md:hidden items-center justify-center gap-0 w-full"
    >
      {MOBILE_STAGES.map((stage, i) => (
        <div key={stage.id} className="flex items-center">
          {/* Mini chip */}
          <div
            className="rounded-lg px-2.5 py-1.5 text-center"
            style={{
              background: 'rgba(5,14,24,0.75)',
              border: `1px solid ${stage.color}25`,
              backdropFilter: 'blur(10px)',
            }}
          >
            <p className="font-serif text-[10px] font-semibold" style={{ color: '#F6FCFF' }}>{stage.label}</p>
            <p className="font-mono text-[8px]" style={{ color: stage.color }}>{stage.role}</p>
          </div>

          {/* Connector */}
          {i < MOBILE_STAGES.length - 1 && (
            <div
              className="w-6 h-[1px] relative mx-0.5"
              style={{ background: `linear-gradient(90deg, ${stage.color}40, ${MOBILE_STAGES[i+1].color}40)` }}
            >
              <Packet color={stage.color} duration={1.8} delay={i * 0.5} />
            </div>
          )}
        </div>
      ))}
    </motion.div>
  )
}

export default function PipelineFlow() {
  return (
    <div className="w-full">
      <DesktopPipeline />
      <MobilePipeline />
    </div>
  )
}
