import React from "react";
import "./Style.scss";
import { motion } from "framer-motion";
import { animations } from "../../styles";

export const Heading = ({Heading}) => {
  return (
    <div className="heading">
      <div className="bars">
        <span></span>
        <motion.span {...animations.bar}></motion.span>
      </div>
      <h1>{Heading}</h1>
    </div>
  );
};
