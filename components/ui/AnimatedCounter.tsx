'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AnimatedCounterProps {
  value: number
  suffix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({
  value,
  suffix = '',
  duration = 2,
  className = '',
}: AnimatedCounterProps) {
  const countRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = countRef.current
    if (!el) return

    const obj = { val: 0 }
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: value,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + suffix
          },
        })
      },
    })

    return () => trigger.kill()
  }, [value, suffix, duration])

  return (
    <span ref={countRef} className={className}>
      0{suffix}
    </span>
  )
}
