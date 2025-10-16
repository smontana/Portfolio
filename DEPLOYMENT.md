# Deployment Guide

## Build Process

This project uses a two-stage build process with **serverless Chromium support**:

### Stage 1: React Build
```bash
npm run build:only
```
Compiles React app using react-scripts.

### Stage 2: Critical CSS Extraction
```bash
npm run build:critical
```
Extracts and inlines critical CSS for faster First Contentful Paint.

**Now works on both local and Vercel environments!**

## Serverless Chromium Integration

The project now uses `@sparticuz/chromium` and `puppeteer-core` to enable critical CSS generation in Vercel's serverless environment.

### How It Works:

**Local Development:**
- Uses your system's Chrome/Chromium browser
- Full critical CSS extraction with all features

**Vercel Deployment:**
- Automatically uses serverless Chromium (`@sparticuz/chromium`)
- Full critical CSS extraction during build
- No manual intervention needed

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

## Troubleshooting

### Build fails on Vercel
If the build fails with Chromium errors, check:
- `@sparticuz/chromium` is in `devDependencies`
- `puppeteer-core` is in `devDependencies`
- Build logs show "Using serverless Chromium for Vercel"

### Critical CSS not generated locally
Make sure Chrome is installed at:
- **macOS**: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
- **Linux**: `/usr/bin/chromium-browser`
- **Windows**: `C:\Program Files\Google\Chrome\Application\chrome.exe`
