import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode
  reactStrictMode: true,

  // Add compression
  compress: true,

  // Remove X-Powered-By header for security
  poweredByHeader: false,

  // Generate ETags for better caching
  generateEtags: true,

  // Type-safe routing
  typedRoutes: true,

  // Set output file tracing root to this directory (silences multiple lockfile warning)
  outputFileTracingRoot: __dirname,

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [170, 340, 400, 510, 640, 768, 1024, 1280],
    imageSizes: [16, 32, 48, 64, 96, 128, 192, 256, 384],
    minimumCacheTTL: 60, // Cache optimized images for 60 seconds minimum
    dangerouslyAllowSVG: true, // Allow SVG images
    contentDispositionType: 'attachment', // Security for SVGs
  },

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Experimental features for better performance
  experimental: {
    // Optimize CSS delivery
    optimizeCss: true,

    // Inline critical CSS automatically
    inlineCss: true,

    // Optimize package imports for better tree-shaking
    optimizePackageImports: ['react-icons', 'animejs', '@vercel/analytics'],

    // Optimize React server rendering
    optimizeServerReact: true,

    // Enable server actions with size limit
    serverActions: {
      bodySizeLimit: '2mb',
    },

    // Optimize memory usage during builds
    memoryBasedWorkersCount: true,

    // Use light client-side router instead of full router
    clientRouterFilter: true,

    // Optimize CSS modules (strict for maximum optimization)
    cssChunking: 'strict',
  },

  // Headers for security (replicate your current CSP)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https:;
              font-src 'self' data:;
              connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://vitals.vercel-insights.com;
            `.replace(/\s{2,}/g, ' ').trim()
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()'
          },
          // Add cache headers for static assets
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
    ]
  },
};

export default nextConfig;
