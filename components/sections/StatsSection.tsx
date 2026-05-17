'use client'

import { motion } from 'framer-motion'
import { AnimatedCounter } from '@/components/animations/AnimatedCounter'
import { ScrollReveal } from '@/components/animations/ScrollReveal'

const stats = [
  { value: 3, suffix: '+', label: 'Real-World Projects Built' },
  { value: 1, suffix: '', label: 'Internship Completed' },
  { value: 2, suffix: '+', label: 'Years Self-Studying Security' },
  { value: 100, suffix: '+', label: 'Hours in CTF Challenges' },
]

export function StatsSection() {
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
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              By The <span className="gradient-text">Numbers</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Proven track record of delivering quality solutions
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="glass rounded-2xl p-8 text-center backdrop-blur-lg border border-primary/10 hover:border-primary/30 transition-all duration-300"
              >
                <motion.div
                  className="text-4xl md:text-5xl font-bold gradient-text mb-3"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <AnimatedCounter
                    value={stat.value}
                    duration={2.5}
                    suffix={stat.suffix}
                  />
                </motion.div>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ScrollReveal>
    </section>
  )
}
