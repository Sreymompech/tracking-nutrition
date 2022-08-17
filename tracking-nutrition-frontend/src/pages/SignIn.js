import React, { useEffect } from "react";
import "./Signin.css";
import { FcGoogle } from "react-icons/fc";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { googleSignIn, googleUser, existUser, oauthUser } = UserAuth();
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (googleUser !== null) {
      oauthUser(googleUser);
      navigate("/profile");
      // window.location.reload();
    }
  }, [googleUser]);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white relative">
      <img
        className="absolute top-0 left-0 w-screen h-screen object-cover"
        src="https://images.pexels.com/photos/2318025/pexels-photo-2318025.jpeg?auto=compress&cs=tinysrgb&w=1200"
        alt="bg-img"
      ></img>
      <div className="pic-container">
        <div className="pic1">How is your daily diet record?</div>
        <div className="pic2">What food do you have every day?</div>
        <div className="pic3">
          What is your Calories and Fats comsuming every day?
        </div>
      </div>
      <div className="pic-container1">
        <div className="pic4">No idea......</div>
        <div className="pic5">Let start with us today then!!!</div>
        <image src="../images/image.png"></image>
      </div>

      <div className="pic-container2">
        <div className="pic6">What we can do for you</div>
        <div className="pic7">Recording your FoodList</div>
        <div className="pic8">Reporting Calories and Fats assessement</div>
      </div>

      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-40"></div>
      <div className="box">
        <span className="square"></span>
        <span className="square"></span>
        <span className="square"></span>
        <span className="square"></span>
        <span className="square"></span>
        <span className="square"></span>
        <span className="square"></span>
        <span className="square"></span>
        <span className="square"></span>
        <span className="square"></span>
        <span className="square"></span>
        <span className="square"></span>

        <div className="container">
          <div className="formLogin">
            <h2>Welcom to Login</h2>
            <div className="formdes">Click below to Start!!</div>
            <div onClick={handleGoogleSignIn} className="google-btn">
              <FcGoogle fontSize={30} />
              <div className="text-lg font-semibold ml-4">
                Sign in with Google
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
