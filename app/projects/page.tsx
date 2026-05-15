'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/navigation/Header'
import { Footer } from '@/components/navigation/Footer'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { BlogSection } from '@/components/sections/BlogSection'
import { ParticlesBackground } from '@/components/animations/ParticlesBackground'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { ThemeProvider } from 'next-themes'
import { motion } from 'framer-motion'

export default function ProjectsPage() {
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
                My <span className="gradient-text">Projects</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Explore my portfolio of innovative solutions and creative implementations
              </p>
            </motion.div>
          </section>

          <ProjectsSection />
          <BlogSection />
        </main>
        <Footer />
        <ThemeToggle />
      </div>
    </ThemeProvider>
  )
}
