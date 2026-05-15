'use client'

import { motion } from 'framer-motion'
import { useAuth } from '@/lib/auth-context'
import { LogOut, Briefcase, FileText, Settings } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

const AdminDashboard = () => {
  const { logout, user } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
      router.push('/admin/login')
    } catch (error) {
      toast.error('Failed to log out')
    }
  }

  const stats = [
    { label: 'Total Projects', value: '12', color: 'from-blue-500 to-cyan-500' },
    { label: 'Total Skills', value: '24', color: 'from-purple-500 to-pink-500' },
    { label: 'Total Views', value: '1.2k', color: 'from-green-500 to-teal-500' },
    { label: 'Visitor Rate', value: '94%', color: 'from-orange-500 to-red-500' },
  ]

  const quickLinks = [
    {
      title: 'Projects',
      description: 'Manage your portfolio projects, add new entries, and update visibility.',
      href: '/admin/projects',
      icon: Briefcase,
    },
    {
      title: 'Skills',
      description: 'Add or edit technical skills used throughout your portfolio.',
      href: '/admin/skills',
      icon: FileText,
    },
    {
      title: 'Blog',
      description: 'Create and publish new blog posts for your portfolio.',
      href: '/admin/blog',
      icon: FileText,
    },
    {
      title: 'Settings',
      description: 'Adjust admin preferences and portfolio configuration.',
      href: '/admin/settings',
      icon: Settings,
    },
  ]

  return (
    <div className="flex gap-4 min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 p-4 md:p-8 lg:ml-0">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="border-b border-border pb-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
                <p className="text-muted-foreground">
                  Use the sidebar or quick links below to manage projects, skills, blog posts, and settings.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-2xl border border-border px-4 py-2 text-sm text-muted-foreground">
                  {user?.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-2xl bg-destructive/10 px-4 py-2 text-sm font-semibold text-destructive hover:bg-destructive/20 transition-colors"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-3xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300"
              >
                <p className="text-muted-foreground text-sm font-medium mb-3">{stat.label}</p>
                <p className="text-4xl font-bold">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {quickLinks.map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-semibold mb-2 text-foreground">{item.title}</h2>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Icon size={32} className="text-primary" />
                  </div>
                  <Link href={item.href} className="mt-6 inline-flex items-center gap-2 text-primary font-semibold">
                    Open {item.title}
                    <span aria-hidden="true">→</span>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard