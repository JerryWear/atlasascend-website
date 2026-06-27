'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { FadeUp } from '@/components/ui/FadeUp'
import { GlassCard } from '@/components/ui/GlassCard'
import { PhoneMockup } from '@/components/ui/PhoneMockup'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { TypeWriter } from '@/components/ui/TypeWriter'
import { SCREENSHOTS } from '@/lib/screenshots'

function ScreenshotCard({
  src,
  alt,
  label,
  className = '',
}: {
  src: string
  alt: string
  label: string
  className?: string
}) {
  const [error, setError] = useState(false)
  return (
    <GlassCard className={`h-full relative overflow-hidden ${className}`}>
      {!error ? (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            onError={() => setError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/10 to-black/30" />
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-gold/40 text-xs text-center px-4">{alt}</span>
        </div>
      )}
      <div className="relative z-10 p-4">
        <span className="font-mono text-[10px] text-gold/70 uppercase tracking-widest">{label}</span>
      </div>
    </GlassCard>
  )
}

const COACH_MESSAGES = [
  "Your recovery score is 87 — let's push training today.",
  'You hit your protein goal 5 days in a row. Keep it up.',
  "Based on your sleep data, I'd recommend a lighter session.",
]

const CONTAINER_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function BentoGrid() {
  return (
    <section className="py-32 px-6 lg:px-12" style={{ background: '#0a0a0a' }}>
      <div className="max-w-7xl mx-auto">
        <FadeUp className="text-center mb-12 space-y-3">
          <h2
            className="font-playfair text-white"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
          >
            Everything. Connected.
          </h2>
          <p className="font-inter text-white-muted" style={{ fontSize: 18 }}>
            14 core systems. One platform.
          </p>
        </FadeUp>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          style={{ gridAutoRows: '200px' }}
          variants={CONTAINER_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Atlas Brain — col-span-2 row-span-2 */}
          <motion.div variants={CARD_VARIANTS} className="col-span-2 row-span-2">
            <GlassCard className="h-full p-6 flex flex-col lg:flex-row gap-4 overflow-hidden">
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <span className="font-mono text-[10px] text-gold/70 uppercase tracking-widest">
                    Atlas Brain
                  </span>
                  <h3 className="font-playfair text-white text-2xl mt-2 leading-snug">
                    Your daily
                    <br />
                    intelligence score
                  </h3>
                </div>
                <div className="mt-4">
                  <div className="font-playfair text-gold text-5xl font-bold">
                    <AnimatedCounter value={34} duration={2.5} />
                  </div>
                  <div className="font-inter text-white-muted text-xs mt-1">
                    Today&apos;s transformation score
                  </div>
                </div>
              </div>
              <div className="hidden lg:flex items-center justify-center flex-shrink-0">
                <PhoneMockup src={SCREENSHOTS.atlasBrain} alt="Atlas Brain" treatment="glow" size="sm" />
              </div>
            </GlassCard>
          </motion.div>

          {/* AI Coach — col-span-2 */}
          <motion.div variants={CARD_VARIANTS} className="col-span-2">
            <GlassCard className="h-full p-6 overflow-hidden">
              <span className="font-mono text-[10px] text-gold/70 uppercase tracking-widest">
                AI Coach
              </span>
              <div className="mt-3 font-inter text-white text-sm leading-relaxed">
                <TypeWriter messages={COACH_MESSAGES} speed={50} pauseDuration={2500} />
              </div>
            </GlassCard>
          </motion.div>

          {/* Future You — col-span-1 row-span-2 */}
          <motion.div variants={CARD_VARIANTS} className="col-span-1 row-span-2">
            <GlassCard className="h-full p-4 flex flex-col items-center justify-between overflow-hidden">
              <span className="font-mono text-[10px] text-gold/70 uppercase tracking-widest self-start">
                Future You™
              </span>
              <PhoneMockup
                src={SCREENSHOTS.futureYou}
                alt="Future You"
                treatment="float"
                size="sm"
              />
            </GlassCard>
          </motion.div>

          {/* Training */}
          <motion.div variants={CARD_VARIANTS} className="col-span-1">
            <ScreenshotCard src={SCREENSHOTS.training} alt="Training" label="Training Engine" />
          </motion.div>

          {/* Nutrition */}
          <motion.div variants={CARD_VARIANTS} className="col-span-1">
            <ScreenshotCard src={SCREENSHOTS.nutrition} alt="Nutrition" label="Nutrition" />
          </motion.div>

          {/* Vision Board */}
          <motion.div variants={CARD_VARIANTS} className="col-span-1">
            <ScreenshotCard src={SCREENSHOTS.visionBoard} alt="Vision Board" label="Vision Board" />
          </motion.div>

          {/* Challenges */}
          <motion.div variants={CARD_VARIANTS} className="col-span-1">
            <ScreenshotCard src={SCREENSHOTS.challenges} alt="Challenges" label="Challenges" />
          </motion.div>

          {/* Mind Center — col-span-2 */}
          <motion.div variants={CARD_VARIANTS} className="col-span-2">
            <ScreenshotCard src={SCREENSHOTS.mind} alt="Mind Center" label="Mind Center" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
