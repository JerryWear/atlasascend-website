'use client'

import { useState, useRef, useEffect } from 'react'
import { createClient } from '@/lib/supabase-browser'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!

const SLOTS = [
  { key: 'home', filename: 'home.png', label: 'Home' },
  { key: 'atlasBrain', filename: 'atlas-brain.png', label: 'Atlas Brain' },
  { key: 'training', filename: 'training.png', label: 'Training' },
  { key: 'coaching', filename: 'coaching.png', label: 'Coaching' },
  { key: 'futureYou', filename: 'future-you.png', label: 'Future You' },
  { key: 'futureYou2', filename: 'future-you-2.png', label: 'Future You 2' },
  { key: 'visionBoard', filename: 'vision-board.png', label: 'Vision Board' },
  { key: 'challenges', filename: 'challenges.png', label: 'Challenges' },
  { key: 'mind', filename: 'mind.png', label: 'Mind' },
  { key: 'nutrition', filename: 'nutrition.png', label: 'Nutrition' },
  { key: 'progress', filename: 'progress.png', label: 'Progress' },
] as const

type SlotKey = typeof SLOTS[number]['key']

function storageUrl(filename: string, bust?: number): string {
  const base = `${SUPABASE_URL}/storage/v1/object/public/website-images/screenshots/${filename}`
  return bust ? `${base}?t=${bust}` : base
}

export default function AdminScreenshots() {
  const [uploading, setUploading] = useState<SlotKey | null>(null)
  const [cacheBusts, setCacheBusts] = useState<Record<string, number>>({})
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({})
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(t)
    }
  }, [toast])

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    slot: typeof SLOTS[number]
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setToast({ msg: 'File too large. Max 5MB.', type: 'error' })
      e.target.value = ''
      return
    }

    setUploading(slot.key)
    const supabase = createClient()

    const { error } = await supabase.storage
      .from('website-images')
      .upload(`screenshots/${slot.filename}`, file, {
        upsert: true,
        contentType: file.type,
      })

    setUploading(null)
    e.target.value = ''

    if (error) {
      setToast({ msg: `Failed to upload ${slot.label}`, type: 'error' })
    } else {
      // Clear error state and bust cache
      setImgErrors((prev) => ({ ...prev, [slot.key]: false }))
      setCacheBusts((prev) => ({ ...prev, [slot.key]: Date.now() }))
      setToast({ msg: `✓ ${slot.label} updated`, type: 'success' })
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-white text-xl font-semibold mb-2">Screenshots</h1>
      <p className="text-white/40 text-sm mb-8">
        Upload PNG/JPG screenshots for each section. Updates appear on the live site instantly.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {SLOTS.map((slot) => {
          const isUploading = uploading === slot.key
          const bust = cacheBusts[slot.key]
          const hasError = imgErrors[slot.key]
          const imgUrl = storageUrl(slot.filename, bust)

          return (
            <div
              key={slot.key}
              className="rounded-xl overflow-hidden"
              style={{
                background: '#161616',
                border: '1px solid rgba(212,165,116,0.1)',
              }}
            >
              {/* Image Area */}
              <div
                className="relative flex items-center justify-center"
                style={{ height: 180, background: '#111' }}
              >
                {isUploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                      style={{ borderColor: '#d4a574', borderTopColor: 'transparent' }}
                    />
                    <span className="text-white/40 text-xs">Uploading...</span>
                  </div>
                ) : hasError ? (
                  <div className="flex flex-col items-center gap-2 text-white/20">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                    </svg>
                    <span className="text-xs">No image</span>
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imgUrl}
                    alt={slot.label}
                    className="w-full h-full object-cover"
                    onError={() => setImgErrors((prev) => ({ ...prev, [slot.key]: true }))}
                  />
                )}
              </div>

              {/* Card Body */}
              <div className="p-3">
                <div className="text-white text-sm font-medium mb-2.5">{slot.label}</div>
                <div className="text-white/30 text-[10px] font-mono mb-3">{slot.filename}</div>
                <button
                  onClick={() => fileInputRefs.current[slot.key]?.click()}
                  disabled={isUploading}
                  className="w-full py-2 rounded-lg text-xs font-semibold transition-opacity disabled:opacity-50"
                  style={{
                    background: 'rgba(212,165,116,0.1)',
                    border: '1px solid rgba(212,165,116,0.25)',
                    color: '#d4a574',
                  }}
                >
                  {isUploading ? 'Uploading...' : 'Upload Image'}
                </button>
                <input
                  ref={(el) => { fileInputRefs.current[slot.key] = el }}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, slot)}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Toast */}
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
