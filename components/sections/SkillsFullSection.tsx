// 'use client'

// import { motion } from 'framer-motion'
// import { ScrollReveal } from '@/components/animations/ScrollReveal'
// import { useInView } from 'react-intersection-observer'
// import { useEffect, useState } from 'react'
// import { db } from '@/lib/firebase'
// import { collection, getDocs } from 'firebase/firestore'

// interface Skill {
//   id: string
//   name: string
//   level: number
//   category: string
// }

// export function SkillsFullSection() {
//   const [skills, setSkills] = useState<Skill[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchSkills = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, 'skills'))
//         const skillsData: Skill[] = []
//         querySnapshot.forEach((doc) => {
//           skillsData.push({ id: doc.id, ...doc.data() } as Skill)
//         })
//         setSkills(skillsData)
//       } catch (error) {
//         console.error('Error fetching skills:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchSkills()
//   }, [])

//   const categories = Array.from(new Set(skills.map(s => s.category)))

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5 },
//     },
//   }

//   if (loading) {
//     return (
//       <section className="section-padding bg-gradient-to-b from-transparent via-accent/5 to-transparent">
//         <div className="max-w-6xl mx-auto">
//           <div className="flex items-center justify-center h-96">
//             <div className="text-muted-foreground">Loading skills...</div>
//           </div>
//         </div>
//       </section>
//     )
//   }

//   return (
//     <section className="section-padding bg-gradient-to-b from-transparent via-accent/5 to-transparent">
//       <ScrollReveal>
//         <div className="max-w-6xl mx-auto">
//           {/* Section Title */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="mb-16"
//           >
//             <h2 className="text-4xl md:text-5xl font-bold mb-4">
//               Technical <span className="gradient-text">Skills</span>
//             </h2>
//             <p className="text-lg text-muted-foreground">
//              A growing toolkit across full-stack development, cybersecurity, and the tools that bridge both worlds.
//             </p>
//           </motion.div>

//           {/* Skills by Category */}
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             className="space-y-12"
//           >
//             {categories.map((category, categoryIndex) => {
//               const categorySkills = skills.filter(s => s.category === category)

//               return (
//                 <motion.div key={category} variants={itemVariants}>
//                   {/* Category Title */}
//                   <h3 className="text-2xl font-bold mb-8 text-foreground">
//                     {category}
//                   </h3>

//                   {/* Skills Grid */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                     {categorySkills.map((skill, skillIndex) => (
//                       <SkillBar key={skill.id} skill={skill} index={skillIndex} />
//                     ))}
//                   </div>
//                 </motion.div>
//               )
//             })}
//           </motion.div>
//         </div>
//       </ScrollReveal>
//     </section>
//   )
// }

// interface SkillBarProps {
//   skill: Skill
//   index: number
// }

// function SkillBar({ skill, index }: SkillBarProps) {
//   const { ref, inView } = useInView({
//     threshold: 0.5,
//     triggerOnce: true,
//   })
//   const [displayLevel, setDisplayLevel] = useState(0)

//   useEffect(() => {
//     if (!inView) return

//     let current = 0
//     const interval = setInterval(() => {
//       current += skill.level / 20
//       if (current >= skill.level) {
//         setDisplayLevel(skill.level)
//         clearInterval(interval)
//       } else {
//         setDisplayLevel(Math.floor(current))
//       }
//     }, 30)

//     return () => clearInterval(interval)
//   }, [inView, skill.level])

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, x: -20 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       viewport={{ once: true }}
//       transition={{ delay: index * 0.1 }}
//       whileHover={{ x: 5 }}
//       className="group"
//     >
//       <div className="flex justify-between items-center mb-3">
//         <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
//           {skill.name}
//         </h4>
//         <span className="text-sm font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">
//           {displayLevel}%
//         </span>
//       </div>

//       {/* Progress Bar Background */}
//       <div className="h-3 bg-muted rounded-full overflow-hidden">
//         {/* Progress Bar Fill */}
//         <motion.div
//           initial={{ width: 0 }}
//           animate={inView ? { width: `${displayLevel}%` } : { width: 0 }}
//           transition={{ duration: 2, ease: 'easeOut' }}
//           className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full shadow-lg"
//         />
//       </div>
//     </motion.div>
//   )
// }


'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

interface Skill {
  id: string
  name: string
  level: number
  category: string
  icon?: string // added
}

export function SkillsFullSection() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'skills'))
        const skillsData: Skill[] = []
        querySnapshot.forEach((doc) => {
          skillsData.push({ id: doc.id, ...doc.data() } as Skill)
        })
        setSkills(skillsData)
      } catch (error) {
        console.error('Error fetching skills:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  const categories = Array.from(new Set(skills.map(s => s.category)))

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

  if (loading) {
    return (
      <section className="section-padding bg-gradient-to-b from-transparent via-accent/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-96">
            <div className="text-muted-foreground">Loading skills...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding bg-gradient-to-b from-transparent via-accent/5 to-transparent">
      <ScrollReveal>
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Technical <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              A growing toolkit across full-stack development, cybersecurity, and the tools that bridge both worlds.
            </p>
          </motion.div>

          {/* Skills by Category */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            {categories.map((category) => {
              const categorySkills = skills.filter(s => s.category === category)

              return (
                <motion.div key={category} variants={itemVariants}>
                  <h3 className="text-2xl font-bold mb-8 text-foreground">
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {categorySkills.map((skill, skillIndex) => (
                      <SkillBar key={skill.id} skill={skill} index={skillIndex} />
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </ScrollReveal>
    </section>
  )
}

interface SkillBarProps {
  skill: Skill
  index: number
}

function SkillBar({ skill, index }: SkillBarProps) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })
  const [displayLevel, setDisplayLevel] = useState(0)
  const [iconError, setIconError] = useState(false) // track if icon fails to load

  useEffect(() => {
    if (!inView) return

    let current = 0
    const interval = setInterval(() => {
      current += skill.level / 20
      if (current >= skill.level) {
        setDisplayLevel(skill.level)
        clearInterval(interval)
      } else {
        setDisplayLevel(Math.floor(current))
      }
    }, 30)

    return () => clearInterval(interval)
  }, [inView, skill.level])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ x: 5 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-3">
        {/* Skill name + icon */}
        <div className="flex items-center gap-2">
          {skill.icon && !iconError && (
            <img
              src={`https://cdn.simpleicons.org/${skill.icon}`}
              alt={skill.name}
              className="w-5 h-5"
              onError={() => setIconError(true)} // silently hide if icon not found
            />
          )}
          <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {skill.name}
          </h4>
        </div>
        <span className="text-sm font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">
          {displayLevel}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${displayLevel}%` } : { width: 0 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full shadow-lg"
        />
      </div>
    </motion.div>
  )
}
