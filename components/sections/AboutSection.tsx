'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { Code2, Brain, Zap } from 'lucide-react'

const highlights = [
  {
    icon: Code2,
    title: 'Full Stack Development',
    description: 'Building complete solutions from frontend UI to backend services using modern technologies and best practices.',
  },
  {
    icon: Brain,
    title: 'Problem Solving',
    description: 'Analyzing complex challenges and developing elegant, efficient solutions with a focus on user experience.',
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Creating fast, responsive applications with optimized code and efficient database queries.',
  },
]

export function AboutSection() {
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
    <section className="section-padding">
      <ScrollReveal>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-6">
                About <span className="gradient-text">Me</span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-lg text-muted-foreground mb-6 leading-relaxed"
              >
                I&apos;m a passionate software engineer with over 5 years of experience in full-stack development. 
                I love creating innovative digital solutions that solve real-world problems and improve people&apos;s lives.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-lg text-muted-foreground mb-6 leading-relaxed"
              >
                My journey in tech started with a curiosity about how things work, and it has evolved into a deep 
                commitment to continuous learning and excellence. I believe in writing clean, maintainable code and 
                delivering exceptional user experiences.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-lg text-muted-foreground mb-8 leading-relaxed"
              >
                When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects, 
                or sharing knowledge with the developer community.
              </motion.p>

              {/* Highlights */}
              <motion.div variants={containerVariants} className="space-y-4">
                {highlights.map((highlight, index) => {
                  const Icon = highlight.icon
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                      className="flex gap-4 p-4 rounded-lg glass border border-primary/10 hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          {highlight.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {highlight.description}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>

            {/* Right - Image/Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl glass overflow-hidden border border-primary/20 relative">
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/30 to-primary/30 animate-pulse" />
                
                {/* Placeholder for profile image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="text-6xl text-primary/40"
                  >
                    💻
                  </motion.div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-8 -right-8 w-24 h-24 bg-primary/10 rounded-lg backdrop-blur-lg border border-primary/20"
              >
                <div className="flex items-center justify-center h-full text-3xl">⚡</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-8 -left-8 w-20 h-20 bg-accent/10 rounded-lg backdrop-blur-lg border border-accent/20"
              >
                <div className="flex items-center justify-center h-full text-2xl">🚀</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
