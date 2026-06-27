'use client'

import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { WordReveal } from '@/components/ui/WordReveal'

interface FounderContent {
  name?: string
  title?: string
  years?: string
  years_label?: string
  para1?: string
  para2?: string
  para3?: string
  credentials?: string
}

export function FounderStory({ content }: { content?: unknown }) {
  const c = (content as FounderContent) ?? {}

  const name = c.name ?? 'Zirunas Michailovas'
  const title = c.title ?? 'Founder, Atlas Ascend'
  const years = c.years ?? '30+'
  const yearsLabel = c.years_label ?? 'Years of Coaching Experience'
  const credentials = (c.credentials ?? 'Personal Trainer · 30+ yrs, Nutrition Coach, Mindfulness Practitioner, Competition Judge, Platform Builder')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  const paragraphs = [
    c.para1 ?? 'For thirty years I stood on competition stages, trained alongside elite athletes, and guided hundreds of clients through the hardest transformations of their lives. I learned what works — and what always gets in the way.',
    c.para2 ?? "The gap between knowing and doing is enormous. Most people don't lack motivation. They lack a system that shows up every single day, remembers everything, and adjusts in real time to who they actually are. That's what I built Atlas Ascend to be.",
    c.para3 ?? "This isn't a fitness app. It's everything I know distilled into an intelligence layer — one that thinks like a coach, acts like one, and scales to meet you exactly where you are, whether you're starting over or chasing your next championship.",
  ]

  return (
    <section
      className="relative py-24 lg:py-32 px-6 lg:px-12 overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* Decorative background glow */}
      <div
        className="absolute top-0 left-0 w-1/2 h-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(212,165,116,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">

          {/* Left: 2 columns — credential card */}
          <motion.div
            className="lg:col-span-2 relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            {/* Decorative large number */}
            <div
              className="absolute -top-4 -left-4 font-playfair text-gold select-none pointer-events-none leading-none"
              style={{ fontSize: 200, opacity: 0.06, lineHeight: 1, zIndex: 0 }}
              aria-hidden="true"
            >
              {years.replace('+', '')}
            </div>

            <GlassCard className="relative p-8 lg:p-10" hover={false}>
              <div className="relative z-10">
                <div
                  className="font-playfair text-gold leading-none mb-1"
                  style={{ fontSize: 64 }}
                >
                  {years}
                </div>
                <div className="font-inter text-white/60 text-sm mb-8">
                  {yearsLabel}
                </div>

                {/* Credential pills */}
                <div className="flex flex-wrap gap-2">
                  {credentials.map((cred) => (
                    <span
                      key={cred}
                      className="font-mono text-[10px] uppercase tracking-wide px-3 py-1.5 rounded-full"
                      style={{
                        background: 'rgba(212,165,116,0.08)',
                        border: '1px solid rgba(212,165,116,0.2)',
                        color: 'rgba(212,165,116,0.8)',
                      }}
                    >
                      {cred}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Right: 3 columns — story */}
          <div className="lg:col-span-3 space-y-6">
            {/* Section label */}
            <motion.span
              className="font-mono text-[11px] text-gold uppercase tracking-widest block"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              The Founder
            </motion.span>

            {/* Heading */}
            <h2
              className="font-playfair text-white leading-tight"
              style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
            >
              <WordReveal text="Built by an athlete. For everybody." stagger={0.05} />
            </h2>

            {/* Story paragraphs */}
            <div className="space-y-5">
              {paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  className="font-inter text-white-muted leading-relaxed"
                  style={{ fontSize: 16 }}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                  viewport={{ once: true }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Animated gold separator */}
            <motion.div
              className="h-px"
              style={{
                background: 'linear-gradient(to right, #d4a574, rgba(212,165,116,0.2))',
              }}
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true }}
            />

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="font-playfair text-white text-xl">{name}</div>
              <div className="font-inter text-gold text-sm mt-1">{title}</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
