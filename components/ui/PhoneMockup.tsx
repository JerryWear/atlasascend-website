'use client'

import React, { useRef, useLayoutEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Treatment = 'float' | 'glow' | 'scroll' | 'reveal'

interface PhoneMockupProps {
  src: string
  alt?: string
  treatment?: Treatment
  size?: 'sm' | 'md' | 'lg'
  priority?: boolean
  className?: string
}

const WIDTHS = { sm: 260, md: 300, lg: 360 }

function ScreenContent({
  src,
  alt,
  imgRef,
  treatment,
}: {
  src: string
  alt: string
  imgRef?: React.RefObject<HTMLImageElement | null>
  treatment: Treatment
}) {
  const [imgError, setImgError] = useState(false)

  if (imgError) {
    return (
      <div className="w-full h-full flex items-center justify-center border border-gold/30 bg-black-3">
        <span className="font-mono text-gold/60 text-xs text-center px-4">{alt}</span>
      </div>
    )
  }

  if (treatment === 'scroll') {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        ref={imgRef as React.RefObject<HTMLImageElement>}
        src={src}
        alt={alt}
        className="w-full object-cover object-top"
        style={{ height: 'auto', minHeight: '140%' }}
        onError={() => setImgError(true)}
      />
    )
  }

  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-top"
        onError={() => setImgError(true)}
      />
    </div>
  )
}

export function PhoneMockup({
  src,
  alt = 'App screenshot',
  treatment = 'reveal',
  size = 'md',
  className = '',
}: PhoneMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const width = WIDTHS[size]
  const height = Math.round(width * (19.5 / 9))

  useLayoutEffect(() => {
    if (treatment !== 'scroll') return
    const ctx = gsap.context(() => {
      if (!imgRef.current || !frameRef.current) return
      gsap.to(imgRef.current, {
        y: () => -(imgRef.current!.offsetHeight - frameRef.current!.offsetHeight),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 25%',
          scrub: 2,
          invalidateOnRefresh: true,
        },
      })
    })
    return () => ctx.revert()
  }, [treatment])

  const frame = (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      style={{ width, height }}
    >
      {treatment === 'glow' && (
        <motion.div
          className="absolute inset-0 rounded-[44px] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(212,165,116,0.25) 0%, transparent 70%)',
            zIndex: -1,
            transform: 'scale(1.3)',
          }}
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <div
        className="relative w-full h-full"
        style={{
          borderRadius: 44,
          border: '1.5px solid rgba(255,255,255,0.07)',
          background: '#111',
          overflow: 'hidden',
        }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-[#111]"
          style={{ width: 90, height: 24, borderRadius: '0 0 14px 14px' }}
        />

        <div
          ref={frameRef}
          className="absolute overflow-hidden"
          style={{ inset: 4, borderRadius: 40, background: '#0a0a0a' }}
        >
          <ScreenContent src={src} alt={alt} imgRef={imgRef} treatment={treatment} />
        </div>

        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            borderRadius: 44,
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)',
          }}
        />

        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20"
          style={{
            width: 100,
            height: 4,
            borderRadius: 2,
            background: 'rgba(255,255,255,0.2)',
          }}
        />
      </div>
    </div>
  )

  if (treatment === 'float') {
    return (
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [-0.5, 0.5, -0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {frame}
      </motion.div>
    )
  }

  if (treatment === 'reveal') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: '-80px' }}
      >
        {frame}
      </motion.div>
    )
  }

  return frame
}
