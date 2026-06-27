'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: '⊞' },
  { href: '/admin/hero', label: 'Hero Section', icon: '✦' },
  { href: '/admin/stats', label: 'Stats Bar', icon: '◈' },
  { href: '/admin/features', label: 'Features', icon: '▦' },
  { href: '/admin/coach-quote', label: 'Coach Quote', icon: '❝' },
  { href: '/admin/screenshots', label: 'Screenshots', icon: '⊟' },
  { href: '/admin/early-access', label: 'Early Access', icon: '◉' },
  { href: '/admin/footer', label: 'Footer', icon: '▭' },
]

export function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside
      className="w-[220px] min-h-screen flex flex-col flex-shrink-0"
      style={{
        background: '#0f0f0f',
        borderRight: '1px solid rgba(212,165,116,0.12)',
      }}
    >
      {/* Logo */}
      <div className="px-6 pt-8 pb-6" style={{ borderBottom: '1px solid rgba(212,165,116,0.08)' }}>
        <div className="font-mono text-[#d4a574] tracking-widest text-xs font-bold">
          ATLAS ASCEND
        </div>
        <div className="text-white/40 text-[11px] mt-1">Website Admin</div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const isActive = item.href === '/admin'
            ? pathname === '/admin'
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] transition-all"
              style={{
                color: isActive ? '#d4a574' : 'rgba(255,255,255,0.5)',
                background: isActive ? 'rgba(212,165,116,0.08)' : 'transparent',
                fontWeight: isActive ? 500 : 400,
              }}
            >
              <span className="text-base leading-none">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* User + Sign Out */}
      <div className="px-4 py-4" style={{ borderTop: '1px solid rgba(212,165,116,0.08)' }}>
        <div className="text-white/30 text-[11px] truncate mb-3 px-1">{email}</div>
        <button
          onClick={handleSignOut}
          className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] text-white/40 hover:text-white/70 transition-colors"
        >
          <span>→</span>
          Sign Out
        </button>
      </div>
    </aside>
  )
}
