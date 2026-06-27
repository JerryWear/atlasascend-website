import Link from 'next/link'
import { GoldButton } from '@/components/ui/GoldButton'

interface FooterContent {
  tagline?: string
  sub_tagline?: string
  copyright?: string
  built_by?: string
  google_play_url?: string
}

function GooglePlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.18 23.76c.39.22.84.27 1.27.14l12.04-12.04-2.97-2.97L3.18 23.76zM21.5 10.65l-2.86-1.64-3.27 3.27 3.27 3.27 2.88-1.65c.82-.47.82-1.78-.02-2.25zM1.77.62C1.51.9 1.36 1.3 1.36 1.8v20.4c0 .5.15.9.41 1.18l.06.06L13.6 11.66v-.28L1.83.56l-.06.06zM14.32 8.95l-3.02-3.02L3.21.32c-.43-.13-.88-.08-1.27.14l10.35 10.35 2.03-1.86z" />
    </svg>
  )
}

export function Footer({ content }: { content?: unknown }) {
  const c = (content as FooterContent) ?? {}

  return (
    <footer
      className="py-16 px-8"
      style={{
        background: '#080808',
        borderTop: '1px solid rgba(212,165,116,0.15)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="font-mono text-gold tracking-widest text-sm">ATLAS ASCEND</div>
            <div className="font-inter text-white-muted text-xs mt-2">
              {c.tagline ?? 'Personal Transformation OS'}
            </div>
            <div className="font-inter text-white-muted text-xs mt-1">
              {c.sub_tagline ?? 'Built by a coach. Powered by AI.'}
            </div>
            <div className="mt-6">
              <GoldButton variant="outline" href={c.google_play_url || '#'} size="sm">
                <GooglePlayIcon />
                Google Play
              </GoldButton>
            </div>
          </div>

          {/* Platform */}
          <div>
            <div className="font-inter text-white text-xs font-semibold mb-4 uppercase tracking-wider">
              Platform
            </div>
            <ul className="space-y-2">
              {[
                'Features',
                'Future You',
                'AI Coach',
                'Challenges',
                'Vision Board',
                'Mind Center',
              ].map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="font-inter text-white-muted text-xs hover:text-gold transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="font-inter text-white text-xs font-semibold mb-4 uppercase tracking-wider">
              Legal
            </div>
            <ul className="space-y-2">
              {[
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Data Safety', href: '/privacy' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-inter text-white-muted text-xs hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get the App */}
          <div>
            <div className="font-inter text-white text-xs font-semibold mb-4 uppercase tracking-wider">
              Get the App
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  href={c.google_play_url || '#'}
                  className="font-inter text-white-muted text-xs hover:text-gold transition-colors"
                >
                  Download on Google Play
                </Link>
              </li>
              <li>
                <Link
                  href="#early-access"
                  className="font-inter text-white-muted text-xs hover:text-gold transition-colors"
                >
                  Join iOS Waitlist
                </Link>
              </li>
              <li>
                <a
                  href="mailto:zirunas.michailovas@gmail.com"
                  className="font-inter text-white-muted text-xs hover:text-gold transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-wrap justify-between gap-4 mt-12 pt-6"
          style={{ borderTop: '1px solid rgba(212,165,116,0.1)' }}
        >
          <span className="font-inter text-white-muted text-xs">
            {c.copyright ?? '© 2026 Atlas Ascend. All rights reserved.'}
          </span>
          <span className="font-inter text-white-muted text-xs">
            {c.built_by ?? 'Built by Žyrunas Michailovas'}
          </span>
        </div>
      </div>
    </footer>
  )
}
