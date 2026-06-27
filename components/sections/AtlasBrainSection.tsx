'use client'

import { useRef, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WordReveal } from '@/components/ui/WordReveal'

gsap.registerPlugin(ScrollTrigger)

// Main score display
const SCORE = 87
const MAIN_R = 155
const MAIN_C = 2 * Math.PI * MAIN_R
const MAIN_DASHOFFSET = MAIN_C * (1 - SCORE / 100)

// Domain arc
const DOMAIN_R = 22
const DOMAIN_C = 2 * Math.PI * DOMAIN_R

// Orbit layout
const CONTAINER_SIZE = 560
const CX = 280
const CY = 280
const ORBIT_R = 200
const DOMAIN_SIZE = 56
const DOMAIN_NODE_R = DOMAIN_SIZE / 2

// Main SVG (350×350 centered in 560×560 container)
const SVG_SIZE = 350
const SVG_OFF = (CONTAINER_SIZE - SVG_SIZE) / 2  // 105

const DOMAINS = [
  { label: 'Training',    score: 72, angle: -90  },
  { label: 'Nutrition',   score: 65, angle: -45  },
  { label: 'Sleep',       score: 91, angle:   0  },
  { label: 'Mindset',     score: 82, angle:  45  },
  { label: 'Recovery',    score: 88, angle:  90  },
  { label: 'Consistency', score: 90, angle: 135  },
  { label: 'Progress',    score: 85, angle: 180  },
  { label: 'Habits',      score: 87, angle: 225  },
]

function getDomainPos(angle: number) {
  const rad = (angle * Math.PI) / 180
  return { x: CX + ORBIT_R * Math.cos(rad), y: CY + ORBIT_R * Math.sin(rad) }
}

const SCORE_RANGES = [
  { range: '90–100', label: 'Elite Momentum',  active: false },
  { range: '75–89',  label: 'Strong Progress', active: true  },
  { range: '60–74',  label: 'Building Base',   active: false },
  { range: '40–59',  label: 'Needs Focus',     active: false },
  { range: '0–39',   label: 'Starting Over',   active: false },
]

const FEATURES = [
  '8 intelligence domains tracked and weighted daily',
  'Pattern recognition adapts coaching nudges in real time',
  'Score history reveals long-term momentum trends',
]

export function AtlasBrainSection() {
  const arcRef = useRef<SVGCircleElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!arcRef.current || !sectionRef.current) return
      gsap.fromTo(
        arcRef.current,
        { strokeDashoffset: MAIN_C },
        {
          strokeDashoffset: MAIN_DASHOFFSET,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            once: true,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 px-6 lg:px-12 overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <motion.span
            className="font-mono text-[11px] text-gold uppercase tracking-widest block"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            The Atlas Brain
          </motion.span>
          <h2
            className="font-playfair text-white"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
          >
            <WordReveal text="One number. Infinite intelligence." stagger={0.04} />
          </h2>
          <motion.p
            className="font-inter text-white-muted max-w-xl mx-auto leading-relaxed"
            style={{ fontSize: 18 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Every morning, Atlas synthesises your sleep, training, nutrition, mindset and
            recovery into a single daily score — then coaches you based on what it finds.
          </motion.p>
        </div>

        {/* Content: score widget + right panel */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Score widget — desktop only in full form */}
          <div className="hidden lg:block flex-shrink-0 relative"
            style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE }}>

            {/* Domain circles (orbiting) */}
            {DOMAINS.map((domain, i) => {
              const pos = getDomainPos(domain.angle)
              const dashOffset = DOMAIN_C * (1 - domain.score / 100)

              return (
                <motion.div
                  key={domain.label}
                  className="absolute flex flex-col items-center"
                  style={{
                    left: pos.x - 40,
                    top: pos.y - DOMAIN_NODE_R,
                    width: 80,
                    zIndex: 2,
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.6 + i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-center">
                    <svg
                      width={DOMAIN_SIZE}
                      height={DOMAIN_SIZE}
                      viewBox={`0 0 ${DOMAIN_SIZE} ${DOMAIN_SIZE}`}
                    >
                      {/* Track */}
                      <circle
                        cx={DOMAIN_NODE_R} cy={DOMAIN_NODE_R} r={DOMAIN_R}
                        fill="rgba(212,165,116,0.06)"
                        stroke="rgba(212,165,116,0.18)"
                        strokeWidth="3"
                      />
                      {/* Progress arc */}
                      <g transform={`rotate(-90, ${DOMAIN_NODE_R}, ${DOMAIN_NODE_R})`}>
                        <motion.circle
                          cx={DOMAIN_NODE_R} cy={DOMAIN_NODE_R} r={DOMAIN_R}
                          fill="none"
                          stroke="#d4a574"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray={DOMAIN_C}
                          initial={{ strokeDashoffset: DOMAIN_C }}
                          whileInView={{ strokeDashoffset: dashOffset }}
                          transition={{
                            duration: 1.5,
                            delay: 0.7 + i * 0.08,
                            ease: 'easeOut',
                          }}
                          viewport={{ once: true }}
                        />
                      </g>
                      {/* Score */}
                      <text
                        x={DOMAIN_NODE_R} y={DOMAIN_NODE_R + 4}
                        textAnchor="middle"
                        fill="#d4a574"
                        fontFamily="'Space Mono', monospace"
                        fontSize="11"
                        fontWeight="700"
                      >
                        {domain.score}
                      </text>
                    </svg>
                  </div>
                  <span
                    className="font-mono text-[8px] text-white/50 uppercase tracking-widest text-center mt-1 leading-tight"
                  >
                    {domain.label}
                  </span>
                </motion.div>
              )
            })}

            {/* Main score SVG — centered */}
            <div
              className="absolute"
              style={{ top: SVG_OFF, left: SVG_OFF, width: SVG_SIZE, height: SVG_SIZE, zIndex: 1 }}
            >
              <svg
                width={SVG_SIZE}
                height={SVG_SIZE}
                viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
                className="absolute inset-0"
              >
                <defs>
                  <filter id="brain-arc-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Outer faint ring */}
                <circle
                  cx={SVG_SIZE / 2} cy={SVG_SIZE / 2} r={MAIN_R + 18}
                  fill="none"
                  stroke="rgba(212,165,116,0.05)"
                  strokeWidth="1"
                />
                {/* Track */}
                <circle
                  cx={SVG_SIZE / 2} cy={SVG_SIZE / 2} r={MAIN_R}
                  fill="none"
                  stroke="rgba(212,165,116,0.1)"
                  strokeWidth="10"
                />
                {/* Progress arc */}
                <circle
                  ref={arcRef}
                  cx={SVG_SIZE / 2} cy={SVG_SIZE / 2} r={MAIN_R}
                  fill="none"
                  stroke="#d4a574"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={MAIN_C}
                  strokeDashoffset={MAIN_C}
                  transform={`rotate(-90, ${SVG_SIZE / 2}, ${SVG_SIZE / 2})`}
                  filter="url(#brain-arc-glow)"
                />
              </svg>

              {/* Score number */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div
                  className="font-playfair text-gold leading-none"
                  style={{ fontSize: 96 }}
                >
                  {SCORE}
                </div>
                <div className="font-mono text-white/40 text-[10px] uppercase tracking-widest mt-2">
                  Atlas Brain Score
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: simplified score display */}
          <div className="lg:hidden flex flex-col items-center gap-6 w-full">
            <div className="relative" style={{ width: 200, height: 200 }}>
              <svg width="200" height="200" viewBox="0 0 200 200" className="absolute inset-0">
                <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(212,165,116,0.1)" strokeWidth="8" />
                <circle
                  cx="100" cy="100" r="80"
                  fill="none" stroke="#d4a574" strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 80}
                  strokeDashoffset={2 * Math.PI * 80 * (1 - SCORE / 100)}
                  transform="rotate(-90, 100, 100)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-playfair text-gold text-5xl font-bold">{SCORE}</span>
                <span className="font-mono text-white/40 text-[9px] uppercase tracking-widest mt-1">Brain Score</span>
              </div>
            </div>

            {/* Domain scores grid on mobile */}
            <div className="grid grid-cols-4 gap-3 w-full max-w-xs">
              {DOMAINS.map((d) => (
                <div key={d.label} className="flex flex-col items-center gap-1">
                  <div
                    className="font-mono text-gold text-sm font-bold"
                  >{d.score}</div>
                  <div className="font-mono text-[8px] text-white/40 uppercase text-center leading-tight">
                    {d.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel: ranges + features */}
          <div className="flex-1 w-full space-y-8">

            {/* Score ranges */}
            <div>
              <motion.div
                className="font-mono text-[10px] text-gold/70 uppercase tracking-widest mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Score Ranges
              </motion.div>
              <div className="space-y-2">
                {SCORE_RANGES.map((range, i) => (
                  <motion.div
                    key={range.range}
                    className="flex items-center gap-4 py-3 px-4 rounded-lg"
                    style={{
                      background: range.active ? 'rgba(212,165,116,0.08)' : 'transparent',
                      border: `1px solid ${range.active ? 'rgba(212,165,116,0.25)' : 'transparent'}`,
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    viewport={{ once: true }}
                  >
                    <span
                      className="font-mono text-xs w-16 flex-shrink-0"
                      style={{ color: range.active ? '#d4a574' : 'rgba(255,255,255,0.3)' }}
                    >
                      {range.range}
                    </span>
                    <span
                      className="font-inter text-sm"
                      style={{ color: range.active ? '#fff' : 'rgba(255,255,255,0.4)' }}
                    >
                      {range.label}
                    </span>
                    {range.active && (
                      <span className="ml-auto font-mono text-[10px] text-gold/60 uppercase tracking-wider">
                        ← You
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Animated gold divider */}
            <motion.div
              className="h-px"
              style={{ background: 'linear-gradient(to right, #d4a574, rgba(212,165,116,0.2))' }}
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              viewport={{ once: true }}
            />

            {/* Feature points */}
            <div className="space-y-4">
              {FEATURES.map((feat, i) => (
                <motion.div
                  key={feat}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span
                    className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full border border-gold/40 flex items-center justify-center"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold block" />
                  </span>
                  <span className="font-inter text-white-muted text-sm leading-relaxed">{feat}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
