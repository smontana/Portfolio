import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics, Navbar } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./styles/index.scss";

// Lazy load page components for code splitting
const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/About'));
const Work = lazy(() => import('./pages/Work/Work'));

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
      <GoogleAnalytics />
      <Analytics />
      <Navbar />
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
        </Routes>
      </Suspense>
    </Router>
  </React.StrictMode>
);
