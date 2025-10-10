import "./Style.scss";
import { motion } from "framer-motion";
import { animations } from "../../styles";
import { Socials, StephenSVG } from "../../components";
import { useState, useEffect } from "react";

export const Home = () => {
  const [showMatrix, setShowMatrix] = useState(false);

  useEffect(() => {
    // Create global console commands for all variations
    const activateMatrix = () => {
      setShowMatrix(true);
      console.log("Welcome to the Matrix...");
      return "You have chosen the red pill. There is no turning back.";
    };

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

  return (
    <>
      <main id="main-content" className="home" role="main">
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
            src={showMatrix ? "/assets/images/matrix.webp" : "/assets/images/me3d.webp"}
            alt={showMatrix ? "Stephen Montana - 3D rendered portrait of a full stack developer in the matrix." : "Stephen Montana - 3D rendered portrait of a full stack developer"}
            loading="lazy"
            width="400"
            height="400"
          />
        </div>
      </main>
    </>
  );
};
