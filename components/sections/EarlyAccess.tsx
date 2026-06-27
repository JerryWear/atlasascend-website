'use client'

import { useState } from 'react'
import { FadeUp } from '@/components/ui/FadeUp'
import { GoldButton } from '@/components/ui/GoldButton'
import { GlassCard } from '@/components/ui/GlassCard'
import { supabase } from '@/lib/supabase'

function GooglePlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.18 23.76c.39.22.84.27 1.27.14l12.04-12.04-2.97-2.97L3.18 23.76zM21.5 10.65l-2.86-1.64-3.27 3.27 3.27 3.27 2.88-1.65c.82-.47.82-1.78-.02-2.25zM1.77.62C1.51.9 1.36 1.3 1.36 1.8v20.4c0 .5.15.9.41 1.18l.06.06L13.6 11.66v-.28L1.83.56l-.06.06zM14.32 8.95l-3.02-3.02L3.21.32c-.43-.13-.88-.08-1.27.14l10.35 10.35 2.03-1.86z" />
    </svg>
  )
}

type FormState = 'idle' | 'loading' | 'success' | 'duplicate' | 'error'

function EmailForm() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<FormState>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || state === 'loading') return

    setState('loading')

    const { error } = await supabase
      .from('early_access_signups')
      .insert({ email: email.trim().toLowerCase(), platform: 'ios', source: 'website' })

    if (!error) {
      setState('success')
    } else if (error.code === '23505') {
      setState('duplicate')
    } else {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="text-center py-4 space-y-2">
        <div className="font-playfair text-gold text-xl">✓ You&apos;re on the list.</div>
        <div className="font-inter text-white-muted text-sm">
          We&apos;ll reach out when iOS launches.
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="font-inter text-white-muted text-xs mb-3">
        iOS early access — be first to know
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 bg-black-3 text-white font-inter text-sm rounded-full px-5 py-3 border border-white-dim/30 focus:border-gold focus:outline-none placeholder:text-white-muted transition-colors"
        />
        <GoldButton type="submit" variant="solid" size="sm">
          {state === 'loading' ? '...' : 'Notify Me'}
        </GoldButton>
      </div>
      {state === 'duplicate' && (
        <p className="font-inter text-gold/80 text-xs text-center">
          Already signed up! We&apos;ll be in touch.
        </p>
      )}
      {state === 'error' && (
        <p className="font-inter text-red-400 text-xs text-center">
          Something went wrong. Try again.
        </p>
      )}
      <div className="flex justify-center gap-6 pt-2">
        {['🔒 Private & secure', '✓ No spam ever', '📱 iOS coming soon'].map((t) => (
          <span key={t} className="font-inter text-white-muted text-xs">
            {t}
          </span>
        ))}
      </div>
    </form>
  )
}

export function EarlyAccess() {
  return (
    <section
      id="early-access"
      className="relative py-32 px-6 lg:px-12 text-center overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(212,165,116,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-2xl mx-auto space-y-8">
        <FadeUp>
          <span className="font-mono text-[11px] text-gold uppercase tracking-widest">
            Now Available on Android
          </span>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2
            className="font-playfair text-gold-gradient leading-tight"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
          >
            Start your
            <br />
            transformation.
          </h2>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p
            className="font-inter text-white-muted max-w-lg mx-auto leading-relaxed"
            style={{ fontSize: 18 }}
          >
            Download Atlas Ascend on Google Play today. iOS coming soon — join
            the waitlist to be first.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="flex flex-wrap justify-center gap-4">
            <GoldButton variant="solid" href="#" size="lg">
              <GooglePlayIcon />
              Get it on Google Play
            </GoldButton>
            <GoldButton variant="outline" href="#early-access" size="lg">
              🍎 Join iOS Waitlist
            </GoldButton>
          </div>
        </FadeUp>

        <FadeUp delay={0.4}>
          <GlassCard className="p-6 max-w-md mx-auto text-left">
            <EmailForm />
          </GlassCard>
        </FadeUp>
      </div>
    </section>
  )
}
