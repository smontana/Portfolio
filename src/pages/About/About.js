/* eslint-disable jsx-a11y/anchor-is-valid */
import "./Style.scss";
import { motion } from "framer-motion";
import { Heading, SkillTooltip } from "../../components";
import { animations } from "../../styles";
import {
  BiLogoJavascript,
  BiLogoTypescript,
  BiLogoReact,
  BiLogoGraphql,
  BiLogoSass,
  BiLogoNodejs,
  BiLogoGoLang,
  BiLogoPostgresql,
  BiLogoMongodb
} from "react-icons/bi";
import { DiAngularSimple, DiDotnet, DiMsqlServer, DiMysql } from "react-icons/di";
import { SiExpress, SiTailwindcss } from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";


export const About = () => {
  return (
    <>
      <main id="main-content" className="about">
        <Heading Heading={"About me"} />
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
          <h2>Skilled at : </h2>
          <div className="icons">
            <SkillTooltip Icon={BiLogoJavascript} color="yellow" label="JavaScript" />
            <SkillTooltip Icon={BiLogoTypescript} color="#3178c6" label="TypeScript" />
            <SkillTooltip Icon={BiLogoReact} color="deepskyblue" label="React" />
            <SkillTooltip Icon={DiAngularSimple} color="red" label="Angular" />
            <SkillTooltip Icon={TbBrandFramerMotion} color="hotpink" label="Framer Motion" />
            <SkillTooltip Icon={BiLogoGraphql} color="#e535ab" label="GraphQL" />
            <SkillTooltip Icon={BiLogoSass} color="#cc6699" label="Sass" />
            <SkillTooltip Icon={SiTailwindcss} color="skyblue" label="Tailwind CSS" />
            <SkillTooltip Icon={BiLogoNodejs} color="greenyellow" label="Node.js" />
            <SkillTooltip Icon={SiExpress} color="white" label="Express.js" />
            <SkillTooltip Icon={BiLogoGoLang} color="deepskyblue" label="Golang" />
            <SkillTooltip Icon={BiLogoPostgresql} color="skyblue" label="PostgreSQL" />
            <SkillTooltip Icon={DiMsqlServer} color="red" label="SQL Server" />
            <SkillTooltip Icon={DiMysql} color="skyblue" label="MySQL" />
            <SkillTooltip Icon={DiDotnet} color="blueviolet" label=".NET" />
            <SkillTooltip Icon={BiLogoMongodb} color="green" label="MongoDB" />
          </div>
        </motion.div>
      </main>
    </>
  );
};

export default About;
