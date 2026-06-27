'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface GoldButtonProps {
  variant?: 'solid' | 'outline'
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
  size?: 'sm' | 'md' | 'lg'
}

export function GoldButton({
  variant = 'solid',
  href,
  onClick,
  children,
  className = '',
  type = 'button',
  size = 'md',
}: GoldButtonProps) {
  const padding =
    size === 'lg' ? 'px-10 py-4' : size === 'sm' ? 'px-5 py-2.5' : 'px-8 py-3.5'

  const base = `inline-flex items-center gap-2 rounded-full font-inter font-semibold text-sm tracking-wide cursor-pointer transition-all ${padding} ${className}`

  const solidStyles = 'bg-gold text-black hover:brightness-110'
  const outlineStyles = 'border border-gold text-gold bg-transparent hover:bg-gold/5'

  const styles = variant === 'solid' ? solidStyles : outlineStyles

  const inner = (
    <motion.span
      className={`${base} ${styles}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.span>
  )

  if (href) {
    return (
      <Link href={href} className="inline-flex">
        {inner}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className="inline-flex">
      {inner}
    </button>
  )
}
