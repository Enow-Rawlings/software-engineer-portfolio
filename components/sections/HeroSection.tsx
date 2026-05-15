'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import Link from 'next/link'
import { TypingEffect } from '@/components/animations/TypingEffect'

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto px-4 md:px-8 text-center"
      >
        {/* Greeting Badge */}
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary">Welcome to my portfolio</span>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6">
          Hi, I&apos;m <span className="gradient-text">Akoh Rawlings</span>
        </motion.h1>

        {/* Typing Effect Subtitle */}
        <motion.div variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground mb-8">
          A{' '}
          <TypingEffect
            texts={[
              'Full Stack Developer',
              'Software Engineer',
              'Problem Solver',
              'Tech Innovator',
              'CyberSecurity Enthusiasts'
            ]}
            speed={100}
            delay={2000}
          />
        </motion.div>

        {/* Description */}
        <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          I build innovative digital solutions with modern technologies. Specializing in full-stack development, 
          web applications, and creating seamless user experiences that matter.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row gap-4 justify-center items-center mb-16"
        >
          <Link
            href="/projects"
            className="group px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
          >
            View My Projects
            <motion.span
              className="group-hover:translate-x-1 transition-transform"
            >
              <ArrowRight size={20} />
            </motion.span>
          </Link>

          <Link
            href="/contact"
            className="px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Get in Touch
          </Link>

          <a
            href="/cv.pdf"
            download
            className="group px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
          >
            <Download size={20} />
            Download CV
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center"
        >
          <div className="p-2 rounded-full border border-primary/20">
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
