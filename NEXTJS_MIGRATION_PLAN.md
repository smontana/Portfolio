# Next.js Migration Plan

Complete guide for migrating your portfolio from Create React App to Next.js 14+ (App Router).

---

## 📊 Migration Overview

### Why Migrate to Next.js?

**Performance Benefits:**
- **Server-Side Rendering (SSR)**: HTML pre-rendered on server → instant First Contentful Paint
- **Static Site Generation (SSG)**: Pages built at build time → CDN-ready, ultra-fast
- **Automatic Code Splitting**: Better than current manual lazy loading
- **Image Optimization**: Built-in `next/image` component
- **Font Optimization**: Automatic font loading optimization
- **Route Prefetching**: Automatic, more intelligent than current implementation

**Expected Performance Impact:**
- **LCP**: < 500ms (currently ~770ms after optimizations)
- **Element Render Delay**: Eliminated entirely (0ms vs current ~400ms)
- **Time to Interactive**: ~50% faster
- **Perfect PageSpeed Score**: 95-100 possible

**Development Benefits:**
- File-based routing (no more manual route config)
- API routes (if needed for contact form)
- Better TypeScript support
- Incremental adoption possible

---

## 🎯 Migration Strategy

### Approach: **Incremental Migration** (Recommended)

Instead of a big-bang rewrite, migrate incrementally:

1. **Phase 1**: Set up Next.js alongside CRA (parallel structure)
2. **Phase 2**: Migrate components (copy → test → verify)
3. **Phase 3**: Migrate pages one by one
4. **Phase 4**: Test, optimize, deploy
5. **Phase 5**: Remove CRA dependencies

**Timeline**: 2-3 days for a clean migration

---

## 📁 File Structure Mapping

### Current CRA Structure → Next.js App Router Structure

```
CRA (Current)                          Next.js 14+ (App Router)
═══════════════════════════════════════════════════════════════════

public/                                public/
├─ index.html                          (removed - Next.js generates)
├─ assets/                             ├─ assets/
│  ├─ fonts/                           │  ├─ fonts/
│  └─ images/                          │  └─ images/
└─ manifest.json                       └─ manifest.json

src/                                   app/
├─ index.js                            ├─ layout.js (root layout)
├─ styles/                             ├─ globals.scss
│  └─ index.scss                       └─ (route folders)
│
├─ pages/                              app/
│  ├─ Home/                            ├─ page.js (Home - root /)
│  │  ├─ Home.js                       ├─ about/
│  │  └─ Style.scss                    │  └─ page.js
│  ├─ About/                           └─ work/
│  │  ├─ About.js                         └─ page.js
│  │  └─ Style.scss
│  ├─ Work/
│  └─ Contact/
│
├─ components/                         components/
│  ├─ Navbar/                          ├─ Navbar/
│  ├─ StephenSVG/                      ├─ StephenSVG/
│  └─ ...                              └─ ...
│
└─ hooks/                              hooks/
   └─ useInView.js                     └─ useInView.js

package.json (CRA)                     package.json (Next.js)
craco.config.js                        next.config.js
                                       tsconfig.json (optional)
```

---

## 🔧 Step-by-Step Migration Guide

### Phase 1: Project Setup (30 minutes)

#### 1.1 Create Next.js App in Parallel

```bash
# In project root
npx create-next-app@latest portfolio-nextjs --typescript --tailwind --app --src-dir --no-eslint

# Or without TypeScript:
npx create-next-app@latest portfolio-nextjs --no-typescript --tailwind --app --src-dir
```

**Options explained:**
- `--app`: Use App Router (recommended for new projects)
- `--src-dir`: Use `src/` directory (matches current structure)
- `--tailwind`: Include Tailwind CSS (you already use it)
- `--no-eslint`: Skip ESLint (configure manually later)

#### 1.2 Install Dependencies

```bash
cd portfolio-nextjs

# Core dependencies you currently use
npm install react-icons @vercel/analytics sass

# Next.js specific (already included)
# - next
# - react
# - react-dom
```

**Remove unused CRA dependencies:**
- `react-router-dom` → Not needed (Next.js has built-in routing)
- `react-scripts` → Not needed
- `@craco/craco` → Not needed
- `framer-motion` → (You already removed this)

---

### Phase 2: Configure Next.js (30 minutes)

#### 2.1 Create `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode
  reactStrictMode: true,

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [170, 340, 510, 640, 768, 1024, 1280],
    imageSizes: [16, 32, 48, 64, 96],
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
          }
        ],
      },
    ]
  },

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons'],
  },
}

module.exports = nextConfig
```

#### 2.2 Configure SCSS

```bash
# SCSS already works in Next.js, just use it!
# No additional config needed
```

#### 2.3 Set up Font Optimization

Create `app/fonts.js`:

```javascript
import localFont from 'next/font/local'

export const inter = localFont({
  src: '../public/assets/fonts/InterVariable.woff2',
  display: 'optional',
  variable: '--font-inter',
  preload: true,
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
})
```

---

### Phase 3: Migrate Root Layout (45 minutes)

#### 3.1 Create `app/layout.js`

```javascript
import { Analytics } from '@vercel/analytics/react'
import { inter } from './fonts'
import './globals.scss'

export const metadata = {
  title: 'Stephen Montana',
  description: 'Full Stack Developer specializing in React, Node.js, and modern web technologies. Building innovative solutions and delightful user experiences.',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#000000',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.webp',
  },
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
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

#### 3.2 Create `app/globals.scss`

```scss
// Import your existing global styles
@import '../styles/index.scss';

// Add CSS variables for font
:root {
  --font-inter: #{$font-family-base};
}

body {
  font-family: var(--font-inter);
}
```

---

### Phase 4: Migrate Components (2-3 hours)

Components are mostly **copy-paste compatible** with minor adjustments:

#### 4.1 Copy Components Directory

```bash
# Copy entire components directory
cp -r src/components components/
```

#### 4.2 Update Component Exports

**Before (CRA):**
```javascript
export function Navbar() { ... }
```

**After (Next.js - keep the same!):**
```javascript
'use client' // Add this ONLY if component uses hooks or interactivity

export function Navbar() { ... }
```

**When to add `'use client'`:**
- Components using `useState`, `useEffect`, `useRef`
- Components with event handlers (`onClick`, `onChange`)
- Components using browser APIs
- Interactive components (forms, modals, etc.)

**Don't add `'use client'` to:**
- Pure presentational components
- Components that can be server-rendered

#### 4.3 Update Image Imports

**Before (CRA):**
```javascript
<img src="/assets/images/responsive/me3d-md.avif" />
```

**After (Next.js):**
```javascript
import Image from 'next/image'

<Image
  src="/assets/images/responsive/me3d-md.avif"
  alt="Stephen Montana"
  width={340}
  height={510}
  priority // For LCP images
  sizes="(max-width: 640px) 170px, (max-width: 1024px) 340px, 510px"
/>
```

**Benefits:**
- Automatic image optimization
- Lazy loading by default
- Responsive srcset generation
- AVIF/WebP conversion automatic

---

### Phase 5: Migrate Pages (3-4 hours)

#### 5.1 Home Page: `app/page.js`

```javascript
import { Navbar } from '@/components/Navbar/Navbar'
import { Socials } from '@/components/Socials/Socials'
import { StephenSVG } from '@/components/StephenSVG/StephenSVG'
import Image from 'next/image'
import './page.scss'

// This is a Server Component by default!
// Add 'use client' ONLY if you need client-side interactivity

export const metadata = {
  title: 'Home - Stephen Montana',
  description: 'Welcome to my portfolio',
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="home">
        <div className="info-section">
          <h1>
            <span className="greeting">Hi, I'm</span>
            <span className="name-container">
              <StephenSVG />
            </span>
          </h1>
          <h2 className="subtitle">A Full Stack Developer</h2>
          <p className="intro-text">
            If you're working on something cool, reach out and let's collaborate!
          </p>
          <Socials />
        </div>

        <div className="image-section">
          <Image
            src="/assets/images/responsive/me3d-md.avif"
            alt="Stephen Montana - 3D rendered portrait"
            width={340}
            height={510}
            priority
            sizes="(max-width: 640px) 170px, (max-width: 1024px) 340px, 510px"
          />
        </div>
      </main>
    </>
  )
}
```

**Key Changes:**
- Export `metadata` for SEO (replaces `<title>`, `<meta>`)
- Use `Image` component instead of `<img>`
- Default export function with `Page` suffix
- Server Component by default (faster!)

#### 5.2 About Page: `app/about/page.js`

```javascript
import { Navbar } from '@/components/Navbar/Navbar'
import { Heading } from '@/components/Heading/Heading'
import './page.scss'

export const metadata = {
  title: 'About - Stephen Montana',
  description: 'Learn more about Stephen Montana',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="about">
        <Heading>About Me</Heading>
        {/* ... rest of content */}
      </main>
    </>
  )
}
```

#### 5.3 Work Page: `app/work/page.js`

Similar structure to About page.

---

### Phase 6: Handle Client-Side Interactivity (2 hours)

For components with interactivity (easter egg, animations):

#### 6.1 Create Client Components

**Home page with easter egg:**

Split into two files:

`app/page.js` (Server Component):
```javascript
import { HomeClient } from './HomeClient'

export const metadata = { ... }

export default function HomePage() {
  return <HomeClient />
}
```

`app/HomeClient.js` (Client Component):
```javascript
'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/Navbar/Navbar'
// ... rest of imports

export function HomeClient() {
  // All your interactive logic here
  const [showMatrix, setShowMatrix] = useState(false)
  // ... easter egg logic

  return (
    <>
      <Navbar />
      {/* ... interactive UI */}
    </>
  )
}
```

**Best Practice:** Keep Server Components as the default, only mark client components with `'use client'`.

---

### Phase 7: Routing & Navigation (30 minutes)

#### 7.1 Remove React Router

All routing is file-based in Next.js!

**Before (CRA):**
```javascript
<Route path="/about" element={<About />} />
```

**After (Next.js):**
Just create `app/about/page.js` - that's it!

#### 7.2 Update Navigation Links

**Before (CRA):**
```javascript
import { Link } from 'react-router-dom'
<Link to="/about">About</Link>
```

**After (Next.js):**
```javascript
import Link from 'next/link'
<Link href="/about">About</Link>
```

**Benefits:**
- Automatic prefetching (faster than your current implementation)
- No need for custom RoutePrefetcher
- Scroll restoration built-in

---

### Phase 8: Optimize Assets (1 hour)

#### 8.1 Optimize Images with Next.js

You can remove your custom responsive image logic:

**Before (custom ResponsiveImage component):**
```javascript
<ResponsiveImage
  baseName="me3d"
  sizes="..."
/>
```

**After (Next.js Image):**
```javascript
<Image
  src="/assets/images/me3d.avif"
  alt="..."
  width={340}
  height={510}
  sizes="..."
/>
```

Next.js automatically:
- Generates responsive srcset
- Converts to AVIF/WebP
- Lazy loads (except when `priority` is set)
- Optimizes file size

#### 8.2 Remove Build Scripts

Delete these (Next.js handles automatically):
- `scripts/generate-responsive-images.mjs` (Next.js optimizes images)
- `scripts/inject-modulepreload.mjs` (Next.js adds resource hints)
- `scripts/inline-critical-css-simple.mjs` (Next.js handles CSS)

---

### Phase 9: Testing & Optimization (2-3 hours)

#### 9.1 Development Testing

```bash
npm run dev
```

Test each page:
- ✅ Page renders correctly
- ✅ Styles applied
- ✅ Images load
- ✅ Navigation works
- ✅ Interactive features work
- ✅ Easter egg still functional

#### 9.2 Production Build

```bash
npm run build
npm start
```

#### 9.3 Performance Testing

Use Lighthouse on production build:

**Expected scores:**
- **Performance**: 95-100 (was 85-90)
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

**Key metrics:**
- **LCP**: < 500ms (was ~770ms)
- **FCP**: < 300ms
- **TBT**: < 100ms
- **CLS**: 0

---

## 📊 Performance Comparison

### Before (CRA with optimizations):

```
HTML load → Parse → Discover JS → Download React → Hydrate → Render
└─ 164ms    +200ms    +300ms         +600ms        +400ms   = 1,664ms
```

**LCP**: ~770ms
**Element Render Delay**: ~400ms

### After (Next.js SSG):

```
HTML load (with pre-rendered content!) → Download JS → Hydrate (optional)
└─ 164ms                                   +300ms      +200ms = 664ms
```

**LCP**: < 500ms
**Element Render Delay**: 0ms (content in HTML!)
**~60% faster first paint**

---

## 🎯 Migration Checklist

### Pre-Migration
- [ ] Review current site functionality
- [ ] Document custom behaviors
- [ ] Backup current codebase
- [ ] Create new Next.js project

### Core Setup
- [ ] Configure `next.config.js`
- [ ] Set up fonts
- [ ] Create root layout
- [ ] Copy global styles

### Components
- [ ] Copy components directory
- [ ] Add `'use client'` where needed
- [ ] Update image imports to `next/image`
- [ ] Test each component

### Pages
- [ ] Migrate Home page
- [ ] Migrate About page
- [ ] Migrate Work page
- [ ] Update metadata for SEO

### Routing
- [ ] Remove React Router
- [ ] Update all `<Link>` components
- [ ] Test navigation

### Optimization
- [ ] Configure image optimization
- [ ] Remove old build scripts
- [ ] Test production build
- [ ] Run Lighthouse audits

### Deployment
- [ ] Deploy to Vercel
- [ ] Test live site
- [ ] Monitor analytics
- [ ] Compare performance metrics

---

## 🚀 Deployment

### Vercel (Recommended - Zero Config)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Other Platforms

Next.js can be deployed to:
- **Netlify**: `npm run build` → deploy `./out`
- **AWS Amplify**: Direct integration
- **Docker**: Use official Next.js Docker image
- **Traditional hosting**: Export as static site

---

## ⚠️ Gotchas & Common Issues

### 1. **'use client' Directive**

**Issue**: Forgetting to add `'use client'` to interactive components

**Solution**: Add to any component using:
- Hooks (useState, useEffect, etc.)
- Event handlers
- Browser APIs

### 2. **Image Paths**

**Issue**: Images not loading

**Solution**: All public assets go in `/public`, reference without `/public`:
```javascript
// ✅ Correct
<Image src="/assets/images/me3d.avif" />

// ❌ Wrong
<Image src="/public/assets/images/me3d.avif" />
```

### 3. **CSS Module Naming**

**Issue**: SCSS modules not applying

**Solution**: Use `.module.scss` extension:
```javascript
// Component.module.scss
import styles from './Component.module.scss'
```

### 4. **Hydration Errors**

**Issue**: "Hydration failed" errors

**Causes**:
- Server/client HTML mismatch
- Using browser APIs in Server Components
- Conditional rendering based on client state

**Solution**: Move client-specific logic to Client Components

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router Tutorial](https://nextjs.org/learn)
- [Image Optimization Guide](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Font Optimization Guide](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [Migration Guide from CRA](https://nextjs.org/docs/app/building-your-application/upgrading/from-create-react-app)

---

## 🎉 Expected Benefits Post-Migration

### Performance
- ✅ **Perfect LCP**: < 500ms (80% improvement)
- ✅ **Zero render delay**: Content in HTML
- ✅ **Faster TTI**: Pre-optimized bundles
- ✅ **Better caching**: Automatic static optimization

### Developer Experience
- ✅ **Simpler routing**: File-based, no config
- ✅ **Better DX**: Fast Refresh, better errors
- ✅ **Less boilerplate**: No custom build scripts
- ✅ **TypeScript ready**: Easy to adopt later

### SEO
- ✅ **Better crawling**: Pre-rendered HTML
- ✅ **Social sharing**: Proper meta tags
- ✅ **Structured data**: Easy to add

---

## 💡 Pro Tips

1. **Start with a new Next.js app** rather than trying to convert in-place
2. **Migrate components first**, then pages
3. **Use Server Components by default**, only use Client Components when needed
4. **Test frequently** as you migrate
5. **Keep the CRA version running** until Next.js is fully tested
6. **Use `next/image`** everywhere - it's much better than custom solutions
7. **Leverage automatic optimizations** - Next.js handles most of what you manually optimized

---

## ⏱️ Estimated Timeline

- **Setup**: 30 min
- **Configuration**: 30 min
- **Root Layout**: 45 min
- **Components**: 2-3 hours
- **Pages**: 3-4 hours
- **Client Interactivity**: 2 hours
- **Testing**: 2-3 hours
- **Deployment**: 30 min

**Total**: **1.5-2 days** for a complete, tested migration

---

## 🎯 Bottom Line

Migrating to Next.js will:
- **Eliminate element render delay** entirely
- Give you **sub-500ms LCP**
- **Simplify your codebase** (remove custom optimizations)
- **Improve DX** dramatically
- Set you up for **future growth** (API routes, ISR, etc.)

**It's worth the 2-day investment!**
