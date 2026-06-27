'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FadeUp } from '@/components/ui/FadeUp'
import { GoldButton } from '@/components/ui/GoldButton'
import { PhoneMockup } from '@/components/ui/PhoneMockup'
import { SCREENSHOTS } from '@/lib/screenshots'

function GooglePlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.18 23.76c.39.22.84.27 1.27.14l12.04-12.04-2.97-2.97L3.18 23.76zM21.5 10.65l-2.86-1.64-3.27 3.27 3.27 3.27 2.88-1.65c.82-.47.82-1.78-.02-2.25zM1.77.62C1.51.9 1.36 1.3 1.36 1.8v20.4c0 .5.15.9.41 1.18l.06.06L13.6 11.66v-.28L1.83.56l-.06.06zM14.32 8.95l-3.02-3.02L3.21.32c-.43-.13-.88-.08-1.27.14l10.35 10.35 2.03-1.86z" />
    </svg>
  )
}

function StatCard({
  emoji,
  label,
  sub,
  delay,
  className,
}: {
  emoji: string
  label: string
  sub: string
  delay: number
  className: string
}) {
  return (
    <motion.div
      className={`absolute p-3 rounded-2xl border border-gold/15 backdrop-blur-xl z-10 ${className}`}
      style={{ background: 'rgba(255,255,255,0.04)' }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <div className="text-xl mb-1">{emoji}</div>
      <div className="font-inter font-semibold text-white text-sm">{label}</div>
      <div className="font-inter text-white-muted text-xs">{sub}</div>
    </motion.div>
  )
}

export function Hero() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = bgRef.current
    if (!el) return
    const handleScroll = () => {
      el.style.backgroundPositionY = `${window.scrollY * 0.4}px`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* Radial gradient background */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(212,165,116,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full py-20">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* LEFT — 3 cols */}
          <div className="lg:col-span-3 space-y-6">
            <FadeUp delay={0}>
              <span className="font-mono text-[11px] text-gold uppercase tracking-widest">
                Personal Transformation OS
              </span>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1
                className="font-playfair text-white leading-tight"
                style={{ fontSize: 'clamp(48px, 6vw, 88px)' }}
              >
                Become the person
                <br />
                you were{' '}
                <span className="text-gold-gradient">built</span>
                <br />
                to be.
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p
                className="font-inter text-white-muted max-w-md leading-relaxed"
                style={{ fontSize: 17 }}
              >
                Atlas Ascend combines AI coaching, physique transformation,
                adaptive training, and deep nutrition intelligence into one
                system — built around you.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <GoldButton variant="solid" href="#" size="lg">
                  <GooglePlayIcon />
                  Get it on Google Play
                </GoldButton>
                <GoldButton variant="outline" href="#early-access" size="lg">
                  Join Early Access
                </GoldButton>
              </div>
            </FadeUp>

            <FadeUp delay={0.4}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <span className="text-gold text-sm">★★★★★</span>
                <span className="font-inter text-white-muted text-xs">
                  Built by a 30-year coaching veteran
                </span>
                <span className="text-white-dim text-xs">·</span>
                <span className="font-inter text-white-muted text-xs">
                  🔒 Your data stays yours
                </span>
              </div>
            </FadeUp>
          </div>

          {/* RIGHT — 2 cols */}
          <div className="lg:col-span-2 relative flex justify-center">
            {/* Background glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 80% 80% at center, rgba(212,165,116,0.12) 0%, transparent 70%)',
              }}
            />

            <div className="relative">
              <PhoneMockup
                src={SCREENSHOTS.home}
                alt="Atlas Ascend home screen"
                treatment="float"
                size="lg"
              />

              <StatCard
                emoji="🧠"
                label="AI Coach"
                sub="Context-aware"
                delay={0}
                className="-left-12 top-16"
              />
              <StatCard
                emoji="⚡"
                label="8 Systems"
                sub="All connected"
                delay={1}
                className="-right-8 top-8"
              />
              <StatCard
                emoji="🎯"
                label="92%"
                sub="Confidence score"
                delay={0.5}
                className="-right-4 bottom-24"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M4 7l6 6 6-6"
              stroke="#d4a574"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
        <span className="font-mono text-white-muted text-[10px] uppercase tracking-widest">
          Scroll to explore
        </span>
      </div>
    </section>
  )
}
