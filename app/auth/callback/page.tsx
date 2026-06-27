'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // createBrowserClient auto-detects #access_token or ?token_hash in the URL
    // and exchanges them for a session stored in cookies
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace('/admin')
      } else {
        router.replace('/admin/login')
      }
    })
  }, [router])

  return (
    <div
      style={{
        background: '#080808',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          color: '#d4a574',
          fontFamily: 'monospace',
          letterSpacing: '0.1em',
          fontSize: 14,
        }}
      >
        Signing in...
      </div>
    </div>
  )
}
