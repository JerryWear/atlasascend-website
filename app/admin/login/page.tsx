'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type State = 'idle' | 'loading' | 'sent' | 'error'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<State>('idle')
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get('error') === 'invalid_link') setState('error')
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || state === 'loading') return
    setState('loading')

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        emailRedirectTo: 'https://atlasascend.app/auth/callback',
      },
    })

    if (error) {
      setState('error')
    } else {
      setState('sent')
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: '#080808' }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-8"
        style={{
          background: '#161616',
          border: '1px solid rgba(212,165,116,0.15)',
        }}
      >
        {/* Logo */}
        <div className="text-center">
          <div className="font-mono text-[#d4a574] tracking-widest text-sm font-bold">
            ATLAS ASCEND
          </div>
          <div className="text-white/50 text-xs mt-1">Website Admin</div>
        </div>

        {/* Divider */}
        <div
          className="my-6"
          style={{ height: 1, background: 'rgba(212,165,116,0.2)' }}
        />

        {state === 'sent' ? (
          <div className="text-center py-4 space-y-2">
            <div className="text-[#d4a574] text-2xl">✓</div>
            <div className="text-white font-medium">Check your email</div>
            <div className="text-white/50 text-sm">
              We sent a magic link to {email}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/50 text-xs mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={state === 'loading'}
                className="w-full text-white text-sm rounded-lg px-4 py-3 focus:outline-none transition-colors disabled:opacity-50"
                style={{
                  background: '#1a1a1a',
                  border: '1px solid rgba(212,165,116,0.2)',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#d4a574' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.2)' }}
              />
            </div>

            <button
              type="submit"
              disabled={state === 'loading'}
              className="w-full py-3 rounded-lg text-sm font-semibold transition-opacity disabled:opacity-60"
              style={{ background: '#d4a574', color: '#080808' }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
            >
              {state === 'loading' ? 'Sending...' : 'Send Magic Link'}
            </button>

            {state === 'error' && (
              <p className="text-red-400 text-xs text-center">
                An error occurred. Please try again.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  )
}
