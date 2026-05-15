'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  duration?: number
  className?: string
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.5,
  className = '',
}: ScrollRevealProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const directionOffsets = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  }

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directionOffsets[direction],
      }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
              x: 0,
            }
          : {
              opacity: 0,
              ...directionOffsets[direction],
            }
      }
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
