'use client'

import { motion } from 'framer-motion'
import { WordReveal } from '@/components/ui/WordReveal'

// SVG layout constants
const SVG_W = 500
const SVG_H = 380
const CX = 250   // Atlas Brain center x
const CY = 190   // Atlas Brain center y
const ORBIT_R = 145

const OUTER_NODES = [
  { id: 'aicoach',    label: 'AI Coach',    sub: 'Personalised guidance',  angle: -90  },
  { id: 'futureyou',  label: 'Future You',  sub: 'Physique transformation', angle: -18  },
  { id: 'nutrition',  label: 'Nutrition',   sub: 'Precision meal plans',   angle:  54  },
  { id: 'recovery',   label: 'Recovery',    sub: 'Rest & adaptation',      angle: 126  },
  { id: 'training',   label: 'Training',    sub: 'Progressive overload',   angle: 198  },
]

function nodePos(angle: number) {
  const rad = (angle * Math.PI) / 180
  return {
    x: CX + ORBIT_R * Math.cos(rad),
    y: CY + ORBIT_R * Math.sin(rad),
  }
}

// Adjacent pairs (index pairs in OUTER_NODES) — pentagon edges
const ADJACENT: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]]

const FLOW_ITEMS = ['AI Coach', 'Training', 'Nutrition', 'Recovery', 'Future You', 'Atlas Brain']

export function EcosystemSection() {
  const positions = OUTER_NODES.map((n) => nodePos(n.angle))

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 overflow-hidden" style={{ background: '#080808' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.span
            className="font-mono text-[11px] text-gold uppercase tracking-widest block"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            The Ecosystem
          </motion.span>
          <h2
            className="font-playfair text-white"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
          >
            <WordReveal text="Everything feeds everything." stagger={0.05} />
          </h2>
          <motion.p
            className="font-inter text-white-muted max-w-xl mx-auto leading-relaxed"
            style={{ fontSize: 18 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Every module in Atlas shares data with every other. Training informs recovery.
            Sleep informs coaching. Nutrition informs performance. The Brain sees all of it.
          </motion.p>
        </div>

        {/* Desktop: SVG flow diagram */}
        <div className="hidden lg:flex justify-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <svg
              width={SVG_W}
              height={SVG_H}
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              style={{ overflow: 'visible' }}
            >
              <defs>
                <filter id="nodeGlow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <radialGradient id="brainGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(212,165,116,0.3)" />
                  <stop offset="100%" stopColor="rgba(212,165,116,0)" />
                </radialGradient>
              </defs>

              {/* Adjacent node connections (lighter, drawn first) */}
              {ADJACENT.map(([a, b], i) => {
                const pa = positions[a]
                const pb = positions[b]
                return (
                  <motion.path
                    key={`adj-${i}`}
                    d={`M ${pa.x} ${pa.y} L ${pb.x} ${pb.y}`}
                    stroke="rgba(212,165,116,0.12)"
                    strokeWidth="1"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 + i * 0.1, ease: 'easeOut' }}
                    viewport={{ once: true }}
                  />
                )
              })}

              {/* Lines from outer nodes to Atlas Brain center */}
              {positions.map((pos, i) => (
                <motion.path
                  key={`line-${i}`}
                  d={`M ${pos.x} ${pos.y} L ${CX} ${CY}`}
                  stroke="rgba(212,165,116,0.35)"
                  strokeWidth="1.5"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: 'easeOut' }}
                  viewport={{ once: true }}
                />
              ))}

              {/* Outer nodes */}
              {OUTER_NODES.map((node, i) => {
                const pos = positions[i]
                const isRight = pos.x > CX
                const labelX = isRight ? pos.x + 40 : pos.x - 40
                const labelAnchor = isRight ? 'start' : 'end'
                const labelY = pos.y < CY ? pos.y - 8 : pos.y + 8

                return (
                  <motion.g
                    key={node.id}
                    initial={{ opacity: 0, scale: 0.4 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.15 + i * 0.13,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    viewport={{ once: true }}
                    style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                  >
                    {/* Node circle */}
                    <circle
                      cx={pos.x} cy={pos.y} r={30}
                      fill="rgba(212,165,116,0.06)"
                      stroke="rgba(212,165,116,0.3)"
                      strokeWidth="1.5"
                    />
                    {/* Node label */}
                    <text
                      x={labelX}
                      y={labelY}
                      textAnchor={labelAnchor}
                      fill="rgba(255,255,255,0.85)"
                      fontFamily="var(--font-inter), sans-serif"
                      fontSize="11"
                      fontWeight="600"
                    >
                      {node.label}
                    </text>
                    <text
                      x={labelX}
                      y={labelY + 14}
                      textAnchor={labelAnchor}
                      fill="rgba(255,255,255,0.35)"
                      fontFamily="var(--font-inter), sans-serif"
                      fontSize="9"
                    >
                      {node.sub}
                    </text>
                    {/* Icon letter */}
                    <text
                      x={pos.x} y={pos.y + 4}
                      textAnchor="middle"
                      fill="rgba(212,165,116,0.7)"
                      fontFamily="'Space Mono', monospace"
                      fontSize="10"
                      fontWeight="700"
                    >
                      {node.label.substring(0, 2).toUpperCase()}
                    </text>
                  </motion.g>
                )
              })}

              {/* Atlas Brain center — pulsing ring */}
              <motion.circle
                cx={CX} cy={CY} r={52}
                fill="none"
                stroke="rgba(212,165,116,0.15)"
                strokeWidth="1"
                style={{ transformOrigin: `${CX}px ${CY}px` }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut' }}
              />

              {/* Atlas Brain center node */}
              <motion.g
                initial={{ opacity: 0, scale: 0.3 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              >
                <circle
                  cx={CX} cy={CY} r={46}
                  fill="rgba(212,165,116,0.12)"
                  stroke="#d4a574"
                  strokeWidth="2"
                  filter="url(#nodeGlow)"
                />
                <text
                  x={CX} y={CY - 6}
                  textAnchor="middle"
                  fill="#d4a574"
                  fontFamily="'Playfair Display', serif"
                  fontSize="11"
                  fontWeight="700"
                >
                  ATLAS
                </text>
                <text
                  x={CX} y={CY + 9}
                  textAnchor="middle"
                  fill="#d4a574"
                  fontFamily="'Playfair Display', serif"
                  fontSize="11"
                  fontWeight="700"
                >
                  BRAIN
                </text>
              </motion.g>
            </svg>
          </motion.div>
        </div>

        {/* Mobile: vertical list */}
        <div className="lg:hidden mb-12">
          <div className="flex flex-col items-center">
            {[...OUTER_NODES, { id: 'brain', label: 'Atlas Brain', sub: 'The intelligence core', angle: 0 }].map((node, i, arr) => (
              <motion.div
                key={node.id}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-xs font-mono font-bold"
                  style={{
                    background: node.id === 'brain' ? 'rgba(212,165,116,0.15)' : 'rgba(212,165,116,0.06)',
                    border: `1.5px solid ${node.id === 'brain' ? '#d4a574' : 'rgba(212,165,116,0.3)'}`,
                    color: '#d4a574',
                  }}
                >
                  {node.label.substring(0, 2).toUpperCase()}
                </div>
                <div className="text-center mt-2">
                  <div className="font-inter text-white text-sm font-semibold">{node.label}</div>
                  <div className="font-inter text-white/40 text-xs">{node.sub}</div>
                </div>
                {i < arr.length - 1 && (
                  <div className="w-px h-8 mt-2" style={{ background: 'rgba(212,165,116,0.2)' }} />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Flow description */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {FLOW_ITEMS.map((item, i) => (
            <span key={item} className="flex items-center gap-2">
              <span
                className="font-inter text-sm"
                style={{ color: item === 'Atlas Brain' ? '#d4a574' : 'rgba(255,255,255,0.6)' }}
              >
                {item}
              </span>
              {i < FLOW_ITEMS.length - 1 && (
                <span className="text-gold/40 text-xs">→</span>
              )}
            </span>
          ))}
        </motion.div>
        <motion.p
          className="text-center font-inter text-white/30 text-xs mt-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          Every module continuously informs the Brain. The Brain continuously coaches you.
        </motion.p>
      </div>
    </section>
  )
}
