import React from "react";
import "./Style.scss";
import { AiFillLinkedin, AiOutlineGithub } from "react-icons/ai";

export const Socials = () => {
  return (
    <div className="icons">
      <a href="https://github.com/smontana" target="_blank" rel="noreferrer">
        <AiOutlineGithub style={{ color: "#4078c0" }} />
      </a>
      <a href="https://www.linkedin.com/in/stephen-montana/" target="_blank" rel="noreferrer">
        <AiFillLinkedin style={{ color: "#0072b1 " }} />
      </a>
    </div>
  );
};
