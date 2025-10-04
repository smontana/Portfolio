import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const GoogleAnalytics = () => {
  const location = useLocation();
  
  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'G-TW3MNESZEL', {
        page_path: location.pathname + location.search
      });
    }
  }, [location]);
  
  return null;
};