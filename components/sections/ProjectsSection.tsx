'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink, Code2 } from 'lucide-react'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  github: string
  demo: string
  visible: boolean
  createdAt: string
}

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'))
        const projectsData: Project[] = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          if (data.visible !== false) { // Only show visible projects
            projectsData.push({ id: doc.id, ...data } as Project)
          }
        })
        setProjects(projectsData)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const categories = ['All', ...new Set(projects.map(p => 'Full Stack'))] // Default category for now

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => selectedCategory === 'Full Stack')

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

  if (loading) {
    return (
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-96">
            <div className="text-muted-foreground">Loading projects...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding">
      <ScrollReveal>
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Showcasing my best work and creative solutions
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </div>
      </ScrollReveal>
    </section>
  )
}

interface ProjectCardProps {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="group relative h-96"
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
    >
      {/* Card Container */}
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full h-full"
      >
        {/* Front Side - Image */}
        <motion.div
          style={{ backfaceVisibility: 'hidden' }}
          className="absolute w-full h-full"
        >
          <div className="glass rounded-xl overflow-hidden border border-primary/10 h-full flex flex-col relative">
            {/* Image */}
            <div className="h-48 overflow-hidden relative">
              {project.image ? (
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
              ) : (
                <div className="w-full h-full bg-muted/30 flex items-center justify-center text-sm text-muted-foreground">
                  No image available
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold mb-2 text-foreground">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back Side - Links */}
        <motion.div
          style={{ backfaceVisibility: 'hidden', rotateY: 180 }}
          className="absolute w-full h-full"
        >
          <div className="glass rounded-xl overflow-hidden border border-primary/10 h-full flex flex-col items-center justify-center gap-6 p-6">
            <Code2 className="w-12 h-12 text-primary" />
            <div className="text-center">
              <h4 className="text-lg font-bold mb-2 text-foreground">View Project</h4>
              <p className="text-sm text-muted-foreground mb-6">
                Check out the code and live demo
              </p>
            </div>

            <div className="flex gap-4 w-full">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
              >
                <Github size={18} />
                Code
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-all duration-300 font-semibold"
              >
                <ExternalLink size={18} />
                Live
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
