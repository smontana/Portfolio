'use client'

import dynamic from 'next/dynamic';
import { Heading } from "@/components";
import { useInView } from "@/hooks/useInView";
import "./page.scss";
import "../../styles/animations/animations.css";

// Lazy load the skill icons (16 react-icons) - only loads when about page is visited
const SkillIcons = dynamic(() => import('./SkillIcons'), {
  loading: () => (
    <div className="icons-loading" aria-live="polite" aria-busy="true">
      {/* Placeholder skeletons for 16 icons */}
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="icon-skeleton" />
      ))}
    </div>
  ),
  ssr: false, // Don't include in server bundle
});

export default function AboutPage() {
  const [pRef, pInView] = useInView({ threshold: 0.1 });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.1 });

  return (
    <main id="main-content" className="about">
        <Heading Heading={"About me"} />
        <div className="info">
          <p ref={pRef} className={pInView ? 'animate-fade' : ''}>
            As a dedicated, Full Stack Software Developer, I specialize in creating applications that solve problems and delight users.
            With over 10 years of development experience, I thrive at solving problems through the creation of thoughtful solutions.
            My journey has been marked by a commitment to fostering a culture of innovation, collaboration, and continuous learning.
            Whether it&apos;s shaping scalable architectures, implementing cutting-edge technologies, or optimizing performance for exceptional user experiences,
            I&apos;m driven by a relentless pursuit of excellence.
            I work to bridge the gap between business objectives and technical execution, translating visions into tangible outcomes that exceed expectations.
          </p>
        </div>
        <div ref={skillsRef} className={`skills ${skillsInView ? 'animate-fade' : ''}`}>
          <h2>Skilled at : </h2>
          <div className="icons">
            <SkillIcons />
          </div>
        </div>
    </main>
  );
}
