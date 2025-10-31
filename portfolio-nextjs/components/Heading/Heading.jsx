'use client'

import { useInView } from "../../hooks/useInView";
import { useEffect, useState } from "react";
import "./Style.scss";

export const Heading = ({Heading}) => {
  const [barRef, barInView] = useInView({ threshold: 0.1 });
  const [animationLoaded, setAnimationLoaded] = useState(false);

  // Lazy load bar animation CSS only when component mounts
  useEffect(() => {
    import("../../styles/animations/bar.css").then(() => {
      setAnimationLoaded(true);
    });
  }, []);

  return (
    <div className="heading">
      <div className="bars">
        <span></span>
        <span
          ref={barRef}
          className={`motion-safe ${animationLoaded && barInView ? 'animate-bar' : ''}`}
        ></span>
      </div>
      <h1>{Heading}</h1>
    </div>
  );
};
