'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-browser'

interface FeatureCard {
  label: string
  title: string
  description: string
  bullets: [string, string, string]
}

const DEFAULT_CARDS: FeatureCard[] = [
  { label: 'INTELLIGENCE', title: 'Your coach.\nAlways on.', description: 'Atlas knows your training history, nutrition, sleep, and goals. Every response is built around your actual data.', bullets: ['Full client profile injection', '7-day pattern awareness', 'Reasoning panel'] },
  { label: 'PHYSIQUE ARCHITECT', title: "See who you're\nbecoming.", description: 'Upload your photos, define your goal. Atlas generates a realistic AI preview of your transformed physique.', bullets: ['Image-to-image AI transformation', 'Full transformation roadmap', '92% confidence scoring'] },
  { label: 'TRANSFORMATION SCORE', title: 'One score.\nEverything measured.', description: 'The Atlas Brain synthesises training, nutrition, sleep, mindset, and recovery into a single daily score.', bullets: ['8 intelligence domains', 'Pattern recognition engine', 'Proactive coaching nudges'] },
  { label: 'TRAINING ENGINE', title: 'Programs that\nevolve with you.', description: 'Every workout adapts based on performance, recovery, and goals. Video-guided, progressive overload built in.', bullets: ['488 exercises with video', 'Auto-progression logic', 'Coach-assigned programs'] },
  { label: 'NUTRITION ENGINE', title: 'Precision nutrition,\nnot guesswork.', description: 'Structured meal plans with individual ingredients, exact macros, and AI-generated adjustments.', bullets: ['236-food database', 'Ingredient-level tracking', 'AI macro optimisation'] },
  { label: 'MIND CENTER', title: 'Your life\nby design.', description: 'Build a visual vision board across 9 life categories. Atlas analyses your board and coaches you toward it.', bullets: ['9 life categories', 'Atlas board analysis', 'Daily affirmation pull'] },
  { label: 'CHALLENGES', title: 'Compete.\nStreak. Win.', description: '60+ challenges from beginner to elite. Daily check-ins, streak tracking, leaderboards.', bullets: ['60+ challenges', 'Daily streak system', 'Coach-curated content'] },
  { label: 'MINDFULNESS', title: 'Train your mind\nlike your body.', description: 'AI-generated meditation sessions voiced personally for you. Sleep, focus, stress relief — on demand.', bullets: ['Personalized AI scripts', 'Voice-generated sessions', 'Atlas Sounds library'] },
]

const INPUT_STYLE = {
  background: '#1a1a1a',
  border: '1px solid rgba(212,165,116,0.15)',
  color: '#fff',
} as const

const INPUT_CLASS = 'w-full text-sm rounded-lg px-4 py-3 focus:outline-none transition-colors'

export default function AdminFeatures() {
  const [cards, setCards] = useState<FeatureCard[]>(DEFAULT_CARDS)
  const [expanded, setExpanded] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from('website_content')
        .select('content')
        .eq('section', 'features')
        .single()
      if (data?.content && Array.isArray(data.content)) {
        setCards(data.content as FeatureCard[])
      }
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

  const updateCard = (index: number, updates: Partial<FeatureCard>) => {
    setCards((prev) => prev.map((c, i) => i === index ? { ...c, ...updates } : c))
  }

  const updateBullet = (cardIndex: number, bulletIndex: number, value: string) => {
    setCards((prev) => prev.map((c, i) => {
      if (i !== cardIndex) return c
      const bullets = [...c.bullets] as [string, string, string]
      bullets[bulletIndex] = value
      return { ...c, bullets }
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    const supabase = createClient()
    const { error } = await supabase
      .from('website_content')
      .upsert({ section: 'features', content: cards, updated_at: new Date().toISOString() }, { onConflict: 'section' })
    setSaving(false)
    setToast(error ? { msg: '✗ Failed to save', type: 'error' } : { msg: '✓ Features updated', type: 'success' })
  }

  if (loading) return <div className="p-8 text-white/40 text-sm">Loading...</div>

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-xl font-semibold">Features</h1>
          <p className="text-white/40 text-sm mt-1">Edit the 8 horizontal scroll feature cards</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="text-sm font-semibold px-6 py-2.5 rounded-lg transition-opacity disabled:opacity-60"
          style={{ background: '#d4a574', color: '#080808' }}
        >
          {saving ? 'Saving...' : 'Save All'}
        </button>
      </div>

      <div className="space-y-2">
        {cards.map((card, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden"
            style={{ border: '1px solid rgba(212,165,116,0.1)' }}
          >
            {/* Header */}
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
              style={{ background: expanded === i ? '#1a1a1a' : '#161616' }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(212,165,116,0.15)', color: '#d4a574' }}
                >
                  {i + 1}
                </span>
                <div>
                  <div className="text-white text-sm font-medium">{card.label}</div>
                  <div className="text-white/30 text-xs mt-0.5 line-clamp-1">
                    {card.title.replace(/\n/g, ' · ')}
                  </div>
                </div>
              </div>
              <span className="text-white/30 text-lg leading-none">{expanded === i ? '−' : '+'}</span>
            </button>

            {/* Content */}
            {expanded === i && (
              <div className="px-5 pb-5 pt-2" style={{ background: '#1a1a1a' }}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-white/50 text-xs mb-1.5">Label (uppercase)</label>
                    <input
                      type="text"
                      value={card.label}
                      onChange={(e) => updateCard(i, { label: e.target.value })}
                      className={INPUT_CLASS}
                      style={INPUT_STYLE}
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#d4a574' }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.15)' }}
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs mb-1.5">Title (use \n for line break)</label>
                    <textarea
                      value={card.title}
                      onChange={(e) => updateCard(i, { title: e.target.value })}
                      rows={2}
                      className={INPUT_CLASS + ' resize-none'}
                      style={INPUT_STYLE}
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#d4a574' }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.15)' }}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-white/50 text-xs mb-1.5">Description</label>
                  <textarea
                    value={card.description}
                    onChange={(e) => updateCard(i, { description: e.target.value })}
                    rows={3}
                    className={INPUT_CLASS + ' resize-y'}
                    style={INPUT_STYLE}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#d4a574' }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.15)' }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[0, 1, 2].map((bi) => (
                    <div key={bi}>
                      <label className="block text-white/50 text-xs mb-1.5">Bullet {bi + 1}</label>
                      <input
                        type="text"
                        value={card.bullets[bi]}
                        onChange={(e) => updateBullet(i, bi, e.target.value)}
                        className={INPUT_CLASS}
                        style={INPUT_STYLE}
                        onFocus={(e) => { e.currentTarget.style.borderColor = '#d4a574' }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,165,116,0.15)' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
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
