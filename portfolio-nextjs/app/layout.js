import { Analytics } from '@vercel/analytics/react'
import { Navbar } from '@/components/Navbar/Navbar'
import { inter } from './fonts'
import './globals.scss'

export const metadata = {
  title: 'Stephen Montana',
  description: 'Full Stack Developer specializing in React, Node.js, and modern web technologies. Building innovative solutions and delightful user experiences.',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.webp',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://vitals.vercel-insights.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
      </head>
      <body>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
