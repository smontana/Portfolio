import "./Style.scss";
import { m } from "framer-motion";
import { animations } from "../../styles";

export const Heading = ({Heading}) => {
  return (
    <div className="heading">
      <div className="bars">
        <span></span>
        <m.span {...animations.bar}></m.span>
      </div>
      <h1>{Heading}</h1>
    </div>
  );
};
