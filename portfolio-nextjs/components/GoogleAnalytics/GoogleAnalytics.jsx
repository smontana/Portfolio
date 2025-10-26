'use client'

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export const GoogleAnalytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
      window.gtag('config', 'G-TW3MNESZEL', {
        page_path: url
      });
    }
  }, [pathname, searchParams]);

  return null;
};