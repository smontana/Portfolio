import localFont from 'next/font/local'

export const inter = localFont({
  src: '../public/assets/fonts/InterVariable.woff2',
  display: 'optional', // Faster LCP - uses fallback if font not loaded in 100ms
  variable: '--font-inter',
  preload: true,
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
  adjustFontFallback: 'Arial', // Size-adjust fallback to match Inter's metrics
})
