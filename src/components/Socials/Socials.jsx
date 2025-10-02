import "./Style.scss";
import { AiFillLinkedin, AiOutlineGithub } from "react-icons/ai";

export const Socials = () => {
  return (
    <div className="icons">
      <a href="https://github.com/smontana" target="_blank" rel="noreferrer">
        <AiOutlineGithub style={{ color: "#B6FF30" }} />
      </a>
      <a href="https://www.linkedin.com/in/stephen-montana/" target="_blank" rel="noreferrer">
        <AiFillLinkedin style={{ color: "#B6FF30" }} />
      </a>
    </div>
  );
};
