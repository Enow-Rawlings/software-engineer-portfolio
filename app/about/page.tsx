'use client'

import { useEffect, useState } from 'react'
import type { Metadata } from 'next'
import { Header } from '@/components/navigation/Header'
import { Footer } from '@/components/navigation/Footer'
import { AboutSection } from '@/components/sections/AboutSection'
import { SkillsFullSection } from '@/components/sections/SkillsFullSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { ParticlesBackground } from '@/components/animations/ParticlesBackground'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { ThemeProvider } from 'next-themes'
import { motion } from 'framer-motion'

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <ParticlesBackground />
      <div className="relative z-10">
        <Header />
        <main>
          {/* Page Title Section */}
          <section className="min-h-[40vh] flex items-center justify-center pt-32 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto px-4"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                About <span className="gradient-text">Me</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Learn more about my journey, skills, and professional experience
              </p>
            </motion.div>
          </section>

          <AboutSection />
          <SkillsFullSection />
          <ExperienceSection />
        </main>
        <Footer />
        <ThemeToggle />
      </div>
    </ThemeProvider>
  )
}
