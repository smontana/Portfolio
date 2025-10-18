import "./Style.scss";
import "../../styles/animations/animations.css";
import { Socials, StephenSVG, ResponsiveImage, MatrixImage } from "../../components";
import { useInView } from "../../hooks/useInView";
import { useState, useEffect } from "react";

export const Home = () => {
  const [showMatrix, setShowMatrix] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [longPressTimer, setLongPressTimer] = useState(null);
  const [glitchLevel, setGlitchLevel] = useState(0); // 0: none, 1: subtle, 2: intense, 3: matrix
  const [showToggle, setShowToggle] = useState(false);
  const [easterEggReady, setEasterEggReady] = useState(false);

  // Intersection Observer hooks for animations
  const [h1Ref, h1InView] = useInView({ threshold: 0.1 });
  const [h2Ref, h2InView] = useInView({ threshold: 0.1 });
  const [pRef, pInView] = useInView({ threshold: 0.1 });

  const activateMatrix = () => {
    setShowMatrix(true);
    setGlitchLevel(3);
    console.log("Welcome to the Matrix...");

    // Show toggle 1 second after matrix activation
    setTimeout(() => {
      setShowToggle(true);
    }, 1000);

    return "You have chosen the red pill. There is no turning back.";
  };

  const toggleReality = () => {
    setShowMatrix(!showMatrix);
  };

  // Defer ALL Matrix easter egg logic until after initial paint
  useEffect(() => {
    // Use requestIdleCallback or setTimeout to defer until browser is idle
    const initEasterEgg = () => {
      setEasterEggReady(true);

      // Setup console commands
      window.redpill = activateMatrix;
      window['red-pill'] = activateMatrix;
      window.red_pill = activateMatrix;
      window['red pill'] = activateMatrix;
      window.red = activateMatrix;
      window.r = activateMatrix;
    };

    // Try to use requestIdleCallback for better performance, fallback to setTimeout
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

  // Reset tap count after 1 second of inactivity (only if easter egg is ready)
  useEffect(() => {
    if (!easterEggReady) return;
    if (tapCount > 0 && tapCount < 5) {
      const timer = setTimeout(() => setTapCount(0), 1000);
      return () => clearTimeout(timer);
    }
  }, [tapCount, easterEggReady]);

  // Time-based glitch escalation (only start after easter egg is ready)
  useEffect(() => {
    if (!easterEggReady || showMatrix) return; // Don't run if not ready or already activated

    // 3 seconds: subtle glitch
    const subtleTimer = setTimeout(() => {
      setGlitchLevel(1);
      setTimeout(() => setGlitchLevel(0), 300); // Glitch for 300ms
    }, 3000);

    // 6 seconds: intense glitch
    const intenseTimer = setTimeout(() => {
      setGlitchLevel(2);
      setTimeout(() => setGlitchLevel(0), 600); // Glitch for 600ms
    }, 6000);

    // 12 seconds: full matrix transformation
    const matrixTimer = setTimeout(() => {
      activateMatrix();
    }, 12000);

    return () => {
      clearTimeout(subtleTimer);
      clearTimeout(intenseTimer);
      clearTimeout(matrixTimer);
    };
  }, [easterEggReady, showMatrix]);

  const handleImageClick = () => {
    if (!easterEggReady || showMatrix) return; // Only work if ready and not already activated

    const newCount = tapCount + 1;
    setTapCount(newCount);

    if (newCount >= 5) {
      activateMatrix();
      setTapCount(0);
    }
  };

  const handleTouchStart = () => {
    if (!easterEggReady || showMatrix) return; // Only work if ready and not already activated

    const timer = setTimeout(() => {
      activateMatrix();
    }, 2500);

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
    <>
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
              <MatrixImage
                className={getGlitchClass()}
                alt="Stephen Montana - 3D rendered portrait of a full stack developer in the matrix."
                fetchpriority="high"
                loading="eager"
                width="400"
                height="400"
                sizes="(max-width: 640px) 340px, (max-width: 1024px) 400px, 510px"
                onClick={handleImageClick}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
                style={{ cursor: 'default', userSelect: 'none' }}
              />
            ) : (
              <ResponsiveImage
                baseName="me3d"
                className={getGlitchClass()}
                alt="Stephen Montana - 3D rendered portrait of a full stack developer"
                fetchpriority="high"
                loading="eager"
                width="340"
                height="510"
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
    </>
  );
};

export default Home;
