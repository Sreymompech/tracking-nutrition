import React from "react";
import ProfileForm from "../components/ProfileForm";
import { UserAuth } from "../context/AuthContext";
import "./profile.css";

const Profile = () => {
  //const { googleUser } = UserAuth();
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white relative profile-page">
      {/* <img
        className="absolute top-0 left-0 w-screen h-screen object-cover"
        src="https://media.istockphoto.com/photos/fruit-and-vegetable-borders-on-white-wooden-table-picture-id539841744?k=20&m=539841744&s=612x612&w=0&h=p0NQKaNs4Qc29hJKsnF7N5dd5gCd3fCUkC8rpXLteaE="
        alt="bg-img"
      ></img> */}
      <div className="absolute top-50 left-0 right-0 bottom-0 bg-black bg-opacity-40"></div>
      <ProfileForm />
    </div>
  );
};

export default Profile;
