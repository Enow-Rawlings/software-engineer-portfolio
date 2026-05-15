'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ScrollReveal } from '@/components/animations/ScrollReveal'

const skillCategories = [
  {
    category: 'Frontend',
    skills: ['React', 'HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express', 'Firebase', 'REST APIs'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    category: 'Tools & Tech',
    skills: ['Git', 'Nmap', 'AWS', 'MongoDB'],
    color: 'from-green-500 to-teal-500',
  },
]

export function SkillsPreviewSection() {
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="section-padding">
      <ScrollReveal>
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-center mb-16"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">Skills</span> & Expertise
              </h2>
              <p className="text-lg text-muted-foreground">
                Proficient in modern technologies and frameworks
              </p>
            </div>
            <motion.div whileHover={{ x: 5 }}>
              <Link
                href="/about"
                className="hidden md:flex items-center gap-2 text-primary hover:text-primary-foreground transition-colors group"
              >
                View All Skills
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="glass rounded-xl p-8 border border-primary/10 hover:border-primary/30 transition-all duration-300"
              >
                {/* Category Title */}
                <div className={`bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                  <h3 className="text-2xl font-bold mb-6">{category.category}</h3>
                </div>

                {/* Skills List */}
                <ul className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.li
                      key={skillIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: skillIndex * 0.1 }}
                      className="flex items-center gap-3 text-foreground"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-medium">{skill}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Learn More Button */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/about"
                    className="mt-6 inline-flex w-full justify-center py-2 border border-primary/30 text-primary rounded-lg hover:bg-primary/5 transition-all duration-300 font-medium text-sm"
                  >
                    Explore
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile View All Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="md:hidden flex justify-center mt-12"
          >
            <Link
              href="/about"
              className="px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-semibold flex items-center gap-2"
            >
              View All Skills
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </ScrollReveal>
    </section>
  )
}
