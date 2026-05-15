'use client'

import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, Twitter, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { ScrollReveal } from '@/components/animations/ScrollReveal'

const socialLinks = [
  { icon: Github, href: 'https://github.com/Enow-Rawlings', label: 'GitHub', color: 'hover:text-gray-700' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/akoh-rawlings-enow-14b552327/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B%2BDBJGEFkQKm9epR9gV8jNw%3D%3D', label: 'LinkedIn', color: 'hover:text-blue-700' },
  // { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:text-blue-500' },
  { icon: Mail, href: 'akohenow91@gmail.com', label: 'Email', color: 'hover:text-red-500' },
]

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate sending email - in production, this would call a real API
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log('Form submitted:', formData)
      toast.success('Message sent successfully! I&apos;ll get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="section-padding bg-gradient-to-b from-transparent via-primary/5 to-transparent">
      <ScrollReveal>
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Have a project in mind? Let&apos;s collaborate and create something amazing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Email */}
              <motion.div variants={itemVariants} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Mail size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Email</h3>
                  <a
                    href="mailto:hello@akohrawlings.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    akohenow91@gmail.com
                  </a>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div variants={itemVariants} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Phone size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Phone</h3>
                  <a
                    href="tel:+1234567890"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    +237 672 080 490
                  </a>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div variants={itemVariants} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Location</h3>
                  <p className="text-muted-foreground">
                    Remote / Available Worldwide
                  </p>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold mb-4">Follow Me</h3>
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
                        className={`p-3 bg-muted rounded-lg hover:bg-primary/10 transition-all duration-300 ${link.color}`}
                        aria-label={link.label}
                      >
                        <Icon size={20} />
                      </motion.a>
                    )
                  })}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="lg:col-span-2 glass rounded-xl p-8 border border-primary/10"
            >
              <motion.div variants={itemVariants} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-input text-foreground border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 placeholder:text-muted-foreground"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 bg-input text-foreground border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 placeholder:text-muted-foreground"
                    required
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    className="w-full px-4 py-3 bg-input text-foreground border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 placeholder:text-muted-foreground"
                    required
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    rows={5}
                    className="w-full px-4 py-3 bg-input text-foreground border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 resize-none placeholder:text-muted-foreground"
                    required
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </motion.div>
            </motion.form>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
