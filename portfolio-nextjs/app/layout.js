import { Analytics } from '@vercel/analytics/react'
import { Navbar } from '@/components/Navbar/Navbar'
import { inter } from './fonts'
import './critical.css'  // Critical CSS loaded first
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
        {/* Preload critical font for text rendering */}
        <link
          rel="preload"
          as="font"
          href="/assets/fonts/InterVariable.woff2"
          type="font/woff2"
          crossOrigin="anonymous"
          fetchPriority="high"
        />

        {/* Preload critical hero images (responsive) with highest priority for LCP optimization */}
        <link
          rel="preload"
          as="image"
          href="/assets/images/responsive/me3d-sm.avif"
          type="image/avif"
          media="(max-width: 640px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/images/responsive/me3d-md.avif"
          type="image/avif"
          media="(min-width: 641px)"
          fetchPriority="high"
        />

        {/* Preconnect to external domains for analytics */}
        <link rel="preconnect" href="https://vitals.vercel-insights.com" />
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
