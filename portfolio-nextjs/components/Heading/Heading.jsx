'use client'

import "./Style.scss";
import "../../styles/animations/animations.css";
import { useInView } from "../../hooks/useInView";

export const Heading = ({Heading}) => {
  const [barRef, barInView] = useInView({ threshold: 0.1 });

  return (
    <div className="heading">
      <div className="bars">
        <span></span>
        <span
          ref={barRef}
          className={`motion-safe ${barInView ? 'animate-bar' : ''}`}
        ></span>
      </div>
      <h1>{Heading}</h1>
    </div>
  );
};
