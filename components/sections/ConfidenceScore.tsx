'use client'

import { useRef, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FadeUp } from '@/components/ui/FadeUp'
import { GlassCard } from '@/components/ui/GlassCard'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  { icon: '⚡', text: 'Real-time feasibility scoring' },
  { icon: '📊', text: 'Pattern recognition across all data' },
  { icon: '🧠', text: '30 years coaching knowledge built in' },
  { icon: '🎯', text: 'Personalised — never generic' },
]

const REASONS = [
  { text: 'Strong training foundation', status: 'good' },
  { text: 'Goal is realistic', status: 'good' },
  { text: 'Timeline is appropriate', status: 'good' },
  { text: 'Nutrition consistency required', status: 'warn' },
]

function ConfidenceCircle() {
  const circleRef = useRef<SVGCircleElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const R = 80
  const CIRCUMFERENCE = 2 * Math.PI * R

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        circleRef.current,
        { strokeDashoffset: CIRCUMFERENCE },
        {
          strokeDashoffset: CIRCUMFERENCE * (1 - 0.92),
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [CIRCUMFERENCE])

  return (
    <div ref={containerRef} className="flex justify-center">
      <div className="relative">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r={R}
            fill="none"
            stroke="rgba(212,165,116,0.1)"
            strokeWidth="6"
          />
          <circle
            ref={circleRef}
            cx="100"
            cy="100"
            r={R}
            fill="none"
            stroke="#d4a574"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
            transform="rotate(-90 100 100)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-playfair text-gold text-5xl font-bold">92%</span>
          <span className="font-inter text-white-muted text-xs mt-1 text-center px-4">
            Transformation Confidence
          </span>
        </div>
      </div>
    </div>
  )
}

export function ConfidenceScore() {
  return (
    <section className="py-32 px-6 lg:px-12" style={{ background: '#0a0a0a' }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        {/* Left */}
        <div className="space-y-6">
          <FadeUp>
            <span className="font-mono text-gold text-[11px] uppercase tracking-widest">
              Atlas Intelligence
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-playfair text-white leading-tight"
              style={{ fontSize: 'clamp(32px, 4vw, 50px)' }}
            >
              Atlas doesn&apos;t
              <br />
              just plan.
              <br />
              It predicts.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="font-inter text-white-muted text-base max-w-sm leading-relaxed">
              Based on your photos, history, and goals, Atlas generates a
              Transformation Confidence Score — an honest, data-driven
              prediction of what you can achieve and when.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="space-y-3 pt-2">
              {FEATURES.map((f) => (
                <div key={f.text} className="flex items-center gap-3">
                  <span className="text-xl">{f.icon}</span>
                  <span className="font-inter text-white text-sm">{f.text}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Right */}
        <GlassCard className="p-8 max-w-sm mx-auto w-full">
          <ConfidenceCircle />
          <div
            className="mt-6 mb-4"
            style={{ borderTop: '1px solid rgba(212,165,116,0.2)' }}
          />
          <div className="space-y-3">
            {REASONS.map((r, i) => (
              <motion.div
                key={r.text}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <span style={{ color: r.status === 'good' ? '#4ade80' : '#fbbf24' }}>
                  {r.status === 'good' ? '✔' : '⚠'}
                </span>
                <span
                  className="font-inter text-sm"
                  style={{ color: r.status === 'good' ? '#4ade80' : '#fbbf24' }}
                >
                  {r.text}
                </span>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  )
}
