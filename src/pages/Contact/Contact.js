import React from "react";
import "./Style.scss";
import { motion } from "framer-motion";
import { BiSolidMessage, BiSolidPhone } from "react-icons/bi";
import { HiLocationMarker } from "react-icons/hi";
import { Form, Heading, Socials } from "../../components";
import { animations } from "../../styles";

export const Contact = () => {
  return (
    <>
      <Heading Heading={"Contact me"} />
      <motion.div {...animations.fade} className="contact-section">
        <div className="form">
          <Form />
          <div className="details">
            <div>
              <h3>Contact info</h3>
              <div>
                <BiSolidMessage />
                xxx@gmail.com
              </div>
              <div>
                <BiSolidPhone />
                xxx
              </div>
              <div>
                <HiLocationMarker />
                xxx, xxx
              </div>
            </div>
            <div>
              <h3>Social networks</h3>
              <Socials />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
