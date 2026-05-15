'use client'

import * as React from 'react'

type Theme = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme | ((theme: Theme) => Theme)) => void
  resolvedTheme: ResolvedTheme
  systemTheme: ResolvedTheme
  themes: Theme[]
}

interface ThemeProviderProps {
  attribute?: string | string[]
  defaultTheme?: Theme
  enableSystem?: boolean
  storageKey?: string
  children: React.ReactNode
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined)
const defaultThemes: Theme[] = ['light', 'dark']

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function resolveTheme(theme: Theme, systemTheme: ResolvedTheme): ResolvedTheme {
  return theme === 'system' ? systemTheme : theme
}

function applyTheme(theme: ResolvedTheme, attribute: string | string[]) {
  const root = document.documentElement
  const attributes = Array.isArray(attribute) ? attribute : [attribute]

  attributes.forEach((attr) => {
    if (attr === 'class') {
      if (theme === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    } else {
      root.setAttribute(attr, theme)
    }
  })
}

export function ThemeProvider({
  attribute = 'class',
  defaultTheme = 'light',
  enableSystem = true,
  storageKey = 'theme',
  children,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme)
  const [systemTheme, setSystemTheme] = React.useState<ResolvedTheme>(() =>
    typeof window === 'undefined' ? 'light' : getSystemTheme()
  )

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)

    const storedTheme = localStorage.getItem(storageKey) as Theme | null
    if (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system') {
      setThemeState(storedTheme)
    } else if (defaultTheme === 'system' && enableSystem) {
      setThemeState('system')
    }

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [defaultTheme, enableSystem, storageKey])

  React.useEffect(() => {
    applyTheme(resolveTheme(theme, systemTheme), attribute)
  }, [attribute, theme, systemTheme])

  const setTheme = React.useCallback(
    (nextTheme: Theme | ((theme: Theme) => Theme)) => {
      setThemeState((currentTheme) => {
        const themeValue =
          typeof nextTheme === 'function' ? nextTheme(currentTheme) : nextTheme

        try {
          localStorage.setItem(storageKey, themeValue)
        } catch {
          // Ignore storage errors.
        }

        return themeValue
      })
    },
    [storageKey]
  )

  const contextValue = React.useMemo(
    () => ({
      theme,
      setTheme,
      resolvedTheme: resolveTheme(theme, systemTheme),
      systemTheme,
      themes: enableSystem ? [...defaultThemes, 'system'] : defaultThemes,
    }),
    [enableSystem, theme, setTheme, systemTheme]
  )

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
