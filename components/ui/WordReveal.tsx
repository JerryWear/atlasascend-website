'use client'

import { motion } from 'framer-motion'

interface WordRevealProps {
  text: string
  stagger?: number
  className?: string
}

export function WordReveal({ text, stagger = 0.04, className = '' }: WordRevealProps) {
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em] last:mr-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * stagger, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-40px' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
