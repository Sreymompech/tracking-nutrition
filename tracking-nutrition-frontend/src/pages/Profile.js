import React from "react";
import ProfileForm from "../components/ProfileForm";
import "./profile.css";

const Profile = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white relative profile-page">
      <div className="absolute top-50 left-0 right-0 bottom-0 bg-black bg-opacity-40"></div>
      <ProfileForm />
    </div>
  );
};

export default Profile;
