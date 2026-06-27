'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-browser'

interface HeroContent {
  label: string
  heading_line1: string
  heading_line2: string
  heading_line3: string
  subheading: string
  cta_primary: string
  cta_primary_url: string
  cta_secondary: string
}

const DEFAULT: HeroContent = {
  label: 'PERSONAL TRANSFORMATION OS',
  heading_line1: 'Become the person',
  heading_line2: 'you were built',
  heading_line3: 'to be.',
  subheading: 'Atlas Ascend combines AI coaching, physique transformation, adaptive training, and deep nutrition intelligence into one system — built around you.',
  cta_primary: 'Get it on Google Play',
  cta_primary_url: '#',
  cta_secondary: 'Join Early Access',
}

function Field({
  label,
  value,
  onChange,
  multiline = false,
  placeholder = '',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
  placeholder?: string
}) {
  const sharedStyle = {
    background: '#1a1a1a',
    border: '1px solid rgba(212,165,116,0.15)',
    color: '#fff',
  } as const

  const sharedClass = 'w-full text-sm rounded-lg px-4 py-3 focus:outline-none transition-colors'

  if (multiline) {
    return (
      <div className="mb-4">
        <label className="block text-white/50 text-xs mb-1.5">{label}</label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          placeholder={placeholder}
          className={sharedClass + ' resize-y'}
          style={sharedStyle}
          onFocus={(e) => { e.currentTarget.style.borderColor = '#d4a574' }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.15)' }}
        />
      </div>
    )
  }

  return (
    <div className="mb-4">
      <label className="block text-white/50 text-xs mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={sharedClass}
        style={sharedStyle}
        onFocus={(e) => { e.currentTarget.style.borderColor = '#d4a574' }}
        onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.15)' }}
      />
    </div>
  )
}

export default function AdminHero() {
  const [content, setContent] = useState<HeroContent>(DEFAULT)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<'success' | 'error' | null>(null)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from('website_content')
        .select('content')
        .eq('section', 'hero')
        .single()
      if (data?.content) setContent(data.content as HeroContent)
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

  const set = (key: keyof HeroContent) => (v: string) =>
    setContent((c) => ({ ...c, [key]: v }))

  const handleSave = async () => {
    setSaving(true)
    const supabase = createClient()
    const { error } = await supabase
      .from('website_content')
      .upsert({ section: 'hero', content, updated_at: new Date().toISOString() }, { onConflict: 'section' })
    setSaving(false)
    setToast(error ? 'error' : 'success')
  }

  if (loading) {
    return (
      <div className="p-8 text-white/40 text-sm">Loading...</div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-xl font-semibold">Hero Section</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="text-sm font-semibold px-6 py-2.5 rounded-lg transition-opacity disabled:opacity-60"
          style={{ background: '#d4a574', color: '#080808' }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="flex gap-6">
        {/* Edit Form */}
        <div className="flex-1">
          <div
            className="rounded-xl p-6"
            style={{ background: '#161616', border: '1px solid rgba(212,165,116,0.1)' }}
          >
            <div className="text-white/40 text-[11px] uppercase tracking-wider mb-5">Content</div>

            <Field label="Label (above heading)" value={content.label} onChange={set('label')} />
            <Field label="Heading Line 1" value={content.heading_line1} onChange={set('heading_line1')} />
            <Field label="Heading Line 2" value={content.heading_line2} onChange={set('heading_line2')} />
            <Field label="Heading Line 3" value={content.heading_line3} onChange={set('heading_line3')} />
            <Field label="Subheading" value={content.subheading} onChange={set('subheading')} multiline />
            <Field label="Primary Button Text" value={content.cta_primary} onChange={set('cta_primary')} />
            <Field label="Primary Button URL (Google Play)" value={content.cta_primary_url} onChange={set('cta_primary_url')} placeholder="https://play.google.com/store/apps/..." />
            <Field label="Secondary Button Text" value={content.cta_secondary} onChange={set('cta_secondary')} />
          </div>
        </div>

        {/* Live Preview */}
        <div className="w-80 flex-shrink-0">
          <div
            className="rounded-xl p-6 sticky top-8"
            style={{ background: '#161616', border: '1px solid rgba(212,165,116,0.1)' }}
          >
            <div className="text-white/40 text-[11px] uppercase tracking-wider mb-5">Preview</div>
            <div
              className="rounded-xl p-6"
              style={{ background: '#080808', border: '1px solid rgba(255,255,255,0.04)' }}
            >
              <div className="text-[#d4a574] text-[10px] font-mono uppercase tracking-widest mb-3">
                {content.label}
              </div>
              <div className="text-white font-semibold leading-snug mb-3" style={{ fontSize: 22 }}>
                {content.heading_line1}
                <br />
                {content.heading_line2}{' '}
                <span style={{ color: '#d4a574' }}>{content.heading_line3}</span>
              </div>
              <div className="text-white/50 text-xs leading-relaxed mb-4">
                {content.subheading}
              </div>
              <div className="flex flex-col gap-2">
                <div
                  className="text-center text-xs font-semibold py-2 rounded-lg"
                  style={{ background: '#d4a574', color: '#080808' }}
                >
                  {content.cta_primary}
                </div>
                <div
                  className="text-center text-xs font-semibold py-2 rounded-lg"
                  style={{ border: '1px solid #d4a574', color: '#d4a574' }}
                >
                  {content.cta_secondary}
                </div>
              </div>
              {content.cta_primary_url && content.cta_primary_url !== '#' && (
                <div className="mt-3 text-white/30 text-[10px] break-all">
                  URL: {content.cta_primary_url}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-6 right-6 px-5 py-4 rounded-xl text-sm font-medium"
          style={{
            background: '#161616',
            border: `1px solid ${toast === 'success' ? 'rgba(74,222,128,0.3)' : 'rgba(248,113,113,0.3)'}`,
            color: toast === 'success' ? '#4ade80' : '#f87171',
          }}
        >
          {toast === 'success' ? '✓ Hero section updated' : '✗ Failed to save. Try again.'}
        </div>
      )}
    </div>
  )
}
