'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import type { User } from 'firebase/auth'

interface AuthContextType {
  user: User | null
  loading: boolean
  isConfigured: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isConfigured, setIsConfigured] = useState(false)

  useEffect(() => {
    try {
      const { auth } = require('./firebase')
      if (!auth) {
        // Firebase not configured locally — surface this to consumers so UI can show a helpful message
        setIsConfigured(false)
        setLoading(false)
        return
      }

      setIsConfigured(true)
      const { onAuthStateChanged } = require('firebase/auth')
      const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
        setUser(currentUser)
        setLoading(false)
      })

      return unsubscribe
    } catch (error) {
      console.error('Firebase auth not configured:', error)
      setIsConfigured(false)
      setLoading(false)
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const { auth } = require('./firebase')
      if (!auth) throw new Error('Firebase not configured')
      const { signInWithEmailAndPassword } = require('firebase/auth')
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      throw error
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      const { auth } = require('./firebase')
      if (!auth) throw new Error('Firebase not configured')
      const { createUserWithEmailAndPassword } = require('firebase/auth')
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      const { auth } = require('./firebase')
      if (!auth) throw new Error('Firebase not configured')
      const { signOut } = require('firebase/auth')
      await signOut(auth)
    } catch (error) {
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, isConfigured, signIn, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
