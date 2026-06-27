'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-browser'

interface FooterContent {
  tagline: string
  sub_tagline: string
  copyright: string
  built_by: string
  google_play_url: string
}

const DEFAULT: FooterContent = {
  tagline: 'Personal Transformation OS',
  sub_tagline: 'Built by a coach. Powered by AI.',
  copyright: '© 2026 Atlas Ascend. All rights reserved.',
  built_by: 'Built by Žyrunas Michailovas',
  google_play_url: '',
}

const INPUT_STYLE = {
  background: '#1a1a1a',
  border: '1px solid rgba(212,165,116,0.15)',
  color: '#fff',
} as const

const INPUT_CLASS = 'w-full text-sm rounded-lg px-4 py-3 focus:outline-none transition-colors'
const LABEL_CLASS = 'block text-white/50 text-xs mb-1.5'

export default function AdminFooter() {
  const [content, setContent] = useState<FooterContent>(DEFAULT)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from('website_content')
        .select('content')
        .eq('section', 'footer')
        .single()
      if (data?.content) setContent(data.content as FooterContent)
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

  const set = (key: keyof FooterContent) => (val: string) =>
    setContent((c) => ({ ...c, [key]: val }))

  const handleSave = async () => {
    setSaving(true)
    const supabase = createClient()
    const { error } = await supabase
      .from('website_content')
      .upsert({ section: 'footer', content, updated_at: new Date().toISOString() }, { onConflict: 'section' })
    setSaving(false)
    setToast(error ? { msg: '✗ Failed to save. Try again.', type: 'error' } : { msg: '✓ Footer updated', type: 'success' })
  }

  if (loading) return <div className="p-8 text-white/40 text-sm">Loading...</div>

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-xl font-semibold">Footer</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="text-sm font-semibold px-6 py-2.5 rounded-lg transition-opacity disabled:opacity-60"
          style={{ background: '#d4a574', color: '#080808' }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div
        className="rounded-xl p-6"
        style={{ background: '#161616', border: '1px solid rgba(212,165,116,0.1)' }}
      >
        <div className="text-white/40 text-[11px] uppercase tracking-wider mb-5">Content</div>

        <div className="mb-4">
          <label className={LABEL_CLASS}>Tagline</label>
          <input
            type="text"
            value={content.tagline}
            onChange={(e) => set('tagline')(e.target.value)}
            className={INPUT_CLASS}
            style={INPUT_STYLE}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#d4a574' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.15)' }}
          />
        </div>

        <div className="mb-4">
          <label className={LABEL_CLASS}>Sub Tagline</label>
          <input
            type="text"
            value={content.sub_tagline}
            onChange={(e) => set('sub_tagline')(e.target.value)}
            className={INPUT_CLASS}
            style={INPUT_STYLE}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#d4a574' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.15)' }}
          />
        </div>

        <div className="mb-4">
          <label className={LABEL_CLASS}>Copyright</label>
          <input
            type="text"
            value={content.copyright}
            onChange={(e) => set('copyright')(e.target.value)}
            className={INPUT_CLASS}
            style={INPUT_STYLE}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#d4a574' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.15)' }}
          />
        </div>

        <div className="mb-4">
          <label className={LABEL_CLASS}>Built By</label>
          <input
            type="text"
            value={content.built_by}
            onChange={(e) => set('built_by')(e.target.value)}
            className={INPUT_CLASS}
            style={INPUT_STYLE}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#d4a574' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.15)' }}
          />
        </div>

        <div>
          <label className={LABEL_CLASS}>Google Play URL</label>
          <input
            type="url"
            value={content.google_play_url}
            onChange={(e) => set('google_play_url')(e.target.value)}
            placeholder="https://play.google.com/apps/internaltest/..."
            className={INPUT_CLASS}
            style={INPUT_STYLE}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#d4a574' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.15)' }}
          />
        </div>
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
