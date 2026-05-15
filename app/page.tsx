'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/navigation/Header'
import { Footer } from '@/components/navigation/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { SkillsPreviewSection } from '@/components/sections/SkillsPreviewSection'
import { ParticlesBackground } from '@/components/animations/ParticlesBackground'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { ThemeProvider } from 'next-themes'

export default function Home() {
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
          <HeroSection />
          <StatsSection />
          <SkillsPreviewSection />
        </main>
        <Footer />
        <ThemeToggle />
      </div>
    </ThemeProvider>
  )
}
