'use client'

// Lazy-loaded skill icons component
import { SkillTooltip } from "@/components";
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

export default function SkillIcons() {
  return (
    <>
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
    </>
  );
}
