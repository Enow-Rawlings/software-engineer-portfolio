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
  title: 'Akoh Rawlings Enow | Software Engineer & Cybersecurity Enthusiast',
  description: 'Portfolio of Akoh Rawlings Enow — a software engineer and ethical hacking enthusiast building full-stack applications and security tools from Cameroon.',
  keywords: [
    'Software Engineer',
    'Full Stack Developer',
    'Cybersecurity',
    'Ethical Hacking',
    'Penetration Testing',
    'Python',
    'React',
    'CTF',
    'Akoh Rawlings Enow',
    'Cameroon Developer',
  ],
  authors: [{ name: 'Akoh Rawlings Enow' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://software-engineer-portfolio-alpha.vercel.app',
    siteName: 'Akoh Rawlings Enow Portfolio',
    title: 'Akoh Rawlings Enow | Software Engineer & Cybersecurity Enthusiast',
    description: 'Full-stack developer and ethical hacking enthusiast building secure, real-world digital solutions from Cameroon.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akoh Rawlings Enow | Software Engineer & Cybersecurity Enthusiast',
    description: 'Full-stack developer and ethical hacking enthusiast building secure, real-world digital solutions from Cameroon.',
  },
  applicationName: 'Akoh Rawlings Enow Portfolio',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-light-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-dark-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: [
      { url: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  },
  manifest: '/site.webmanifest',
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
