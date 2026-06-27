import type { Metadata } from 'next'
import { Playfair_Display, Inter, Space_Mono } from 'next/font/google'
import './globals.css'
import { SmoothScrollProvider } from '@/components/ui/SmoothScrollProvider'
import { CustomCursor } from '@/components/ui/CustomCursor'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Atlas Ascend — Personal Transformation OS',
  description:
    'AI coaching, physique transformation, adaptive training, and nutrition intelligence. One system built around you.',
  keywords:
    'fitness app, AI coach, personal trainer, transformation, body composition, meal plan, workout app',
  openGraph: {
    title: 'Atlas Ascend — Personal Transformation OS',
    description:
      "See who you're becoming. AI-powered transformation coaching.",
    url: 'https://atlasascend.app',
    siteName: 'Atlas Ascend',
    images: [{ url: '/og-image.svg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atlas Ascend',
    description: 'Personal Transformation OS',
    images: ['/og-image.svg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${spaceMono.variable}`}
    >
      <body className="font-inter bg-black text-white antialiased">
        <SmoothScrollProvider />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
