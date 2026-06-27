const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!

function storageUrl(filename: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/website-images/screenshots/${filename}`
}

export const SCREENSHOTS = {
  home: storageUrl('home.png'),
  atlasBrain: storageUrl('atlas-brain.png'),
  training: storageUrl('training.png'),
  coaching: storageUrl('coaching.png'),
  futureYou: storageUrl('future-you.png'),
  futureYou2: storageUrl('future-you-2.png'),
  visionBoard: storageUrl('vision-board.png'),
  challenges: storageUrl('challenges.png'),
  mind: storageUrl('mind.png'),
  nutrition: storageUrl('nutrition.png'),
  progress: storageUrl('progress.png'),
} as const

export type ScreenshotKey = keyof typeof SCREENSHOTS
