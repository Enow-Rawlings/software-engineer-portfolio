'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' },
  ]

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="text-2xl font-bold gradient-text">
            ARE
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hidden md:flex items-center gap-8"
        >
          {navItems.map((item) => (
            <motion.div key={item.href} variants={itemVariants}>
              <Link
                href={item.href}
                className="text-foreground hover:text-primary transition-colors relative group font-medium"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:block"
        >
          <Link
            href="/contact"
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Get in Touch
          </Link>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </nav>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl"
      >
        <div className="px-4 py-4 space-y-3">
          {navItems.map((item) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href={item.href}
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
          <Link
            href="/contact"
            className="block px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold text-center hover:shadow-lg transition-all"
            onClick={() => setIsOpen(false)}
          >
            Get in Touch
          </Link>
        </div>
      </motion.div>
    </motion.header>
  )
}
