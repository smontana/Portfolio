'use client'

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCode } from "react-icons/fa6";
import "./Style.scss";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuId = "primary-menu";
  const btnRef = useRef(null);
  const firstMenuItemRef = useRef(null);

  // Close on Escape and manage focus
  useEffect(() => {
    function onKeydown(e) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        // Return focus to hamburger button
        if (btnRef.current) {
          btnRef.current.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  }, [isOpen]);

  // Trap focus within mobile menu when open
  useEffect(() => {
    if (isOpen && window.innerWidth <= 768) {
      // Focus first menu item when menu opens
      setTimeout(() => {
        if (firstMenuItemRef.current) {
          firstMenuItemRef.current.focus();
        }
      }, 100);
    }
  }, [isOpen]);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const clickHandler = () => {
    if (isOpen) {
      setIsOpen(false);
      // Return focus to hamburger button after closing via link click
      if (window.innerWidth <= 768 && btnRef.current) {
        btnRef.current.focus();
      }
    }
  };

  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/about", text: "About" },
    // { to: "/work", text: "Work" },
  ];

  return (
    <>
      {/* Skip to main content link for keyboard navigation */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <nav 
        className={`navbar ${isOpen ? "active" : ""}`}
        aria-label="Main navigation"
      >
        <div className="navbar-brand">
          <Link
            href="/"
            onClick={clickHandler}
            aria-label="Home - Company Logo"
          >
            <FaCode
              style={{ color: "#adff30" }}
              aria-hidden="true"
            />
          </Link>
        </div>
        
        <div className="navbar-menu">
          <ul 
            id={menuId}
            className={`menu ${isOpen ? "active" : ""}`}
          >
            {navLinks.map(({ to, text }, index) => {
              const isActive = pathname === to;
              return (
                <li key={to}>
                  <Link
                    ref={index === 0 ? firstMenuItemRef : null}
                    href={to}
                    className={isActive ? "active-link" : ""}
                    onClick={clickHandler}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {text}
                  </Link>
                </li>
              );
            })}
            {/* Uncommented and made accessible:
            <li role="listitem">
              <a 
                href="mailto:xxx@gmail.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Send email to hire me - opens in new window"
              >
                <button type="button">
                  Hire me
                </button>
              </a>
            </li> */}
          </ul>
          
          <button
            ref={btnRef}
            type="button"
            className={`hamburger ${isOpen ? "active" : ""}`}
            onClick={toggleNavbar}
            aria-expanded={isOpen}
            aria-controls={menuId}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <span className="bar" aria-hidden="true"></span>
            <span className="bar" aria-hidden="true"></span>
            <span className="bar" aria-hidden="true"></span>
          </button>
        </div>
      </nav>
    </>
  );
};