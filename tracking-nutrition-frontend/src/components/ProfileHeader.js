import React from "react";
import { UserAuth } from "../context/AuthContext";
import "./profileheader.css";

function ProfileHeader() {
  const { existUser } = UserAuth();

  const height =
    Math.floor(existUser.height_inches / 12).toString() +
    " feet " +
    (existUser.height_inches % 12).toString() +
    " in";

  // function to calculate age
  const calculateAge = (dob) => {
    var today = new Date();
    var birthDate = new Date(dob); // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    return age_now;
  };

  return (
    <div>
      <div className="profile-infor">ProfileInfor</div>
      <div>
        <span className="profile-content">{existUser.name}</span>
        <span className="profile-content">{existUser.gender}</span>
        <span className="profile-content">
          {calculateAge(existUser.dob)} yrs
        </span>
        <span className="profile-content">{height}</span>
        <span className="profile-content">{existUser.weight_pound} lbs</span>
      </div>
    </div>
  );
}

export default ProfileHeader;
