# Caching Strategy

This document explains the caching strategy implemented for this portfolio site on Vercel.

## Overview

The caching strategy is configured in `vercel.json` and follows Create React App best practices for optimal performance and cache invalidation.

## Cache Headers Configuration

### 1. Static Assets with Hashed Filenames (1 year cache)

**Applies to:** `/static/*` directory
- **Cache-Control:** `public, max-age=31536000, immutable`
- **Duration:** 1 year (31,536,000 seconds)
- **Rationale:** Create React App generates unique hashed filenames for JS/CSS files (e.g., `main.3ef2d942.js`). When content changes, the filename changes, so we can cache aggressively without worry of serving stale content.

### 2. Images and Media (1 year cache)

**Applies to:** `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.svg`, `.ico`
- **Cache-Control:** `public, max-age=31536000, immutable`
- **Duration:** 1 year
- **Rationale:** Images are static assets that rarely change. Using content-based filenames or versioning allows long-term caching.

### 3. Font Files (1 year cache)

**Applies to:** `.woff`, `.woff2`, `.ttf`, `.eot`
- **Cache-Control:** `public, max-age=31536000, immutable`
- **Duration:** 1 year
- **Rationale:** Font files never change once deployed. Long-term caching improves performance significantly.

### 4. HTML Files (No cache)

**Applies to:** `index.html` and all `.html` files
- **Cache-Control:** `public, max-age=0, must-revalidate`
- **Duration:** Always revalidate
- **Rationale:** HTML files reference the hashed JS/CSS assets. They must always be fresh to point to the latest asset versions. Browsers will still cache but must revalidate with the server on each request.

### 5. Manifest File (24 hour cache)

**Applies to:** `manifest.json`
- **Cache-Control:** `public, max-age=86400`
- **Duration:** 24 hours
- **Rationale:** PWA manifest rarely changes but doesn't need aggressive caching. 24 hours balances performance with flexibility.

## Security Headers

All responses include these security headers:

- **X-Content-Type-Options:** `nosniff` - Prevents MIME type sniffing
- **X-Frame-Options:** `DENY` - Prevents clickjacking attacks
- **Referrer-Policy:** `strict-origin-when-cross-origin` - Controls referrer information
- **Permissions-Policy:** Disables unnecessary browser features (geolocation, camera, microphone, etc.)

## Performance Benefits

This caching strategy provides:

1. **Reduced Server Load:** Static assets served from browser/CDN cache
2. **Faster Page Loads:** Repeat visitors load instantly from cache
3. **Reduced Bandwidth:** Fewer requests to origin server
4. **Instant Cache Invalidation:** New deployments automatically fetch updated assets due to filename hashing

## Testing Cache Headers

After deploying to Vercel, test cache headers with:

```bash
# Check static asset caching
curl -I https://your-domain.vercel.app/static/js/main.3ef2d942.js

# Check HTML caching
curl -I https://your-domain.vercel.app/

# Check image caching
curl -I https://your-domain.vercel.app/assets/images/me3d.webp
```

Look for the `cache-control` header in the response.

## Additional Notes

- The `immutable` directive tells browsers the resource will never change, preventing unnecessary revalidation requests
- Vercel's CDN automatically caches responses based on these headers
- This configuration works seamlessly with Create React App's build output
