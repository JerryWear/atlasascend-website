'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-browser'

interface StatsContent {
  stat1_value: string
  stat1_label: string
  stat1_desc: string
  stat2_value: string
  stat2_label: string
  stat2_desc: string
  stat3_value: string
  stat3_label: string
  stat3_desc: string
  stat4_value: string
  stat4_label: string
  stat4_desc: string
}

const DEFAULT: StatsContent = {
  stat1_value: '30+',
  stat1_label: 'Years Coaching',
  stat1_desc: 'Experience',
  stat2_value: '8',
  stat2_label: 'Intelligence',
  stat2_desc: 'Systems Built',
  stat3_value: '60+',
  stat3_label: 'Challenges',
  stat3_desc: 'Built In',
  stat4_value: '1',
  stat4_label: 'Platform',
  stat4_desc: 'for Everything',
}

const INPUT_STYLE = {
  background: '#1a1a1a',
  border: '1px solid rgba(212,165,116,0.15)',
  color: '#fff',
} as const

const INPUT_CLASS = 'w-full text-sm rounded-lg px-4 py-3 focus:outline-none transition-colors'
const LABEL_CLASS = 'block text-white/50 text-xs mb-1.5'

function StatCard({
  number,
  valueKey,
  labelKey,
  descKey,
  content,
  onChange,
}: {
  number: number
  valueKey: keyof StatsContent
  labelKey: keyof StatsContent
  descKey: keyof StatsContent
  content: StatsContent
  onChange: (key: keyof StatsContent, val: string) => void
}) {
  return (
    <div
      className="rounded-xl p-6"
      style={{ background: '#161616', border: '1px solid rgba(212,165,116,0.1)' }}
    >
      <div className="text-white/40 text-[11px] uppercase tracking-wider mb-4">
        Stat {number}
      </div>
      <div className="mb-4">
        <label className={LABEL_CLASS}>Value (e.g. &quot;30+&quot;)</label>
        <input
          type="text"
          value={content[valueKey]}
          onChange={(e) => onChange(valueKey, e.target.value)}
          className={INPUT_CLASS}
          style={INPUT_STYLE}
          onFocus={(e) => { e.currentTarget.style.borderColor = '#d4a574' }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.15)' }}
        />
      </div>
      <div className="mb-4">
        <label className={LABEL_CLASS}>Label</label>
        <input
          type="text"
          value={content[labelKey]}
          onChange={(e) => onChange(labelKey, e.target.value)}
          className={INPUT_CLASS}
          style={INPUT_STYLE}
          onFocus={(e) => { e.currentTarget.style.borderColor = '#d4a574' }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.15)' }}
        />
      </div>
      <div>
        <label className={LABEL_CLASS}>Description</label>
        <input
          type="text"
          value={content[descKey]}
          onChange={(e) => onChange(descKey, e.target.value)}
          className={INPUT_CLASS}
          style={INPUT_STYLE}
          onFocus={(e) => { e.currentTarget.style.borderColor = '#d4a574' }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.15)' }}
        />
      </div>
    </div>
  )
}

export default function AdminStats() {
  const [content, setContent] = useState<StatsContent>(DEFAULT)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from('website_content')
        .select('content')
        .eq('section', 'stats')
        .single()
      if (data?.content) setContent(data.content as StatsContent)
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

  const handleChange = (key: keyof StatsContent, val: string) => {
    setContent((c) => ({ ...c, [key]: val }))
  }

  const handleSave = async () => {
    setSaving(true)
    const supabase = createClient()
    const { error } = await supabase
      .from('website_content')
      .upsert({ section: 'stats', content, updated_at: new Date().toISOString() }, { onConflict: 'section' })
    setSaving(false)
    setToast(error ? { msg: '✗ Failed to save. Try again.', type: 'error' } : { msg: '✓ Stats updated', type: 'success' })
  }

  if (loading) return <div className="p-8 text-white/40 text-sm">Loading...</div>

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-xl font-semibold">Stats Bar</h1>
          <p className="text-white/40 text-sm mt-1">Edit the 4 animated counters</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="text-sm font-semibold px-6 py-2.5 rounded-lg transition-opacity disabled:opacity-60"
          style={{ background: '#d4a574', color: '#080808' }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard
          number={1}
          valueKey="stat1_value"
          labelKey="stat1_label"
          descKey="stat1_desc"
          content={content}
          onChange={handleChange}
        />
        <StatCard
          number={2}
          valueKey="stat2_value"
          labelKey="stat2_label"
          descKey="stat2_desc"
          content={content}
          onChange={handleChange}
        />
        <StatCard
          number={3}
          valueKey="stat3_value"
          labelKey="stat3_label"
          descKey="stat3_desc"
          content={content}
          onChange={handleChange}
        />
        <StatCard
          number={4}
          valueKey="stat4_value"
          labelKey="stat4_label"
          descKey="stat4_desc"
          content={content}
          onChange={handleChange}
        />
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
