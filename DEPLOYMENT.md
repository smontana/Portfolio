# Deployment Guide

## Build Process

This project uses a two-stage build process:

### Stage 1: React Build
```bash
npm run build:only
```
Compiles React app using react-scripts.

### Stage 2: Critical CSS Extraction (Local Only)
```bash
npm run build:critical
```
Extracts and inlines critical CSS for faster First Contentful Paint.

**Note:** This step requires Puppeteer (headless Chrome) which is **not available in Vercel's serverless environment**.

## Deployment Workflows

### Option 1: Deploy Without Critical CSS (Current)
Simply push to GitHub and Vercel will build automatically:
```bash
git push origin main
```

Vercel runs `npm run build` which will:
1. ✅ Build React app successfully
2. ⚠️  Skip critical CSS generation (Puppeteer not available)
3. ✅ Deploy successfully

**Result:** Site works perfectly but without inlined critical CSS optimization.

### Option 2: Deploy With Critical CSS (Manual)
Generate critical CSS locally and commit the build:

```bash
# Build with critical CSS locally
npm run build

# Deploy the pre-built files
vercel --prebuilt
```

**Note:** This requires Vercel CLI and manual deployment.

### Option 3: Use Vercel's Chromium (Recommended for Critical CSS)

Add to `package.json` dependencies:
```json
"@sparticuz/chromium": "^latest"
```

Then update `scripts/inline-critical-css.mjs` to use serverless Chromium.

## Performance Optimizations Included

Without Critical CSS extraction, you still get:
- ✅ Font preloading with `fetchpriority="high"`
- ✅ `font-display: optional` for no layout shift
- ✅ System font fallbacks
- ✅ Preconnect to Vercel Analytics
- ✅ DNS prefetch hints
- ✅ Image preloading
- ✅ Proper CSP headers

With Critical CSS (local builds):
- ✅ All above optimizations
- ✅ 2KB of critical CSS inlined in `<head>`
- ✅ Async CSS loading with media swap trick
- ✅ @font-face declaration in critical CSS

## Recommended Workflow

For now, **deploy without critical CSS** until we implement serverless Chromium support. The performance impact is minimal and the site will still be highly optimized.

To add critical CSS support on Vercel later:
1. Install `@sparticuz/chromium` package
2. Update the inline-critical-css script to use it
3. Deploy normally through Git
