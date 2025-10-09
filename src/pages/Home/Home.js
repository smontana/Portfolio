import "./Style.scss";
import { motion } from "framer-motion";
import { animations } from "../../styles";
import { Socials, StephenSVG } from "../../components";

export const Home = () => {
  return (
    <>
      <main id="main-content" className="home" role="main">
        <div className="info-section">
          <motion.h1 {...animations.h1} className="motion-safe">
            <h1>
              <span className="greeting">Hi, I'm</span>
              <span className="name-container" aria-label="Stephen">
                <StephenSVG />
              </span>
            </h1>
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
            src="/assets/images/me3d.webp"
            alt="Stephen Montana - 3D rendered portrait of a full stack developer"
            loading="lazy"
            width="400"
            height="400"
          />
        </div>
      </main>
    </>
  );
};
