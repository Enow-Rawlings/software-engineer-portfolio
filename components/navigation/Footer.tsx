'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Enow-Rawlings', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/akoh-rawlings-enow-14b552327/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B%2BDBJGEFkQKm9epR9gV8jNw%3D%3D', label: 'LinkedIn' },
    // { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Mail, href: 'akohenow91@gmail.com', label: 'Email' },
  ]

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <footer className="bg-secondary text-secondary-foreground relative mt-20">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16"
        >
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-4 gradient-text">Akoh Rawlings</h3>
              <p className="text-sm opacity-75 leading-relaxed">
                A passionate software engineer building innovative digital solutions. Specialized in full-stack development with modern technologies.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-primary transition-colors opacity-75 hover:opacity-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-secondary-foreground/10 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      aria-label={link.label}
                    >
                      <Icon size={20} />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div variants={itemVariants} className="h-px bg-secondary-foreground/10 my-8" />

          {/* Bottom Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-75"
          >
            <p>&copy; {currentYear} Akoh Rawlings Enow. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
