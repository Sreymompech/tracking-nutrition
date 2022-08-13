import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const NavbarLink = () => {
  const color1 = {
    "--clr": "#fdffa9",
  };
  const color2 = {
    "--clr": "#ffbbbb",
  };
  const color3 = {
    "--clr": "#B5FE83",
  };
  return (
    <div className="link-container">
      <Link to="/profile" className="nav-center" style={color1}>
        <span>Profile</span>
        <i></i>
        {/* <span className="span-animate"></span>
        <span className="span-animate"></span>
        <span className="span-animate"></span>
        <span className="span-animate"></span> */}
      </Link>
      <Link to="/foodintake" className="nav-center" style={color2}>
        <span>FoodInTake</span>
        <i></i>
        {/* <span className="span-animate"></span>
        <span className="span-animate"></span>
        <span className="span-animate"></span>
        <span className="span-animate"></span> */}
      </Link>
      <Link to="/report" className="nav-center" style={color3}>
        <span>Reports</span>
        <i></i>
        {/* <span className="span-animate"></span>
        <span className="span-animate"></span>
        <span className="span-animate"></span>
        <span className="span-animate"></span> */}
      </Link>
    </div>
  );
};

export default NavbarLink;
