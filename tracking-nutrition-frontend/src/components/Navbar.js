import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "./navbar.css";
import NavbarLink from "./NavbarLink";

const Navbar = () => {
  const { googleUser, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between bg-gray-200 w-full p-4">
      <div className="navbar">{googleUser?.displayName && <NavbarLink />}</div>
      <div className="user-profile">
        <div className="user-picture">
          <img src={`${googleUser?.photoURL}`} alt="" />
        </div>
        <div className="nav-link">
          {googleUser?.displayName}
          <span className="span-animate"></span>
          <span className="span-animate"></span>
          <span className="span-animate"></span>
          <span className="span-animate"></span>
        </div>
        <div className="user-logout">
          {googleUser?.displayName ? (
            <button onClick={handleSignOut} className="nav-link">
              Logout
              <span className="span-animate"></span>
              <span className="span-animate"></span>
              <span className="span-animate"></span>
              <span className="span-animate"></span>
            </button>
          ) : (
            <Link to="/" className="nav-link">
              Sign in
              <span className="span-animate"></span>
              <span className="span-animate"></span>
              <span className="span-animate"></span>
              <span className="span-animate"></span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
