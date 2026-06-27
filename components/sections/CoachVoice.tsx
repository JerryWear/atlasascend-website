import { FadeUp } from '@/components/ui/FadeUp'

interface QuoteContent {
  quote?: string
  name?: string
  title?: string
  credentials?: string
}

export function CoachVoice({ content }: { content?: unknown }) {
  const c = (content as QuoteContent) ?? {}

  return (
    <section
      className="relative py-32 px-6 lg:px-12 text-center overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* Decorative oversized quote mark */}
      <div
        className="absolute top-8 left-1/2 -translate-x-1/2 font-playfair text-gold pointer-events-none select-none"
        style={{ fontSize: 180, lineHeight: 1, opacity: 0.06 }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      <div className="relative max-w-4xl mx-auto">
        <FadeUp duration={1.2}>
          <blockquote
            className="font-playfair text-white leading-relaxed italic"
            style={{ fontSize: 'clamp(22px, 2.8vw, 38px)' }}
          >
            &ldquo;{c.quote ?? 'I built Atlas Ascend because my clients deserved more than a spreadsheet and a WhatsApp message. They deserved a system that thinks like a coach, remembers everything, and shows up every single day.'}&rdquo;
          </blockquote>
        </FadeUp>

        <FadeUp delay={0.4} className="mt-10">
          <div
            className="mx-auto mb-6"
            style={{ width: 60, height: 1, background: '#d4a574' }}
          />
          <div className="font-inter text-white font-semibold text-lg">
            {c.name ?? 'Žyrunas Michailovas'}
          </div>
          <div className="font-inter text-gold text-sm mt-1">
            {c.title ?? 'Founder, Atlas Ascend · 30+ Years Coaching'}
          </div>
          <div className="font-inter text-white-muted text-xs mt-2 leading-relaxed">
            {c.credentials ?? 'Certified Personal Trainer · Nutrition Coach · Mindfulness Practitioner · Competition Judge'}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
