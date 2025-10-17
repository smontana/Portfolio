import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for Intersection Observer
 * Replaces Framer Motion's whileInView functionality
 *
 * @param {Object} options - IntersectionObserver options
 * @param {boolean} options.triggerOnce - Only trigger once when element enters viewport (default: true)
 * @param {number} options.threshold - Percentage of element visible before triggering (default: 0.1)
 * @param {string} options.rootMargin - Margin around root (default: '0px')
 * @returns {Array} [ref, isInView] - Ref to attach to element and visibility state
 *
 * @example
 * const [ref, isInView] = useInView();
 * return <div ref={ref} className={isInView ? 'is-visible' : ''}></div>
 */
export const useInView = (options = {}) => {
  const {
    triggerOnce = true,
    threshold = 0.1,
    rootMargin = '0px'
  } = options;

  const ref = useRef(null);
  // Always start as true - content should be visible by default
  const [isInView, setIsInView] = useState(true);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = ref.current;

    // If no element, keep visible
    if (!element) {
      setIsInView(true);
      return;
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If user prefers reduced motion, keep visible and don't animate
    if (prefersReducedMotion) {
      setIsInView(true);
      return;
    }

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: keep content visible if IO not supported
      setIsInView(true);
      return;
    }

    // If already triggered and triggerOnce is true, keep visible
    if (triggerOnce && hasTriggered) {
      setIsInView(true);
      return;
    }

    // Set up Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;

        if (isVisible) {
          setIsInView(true);

          if (triggerOnce) {
            setHasTriggered(true);
          }
        } else if (!triggerOnce) {
          // Only reset if triggerOnce is false
          setIsInView(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [triggerOnce, threshold, rootMargin, hasTriggered]);

  return [ref, isInView];
};
