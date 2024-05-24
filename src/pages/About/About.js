/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Style.scss";
import { motion } from "framer-motion";
// import { Tooltip } from 'react-tooltip';
import { Heading } from "../../components";
import { animations } from "../../styles";
import {
  BiLogoJavascript,
  BiLogoMongodb,
  BiLogoNodejs,
  BiLogoReact,
  BiLogoGraphql,
  BiLogoTypescript,
  BiLogoSass,
} from "react-icons/bi";
import { DiAngularSimple, DiDotnet, DiGit, DiMsqlServer, DiMysql, DiRuby } from "react-icons/di";
import { SiExpress, SiTailwindcss } from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";

export const About = () => {
  return (
    <>
      <Heading Heading={"About me"} />
      <div className="about">
        <div className="info">
          <motion.p {...animations.fade}>
          Welcome to my corner of the digital universe! As a dedicated, full-stack Software Developer,
          I specialize in creating applications that solve problems and delight users.
          With over 10 years of development experience, I thrive at solving problems and creating solutions.
          My journey has been marked by a commitment to fostering a culture of innovation, collaboration, and continuous learning.
          Whether it's shaping scalable architectures, implementing cutting-edge technologies, or optimizing performance for exceptional user experiences,
          I'm driven by a relentless pursuit of excellence. I work to bridge the gap between business objectives and technical execution,
          translating visions into tangible outcomes that exceed expectations. Let's connect!
          </motion.p>
        </div>
        <motion.div {...animations.fade} className="skills">
          <h2>Stuff i know : </h2>
          <div className="icons">
            {/* <a data-tooltip-id="javascript" data-tooltip-content="JavaScript"> */}
              <BiLogoJavascript style={{ color: "yellow" }} />
            {/* </a> */}
            {/* <Tooltip id="javascript" /> */}
            <BiLogoTypescript style={{ color: "#007acc" }} />
            <BiLogoReact style={{ color: "deepskyblue" }} />
            <DiAngularSimple style={{ color: "#dd0031" }} />
            <TbBrandFramerMotion style={{ color: "#6c01ff" }} />
            <BiLogoGraphql style={{ color: "#e535ab " }} />
            <BiLogoSass style={{ color: "#cc6699" }} />
            <SiTailwindcss style={{ color: "skyblue" }} />
            <BiLogoNodejs style={{ color: "greenyellow" }} />
            <SiExpress style={{ color: "yellow" }} />
            <DiDotnet style={{ color: "blue" }} />
            <DiGit style={{ color: "#f15030" }} />
            <DiMsqlServer style={{ color: "red" }} />
            <DiMysql style={{ color: "blue" }} />
            <BiLogoMongodb style={{ color: "green" }} />
            <DiRuby style={{ color: "red" }} />
          </div>
        </motion.div>
      </div>
    </>
  );
};
