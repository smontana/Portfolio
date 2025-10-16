# Bundle Analysis Report

Generated: 2025-10-16

## Current Bundle Size

**Main bundle:** 100.4 KB (gzipped)
**Total JS:** ~130 KB (gzipped including chunks)

## Bundle Composition

### Main Bundle (main.js - 100.4 KB)

| Package | Size | Status | Action |
|---------|------|--------|--------|
| react-dom | 129.6 KB | ✅ Required | Keep |
| react | 6.4 KB | ✅ Required | Keep |
| react-router | 14.5 KB | ✅ Required | Keep |
| @floating-ui/react | 17.3 KB | ⚠️ Heavy for tooltips | **Replace** |
| clsx | 16 KB | ⚠️ From floating-ui | **Will be removed** |
| react-icons/di | 21 KB | ⚠️ Large chunk | Keep (needed) |
| react-icons/bi | 13.5 KB | ⚠️ Large chunk | Keep (needed) |
| StephenSVG component | 4.1 KB | ✅ Custom component | Keep |
| scheduler | 3.8 KB | ✅ React dependency | Keep |

### Code-Split Chunks (Good!)

| Chunk | Size | Contents |
|-------|------|----------|
| 418.chunk.js | 12.49 KB | animejs (animation library) |
| 522.chunk.js | 7.92 KB | Work page components |
| 387.chunk.js | 6.35 KB | About page components |
| Others | < 2 KB | Small page-specific code |

## Findings

### ✅ What's Working Well

1. **Animation libraries are code-split** - animejs and framer-motion are loaded separately
2. **react-toastify IS being used** - In Form component for user feedback (keep it)
3. **Lazy loading implemented** - Pages are code-split properly
4. **Icon tree-shaking works** - Only imported icons are included

### ⚠️ Optimization Opportunities

#### 1. Replace @floating-ui/react (Save ~17 KB)

**Current:** Using `@floating-ui/react` (17.3 KB) just for skill tooltips
**Recommendation:** Replace with CSS-only tooltips or lightweight alternative
**Expected savings:** 17-20 KB (including clsx dependency)

**Implementation:**
- Create CSS-only tooltips with `data-tooltip` attribute
- Or use a smaller library like `react-tooltip` (but check size first)
- Or build simple custom tooltip component

#### 2. Consider Icon Optimization (Potential 5-10 KB savings)

**Current:** Multiple react-icons submodules loaded
- /di (DevIcons) - 21 KB
- /bi (BoxIcons) - 13.5 KB
- /si, /tb, /ai, /fa6, /hi - Various smaller chunks

**Options:**
- Keep as-is (tree-shaking is working)
- Or: Replace with inline SVGs for frequently used icons
- Or: Use a single icon set to reduce variety

**Note:** This is lower priority as tree-shaking is working correctly.

## Recommendations

### High Priority (Immediate Impact)

1. **Replace @floating-ui with CSS tooltips** - Save 17-20 KB
   - Effort: Medium
   - Impact: High (17% bundle reduction)

### Medium Priority

2. **Audit icon usage** - Consider consolidating icon sets
   - Effort: Low-Medium
   - Impact: Medium (5-10 KB potential)

### Low Priority (Already Optimized)

3. **Animation libraries** - Already code-split ✓
4. **React/React-DOM** - Required, can't reduce ✓
5. **react-toastify** - Actively used, keep ✓

## How to Run Analysis

```bash
# Build with source maps
GENERATE_SOURCEMAP=true npm run build:only

# Analyze bundle
npm run analyze
```

This opens an interactive visualization in your browser and outputs TSV data.

## Expected Improvements

If we implement the high-priority optimization:

**Current:** 100.4 KB
**After removing floating-ui:** ~83 KB
**Reduction:** 17.4 KB (17% smaller)

**Impact on PageSpeed:**
- Faster JavaScript parse/execute time
- Reduced download time on mobile
- **Expected score improvement:** +5-8 points
