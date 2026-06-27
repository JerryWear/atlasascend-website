import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

const STATS = [
  { value: 30, suffix: '+', label: 'Years Coaching Experience', description: 'Decades of real-world knowledge' },
  { value: 8, suffix: '', label: 'Intelligence Systems', description: 'All connected in one platform' },
  { value: 60, suffix: '+', label: 'Challenges Built', description: 'Beginner to elite' },
  { value: 1, suffix: '', label: 'Platform for Everything', description: 'Replace 4–6 apps with one' },
]

export function StatsBar() {
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
