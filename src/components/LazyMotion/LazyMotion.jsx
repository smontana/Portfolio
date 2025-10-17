// Re-export framer-motion's LazyMotion and m components for lazy loading animations
// This reduces the initial bundle size by only loading animation features when needed
export { LazyMotion, m } from 'framer-motion';

// Load domAnimation features dynamically (splits into separate chunk)
// This reduces main bundle by ~30-40kb
export const loadDomAnimationFeatures = () =>
  import('framer-motion').then(mod => mod.domAnimation);

