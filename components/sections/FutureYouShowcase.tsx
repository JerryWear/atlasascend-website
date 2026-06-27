'use client'

import { motion } from 'framer-motion'
import { FadeUp } from '@/components/ui/FadeUp'
import { GoldButton } from '@/components/ui/GoldButton'
import { PhoneMockup } from '@/components/ui/PhoneMockup'
import { SCREENSHOTS } from '@/lib/screenshots'

const STATS = [
  { icon: '🪪', label: 'Identity Preserved', sub: 'Realistic to your body' },
  { icon: '📊', label: 'Realistic Results', sub: 'Data-driven predictions' },
  { icon: '🗺️', label: 'Full Blueprint Included', sub: 'Exact plan to get there' },
]

export function FutureYouShowcase() {
  return (
    <section id="future-you" className="py-32 px-6 lg:px-12 overflow-hidden" style={{ background: '#080808' }}>
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <FadeUp className="text-center space-y-4 mb-16">
          <span className="font-mono text-[11px] text-gold uppercase tracking-widest block">
            Signature Feature
          </span>
          <h2
            className="font-playfair text-white leading-tight"
            style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}
          >
            From who you are.
            <br />
            To who you will be.
          </h2>
          <p
            className="font-inter text-white-muted max-w-xl mx-auto leading-relaxed"
            style={{ fontSize: 18 }}
          >
            Upload your photos. Define your goal. Atlas generates a
            photorealistic AI preview of your transformed physique — then
            builds the exact blueprint to get you there.
          </p>
        </FadeUp>

        {/* Before / After */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12">
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            style={{ rotate: -3 }}
          >
            <span className="font-mono text-white-muted text-xs uppercase tracking-widest">
              Before
            </span>
            <PhoneMockup src={SCREENSHOTS.home} alt="Before" treatment="reveal" size="lg" />
          </motion.div>

          {/* Arrow */}
          <motion.div
            animate={{ x: [-4, 4, -4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-gold flex-shrink-0"
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path
                d="M8 24h32M28 12l12 12-12 12"
                stroke="#d4a574"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            style={{ rotate: 3 }}
          >
            <span className="font-mono text-gold text-xs uppercase tracking-widest">
              Future You™
            </span>
            <div style={{ border: '2px solid #d4a574', borderRadius: 46 }}>
              <PhoneMockup
                src={SCREENSHOTS.futureYou}
                alt="Future You"
                treatment="glow"
                size="lg"
              />
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row justify-center gap-12 mt-16">
          {STATS.map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.1} className="text-center">
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="font-inter text-white font-semibold text-sm">{s.label}</div>
              <div className="font-inter text-white-muted text-xs mt-1">{s.sub}</div>
            </FadeUp>
          ))}
        </div>

        {/* CTA */}
        <FadeUp delay={0.3} className="flex justify-center mt-10">
          <GoldButton variant="solid" href="#early-access" size="lg">
            Create Your Future Self →
          </GoldButton>
        </FadeUp>
      </div>
    </section>
  )
}
