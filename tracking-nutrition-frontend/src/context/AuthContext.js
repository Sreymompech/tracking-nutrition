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
  // keep tracking user login from google (google user info)
  const [googleUser, setGoogleUser] = useState({});
  // keep tracking user login by id in database
  const [existUser, setExistUser] = useState({});
  // hold all users in database in state
  //const [userDBData, setUserDBData] = useState([]);
  // keep tracking record belong to each user
  const [eachUserRecordData, setEachUserRecordData] = useState([]);
  // URL for users route at backend
  const userURL = "http://127.0.0.1:5000/users";

  // sign in function
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

  // fetch all users from DB and store in state
  // const fetchAllUserDb = () => {
  //   axios
  //     .get(userURL)
  //     .then((response) => {
  //       const users = [...response.data];
  //       setUserDBData(users);
  //     })
  //     .catch((err) => {});
  // };

  // fetch each user by id
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

  // ceate new user in DB when they first login
  const createLogInUser = (newUser) => {
    axios
      .post(userURL, newUser)
      .then((res) => {
        updateExistUser();
        alert("User was sucessfully created");
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const oauthUser = (loginUser) => {
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

        let confirmUser = false;
        for (let user of userData) {
          if (
            user.login_id === loginUser["providerData"][0].uid &&
            user.email === loginUser?.email
          ) {
            confirmUser = !confirmUser;
            fetchUserById(user.id);
            alert("Login sucessful");
          }
        }
        if (confirmUser === false) {
          const newUser = {
            email: loginUser?.email,
            name: loginUser?.displayName,
            picture: loginUser?.photoURL,
            login_id: loginUser["providerData"][0].uid,
          };
          createLogInUser(newUser);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateExistUser = () => {
    axios
      .get(userURL)
      .then((resp) => {
        const userData = [...resp.data];
        for (let user of userData) {
          if (
            user.login_id === googleUser["providerData"][0].uid &&
            user.email === googleUser?.email
          ) {
            fetchUserById(user.id);
            alert("exist user was updated in state");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //fetch user records from database
  const fetchUserRecord = (user_id) => {
    axios
      .get(`${userURL}/${user_id}/records`)
      .then((response) => {
        const recordData = [...response.data];
        const newRecords = recordData.map((record) => {
          return {
            id: record.id,
            register_at: record.register_at,
            log_date: record.log_date,
            meal_type: record.meal_type,
            serving_qty: record.serving_qty,
            item_name: record.item_name,
            brand_name: record.brand_name,
            total_cals: record.total_cals,
            total_fat: record.total_fat,
            user_id: record.user_id,
          };
        });
        setEachUserRecordData(newRecords);
      })
      .catch((error) => {
        console.log("fetch user record error", error);
        alert("Oop! could not fetch record for this user");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // this is the format to call google id from googleUser --> currentUser["providerData"][0].uid
      setGoogleUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //useEffect(fetchUserRecord, []);
  return (
    <AuthContext.Provider
      value={{
        googleSignIn,
        logOut,
        googleUser,
        existUser,
        eachUserRecordData,
        fetchUserRecord,
        updateExistUser,
        oauthUser,
      }}
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
