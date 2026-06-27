export const SCREENSHOTS = {
  home: '/screenshots/home.png',
  training: '/screenshots/training.png',
  coaching: '/screenshots/coaching.png',
  futureYou: '/screenshots/future-you.png',
  futureYou2: '/screenshots/future-you-2.png',
  visionBoard: '/screenshots/vision-board.png',
  challenges: '/screenshots/challenges.png',
  mind: '/screenshots/mind.png',
  nutrition: '/screenshots/nutrition.png',
  progress: '/screenshots/progress.png',
} as const

export type ScreenshotKey = keyof typeof SCREENSHOTS
