'use client'

import { useRef, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FadeUp } from '@/components/ui/FadeUp'

gsap.registerPlugin(ScrollTrigger)

const CROSSED_ITEMS = [
  'MyFitnessPal',
  'Trainerize',
  'Calm / Headspace',
  'Progress photo apps',
  'Generic AI chatbots',
  'Spreadsheet meal plans',
]

function StrikeItem({ label, index }: { label: string; index: number }) {
  const textRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { width: '0%' },
        {
          width: '100%',
          duration: 0.4,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            once: true,
          },
          delay: index * 0.12,
        }
      )
    })
    return () => ctx.revert()
  }, [index])

  return (
    <motion.div
      ref={textRef}
      className="relative flex items-center gap-3 py-2"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <span className="text-white-muted text-lg">❌</span>
      <span className="relative font-inter text-white-muted text-lg">
        {label}
        <div
          ref={lineRef}
          className="absolute top-1/2 left-0 h-px bg-white-muted"
          style={{ width: 0 }}
        />
      </span>
    </motion.div>
  )
}

export function TheProblem() {
  return (
    <section className="py-32 px-6 lg:px-12" style={{ background: '#080808' }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div className="space-y-6">
          <FadeUp>
            <span className="font-mono text-gold text-[11px] uppercase tracking-widest">
              Why Atlas
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-playfair text-white leading-tight"
              style={{ fontSize: 'clamp(36px, 4vw, 52px)' }}
            >
              You don&apos;t need
              <br />
              another app.
              <br />
              You need a
              <br />
              system.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="font-inter text-white-muted text-base max-w-sm leading-relaxed">
              Most people juggle 4–6 apps to manage fitness. None of them talk
              to each other. Atlas replaces all of them — and connects
              everything into one intelligent picture of who you&apos;re
              becoming.
            </p>
          </FadeUp>
        </div>

        {/* Right */}
        <div className="space-y-1">
          {CROSSED_ITEMS.map((item, i) => (
            <StrikeItem key={item} label={item} index={i} />
          ))}

          <motion.div
            className="flex items-center gap-3 py-2 mt-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: CROSSED_ITEMS.length * 0.12 + 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
          >
            <span className="text-2xl">✅</span>
            <span
              className="font-playfair text-2xl text-gold"
              style={{ textShadow: '0 0 30px rgba(212,165,116,0.5)' }}
            >
              Atlas Ascend
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
