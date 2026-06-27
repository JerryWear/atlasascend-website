'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-browser'

interface EarlyAccessContent {
  label: string
  heading: string
  subheading: string
  play_store_url: string
  form_label: string
}

interface Signup {
  email: string
  platform: string | null
  source: string | null
  created_at: string
}

const DEFAULT: EarlyAccessContent = {
  label: 'NOW AVAILABLE ON ANDROID',
  heading: 'Start your transformation.',
  subheading: 'Download Atlas Ascend on Google Play today. iOS coming soon — join the waitlist to be first.',
  play_store_url: '#',
  form_label: 'iOS early access — be first to know',
}

const INPUT_STYLE = {
  background: '#1a1a1a',
  border: '1px solid rgba(212,165,116,0.15)',
  color: '#fff',
} as const

const INPUT_CLASS = 'w-full text-sm rounded-lg px-4 py-3 focus:outline-none transition-colors'
const LABEL_CLASS = 'block text-white/50 text-xs mb-1.5'

export default function AdminEarlyAccess() {
  const [content, setContent] = useState<EarlyAccessContent>(DEFAULT)
  const [signups, setSignups] = useState<Signup[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const [contentResult, signupsResult] = await Promise.all([
        supabase
          .from('website_content')
          .select('content')
          .eq('section', 'early_access')
          .single(),
        supabase
          .from('early_access_signups')
          .select('email, platform, source, created_at')
          .order('created_at', { ascending: false })
          .limit(50),
      ])
      if (contentResult.data?.content) setContent(contentResult.data.content as EarlyAccessContent)
      if (signupsResult.data) setSignups(signupsResult.data as Signup[])
      setLoading(false)
    }
    load()
  }, [])

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(t)
    }
  }, [toast])

  const set = (key: keyof EarlyAccessContent) => (val: string) =>
    setContent((c) => ({ ...c, [key]: val }))

  const handleSave = async () => {
    setSaving(true)
    const supabase = createClient()
    const { error } = await supabase
      .from('website_content')
      .upsert({ section: 'early_access', content, updated_at: new Date().toISOString() }, { onConflict: 'section' })
    setSaving(false)
    setToast(error ? { msg: '✗ Failed to save. Try again.', type: 'error' } : { msg: '✓ Early access section updated', type: 'success' })
  }

  if (loading) return <div className="p-8 text-white/40 text-sm">Loading...</div>

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-xl font-semibold">Early Access</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="text-sm font-semibold px-6 py-2.5 rounded-lg transition-opacity disabled:opacity-60"
          style={{ background: '#d4a574', color: '#080808' }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Content Card */}
      <div
        className="rounded-xl p-6 mb-6"
        style={{ background: '#161616', border: '1px solid rgba(212,165,116,0.1)' }}
      >
        <div className="text-white/40 text-[11px] uppercase tracking-wider mb-5">Content</div>

        <div className="mb-4">
          <label className={LABEL_CLASS}>Label</label>
          <input
            type="text"
            value={content.label}
            onChange={(e) => set('label')(e.target.value)}
            className={INPUT_CLASS}
            style={INPUT_STYLE}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#d4a574' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.15)' }}
          />
        </div>

        <div className="mb-4">
          <label className={LABEL_CLASS}>Heading</label>
          <input
            type="text"
            value={content.heading}
            onChange={(e) => set('heading')(e.target.value)}
            className={INPUT_CLASS}
            style={INPUT_STYLE}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#d4a574' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.15)' }}
          />
        </div>

        <div className="mb-4">
          <label className={LABEL_CLASS}>Subheading</label>
          <textarea
            value={content.subheading}
            onChange={(e) => set('subheading')(e.target.value)}
            rows={3}
            className={INPUT_CLASS + ' resize-y'}
            style={INPUT_STYLE}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#d4a574' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.15)' }}
          />
        </div>

        <div className="mb-4">
          <label className={LABEL_CLASS}>Google Play URL</label>
          <input
            type="text"
            value={content.play_store_url}
            onChange={(e) => set('play_store_url')(e.target.value)}
            placeholder="https://play.google.com/store/apps/..."
            className={INPUT_CLASS}
            style={INPUT_STYLE}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#d4a574' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.15)' }}
          />
        </div>

        <div>
          <label className={LABEL_CLASS}>Form Label</label>
          <input
            type="text"
            value={content.form_label}
            onChange={(e) => set('form_label')(e.target.value)}
            className={INPUT_CLASS}
            style={INPUT_STYLE}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#d4a574' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.15)' }}
          />
        </div>
      </div>

      {/* Waitlist Signups Card */}
      <div
        className="rounded-xl p-6"
        style={{ background: '#161616', border: '1px solid rgba(212,165,116,0.1)' }}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="text-white/40 text-[11px] uppercase tracking-wider">Waitlist Signups</div>
          <div className="text-white/40 text-xs">
            {signups.length} {signups.length === 1 ? 'person' : 'people'} on the waitlist
          </div>
        </div>

        {signups.length === 0 ? (
          <div className="text-white/30 text-sm py-4 text-center">No signups yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left text-white/30 text-xs font-medium pb-3 pr-4">Email</th>
                  <th className="text-left text-white/30 text-xs font-medium pb-3 pr-4">Platform</th>
                  <th className="text-left text-white/30 text-xs font-medium pb-3 pr-4">Source</th>
                  <th className="text-left text-white/30 text-xs font-medium pb-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {signups.map((row, i) => (
                  <tr
                    key={i}
                    style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <td className="text-white text-sm py-3 pr-4">{row.email}</td>
                    <td className="text-white/40 text-xs py-3 pr-4">{row.platform ?? '—'}</td>
                    <td className="text-white/40 text-xs py-3 pr-4">{row.source ?? '—'}</td>
                    <td className="text-white/40 text-xs py-3">
                      {new Date(row.created_at).toLocaleDateString('en-GB')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {toast && (
        <div
          className="fixed bottom-6 right-6 px-5 py-4 rounded-xl text-sm font-medium z-50"
          style={{
            background: '#161616',
            border: `1px solid ${toast.type === 'success' ? 'rgba(74,222,128,0.3)' : 'rgba(248,113,113,0.3)'}`,
            color: toast.type === 'success' ? '#4ade80' : '#f87171',
          }}
        >
          {toast.msg}
        </div>
      )}
    </div>
  )
}
