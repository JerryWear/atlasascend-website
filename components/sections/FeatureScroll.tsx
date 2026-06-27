'use client'

import { useRef, useLayoutEffect, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PhoneMockup } from '@/components/ui/PhoneMockup'
import { SCREENSHOTS } from '@/lib/screenshots'

gsap.registerPlugin(ScrollTrigger)

type Treatment = 'float' | 'glow' | 'scroll' | 'reveal'

interface Card {
  label: string
  title: string
  description: string
  bullets: string[]
  screenshot: string
  treatment: Treatment
}

const CARDS: Card[] = [
  {
    label: 'INTELLIGENCE',
    title: 'Your coach.\nAlways on.',
    description:
      'Atlas knows your training history, nutrition, sleep, and goals. Every response is built around your actual data.',
    bullets: ['Full client profile injection', '7-day pattern awareness', 'Reasoning panel'],
    screenshot: SCREENSHOTS.coaching,
    treatment: 'reveal',
  },
  {
    label: 'PHYSIQUE ARCHITECT',
    title: "See who you're\nbecoming.",
    description:
      'Upload your photos, define your goal. Atlas generates a realistic AI preview of your transformed physique.',
    bullets: ['Image-to-image AI transformation', 'Full transformation roadmap', '92% confidence scoring'],
    screenshot: SCREENSHOTS.futureYou,
    treatment: 'glow',
  },
  {
    label: 'TRANSFORMATION SCORE',
    title: 'One score.\nEverything measured.',
    description:
      'The Atlas Brain synthesises training, nutrition, sleep, mindset, and recovery into a single daily score.',
    bullets: ['8 intelligence domains', 'Pattern recognition engine', 'Proactive coaching nudges'],
    screenshot: SCREENSHOTS.home,
    treatment: 'glow',
  },
  {
    label: 'TRAINING ENGINE',
    title: 'Programs that\nevolve with you.',
    description:
      'Every workout adapts based on performance, recovery, and goals. Video-guided, progressive overload built in.',
    bullets: ['488 exercises with video', 'Auto-progression logic', 'Coach-assigned programs'],
    screenshot: SCREENSHOTS.training,
    treatment: 'reveal',
  },
  {
    label: 'NUTRITION ENGINE',
    title: 'Precision nutrition,\nnot guesswork.',
    description:
      'Structured meal plans with individual ingredients, exact macros, and AI-generated adjustments.',
    bullets: ['236-food database', 'Ingredient-level tracking', 'AI macro optimisation'],
    screenshot: SCREENSHOTS.nutrition,
    treatment: 'reveal',
  },
  {
    label: 'MIND CENTER',
    title: 'Your life\nby design.',
    description:
      'Build a visual vision board across 9 life categories. Atlas analyses your board and coaches you toward it.',
    bullets: ['9 life categories', 'Atlas board analysis', 'Daily affirmation pull'],
    screenshot: SCREENSHOTS.visionBoard,
    treatment: 'reveal',
  },
  {
    label: 'CHALLENGES',
    title: 'Compete.\nStreak. Win.',
    description:
      '60+ challenges from beginner to elite. Daily check-ins, streak tracking, leaderboards.',
    bullets: ['60+ challenges', 'Daily streak system', 'Coach-curated content'],
    screenshot: SCREENSHOTS.challenges,
    treatment: 'reveal',
  },
  {
    label: 'MINDFULNESS',
    title: 'Train your mind\nlike your body.',
    description:
      'AI-generated meditation sessions voiced personally for you. Sleep, focus, stress relief — on demand.',
    bullets: ['Personalized AI scripts', 'Voice-generated sessions', 'Atlas Sounds library'],
    screenshot: SCREENSHOTS.mind,
    treatment: 'reveal',
  },
]

function FeatureCard({ card }: { card: Card }) {
  return (
    <div className="w-[100vw] lg:w-[600px] h-screen flex-shrink-0 px-8 lg:px-16 py-20 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
      {/* Content */}
      <div className="lg:w-1/2 space-y-4 order-2 lg:order-1">
        <span className="font-mono text-[10px] text-gold/70 uppercase tracking-widest block">
          {card.label}
        </span>
        <h3
          className="font-playfair text-white leading-snug whitespace-pre-line"
          style={{ fontSize: 'clamp(28px, 3vw, 42px)' }}
        >
          {card.title}
        </h3>
        <p className="font-inter text-white-muted text-sm max-w-xs leading-relaxed">
          {card.description}
        </p>
        <ul className="space-y-2 pt-2">
          {card.bullets.map((b) => (
            <li key={b} className="flex items-center gap-2 font-inter text-white text-sm">
              <span className="text-gold font-bold">✓</span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* Phone */}
      <div className="flex-shrink-0 flex justify-center order-1 lg:order-2">
        <PhoneMockup
          src={card.screenshot}
          alt={card.label}
          treatment={card.treatment}
          size="md"
        />
      </div>
    </div>
  )
}

interface CMSCard {
  label: string
  title: string
  description: string
  bullets: string[]
}

export function FeatureScroll({ cards: cmsCards }: { cards?: CMSCard[] }) {
  const ACTIVE_CARDS = cmsCards && cmsCards.length === 8
    ? cmsCards.map((c, i) => ({
        ...CARDS[i],
        label: c.label,
        title: c.title,
        description: c.description,
        bullets: c.bullets,
      }))
    : CARDS

  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [activeCard, setActiveCard] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useLayoutEffect(() => {
    if (isMobile) return

    const ctx = gsap.context(() => {
      const track = trackRef.current
      const section = sectionRef.current
      if (!track || !section) return

      const totalScroll = track.scrollWidth - window.innerWidth + 120

      gsap.to(track, {
        x: () => -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalScroll * 1.2}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress
            if (progressRef.current) {
              progressRef.current.style.width = `${progress * 100}%`
            }
            setActiveCard(
              Math.min(ACTIVE_CARDS.length - 1, Math.floor(progress * ACTIVE_CARDS.length))
            )
          },
        },
      })
    })

    return () => ctx.revert()
  }, [isMobile])

  if (isMobile) {
    return (
      <section className="py-16 px-6" style={{ background: '#080808' }}>
        <div className="space-y-24">
          {ACTIVE_CARDS.map((card) => (
            <div key={card.label} className="flex flex-col items-center gap-8">
              <PhoneMockup
                src={card.screenshot}
                alt={card.label}
                treatment="reveal"
                size="sm"
              />
              <div className="space-y-3 text-center">
                <span className="font-mono text-[10px] text-gold/70 uppercase tracking-widest block">
                  {card.label}
                </span>
                <h3 className="font-playfair text-white text-2xl leading-snug whitespace-pre-line">
                  {card.title}
                </h3>
                <p className="font-inter text-white-muted text-sm leading-relaxed">
                  {card.description}
                </p>
                <ul className="space-y-2 pt-2">
                  {card.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-center justify-center gap-2 text-white text-sm"
                    >
                      <span className="text-gold">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="feature-scroll-section relative"
      style={{ background: '#080808' }}
    >
      <div ref={trackRef} className="flex will-change-transform">
        {ACTIVE_CARDS.map((card) => (
          <FeatureCard key={card.label} card={card} />
        ))}
      </div>

      {/* Progress bar + dot indicators */}
      <div className="absolute bottom-8 left-0 right-0 px-16">
        <div className="relative h-px bg-white-dim/30 rounded-full mb-4 overflow-hidden">
          <div
            ref={progressRef}
            className="absolute left-0 top-0 h-full bg-gold rounded-full"
            style={{ width: '0%' }}
          />
        </div>
        <div className="flex justify-center gap-2">
          {ACTIVE_CARDS.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeCard ? 20 : 6,
                height: 6,
                background: i === activeCard ? '#d4a574' : '#404040',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
