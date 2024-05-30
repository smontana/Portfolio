import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaCode } from "react-icons/fa6"
import "./Style.scss";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/about", text: "About me" },
    // { to: "/work", text: "Work" },
  ];

  return (
    <nav className={`navbar ${isOpen ? "active" : ""}`}>
      <div className="navbar-brand">
        <Link to="/">
          <FaCode style={{ color: "#adff30" }} />
        </Link>
      </div>
      <div className="navbar-menu">
        <ul className={`menu ${isOpen ? "active" : ""}`}>
          {navLinks.map(({ to, text }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active-link" : ""
                }
              >
                {text}
              </NavLink>
            </li>
          ))}
          {/* <li>
            <a href="mailto:xxx@gmail.com" target="_blank" rel="noreferrer">
              <button>Hire me</button>
            </a>
          </li> */}
        </ul>
        <div
          className={`hamburger ${isOpen ? "active" : ""}`}
          onClick={toggleNavbar}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </nav>
  );
};
