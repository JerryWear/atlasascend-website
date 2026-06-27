import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'

const QUICK_ACTIONS = [
  { label: 'Edit Hero', href: '/admin/hero', desc: 'Update heading, CTA, subheading' },
  { label: 'Update Screenshots', href: '/admin/screenshots', desc: 'Upload new phone screenshots' },
  { label: 'Change Quote', href: '/admin/coach-quote', desc: 'Edit the coach testimonial' },
  { label: 'Update Play Store URL', href: '/admin/early-access', desc: 'Set the Google Play link' },
]

const SECTIONS = [
  { label: 'Hero Section', href: '/admin/hero' },
  { label: 'Stats Bar', href: '/admin/stats' },
  { label: 'Features', href: '/admin/features' },
  { label: 'Coach Quote', href: '/admin/coach-quote' },
  { label: 'Screenshots', href: '/admin/screenshots' },
  { label: 'Early Access', href: '/admin/early-access' },
  { label: 'Footer', href: '/admin/footer' },
]

export default async function AdminDashboard() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  // Fetch last updated times from website_content
  const { data: sections } = await supabase
    .from('website_content')
    .select('section, updated_at')

  const updatedMap: Record<string, string> = {}
  sections?.forEach((s) => {
    updatedMap[s.section] = new Date(s.updated_at).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
    })
  })

  return (
    <div className="p-8 max-w-4xl">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-white text-2xl font-semibold mb-1">Welcome back</h1>
        <p className="text-white/40 text-sm">{session?.user.email}</p>
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
        <h2 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="block rounded-xl p-5 transition-all group"
              style={{
                background: '#161616',
                border: '1px solid rgba(212,165,116,0.1)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,165,116,0.3)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,165,116,0.1)'
              }}
            >
              <div className="text-[#d4a574] text-sm font-semibold mb-1">{action.label}</div>
              <div className="text-white/40 text-xs">{action.desc}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div>
        <h2 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-4">
          Content Sections
        </h2>
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid rgba(212,165,116,0.1)', background: '#161616' }}
        >
          {SECTIONS.map((section, i) => (
            <Link
              key={section.href}
              href={section.href}
              className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-white/[0.02]"
              style={{
                borderBottom: i < SECTIONS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              }}
            >
              <span className="text-white text-sm">{section.label}</span>
              <div className="flex items-center gap-3">
                {updatedMap[section.label.toLowerCase().replace(' ', '_')] && (
                  <span className="text-white/30 text-xs">
                    {updatedMap[section.label.toLowerCase().replace(' ', '_')]}
                  </span>
                )}
                <span className="text-white/20 text-xs">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
