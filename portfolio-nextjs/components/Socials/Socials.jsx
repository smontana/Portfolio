import "./Style.scss";
import { AiFillLinkedin, AiOutlineGithub } from "react-icons/ai";

export const Socials = () => {
  return (
    <div className="icons" role="navigation" aria-label="Social media links">
      <a 
        href="https://www.linkedin.com/in/stephen-montana/" 
        target="_blank" 
        rel="noreferrer"
        aria-label="Visit Stephen Montana's LinkedIn profile (opens in new window)"
        title="LinkedIn Profile"
      >
        <AiFillLinkedin 
          style={{ color: "#B6FF30" }} 
          aria-hidden="true"
        />
        <span className="visually-hidden">LinkedIn</span>
      </a>
      <a 
        href="https://github.com/smontana" 
        target="_blank" 
        rel="noreferrer"
        aria-label="Visit Stephen Montana's GitHub profile (opens in new window)"
        title="GitHub Profile"
      >
        <AiOutlineGithub 
          style={{ color: "#B6FF30" }} 
          aria-hidden="true"
        />
        <span className="visually-hidden">GitHub</span>
      </a>
    </div>
  );
};
