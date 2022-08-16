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
      </Link>
      <Link to="/foodintake" className="nav-center" style={color2}>
        <span>FoodInTake</span>
        <i></i>
      </Link>
      <Link to="/report" className="nav-center" style={color3}>
        <span>Reports</span>
        <i></i>
      </Link>
    </div>
  );
};

export default NavbarLink;
