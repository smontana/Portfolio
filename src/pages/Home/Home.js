import React from "react";
import "./Style.scss";
import { motion } from "framer-motion";
import myPhoto from "../../assets/images/mee.jpg";
import { animations } from "../../styles";
import { Socials } from "../../components";

export const Home = () => {
  return (
    <>
      <div className="home">
        <div className="info-section">
          <motion.h1 {...animations.h1}>
            Hi, I'm <br />
            Stephen
          </motion.h1>
          <motion.h3 {...animations.fade}>A Full Stack Developer</motion.h3>
          <motion.p {...animations.fade}>
            If you're working on something cool, <br />
            reach out and let's collaborate!
          </motion.p>
          <Socials />
        </div>
        <div className="image-section">
          <img src={myPhoto} alt="" />
        </div>
      </div>
    </>
  );
};
