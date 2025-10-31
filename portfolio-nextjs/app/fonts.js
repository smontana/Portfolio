import localFont from 'next/font/local'

export const inter = localFont({
  src: '../public/assets/fonts/InterVariable.woff2',
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
})
