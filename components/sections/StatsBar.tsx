import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

interface StatsContent {
  stat1_value?: string; stat1_label?: string; stat1_desc?: string
  stat2_value?: string; stat2_label?: string; stat2_desc?: string
  stat3_value?: string; stat3_label?: string; stat3_desc?: string
  stat4_value?: string; stat4_label?: string; stat4_desc?: string
}

function parseStat(raw?: string): { value: number; suffix: string } {
  if (!raw) return { value: 0, suffix: '' }
  const suffix = raw.replace(/[0-9]/g, '')
  const value = parseInt(raw.replace(/[^0-9]/g, ''), 10) || 0
  return { value, suffix }
}

export function StatsBar({ content }: { content?: unknown }) {
  const c = (content as StatsContent) ?? {}

  const s1 = parseStat(c.stat1_value ?? '30+')
  const s2 = parseStat(c.stat2_value ?? '8')
  const s3 = parseStat(c.stat3_value ?? '60+')
  const s4 = parseStat(c.stat4_value ?? '1')

  const STATS = [
    { value: s1.value, suffix: s1.suffix, label: c.stat1_label ?? 'Years Coaching Experience', description: c.stat1_desc ?? 'Decades of real-world knowledge' },
    { value: s2.value, suffix: s2.suffix, label: c.stat2_label ?? 'Intelligence Systems', description: c.stat2_desc ?? 'All connected in one platform' },
    { value: s3.value, suffix: s3.suffix, label: c.stat3_label ?? 'Challenges Built', description: c.stat3_desc ?? 'Beginner to elite' },
    { value: s4.value, suffix: s4.suffix, label: c.stat4_label ?? 'Platform for Everything', description: c.stat4_desc ?? 'Replace 4–6 apps with one' },
  ]

  return (
    <section
      className="py-12 px-8"
      style={{
        background: '#0f0f0f',
        borderTop: '1px solid rgba(212,165,116,0.15)',
        borderBottom: '1px solid rgba(212,165,116,0.15)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-around items-center gap-8 sm:gap-0">
          {STATS.map((stat, i) => (
            <div key={i} className="flex items-center">
              <div className="text-center px-8">
                <div className="font-playfair text-gold text-4xl lg:text-5xl font-bold leading-none">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-inter text-white text-sm mt-2 font-medium">{stat.label}</div>
                <div className="font-inter text-white-muted text-xs mt-1">{stat.description}</div>
              </div>
              {i < STATS.length - 1 && (
                <div
                  className="hidden sm:block h-12 w-px flex-shrink-0"
                  style={{ background: 'rgba(212,165,116,0.2)' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
