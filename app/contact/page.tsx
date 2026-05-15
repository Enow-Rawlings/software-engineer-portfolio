'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/navigation/Header'
import { Footer } from '@/components/navigation/Footer'
import { ContactSection } from '@/components/sections/ContactSection'
import { ParticlesBackground } from '@/components/animations/ParticlesBackground'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { ThemeProvider } from 'next-themes'
import { motion } from 'framer-motion'

export default function ContactPage() {
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
                Let&apos;s <span className="gradient-text">Connect</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Have a project idea or want to collaborate? I&apos;d love to hear from you!
              </p>
            </motion.div>
          </section>

          <ContactSection />
        </main>
        <Footer />
        <ThemeToggle />
      </div>
    </ThemeProvider>
  )
}
