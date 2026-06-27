'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-browser'

interface FounderContent {
  name: string
  title: string
  years: string
  years_label: string
  para1: string
  para2: string
  para3: string
  credentials: string
}

const DEFAULT: FounderContent = {
  name: 'Zirunas Michailovas',
  title: 'Founder, Atlas Ascend',
  years: '30+',
  years_label: 'Years of Coaching Experience',
  para1: 'For thirty years I stood on competition stages, trained alongside elite athletes, and guided hundreds of clients through the hardest transformations of their lives. I learned what works — and what always gets in the way.',
  para2: "The gap between knowing and doing is enormous. Most people don't lack motivation. They lack a system that shows up every single day, remembers everything, and adjusts in real time to who they actually are. That's what I built Atlas Ascend to be.",
  para3: "This isn't a fitness app. It's everything I know distilled into an intelligence layer — one that thinks like a coach, acts like one, and scales to meet you exactly where you are, whether you're starting over or chasing your next championship.",
  credentials: 'Personal Trainer · 30+ yrs, Nutrition Coach, Mindfulness Practitioner, Competition Judge, Platform Builder',
}

const INPUT_STYLE = {
  background: '#1a1a1a',
  border: '1px solid rgba(212,165,116,0.15)',
  color: '#fff',
} as const

const INPUT_CLASS = 'w-full text-sm rounded-lg px-4 py-3 focus:outline-none transition-colors'
const LABEL_CLASS = 'block text-white/50 text-xs mb-1.5'

export default function AdminFounder() {
  const [content, setContent] = useState<FounderContent>(DEFAULT)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from('website_content')
        .select('content')
        .eq('section', 'founder')
        .single()
      if (data?.content) setContent(data.content as FounderContent)
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

  const set = (key: keyof FounderContent) => (val: string) =>
    setContent((c) => ({ ...c, [key]: val }))

  const handleSave = async () => {
    setSaving(true)
    const supabase = createClient()
    const { error } = await supabase
      .from('website_content')
      .upsert({ section: 'founder', content, updated_at: new Date().toISOString() }, { onConflict: 'section' })
    setSaving(false)
    setToast(error ? { msg: '✗ Failed to save. Try again.', type: 'error' } : { msg: '✓ Founder story updated', type: 'success' })
  }

  if (loading) return <div className="p-8 text-white/40 text-sm">Loading...</div>

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-xl font-semibold">Founder Story</h1>
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
        className="rounded-xl p-6 space-y-4"
        style={{ background: '#161616', border: '1px solid rgba(212,165,116,0.1)' }}
      >
        <div className="text-white/40 text-[11px] uppercase tracking-wider mb-1">Identity</div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={LABEL_CLASS}>Name</label>
            <input
              type="text"
              value={content.name}
              onChange={(e) => set('name')(e.target.value)}
              className={INPUT_CLASS}
              style={INPUT_STYLE}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#d4a574' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.15)' }}
            />
          </div>
          <div>
            <label className={LABEL_CLASS}>Title</label>
            <input
              type="text"
              value={content.title}
              onChange={(e) => set('title')(e.target.value)}
              className={INPUT_CLASS}
              style={INPUT_STYLE}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#d4a574' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.15)' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={LABEL_CLASS}>Years (number)</label>
            <input
              type="text"
              value={content.years}
              onChange={(e) => set('years')(e.target.value)}
              className={INPUT_CLASS}
              style={INPUT_STYLE}
              placeholder="30+"
              onFocus={(e) => { e.currentTarget.style.borderColor = '#d4a574' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.15)' }}
            />
          </div>
          <div>
            <label className={LABEL_CLASS}>Years Label</label>
            <input
              type="text"
              value={content.years_label}
              onChange={(e) => set('years_label')(e.target.value)}
              className={INPUT_CLASS}
              style={INPUT_STYLE}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#d4a574' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.15)' }}
            />
          </div>
        </div>

        <div>
          <label className={LABEL_CLASS}>
            Credential Pills <span className="text-white/25">(comma-separated)</span>
          </label>
          <input
            type="text"
            value={content.credentials}
            onChange={(e) => set('credentials')(e.target.value)}
            className={INPUT_CLASS}
            style={INPUT_STYLE}
            placeholder="Personal Trainer · 30+ yrs, Nutrition Coach, ..."
            onFocus={(e) => { e.currentTarget.style.borderColor = '#d4a574' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.15)' }}
          />
        </div>
      </div>

      <div
        className="rounded-xl p-6 space-y-4 mt-4"
        style={{ background: '#161616', border: '1px solid rgba(212,165,116,0.1)' }}
      >
        <div className="text-white/40 text-[11px] uppercase tracking-wider mb-1">Story Paragraphs</div>

        {(['para1', 'para2', 'para3'] as const).map((key, i) => (
          <div key={key}>
            <label className={LABEL_CLASS}>Paragraph {i + 1}</label>
            <textarea
              value={content[key]}
              onChange={(e) => set(key)(e.target.value)}
              rows={4}
              className={INPUT_CLASS + ' resize-y'}
              style={INPUT_STYLE}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#d4a574' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.15)' }}
            />
          </div>
        ))}
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
