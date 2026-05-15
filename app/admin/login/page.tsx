'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/auth-context'
import { toast } from 'sonner'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  
  const router = useRouter()
  
  const { signIn, user, isConfigured } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && user) {
      router.push('/admin/dashboard')
    }
  }, [user, mounted, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setAuthError(null)

    if (!isConfigured) {
      setAuthError('Firebase authentication is not configured. Please check your environment variables.')
      setIsLoading(false)
      return
    }

    try {
      await signIn(email, password)
      toast.success('Successfully logged in!')
      router.push('/admin/dashboard')
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to log in'
      setAuthError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md rounded-3xl border border-border bg-card/90 p-8 shadow-xl"
      >
        <motion.div variants={itemVariants} className="space-y-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Login</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to access your dashboard and manage content.
            </p>
          </div>
          {authError ? (
            <div className="rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {authError}
            </div>
          ) : null}
        </motion.div>

        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Signing in…' : 'Sign In'}
          </button>
        </motion.form>

        <motion.div variants={itemVariants} className="mt-6 text-center text-sm text-muted-foreground">
          {isConfigured
            ? 'Use your admin credentials to continue.'
            : 'Firebase authentication is not configured. Please verify your environment settings.'}
        </motion.div>
      </motion.div>
    </div>
  )
}
