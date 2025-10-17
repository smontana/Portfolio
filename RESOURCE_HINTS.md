# Resource Hints Implementation

This document describes the resource hints and performance optimizations implemented in the portfolio site.

## Resource Hints in `public/index.html`

### 1. DNS Prefetch & Preconnect
```html
<link rel="preconnect" href="https://vitals.vercel-insights.com" crossorigin />
<link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
```
**Purpose**: Early DNS resolution and TCP connection to Vercel Analytics
**Impact**: Reduces connection time for analytics requests

### 2. Critical Font Preload
```html
<link rel="preload" as="font" fetchpriority="high"
      href="/assets/fonts/InterVariable.woff2"
      type="font/woff2" crossorigin="anonymous" />
```
**Purpose**: Preload the critical variable font used throughout the site
**Impact**: Eliminates FOUT (Flash of Unstyled Text), faster text rendering

### 3. Hero Image Preload
```html
<link rel="preload" as="image" fetchpriority="high"
      href="/assets/images/me3d.webp" type="image/webp" />
```
**Purpose**: Preload the above-the-fold hero image on the home page
**Impact**: Faster LCP (Largest Contentful Paint), image ready before page paints

## JavaScript Loading Strategy

### Deferred Script Loading
All JavaScript bundles load with `defer` attribute:
```html
<script defer="defer" src="/static/js/runtime.8e6c6028.js"></script>
<script defer="defer" src="/static/js/vendor-react.0df0ac01.js"></script>
<script defer="defer" src="/static/js/vendor-router.ab1ac25a.js"></script>
<script defer="defer" src="/static/js/vendors.f9dd5405.js"></script>
<script defer="defer" src="/static/js/main.319c6ef4.js"></script>
```

**Benefits**:
- Scripts download in parallel without blocking HTML parsing
- Execute in order after DOM is ready
- No render-blocking JavaScript

### Fetch Priority on Images

Critical above-the-fold image (Home page):
```jsx
<img
  src="/assets/images/me3d.webp"
  fetchpriority="high"
  width="400"
  height="400"
/>
```
**File**: `src/pages/Home/Home.js:177`
**Purpose**: Tells browser to prioritize downloading hero image

## Route-Based Prefetching

### Implementation in `src/index.js`

The `RoutePrefetcher` component intelligently prefetches likely next routes:

```javascript
const prefetchMap = {
  '/': ['/about'],           // From Home → likely to visit About
  '/about': ['/work', '/'],  // From About → likely to visit Work or Home
  '/work': ['/about', '/'],  // From Work → likely to go back
};
```

**How it Works**:
1. Uses `requestIdleCallback` to prefetch during browser idle time
2. Webpack magic comments trigger prefetch: `import(/* webpackPrefetch: true */ './pages/About/About')`
3. Browser downloads route chunks with low priority in background
4. When user navigates, chunks are already in cache = instant navigation

**Impact**: Near-instant page transitions after initial load

## Vendor Bundle Optimization

Configured in `craco.config.js` for optimal caching:

```javascript
cacheGroups: {
  reactVendor: { /* React, ReactDOM, Scheduler */ },
  routerVendor: { /* React Router */ },
  framerVendor: { /* Framer Motion */ },
  iconsVendor: { /* React Icons */ },
  defaultVendors: { /* Other node_modules */ },
}
```

**Benefits**:
- Vendor code cached separately from app code
- On deployment, only changed chunks re-download
- Typical update: ~1 KB instead of 50+ KB

## Cache Strategy (vercel.json)

```json
{
  "headers": [
    {
      "source": "/(.*).js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

**Impact**:
- 1-year cache for all JS/CSS (content-hashed filenames)
- Vendor bundles cached until dependencies update
- Perfect for vendor chunk strategy

## Testing Resource Hints

### Chrome DevTools Network Panel

1. Open DevTools → Network tab
2. Reload page
3. Check **Priority** column:
   - Font: **High** ✓
   - Hero image: **High** ✓
   - Vendor JS: **High** (defer) ✓
   - Prefetched routes: **Lowest** (background) ✓

### Lighthouse

Resource hints improve these metrics:
- **LCP (Largest Contentful Paint)**: Hero image preload
- **FCP (First Contentful Paint)**: Font preload prevents FOUT
- **TBT (Total Blocking Time)**: Deferred scripts don't block rendering

### Chrome Coverage Tool

1. DevTools → More tools → Coverage
2. Reload page
3. Check unused code percentage
4. Should see lazy-loaded routes not loaded until navigation

## Performance Impact Summary

| Optimization | Impact | Metrics Improved |
|-------------|--------|------------------|
| Font preload | Eliminates FOUT | FCP, CLS |
| Image preload | Hero image ready before paint | LCP |
| Deferred scripts | Non-blocking JavaScript | FCP, TBT |
| Route prefetch | Instant navigation | Navigation speed |
| Vendor splitting | Better long-term caching | Repeat visit speed |

## Browser Compatibility

- **Preload**: All modern browsers ✓
- **Prefetch**: All modern browsers ✓
- **fetchpriority**: Chrome/Edge 101+, Safari 17.2+ (graceful degradation)
- **defer**: All browsers ✓
- **requestIdleCallback**: Chrome/Edge ✓, Safari/Firefox (fallback to setTimeout)

## Future Enhancements

1. **Service Worker**: Cache vendor bundles for offline access
2. **HTTP/2 Server Push**: Push critical resources before requested
3. **Early Hints (103 status)**: Send preload hints before HTML
4. **Adaptive Loading**: Adjust preload based on connection speed
