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

function ScreenshotOrPlaceholder({
  src,
  alt,
  className = '',
}: {
  src: string
  alt: string
  className?: string
}) {
  const [error, setError] = useState(false)
  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-black-3 border border-gold/20 rounded-xl ${className}`}
      >
        <span className="font-mono text-gold/50 text-xs text-center p-2">{alt}</span>
      </div>
    )
  }
  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-top"
        onError={() => setError(true)}
      />
    </div>
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
                    <AnimatedCounter value={87} duration={2.5} />
                  </div>
                  <div className="font-inter text-white-muted text-xs mt-1">
                    Today&apos;s transformation score
                  </div>
                </div>
              </div>
              <div className="hidden lg:flex items-center justify-center flex-shrink-0">
                <PhoneMockup src={SCREENSHOTS.home} alt="Atlas Brain" treatment="glow" size="sm" />
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
            <GlassCard className="h-full p-4 flex flex-col justify-between overflow-hidden">
              <span className="font-mono text-[10px] text-gold/70 uppercase tracking-widest">
                Training Engine
              </span>
              <ScreenshotOrPlaceholder
                src={SCREENSHOTS.training}
                alt="Training"
                className="flex-1 mt-2"
              />
            </GlassCard>
          </motion.div>

          {/* Nutrition */}
          <motion.div variants={CARD_VARIANTS} className="col-span-1">
            <GlassCard className="h-full p-4 flex flex-col justify-between overflow-hidden">
              <span className="font-mono text-[10px] text-gold/70 uppercase tracking-widest">
                Nutrition
              </span>
              <ScreenshotOrPlaceholder
                src={SCREENSHOTS.nutrition}
                alt="Nutrition"
                className="flex-1 mt-2"
              />
            </GlassCard>
          </motion.div>

          {/* Vision Board */}
          <motion.div variants={CARD_VARIANTS} className="col-span-1">
            <GlassCard className="h-full p-4 flex flex-col justify-between overflow-hidden">
              <span className="font-mono text-[10px] text-gold/70 uppercase tracking-widest">
                Vision Board
              </span>
              <ScreenshotOrPlaceholder
                src={SCREENSHOTS.visionBoard}
                alt="Vision Board"
                className="flex-1 mt-2"
              />
            </GlassCard>
          </motion.div>

          {/* Challenges */}
          <motion.div variants={CARD_VARIANTS} className="col-span-1">
            <GlassCard className="h-full p-4 flex flex-col justify-between overflow-hidden">
              <span className="font-mono text-[10px] text-gold/70 uppercase tracking-widest">
                Challenges
              </span>
              <ScreenshotOrPlaceholder
                src={SCREENSHOTS.challenges}
                alt="Challenges"
                className="flex-1 mt-2"
              />
            </GlassCard>
          </motion.div>

          {/* Mind Center — col-span-2 */}
          <motion.div variants={CARD_VARIANTS} className="col-span-2">
            <GlassCard className="h-full p-4 overflow-hidden">
              <span className="font-mono text-[10px] text-gold/70 uppercase tracking-widest">
                Mind Center
              </span>
              <ScreenshotOrPlaceholder
                src={SCREENSHOTS.mind}
                alt="Mind Center"
                className="h-32 mt-2"
              />
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
