'use client'

import { useState, useEffect } from 'react'

interface TypingEffectProps {
  texts: string[]
  speed?: number
  delay?: number
  cursor?: boolean
}

export function TypingEffect({
  texts,
  speed = 100,
  delay = 1000,
  cursor = true,
}: TypingEffectProps) {
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentText = texts[textIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting && charIndex < currentText.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      }, speed)
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, charIndex - 1))
        setCharIndex(charIndex - 1)
      }, speed / 2)
    } else if (!isDeleting && charIndex === currentText.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, delay)
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false)
      setTextIndex((textIndex + 1) % texts.length)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, textIndex, texts, speed, delay])

  return (
    <span className="relative">
      {displayText}
      {cursor && (
        <span className="ml-1 w-0.5 h-8 bg-primary animate-pulse inline-block" />
      )}
    </span>
  )
}
