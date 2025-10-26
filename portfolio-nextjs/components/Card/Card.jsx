'use client'

import { useState } from "react";
import "./Style.scss";
import { AiFillGithub } from "react-icons/ai";
import { Loader } from "..";

export const Card = ({ heading, image, url, github }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div className="card">
      <div className="image-section">
        {!isImageLoaded && <Loader />}
        <a href={url} target="_blank" rel="noreferrer">
          <img
            className={`${isImageLoaded ? "loaded" : ""}`}
            src={image}
            alt=""
            onLoad={handleImageLoad}
          />
        </a>
      </div>
      <div className="info">
        <h3>{heading}</h3>
        <a href={github} target="_blank" rel="noreferrer" className="buttons">
          <AiFillGithub />
        </a>
      </div>
    </div>
  );
};
