import React, { lazy, Suspense, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import "./styles/index.scss";

// Lazy load Navbar (used on every page but separate chunk)
const Navbar = lazy(() => import('./components/Navbar/Navbar').then(module => ({ default: module.Navbar })));

// Lazy load Vercel Analytics (non-critical, load after initial render)
const Analytics = lazy(() => import('@vercel/analytics/react').then(module => ({ default: module.Analytics })));

// Lazy load page components for code splitting
const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/About'));
const Work = lazy(() => import('./pages/Work/Work'));

// Route prefetch map - prefetch likely next pages based on current route
const prefetchMap = {
  '/': ['/about'], // From Home, likely to visit About
  '/about': ['/work', '/'], // From About, likely to visit Work or back to Home
  '/work': ['/about', '/'], // From Work, likely to go back
};

// Prefetch component to intelligently load next likely routes
function RoutePrefetcher() {
  const location = useLocation();

  useEffect(() => {
    const routesToPrefetch = prefetchMap[location.pathname] || [];

    // Use requestIdleCallback to prefetch during idle time
    const idleCallback = requestIdleCallback ?
      requestIdleCallback(() => {
        // Prefetch route chunks via dynamic import
        routesToPrefetch.forEach(route => {
          if (route === '/about') {
            // Trigger webpack prefetch
            import(/* webpackPrefetch: true */ './pages/About/About');
          }
          if (route === '/work') {
            import(/* webpackPrefetch: true */ './pages/Work/Work');
          }
          if (route === '/') {
            import(/* webpackPrefetch: true */ './pages/Home/Home');
          }
        });
      }, { timeout: 2000 }) : null;

    return () => {
      if (idleCallback && cancelIdleCallback) {
        cancelIdleCallback(idleCallback);
      }
    };
  }, [location.pathname]);

  return null;
}

// Prevent double console message in development (React.StrictMode)
if (!window.__CONSOLE_INITIALIZED__) {
  console.log(`You take the blue pill—the story ends,
  you wake up in your bed and believe whatever you want to believe.
  You take the red pill—you stay in Wonderland, and I show you how deep the rabbit hole goes.
`);
  window.__CONSOLE_INITIALIZED__ = true;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={null}>
        <Analytics />
      </Suspense>
      <Suspense fallback={
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          color: '#B6FF30'
        }}>
          Loading...
        </div>
      }>
        <Navbar />
        <RoutePrefetcher />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
        </Routes>
      </Suspense>
    </Router>
  </React.StrictMode>
);
