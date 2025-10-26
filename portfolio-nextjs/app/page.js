'use client'

import dynamic from "next/dynamic";
import { StephenSVG } from "@/components";
import { useInView } from "@/hooks/useInView";
import { useState, useEffect } from "react";
import Image from "next/image";
import "./page.scss";
import "../styles/animations/animations.css";

// Lazy load non-critical components
const Socials = dynamic(() => import("@/components/Socials/Socials").then(mod => ({ default: mod.Socials })), {
  ssr: true,
  loading: () => <div style={{ height: '48px' }} />
});

export default function HomePage() {
  // Intersection Observer hooks for animations
  const [h1Ref, h1InView] = useInView({ threshold: 0.1 });
  const [h2Ref, h2InView] = useInView({ threshold: 0.1 });
  const [pRef, pInView] = useInView({ threshold: 0.1 });

  // Easter egg state (simplified - logic loaded lazily)
  const [showMatrix, setShowMatrix] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [longPressTimer, setLongPressTimer] = useState(null);
  const [glitchLevel, setGlitchLevel] = useState(0);
  const [showToggle, setShowToggle] = useState(false);
  const [easterEggEnabled, setEasterEggEnabled] = useState(false);

  const activateMatrix = () => {
    setShowMatrix(true);
    setGlitchLevel(3);
    console.log("Welcome to the Matrix...");
    setTimeout(() => setShowToggle(true), 1000);
    return "You have chosen the red pill. There is no turning back.";
  };

  const toggleReality = () => {
    setShowMatrix(!showMatrix);
  };

  // Defer easter egg initialization until after initial paint
  useEffect(() => {
    const initEasterEgg = () => {
      setEasterEggEnabled(true);

      // Setup console commands
      window.redpill = activateMatrix;
      window['red-pill'] = activateMatrix;
      window.red_pill = activateMatrix;
      window['red pill'] = activateMatrix;
      window.red = activateMatrix;
      window.r = activateMatrix;
    };

    if ('requestIdleCallback' in window) {
      const idleCallback = window.requestIdleCallback(initEasterEgg, { timeout: 2000 });
      return () => {
        window.cancelIdleCallback(idleCallback);
        delete window.redpill;
        delete window['red-pill'];
        delete window.red_pill;
        delete window['red pill'];
        delete window.red;
        delete window.r;
      };
    } else {
      const timer = setTimeout(initEasterEgg, 1000);
      return () => {
        clearTimeout(timer);
        delete window.redpill;
        delete window['red-pill'];
        delete window.red_pill;
        delete window['red pill'];
        delete window.red;
        delete window.r;
      };
    }
  }, []);

  // Reset tap count after 1 second of inactivity
  useEffect(() => {
    if (!easterEggEnabled) return;
    if (tapCount > 0 && tapCount < 5) {
      const timer = setTimeout(() => setTapCount(0), 1000);
      return () => clearTimeout(timer);
    }
  }, [tapCount, easterEggEnabled]);

  // Time-based glitch escalation (deferred)
  useEffect(() => {
    if (!easterEggEnabled || showMatrix) return;

    const subtleTimer = setTimeout(() => {
      setGlitchLevel(1);
      setTimeout(() => setGlitchLevel(0), 300);
    }, 3000);

    const intenseTimer = setTimeout(() => {
      setGlitchLevel(2);
      setTimeout(() => setGlitchLevel(0), 600);
    }, 6000);

    const matrixTimer = setTimeout(() => {
      activateMatrix();
    }, 12000);

    return () => {
      clearTimeout(subtleTimer);
      clearTimeout(intenseTimer);
      clearTimeout(matrixTimer);
    };
  }, [easterEggEnabled, showMatrix]);

  const handleImageClick = () => {
    if (!easterEggEnabled || showMatrix) return;
    const newCount = tapCount + 1;
    setTapCount(newCount);
    if (newCount >= 5) {
      activateMatrix();
      setTapCount(0);
    }
  };

  const handleTouchStart = () => {
    if (!easterEggEnabled || showMatrix) return;
    const timer = setTimeout(() => activateMatrix(), 2500);
    setLongPressTimer(timer);
  };

  const handleTouchEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const getGlitchClass = () => {
    if (glitchLevel === 1) return 'glitch-subtle';
    if (glitchLevel === 2) return 'glitch-intense';
    return '';
  };

  return (
    <main
      id="main-content"
      className={`home ${showMatrix ? 'matrix-mode' : ''}`}
      role="main"
    >
        <div className="info-section">
          <h1 ref={h1Ref} className={h1InView ? 'animate-slide-spring' : ''}>
            <span className="greeting">Hi, I'm</span>
            <span className="name-container" aria-label="Stephen">
              <StephenSVG />
            </span>
          </h1>
          <h2 ref={h2Ref} className={`subtitle ${h2InView ? 'animate-fade' : ''}`}>
            A Full Stack Developer
          </h2>
          <p ref={pRef} className={`intro-text ${pInView ? 'animate-fade' : ''}`}>
            If you're working on something cool,{' '}
            <span className="line-break" aria-hidden="true"><br /></span>
            reach out and let's collaborate!
          </p>
          <div aria-label="Connect with me on social media">
            <Socials />
          </div>
        </div>

          <div className="image-section">
            {showMatrix ? (
              <Image
                src="/assets/images/responsive/matrix-md.avif"
                alt="Stephen Montana - 3D rendered portrait of a full stack developer in the matrix."
                width={400}
                height={400}
                priority
                fetchPriority="high"
                className={getGlitchClass()}
                sizes="(max-width: 640px) 340px, (max-width: 1024px) 400px, 510px"
                onClick={handleImageClick}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
                style={{ cursor: 'default', userSelect: 'none' }}
              />
            ) : (
              <Image
                src="/assets/images/responsive/me3d-md.avif"
                alt="Stephen Montana - 3D rendered portrait of a full stack developer"
                width={340}
                height={510}
                priority
                fetchPriority="high"
                className={getGlitchClass()}
                sizes="(max-width: 640px) 170px, (max-width: 1024px) 340px, 510px"
                onClick={handleImageClick}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
                style={{ cursor: 'pointer', userSelect: 'none' }}
              />
            )}
          </div>

          {/* Reality Mode Toggle */}
          {showToggle && (
            <button
              className="reality-toggle"
              onClick={toggleReality}
              aria-label={showMatrix ? "Exit Matrix mode" : "Enter Matrix mode"}
              title={showMatrix ? "Return to reality" : "Enter the Matrix"}
            >
              <span className="pill-icon">
                <span className={`pill ${showMatrix ? 'blue' : 'red'}`}></span>
              </span>
              <span className="toggle-label">
                {showMatrix ? 'Reality Mode' : 'Matrix Mode'}
              </span>
            </button>
          )}
    </main>
  );
}
