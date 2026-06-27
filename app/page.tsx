import { Hero } from '@/components/sections/Hero'
import { StatsBar } from '@/components/sections/StatsBar'
import { TheProblem } from '@/components/sections/TheProblem'
import { FeatureScroll } from '@/components/sections/FeatureScroll'
import { FutureYouShowcase } from '@/components/sections/FutureYouShowcase'
import { ConfidenceScore } from '@/components/sections/ConfidenceScore'
import { CoachVoice } from '@/components/sections/CoachVoice'
import { BentoGrid } from '@/components/sections/BentoGrid'
import { EarlyAccess } from '@/components/sections/EarlyAccess'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <TheProblem />
      <FeatureScroll />
      <FutureYouShowcase />
      <ConfidenceScore />
      <CoachVoice />
      <BentoGrid />
      <EarlyAccess />
      <Footer />
    </main>
  )
}
