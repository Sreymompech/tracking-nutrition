import React from "react";
import { UserAuth } from "../context/AuthContext";
import "./navbar.css";
import NavbarLink from "./NavbarLink";

const Navbar = () => {
  const { googleUser, logOut, existUser } = UserAuth();
  console.log("nav exist user", existUser);
  console.log("nave google user", googleUser);
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
    localStorage.removeItem("existUser");
    console.log("log out exist user", existUser);
  };

  return (
    <div
      className={
        googleUser?.displayName
          ? "flex justify-between bg-gray-200 w-full p-4 navLink"
          : "flex justify-between bg-gray-200 w-full p-4 navLink1"
      }
    >
      <div>
        {googleUser?.displayName ? (
          <div className="nav-nutri-logo">Nutritions Tracking</div>
        ) : (
          <div className="nav-nutri-logo-container">
            <div className="nav-nutri-logo1">Nutritions Tracking</div>
          </div>
        )}
      </div>
      <div className="nav-container">
        <div className="navbar">
          {googleUser?.displayName && <NavbarLink />}
        </div>
      </div>

      <div className="user-profile">
        {googleUser?.displayName ? (
          <div className="google-profile">
            <div className="user-picture">
              <img src={`${googleUser?.photoURL}`} alt="" />
            </div>
            <div className="nav-user">{existUser.name}</div>
          </div>
        ) : (
          ""
        )}
        <div className="user-logout">
          {googleUser?.displayName ? (
            <button onClick={handleSignOut} className="box nav-link">
              Logout
              <span className="span-animate"></span>
              <span className="span-animate"></span>
              <span className="span-animate"></span>
              <span className="span-animate"></span>
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
