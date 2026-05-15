import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/lib/auth-context'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const geist = Geist({ subsets: ["latin"], variable: '--font-geist' });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: '--font-geist-mono' });

export const metadata: Metadata = {
  title: 'Akoh Rawlings Enow | Software Engineer & Developer',
  description: 'Professional software engineering portfolio showcasing innovative projects, technical expertise, and creative solutions in web and software development.',
  generator: 'v0.app',
  keywords: ['Software Engineer', 'Web Developer', 'Full Stack Developer', 'Portfolio', 'Akoh Enow'],
  authors: [{ name: 'Akoh Rawlings Enow' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://akoh-portfolio.vercel.app',
    siteName: 'Akoh Rawlings Enow Portfolio',
    title: 'Akoh Rawlings Enow | Software Engineer',
    description: 'Professional portfolio of software engineer Akoh Rawlings Enow',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akoh Rawlings Enow | Software Engineer',
    description: 'Professional software engineering portfolio',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#4f6ef7',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            {children}
            <Toaster position="top-center" />
          </AuthProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
