import axios from "axios";
import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import "./profileform.css";

const defaultProfile = {
  dob: "",
  gender: "",
  heightft: "",
  weight: "",
  heightin: "",
};

const ProfileForm = () => {
  // keep tracking input profile form data height separate ft and in
  const [profileForm, setProfileForm] = useState(defaultProfile);

  // keep tracking the user profile by combine height in ft and in together and add to database
  const [userProfile, setUserProfile] = useState({});
  // backend rout for call axios to update user profile
  const profileURL = "http://127.0.0.1:5000/users";
  // access google user and exist user in database from use context
  const { googleUser, existUser } = UserAuth();

  // update each input tage in the form
  const formProfileUpdate = (event) => {
    const stateName = event.target.name;
    const inputValue = event.target.value;
    const newProfile = { ...profileForm };
    newProfile[stateName] = inputValue;
    const height = newProfile.heightft + " ft " + newProfile.heightin + " in";
    console.log("height", height);
    const profileInfo = {
      dob: newProfile.dob,
      gender: newProfile.gender,
      weight: newProfile.weight,
      height: height,
    };
    setProfileForm(newProfile);
    setUserProfile(profileInfo);
  };

  // function to add profile
  const addProfile = (profileInfo) => {
    if (
      googleUser["providerData"][0].uid === existUser.login_id &&
      googleUser?.email === existUser.email
    ) {
      axios
        .put(`${profileURL}/${existUser.id}`, profileInfo)
        .then((response) => {
          console.log(response);
        })

        .catch((error) => {
          console.log(error);
        });
    }
  };

  // add user profile when user click on submit button
  const submitProfile = (event) => {
    event.preventDefault();
    addProfile(userProfile);
    setProfileForm(defaultProfile);
    console.log("Update successfully");
    alert("User profile was successfully update");
  };

  return (
    <div className="profile-form">
      <form className="form" onSubmit={submitProfile}>
        <h1 className="form-title">Create Profile</h1>
        <div className="form-group">
          <input
            type="text"
            name="name"
            id="name"
            placeholder=""
            autoComplete="off"
            className="form-input"
            value={googleUser?.displayName}
            onChange={formProfileUpdate}
          />
          <label htmlFor="name" className="form-label">
            Name
          </label>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="email"
            id="email"
            placeholder=""
            autoComplete="off"
            className="form-input"
            value={googleUser?.email}
            onChange={formProfileUpdate}
          />
          <label htmlFor="email" className="form-label">
            Email
          </label>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="dob"
            id="dob"
            className="form-input"
            placeholder=""
            value={profileForm.dob}
            onChange={formProfileUpdate}
          />
          <label htmlFor="dob" className="form-label">
            Birthdate MM/DD/YYYY
          </label>
        </div>
        <div className="form-weight-gender">
          <div className="form-gender">
            <label htmlFor="gender" className="label-gender">
              Gender:
            </label>
            <input
              type="text"
              name="gender"
              id="gender"
              placeholder=""
              autoComplete="off"
              className="input-gender"
              value={profileForm.gender}
              onChange={formProfileUpdate}
            />
          </div>
          <div className="form-weight">
            <label htmlFor="weight" className="label-weight">
              Weight:
            </label>
            <input
              type="text"
              name="weight"
              id="weight"
              placeholder=""
              autoComplete="off"
              className="input-weight"
              value={profileForm.weight}
              onChange={formProfileUpdate}
            />
          </div>
          <div>pound</div>
        </div>
        <div className="form-height">
          <div className="form-height-ft">
            <label htmlFor="heightft" className="label-height-ft">
              Height:
            </label>
            <input
              type="text"
              name="heightft"
              id="height-ft"
              placeholder=""
              autoComplete="off"
              className="input-height-ft"
              value={profileForm.heightft}
              onChange={formProfileUpdate}
            />
          </div>
          <div>ft</div>
          <div className="form-height-in">
            <label htmlFor="heightin" className="label-height-in"></label>
            <input
              type="text"
              name="heightin"
              id="height-in"
              placeholder=""
              autoComplete="off"
              className="input-height-in"
              value={profileForm.heightin}
              onChange={formProfileUpdate}
            />
          </div>
          <div>in</div>
        </div>
        <div>
          {/* <input type="Submit" className="form-submit"> */}
          <button className="btn-submit">
            Submit
            <span className="span-animate"></span>
            <span className="span-animate"></span>
            <span className="span-animate"></span>
            <span className="span-animate"></span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;

// <div className="form-select">
// <div>
//   <div className="form-weight">
//     <div className="">
//       <input
//         type="text"
//         name="weight"
//         id="weight"
//         className="input-weight"
//         placeholder=""
//       ></input>
//       <label htmlFor="weight" className="weight-label">
//         <span className="content-name">Weight</span>
//       </label>
//     </div>
//   </div>
// </div>
// <div>
//   <label htmlFor="gender-select" className="label-gender">
//     Gender
//   </label>
//   <select name="gender" id="gender-select">
//     <option value="" className="select-option">
//       --select--
//     </option>
//     <option value="Female">Female</option>
//     <option value="Male">Male</option>
//   </select>
// </div>
// </div>
