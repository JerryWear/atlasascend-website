'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password || state === 'loading') return
    setState('loading')

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    })

    if (error) {
      setState('error')
    } else {
      router.replace('/admin')
    }
  }

  const inputStyle = {
    background: '#1a1a1a',
    border: '1px solid rgba(212,165,116,0.2)',
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: '#080808' }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-8"
        style={{ background: '#161616', border: '1px solid rgba(212,165,116,0.15)' }}
      >
        <div className="text-center">
          <div className="font-mono text-[#d4a574] tracking-widest text-sm font-bold">
            ATLAS ASCEND
          </div>
          <div className="text-white/50 text-xs mt-1">Website Admin</div>
        </div>

        <div className="my-6" style={{ height: 1, background: 'rgba(212,165,116,0.2)' }} />

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
              className="w-full text-white text-sm rounded-lg px-4 py-3 focus:outline-none disabled:opacity-50"
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#d4a574' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.2)' }}
            />
          </div>

          <div>
            <label className="block text-white/50 text-xs mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={state === 'loading'}
              className="w-full text-white text-sm rounded-lg px-4 py-3 focus:outline-none disabled:opacity-50"
              style={inputStyle}
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
            {state === 'loading' ? 'Signing in...' : 'Sign In'}
          </button>

          {state === 'error' && (
            <p className="text-red-400 text-xs text-center">
              Invalid email or password.
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
