'use client'

import { motion } from 'framer-motion'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <motion.div
      className={`relative rounded-2xl border border-gold/12 backdrop-blur-xl ${className}`}
      style={{ background: 'rgba(255,255,255,0.02)' }}
      whileHover={
        hover
          ? { borderColor: 'rgba(212,165,116,0.3)', transition: { duration: 0.3 } }
          : undefined
      }
    >
      {children}
    </motion.div>
  )
}
