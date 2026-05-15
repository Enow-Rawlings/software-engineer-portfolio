'use client'

import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

interface AnimatedCounterProps {
  value: number
  duration?: number
  suffix?: string
  prefix?: string
}

export function AnimatedCounter({
  value,
  duration = 2,
  suffix = '',
  prefix = '',
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  useEffect(() => {
    if (!inView) return

    let start = 0
    const end = value
    const increment = end / (duration * 60)
    let currentValue = start

    const timer = setInterval(() => {
      currentValue += increment
      if (currentValue >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(currentValue))
      }
    }, 1000 / 60)

    return () => clearInterval(timer)
  }, [inView, value, duration])

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}
