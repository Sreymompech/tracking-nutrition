import React from "react";
import ProfileForm from "../components/ProfileForm";
import { UserAuth } from "../context/AuthContext";
import "./profile.css";

const Profile = () => {
  //const { googleUser } = UserAuth();
  return (
    <div className="profile-page">
      <div className="absolute top-50 left-0 right-0 bottom-0 bg-black bg-opacity-40"></div>
      <ProfileForm />
    </div>
  );
};

export default Profile;
