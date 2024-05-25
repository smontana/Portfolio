/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Style.scss";
import { motion } from "framer-motion";
import {
  AngularTooltip,
  DotNetTooltip,
  ExpressjsTooltip,
  FramerMotionTooltip,
  GitTooltip,
  GraphQLTooltip,
  Heading,
  JavaScriptTooltip,
  MongoDBTooltip,
  MySqlTooltip,
  NodejsTooltip,
  ReactTooltip,
  RubyTooltip,
  SassTooltip,
  SqlServerTooltip,
  TailwindCSSTooltip,
  TypescriptTooltip
} from "../../components";
import { animations } from "../../styles";


export const About = () => {
  return (
    <>
      <Heading Heading={"About me"} />
      <div className="about">
        <div className="info">
          <motion.p {...animations.fade}>
          As a dedicated, Full Stack Software Developer, I specialize in creating applications that solve problems and delight users.
          With over 10 years of development experience, I thrive at solving problems through the creation of thoughtful solutions.
          My journey has been marked by a commitment to fostering a culture of innovation, collaboration, and continuous learning.
          Whether it's shaping scalable architectures, implementing cutting-edge technologies, or optimizing performance for exceptional user experiences,
          I'm driven by a relentless pursuit of excellence.
          I work to bridge the gap between business objectives and technical execution, translating visions into tangible outcomes that exceed expectations.
          </motion.p>
        </div>
        <motion.div {...animations.fade} className="skills">
          <h2>Stuff i know : </h2>
          <div className="icons">
            <JavaScriptTooltip />
            <TypescriptTooltip />
            <ReactTooltip />
            <AngularTooltip />
            <FramerMotionTooltip />
            <GraphQLTooltip />
            <SassTooltip />
            <TailwindCSSTooltip />
            <NodejsTooltip />
            <ExpressjsTooltip />
            <DotNetTooltip />
            <SqlServerTooltip />
            <MySqlTooltip />
            <MongoDBTooltip />
          </div>
        </motion.div>
      </div>
    </>
  );
};
