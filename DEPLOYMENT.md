# Deployment Guide

## Build Process

This project uses a two-stage build process with **simple, dependency-free critical CSS inlining**:

### Stage 1: React Build
```bash
npm run build:only
```
Compiles React app using react-scripts.

### Stage 2: Critical CSS Inlining
```bash
npm run build:critical
```
Inlines manually-defined critical CSS for faster First Contentful Paint.

**Works everywhere - no Puppeteer/Chromium dependencies!**

## Simple Critical CSS Approach

The project uses a lightweight Node.js script (`scripts/inline-critical-css-simple.mjs`) that:
1. Reads the built HTML file
2. Inlines critical CSS (manually defined) into a `<style>` tag
3. Converts the main CSS to async loading with the media swap trick
4. Adds noscript fallback for users with JS disabled

### How It Works:

**Critical CSS Includes:**
- @font-face declaration (auto-detects font filename)
- CSS resets and base styles
- Body/root styles (colors, fonts)
- Reduced motion preferences

**No external dependencies needed!**

## Deployment Workflow

Simply push to GitHub and Vercel will build automatically:
```bash
git push origin main
```

Vercel runs `npm run build` which will:
1. ✅ Build React app with react-scripts
2. ✅ Generate critical CSS using serverless Chromium
3. ✅ Inline critical CSS into HTML
4. ✅ Deploy with full performance optimizations

## Performance Optimizations Included

All deployments now include:
- ✅ Font preloading with `fetchpriority="high"`
- ✅ `font-display: optional` for no layout shift
- ✅ System font fallbacks
- ✅ Preconnect to Vercel Analytics
- ✅ DNS prefetch hints
- ✅ Image preloading
- ✅ Proper CSP headers
- ✅ **~2KB of critical CSS inlined in `<head>`**
- ✅ **Async CSS loading with media swap trick**
- ✅ **@font-face declaration in critical CSS**

## Testing Locally

Test the full build process:
```bash
npm run build
```

This will:
1. Build React app
2. Extract and inline critical CSS using your local Chrome
3. Output build statistics

## Updating Critical CSS

If you need to update the critical CSS (e.g., add new above-the-fold styles):

1. Edit `scripts/inline-critical-css-simple.mjs`
2. Update the `criticalCSS` template string
3. Test locally with `npm run build`
4. Deploy

**Tip:** Keep critical CSS under 14KB for optimal performance.

## Alternative: Advanced Critical CSS

For automatic critical CSS extraction (requires Puppeteer), use:
```bash
npm run build:critical:advanced
```

This uses the `scripts/inline-critical-css.mjs` script with the `critical` package, but requires Puppeteer dependencies and won't work on Vercel without serverless Chromium support.
