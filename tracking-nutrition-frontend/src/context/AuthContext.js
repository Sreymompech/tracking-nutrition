// createContext is for instance of provider
// useContext is the way we access the value of provider so it take provider's name as argument
import { useContext, createContext, useEffect, useState } from "react";
// import this line when we want to use google Oauth
// onAuthStateChanged going to wrap in a useEffect and
// whenever we run this we're going to check to see if a user is authenticated or not
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase-config";
import axios from "axios";

// create a instance of context
const AuthContext = createContext();

// create a function that return the context provider and value that will access as global variable for any component
export const AuthContextProvider = ({ children }) => {
  const [googleUser, setGoogleUser] = useState({});
  const [existUser, setExistUser] = useState({});
  const userURL = "http://127.0.0.1:5000/users";

  const googleSignIn = () => {
    // create instance of Google provider
    const provider = new GoogleAuthProvider();
    // pass in auth which is our firebase-config and provider which is instance of Google provider
    //const { user } = await signInWithPopup(auth, provider);
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  const fetchUserById = (user_id) => {
    axios
      .get(`${userURL}/${user_id}`)
      .then((resp) => {
        console.log("exist user", resp);
        const userExist = { ...resp.data };

        setExistUser(userExist);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createLogInUser = (newUser) => {
    axios
      .post(userURL, newUser)
      .then((res) => {
        console.log(res);
        alert("User was sucessfully created");
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const fetchUser = (loginUser) => {
    axios
      .get(userURL)
      .then((response) => {
        const userData = [...response.data];
        console.log("user Data", userData);
        if (userData.length === 0) {
          const newUser = {
            email: loginUser?.email,
            name: loginUser?.displayName,
            picture: loginUser?.photoURL,
            login_id: loginUser["providerData"][0].uid,
          };
          createLogInUser(newUser);
        }
        for (let user of userData) {
          if (
            user.login_id === loginUser["providerData"][0].uid &&
            user.email === loginUser?.email
          ) {
            fetchUserById(user.id);
            alert("Login sucessful");
          } else {
            const newUser = {
              email: loginUser?.email,
              name: loginUser?.displayName,
              picture: loginUser?.photoURL,
              login_id: loginUser["providerData"][0].uid,
            };
            createLogInUser(newUser);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const fetchUser = () => {
  //   axios
  //     .get(userURL)
  //     .then((response) => {
  //       const userData = [...response.data];
  //       for (let user of userData) {
  //         if (user.login_id === googleUser.uid) {
  //           axios
  //             .get(`${userURL}` / `${user.id}`)
  //             .then((resp) => {
  //               setExistUser(user);
  //             })
  //             .catch((err) => {
  //               console.log(err);
  //             });
  //         } else {
  //           const newUser = {
  //             name: googleUser.displayName,
  //             email: googleUser.email,
  //             picture: googleUser.photoURL,
  //             login_id: googleUser.uid,
  //           };
  //           axios
  //             .post(userURL, newUser)
  //             .then((res) => {
  //               console.log(res);
  //             })
  //             .catch((er) => {
  //               console.log(er);
  //             });
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // this is the format to call google id from googleUser --> currentUser["providerData"][0].uid
      setGoogleUser(currentUser);
      console.log("currentUser");
      console.log(currentUser);
      fetchUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <AuthContext.Provider
      value={{ googleSignIn, logOut, googleUser, existUser }}
    >
      {/* children will replace by all components that want to access the value of AuthContext provider */}
      {children}
    </AuthContext.Provider>
  );
};

// making the values in AuthContext provider as global variable that can access to everywhere
export const UserAuth = () => {
  return useContext(AuthContext); // this line is access the values in AuthContext provider
};
