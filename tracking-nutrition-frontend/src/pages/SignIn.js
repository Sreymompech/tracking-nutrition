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
    console.log("google User", googleUser);
    if (googleUser !== null) {
      oauthUser(googleUser);
      navigate("/profile");
      // window.location.reload();
      console.log("exist user", existUser);
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

// import React, { useEffect } from "react";
// import "./Signin.css";
// import { FcGoogle } from "react-icons/fc";
// import { UserAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// //import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// //import { firebaseApp } from "../firebase-config";

// const SignIn = () => {
//   const { googleSignIn, googleUser, existUser, oauthUser, updateExistUser } =
//     UserAuth();
//   const navigate = useNavigate();
//   const handleGoogleSignIn = async () => {
//     try {
//       await googleSignIn();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     console.log("google User", googleUser);
//     if (googleUser !== null) {
//       navigate("/profile");
//       oauthUser(googleUser);
//       console.log("exist user", existUser);
//     }
//   }, [googleUser]);

//   //useEffect(updateExistUser, [existUser]);

//   return (
//     <div className="w-screen h-screen flex justify-center items-center bg-white relative">
//       <img
//         className="absolute top-0 left-0 w-screen h-screen object-cover"
//         src="https://media.istockphoto.com/photos/italian-pasta-ingredients-on-white-wooden-table-top-view-picture-id845461896?k=20&m=845461896&s=612x612&w=0&h=BehqbKOW__ZpwKrPDBA-4jNUbnLyViPHWdWGOB-6084="
//         alt="bg-img"
//       ></img>

//       <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40"></div>
//       <div
//         className="z-10 flex justify-center items-center border border-gray-300 rounded-full
//       p-2 bg-white bg-opacity-60 cursor-pointer hover:shadow-md hover:bg-opacity-100 duration-150 ease-in-out"
//         onClick={handleGoogleSignIn}
//       >
//         <FcGoogle fontSize={30} />
//         <p className="text-lg font-semibold ml-4">Sign in with Google</p>
//       </div>
//     </div>
//   );
// };

// export default SignIn;
