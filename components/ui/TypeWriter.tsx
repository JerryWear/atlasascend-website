'use client'

import { useState, useEffect } from 'react'

interface TypeWriterProps {
  messages: string[]
  speed?: number
  pauseDuration?: number
  className?: string
}

export function TypeWriter({
  messages,
  speed = 60,
  pauseDuration = 2000,
  className = '',
}: TypeWriterProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (messages.length === 0) return
    const message = messages[currentIndex % messages.length]

    if (isPaused) {
      const t = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, pauseDuration)
      return () => clearTimeout(t)
    }

    const delay = isDeleting ? speed / 2 : speed
    const t = setTimeout(() => {
      if (!isDeleting && currentText.length < message.length) {
        setCurrentText(message.slice(0, currentText.length + 1))
      } else if (!isDeleting && currentText.length === message.length) {
        setIsPaused(true)
      } else if (isDeleting && currentText.length > 0) {
        setCurrentText((prev) => prev.slice(0, -1))
      } else {
        setIsDeleting(false)
        setCurrentIndex((i) => (i + 1) % messages.length)
      }
    }, delay)

    return () => clearTimeout(t)
  }, [currentText, isDeleting, isPaused, currentIndex, messages, speed, pauseDuration])

  return (
    <span className={`font-inter ${className}`}>
      {currentText}
      <span className="inline-block w-0.5 h-4 bg-gold ml-0.5 align-middle animate-blink" />
    </span>
  )
}
