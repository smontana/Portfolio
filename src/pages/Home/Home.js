import "./Style.scss";
import { animations } from "../../styles";
import { Socials, StephenSVG, LazyMotion, m, domAnimation } from "../../components";
import { useState, useEffect } from "react";

export const Home = () => {
  const [showMatrix, setShowMatrix] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [longPressTimer, setLongPressTimer] = useState(null);
  const [glitchLevel, setGlitchLevel] = useState(0); // 0: none, 1: subtle, 2: intense, 3: matrix
  const [showToggle, setShowToggle] = useState(false);
  const [easterEggReady, setEasterEggReady] = useState(false);

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
      const idleCallback = requestIdleCallback(initEasterEgg, { timeout: 2000 });
      return () => {
        cancelIdleCallback(idleCallback);
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
      <LazyMotion features={domAnimation} strict>
        <main
          id="main-content"
          className={`home ${showMatrix ? 'matrix-mode' : ''}`}
          role="main"
        >
          <div className="info-section">
            <m.h1 {...animations.h1} className="motion-safe">
                <span className="greeting">Hi, I'm</span>
                <span className="name-container" aria-label="Stephen">
                  <StephenSVG />
                </span>
            </m.h1>
            <m.h2 {...animations.fade} className="subtitle motion-safe">
              A Full Stack Developer
            </m.h2>
            <m.p {...animations.fade} className="intro-text motion-safe">
              If you're working on something cool,{' '}
              <span className="line-break" aria-hidden="true"><br /></span>
              reach out and let's collaborate!
            </m.p>
            <div aria-label="Connect with me on social media">
              <Socials />
            </div>
          </div>

          <div className="image-section">
            <img
              className={getGlitchClass()}
              src={showMatrix ? "/assets/images/matrix.webp" : "/assets/images/me3d.webp"}
              alt={showMatrix ? "Stephen Montana - 3D rendered portrait of a full stack developer in the matrix." : "Stephen Montana - 3D rendered portrait of a full stack developer"}
              fetchpriority="high"
              width="400"
              height="400"
              onClick={handleImageClick}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
              style={{ cursor: showMatrix ? 'default' : 'pointer', userSelect: 'none' }}
            />
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
      </LazyMotion>
    </>
  );
};

export default Home;
