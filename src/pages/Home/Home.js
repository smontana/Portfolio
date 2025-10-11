import "./Style.scss";
import { motion } from "framer-motion";
import { animations } from "../../styles";
import { Socials, StephenSVG } from "../../components";
import { useState, useEffect } from "react";

export const Home = () => {
  const [showMatrix, setShowMatrix] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [longPressTimer, setLongPressTimer] = useState(null);
  const [glitchLevel, setGlitchLevel] = useState(0); // 0: none, 1: subtle, 2: intense, 3: matrix

  const activateMatrix = () => {
    setShowMatrix(true);
    setGlitchLevel(3);
    console.log("Welcome to the Matrix...");
    return "You have chosen the red pill. There is no turning back.";
  };

  useEffect(() => {
    // Create global console commands for all variations
    window.redpill = activateMatrix;
    window['red-pill'] = activateMatrix;
    window.red_pill = activateMatrix;
    window['red pill'] = activateMatrix;
    window.red = activateMatrix;
    window.r = activateMatrix;

    // Cleanup function
    return () => {
      delete window.redpill;
      delete window['red-pill'];
      delete window.red_pill;
      delete window['red pill'];
      delete window.red;
      delete window.r;
    };
  }, []);

  // Reset tap count after 1 second of inactivity
  useEffect(() => {
    if (tapCount > 0 && tapCount < 5) {
      const timer = setTimeout(() => setTapCount(0), 1000);
      return () => clearTimeout(timer);
    }
  }, [tapCount]);

  // Time-based glitch escalation
  useEffect(() => {
    if (showMatrix) return; // Don't run if already activated

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
  }, [showMatrix]);

  const handleImageClick = () => {
    if (showMatrix) return; // Already activated

    const newCount = tapCount + 1;
    setTapCount(newCount);

    if (newCount >= 5) {
      activateMatrix();
      setTapCount(0);
    }
  };

  const handleTouchStart = () => {
    if (showMatrix) return; // Already activated

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
          <motion.h1 {...animations.h1} className="motion-safe">
              <span className="greeting">Hi, I'm</span>
              <span className="name-container" aria-label="Stephen">
                <StephenSVG />
              </span>
          </motion.h1>
          <motion.h2 {...animations.fade} className="subtitle motion-safe">
            A Full Stack Developer
          </motion.h2>
          <motion.p {...animations.fade} className="intro-text motion-safe">
            If you're working on something cool,{' '}
            <span className="line-break" aria-hidden="true"><br /></span>
            reach out and let's collaborate!
          </motion.p>
          <div aria-label="Connect with me on social media">
            <Socials />
          </div>
        </div>
        <div className="image-section">
          <img
            className={getGlitchClass()}
            src={showMatrix ? "/assets/images/matrix.webp" : "/assets/images/me3d.webp"}
            alt={showMatrix ? "Stephen Montana - 3D rendered portrait of a full stack developer in the matrix." : "Stephen Montana - 3D rendered portrait of a full stack developer"}
            loading="lazy"
            width="400"
            height="400"
            onClick={handleImageClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            style={{ cursor: showMatrix ? 'default' : 'pointer', userSelect: 'none' }}
          />
        </div>
      </main>
    </>
  );
};

export default Home;
