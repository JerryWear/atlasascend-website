'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const [isHovering, setIsHovering] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const springConfig = { damping: 25, stiffness: 700 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    setIsMounted(true)

    const handleEnter = () => setIsHovering(true)
    const handleLeave = () => setIsHovering(false)
    const trackedEls: Element[] = []

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 5)
      mouseY.set(e.clientY - 5)
    }

    const addListeners = () => {
      document.querySelectorAll('a, button').forEach((el) => {
        if (!trackedEls.includes(el)) {
          el.addEventListener('mouseenter', handleEnter)
          el.addEventListener('mouseleave', handleLeave)
          trackedEls.push(el)
        }
      })
    }

    window.addEventListener('mousemove', moveCursor)
    addListeners()

    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      observer.disconnect()
      trackedEls.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter)
        el.removeEventListener('mouseleave', handleLeave)
      })
    }
  }, [mouseX, mouseY])

  if (!isMounted) return null

  return (
    <motion.div
      className="custom-cursor pointer-events-none fixed z-[9998] hidden lg:block"
      style={{ x, y }}
    >
      <motion.div
        className="rounded-full"
        animate={
          isHovering
            ? {
                width: 36,
                height: 36,
                background: 'transparent',
                border: '1.5px solid #d4a574',
                x: -13,
                y: -13,
              }
            : {
                width: 10,
                height: 10,
                background: '#d4a574',
                border: 'none',
                x: 0,
                y: 0,
              }
        }
        transition={{ type: 'spring', damping: 20, stiffness: 400 }}
      />
    </motion.div>
  )
}
