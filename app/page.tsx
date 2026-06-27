import { createClient } from '@/lib/supabase-server'
import { Hero } from '@/components/sections/Hero'
import { StatsBar } from '@/components/sections/StatsBar'
import { TheProblem } from '@/components/sections/TheProblem'
import { FeatureScroll } from '@/components/sections/FeatureScroll'
import { AtlasBrainSection } from '@/components/sections/AtlasBrainSection'
import { EcosystemSection } from '@/components/sections/EcosystemSection'
import { FutureYouShowcase } from '@/components/sections/FutureYouShowcase'
import { ConfidenceScore } from '@/components/sections/ConfidenceScore'
import { FounderStory } from '@/components/sections/FounderStory'
import { BentoGrid } from '@/components/sections/BentoGrid'
import { EarlyAccess } from '@/components/sections/EarlyAccess'
import { Footer } from '@/components/sections/Footer'

export const revalidate = 60

export default async function Home() {
  const supabase = createClient()
  const { data: sections } = await supabase
    .from('website_content')
    .select('section, content')

  const cms: Record<string, unknown> = {}
  sections?.forEach((s) => { cms[s.section] = s.content })

  return (
    <main>
      <Hero content={cms.hero} />
      <StatsBar content={cms.stats} />
      <TheProblem />
      <FeatureScroll cards={Array.isArray(cms.features) ? cms.features : undefined} />
      <AtlasBrainSection />
      <EcosystemSection />
      <FutureYouShowcase />
      <ConfidenceScore />
      <FounderStory content={cms.founder} />
      <BentoGrid />
      <EarlyAccess content={cms.early_access} />
      <Footer content={cms.footer} />
    </main>
  )
}
