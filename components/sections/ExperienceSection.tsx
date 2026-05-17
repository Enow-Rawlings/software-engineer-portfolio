'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/animations/ScrollReveal'

const experiences = [
  {
    title: "Software Engineering Intern",
    company: "ZENVATECH",
    period: "Jul 2024 – Aug 2024",
    description:
      "Contributed to frontend development during a 2-month internship. Built and styled responsive websites and collaborated on a real-time chat application, handling UI components, Firebase integration, and state management.",
    technologies: ["React.js", "Firebase", "Tailwind CSS", "JavaScript"],
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Independent Developer",
    company: "Self-directed",
    period: "2025 – Present",
    description:
      "Building personal and open-source projects outside of academics, including SiteShield — a Flask-based web security scanning SaaS with scheduled monitoring, email alerts, and tiered access. Also actively studying ethical hacking and penetration testing through CTF challenges and self-study.",
    technologies: ["Python", "Flask", "PostgreSQL", "Redis", "Kali Linux"],
    color: "from-green-500 to-teal-500",
  },
]

export function ExperienceSection() {
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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="section-padding">
      <ScrollReveal>
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Professional <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              A journey of growth and innovation in software development
            </p>
          </motion.div>

          {/* Timeline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ x: 10 }}
                className="relative"
              >
                {/* Timeline Connector */}
                {index < experiences.length - 1 && (
                  <div className="absolute left-8 top-32 h-16 w-0.5 bg-gradient-to-b from-primary to-transparent" />
                )}

                {/* Timeline Dot */}
                <div className="absolute left-0 top-2 w-16 h-16 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-12 h-12 rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center"
                  >
                    <div className="w-4 h-4 rounded-full bg-primary" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="ml-32 glass rounded-xl p-8 border border-primary/10 hover:border-primary/30 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {experience.title}
                      </h3>
                      <p className="text-lg text-primary font-semibold">
                        {experience.company}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground font-medium mt-2 md:mt-0">
                      {experience.period}
                    </span>
                  </div>

                  <p className="text-muted-foreground mb-4">
                    {experience.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full border border-primary/20 font-medium"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ScrollReveal>
    </section>
  )
}
