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
  // Start as true to prevent flash of invisible content
  // Will be set properly by Intersection Observer once mounted
  const [isInView, setIsInView] = useState(true);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If user prefers reduced motion, immediately set to visible
    if (prefersReducedMotion) {
      setIsInView(true);
      return;
    }

    // If already triggered and triggerOnce is true, don't setup observer
    if (triggerOnce && hasTriggered) {
      return;
    }

    // Check if element is already in viewport on mount
    const rect = element.getBoundingClientRect();
    const isInitiallyVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isInitiallyVisible) {
      // Element is already visible, keep it visible
      setIsInView(true);
      if (triggerOnce) {
        setHasTriggered(true);
      }
      // Still set up observer for elements that might scroll out
      if (!triggerOnce) {
        // Observer setup below will handle scroll out behavior
      } else {
        // If triggerOnce and already visible, no need for observer
        return;
      }
    }

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
