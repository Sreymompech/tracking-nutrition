import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const NavbarLink = () => {
  return (
    <div className="link-container">
      <Link to="/profile" className="nav-link">
        Profile
        <span className="span-animate"></span>
        <span className="span-animate"></span>
        <span className="span-animate"></span>
        <span className="span-animate"></span>
      </Link>
      <Link to="/foodintake" className="nav-link">
        FoodInTake
        <span className="span-animate"></span>
        <span className="span-animate"></span>
        <span className="span-animate"></span>
        <span className="span-animate"></span>
      </Link>
      <Link to="/report" className="nav-link">
        Reports
        <span className="span-animate"></span>
        <span className="span-animate"></span>
        <span className="span-animate"></span>
        <span className="span-animate"></span>
      </Link>
    </div>
  );
};

export default NavbarLink;
