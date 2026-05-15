'use client'

import { motion } from 'framer-motion'
import { Calendar, Tag, Search } from 'lucide-react'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  featured: boolean
  published: boolean
  publishedAt: string
  createdAt: string
}

export function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'blog_posts'))
        const postsData: BlogPost[] = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          if (data.published) { // Only show published posts
            postsData.push({ id: doc.id, ...data } as BlogPost)
          }
        })
        setPosts(postsData)
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const categories = ['All', ...new Set(posts.map(p => p.category))]

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-96">
            <div className="text-muted-foreground">Loading blog posts...</div>
          </div>
        </div>
      </section>
    )
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
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Latest <span className="gradient-text">Blog</span> Posts
            </h2>
            <p className="text-lg text-muted-foreground">
              Insights, tutorials, and thoughts on software development
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground hover:bg-muted/80'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Blog Posts Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </motion.div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">No blog posts found matching your criteria.</p>
            </motion.div>
          )}
        </div>
      </ScrollReveal>
    </section>
  )
}

interface BlogCardProps {
  post: BlogPost
}

function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -4 }}
      className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary hover:shadow-lg transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            {new Date(post.publishedAt).toLocaleDateString()}
          </div>
          <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
            {post.category}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="text-muted-foreground mb-4">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-muted text-foreground rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}
