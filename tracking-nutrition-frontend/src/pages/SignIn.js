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

import React, { useEffect } from "react";
import "./Signin.css";
import { FcGoogle } from "react-icons/fc";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
//import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
//import { firebaseApp } from "../firebase-config";

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
      navigate("/profile");
      oauthUser(googleUser);
      // fetchUserRecord(existUser.id);
      // console.log("calories goal", caloriesGoal);
      console.log("exist user", existUser);
    }
  }, [googleUser]);
  const inde1 = {
    "--i": 0,
  };
  const inde2 = {
    "--i": 1,
  };
  const inde3 = {
    "--i": 2,
  };
  const inde4 = {
    "--i": 3,
  };
  const inde5 = {
    "--i": 4,
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white relative">
      <img
        className="absolute top-0 left-0 w-screen h-screen object-cover"
        src="https://images.pexels.com/photos/2318025/pexels-photo-2318025.jpeg?auto=compress&cs=tinysrgb&w=1200"
        alt="bg-img"
      ></img>

      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-40"></div>
      <div className="box">
        <span className="square" style={inde1}></span>
        <span className="square" style={inde2}></span>
        <span className="square" style={inde3}></span>
        <span className="square" style={inde4}></span>
        <span className="square" style={inde5}></span>
        <div className="container">
          <div className="formLogin">
            <h2>Welcom to Login</h2>
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
//     if (googleUser !== null) {
//       navigate("/profile");
//       oauthUser(googleUser);
//       console.log("exist user", existUser);
//     }
//   }, [googleUser]);

//   //useEffect(updateExistUser, [existUser]);

//   return (
//     <div className="Signin">
//       <section>
//         {/* <div classNam="color"></div>
//         <div classNam="color"></div>
//         <div classNam="color"></div> */}
//         <div classNam="box">
//           <span classNam="square" style={{ i: "0" }}></span>
//           <span classNam="square" style={{ i: "1" }}></span>
//           <span cclassNam="square" style={{ i: "2" }}></span>
//           <span classNam="square" style={{ i: "3" }}></span>
//           <span classNam="square" style={{ i: "4" }}></span>
//           <div classNam="container">
//             <div classNam="formLogin">
//               <h2>Login Form</h2>
//               <form>
//                 <div classNam="inputBox">
//                   <input type="text" placeholder="Username" />
//                 </div>
//                 <div classNam="inputBox">
//                   <input type="password" placeholder="password" />
//                 </div>
//                 <div classNam="inputBox">
//                   <input type="submit" value="Login" />
//                 </div>
//                 <p classNam="forget">Forgot Password ?Click Here</p>
//                 <p classNam="forget">Don't have an account ? Sign Up</p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* <img
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
//       </div> */}
//     </div>
//   );
// };

// export default SignIn;

//   const firebaseAuth = getAuth(firebaseApp);
//   const provider = new GoogleAuthProvider();
//   const logIn = async () => {
//     // store userinfor into user variable when signin
//     const { user } = await signInWithPopup(firebaseAuth, provider);
//     // destruct refresstoken and user data from above user variable
//     // refresstoken for checking if user it is undefine then redirect them to login page
//     // prividerData will store user detail like email, name, phone, uid, photoURL...
//     const { refresshToken, providerData } = user;
//     // set providerData as user variable and store in localStorage for call it to use everywhere
//     localStorage.setItem("user", JSON.stringify(providerData));
//     // the same thing as accesstoken
//     localStorage.setItem("accessToken", JSON.stringify(refresshToken));
//   };

//https://media.istockphoto.com/photos/fresh-veggies-and-fruits-food-frame-on-white-background-with-copy-picture-id820334914
