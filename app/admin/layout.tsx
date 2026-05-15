'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Don't redirect if we're already on the login page
    if (pathname === '/admin/login') return

    if (mounted && !loading && !user) {
      router.push('/admin/login')
    }
  }, [user, loading, mounted, router, pathname])

  // Show loading spinner while checking auth (but not on login page)
  if (!mounted || (loading && pathname !== '/admin/login')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  // If user is not authenticated and not on login page, don't render anything (redirect happens in useEffect)
  if (!user && pathname !== '/admin/login') {
    return null
  }

  return <>{children}</>
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayoutContent>{children}</AdminLayoutContent>
  )
}
