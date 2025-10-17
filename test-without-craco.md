# Testing Without CRACO

If you want to test the PageSpeed score without CRACO optimization:

## 1. Temporarily disable CRACO

Edit `package.json`:
```json
"scripts": {
  "build:only": "react-scripts build",  // instead of "craco build"
}
```

## 2. Rename config to disable it
```bash
mv craco.config.js craco.config.js.disabled
```

## 3. Build and test
```bash
npm run build:only
```

## 4. Compare scores
- Test PageSpeed Insights with default CRA build
- Compare to current optimized CRACO build

## 5. Re-enable CRACO (if better)
```bash
mv craco.config.js.disabled craco.config.js
```

And revert `package.json` scripts.

## Expected Results:

**Default CRA** (no CRACO):
- Fewer HTTP requests (~2-3)
- Larger initial bundle (~130-150 kB)
- Simpler, but worse long-term caching
- May score slightly higher on PageSpeed (fewer requests)

**Optimized CRACO** (current):
- More HTTP requests (4)
- Smaller initial bundle (~75 kB)
- Better long-term caching
- Better repeat visit performance
- Slightly lower initial PageSpeed score, but better real-world performance
