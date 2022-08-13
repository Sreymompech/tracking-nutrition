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
import moment from "moment";

// create a instance of context
const AuthContext = createContext();

// create a function that return the context provider and value that will access as global variable for any component
export const AuthContextProvider = ({ children }) => {
  // keep tracking user login from google (google user info)
  const [googleUser, setGoogleUser] = useState({});
  // keep tracking user login by id in database
  const [existUser, setExistUser] = useState(
    JSON.parse(localStorage.getItem("existUser")) || {}
  );
  // hold all users in database in state
  //const [userDBData, setUserDBData] = useState([]);
  // keep tracking record belong to each user
  const [eachUserRecordData, setEachUserRecordData] = useState([]);
  // keep tracking response food from request
  const [responseFoodData, setResponseFoodData] = useState([]);
  // keep tracking calories goal for user
  const [caloriesGoal, setCaloriesGoal] = useState(
    JSON.parse(localStorage.getItem("caloriesGoal")) || ""
  );
  // keep tracking intake calories for user
  const [inTakeCalories, setInTakeCalories] = useState([]);
  // keep tracking log dat list
  const [logDateList, setLogDateList] = useState([]);
  // keep tracking food list by log date record
  const [foodListRecord, setFoodListRecord] = useState([]);
  // URL for users route at backend
  const userURL = "http://127.0.0.1:5000/users";
  // URL for calling food api from backend
  const foodURL = "http://127.0.0.1:5000/foods";

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

  // fetch each user by id
  const fetchUserById = (user_id) => {
    console.log("user id", user_id);
    axios
      .get(`${userURL}/${user_id}`)
      .then((resp) => {
        console.log("exist user", resp);
        const user = { ...resp.data };
        // set state for exist user
        localStorage.setItem("existUser", JSON.stringify(user));
        // set stat of calories goal for user
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

  // update existUser
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
            defineCaloriesGoal(user.gender);
            alert("exist user was updated in state");
          }
        }
      })
      .catch((err) => {
        console.log(err);
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
            // store exist user into local storage so when the page refresh the existUser state will not empty
            localStorage.setItem("existUser", JSON.stringify(user));
            confirmUser = !confirmUser;
            defineCaloriesGoal(user.gender);
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

  //fetch user records from database
  const fetchUserRecord = (user_id) => {
    axios
      .get(`${userURL}/${user_id}/records`)
      .then((response) => {
        const recordData = [...response.data];
        // set state of all records of user
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

        // set stat of log date list
        const dateList = [];
        for (let record of recordData) {
          // convert log_date to string
          const stringDatelog = record.log_date.toString();
          // convert log_date to format we want to display
          const formatedlogdate = moment(
            stringDatelog,
            "ddd, DD MMM YYYY HH:mm:ss z"
          ).format("MM/DD/YYYY");

          if (!dateList.includes(formatedlogdate)) {
            dateList.push(formatedlogdate);
          }
        }
        setLogDateList(dateList);
        //console.log("dateList", dateList);

        // set state of total calories by log date
        const caloriesList = [];
        // create record list for each log date
        const logDateRecords = [];
        for (let date of dateList) {
          let totalCals = 0;
          let totalFats = 0;
          let countRecord = 0;
          const records = [];
          for (let record of recordData) {
            // convert log_date to string
            const stringDatelog = record.log_date.toString();
            // convert log_date to format we want to display
            const formatedlogdate = moment(
              stringDatelog,
              "ddd, DD MMM YYYY HH:mm:ss z"
            ).format("MM/DD/YYYY");
            if (formatedlogdate === date) {
              countRecord += 1;
              totalCals += record.total_cals;
              totalFats += record.total_fat;
              records.push(record);
            }
          }

          // calculate cal diff, fat diff, cal asses, fat assess
          const calDiff = Number(totalCals - caloriesGoal).toFixed(2);
          const fatGoal = Number(caloriesGoal * 0.3).toFixed(2);
          const fatDiff = Number(fatGoal - totalFats).toFixed(2);

          let caloriesAss = "";
          if (totalCals > caloriesGoal + 5) {
            caloriesAss = "Above Goal";
          } else if (totalCals < caloriesGoal - 5) {
            caloriesAss = "Below Goal";
          } else {
            caloriesAss = "In Range";
          }

          let fatAss = "";
          if (totalFats > fatGoal + 5) {
            fatAss = "Above Goal";
          } else if (totalFats < fatGoal - 5) {
            fatAss = "Below Goal";
          } else {
            fatAss = "In Range";
          }

          caloriesList.push({
            date: date,
            totalCals: Number(totalCals).toFixed(2),
            totalFats: Number(totalFats).toFixed(2),
            totalRecord: countRecord,
            calsDiff: calDiff,
            fatsDiff: fatDiff,
            fatsGoal: fatGoal,
            calsAss: caloriesAss,
            fatsAss: fatAss,
          });

          logDateRecords.push({
            date: date,
            foodList: records,
            totalCals: Number(totalCals).toFixed(2),
            totalFats: Number(totalFats).toFixed(2),
            totalRecord: countRecord,
          });
        }
        setInTakeCalories(caloriesList);
        setFoodListRecord(logDateRecords);
      })
      .catch((error) => {
        console.log("fetch user record error", error);
        alert("Oop! could not fetch record for this user");
      });
  };

  // working on report route
  // set calories goal by gender
  const defineCaloriesGoal = (gender) => {
    if (gender === "Male") {
      localStorage.setItem("caloriesGoal", JSON.stringify(2500));
    } else {
      localStorage.setItem("caloriesGoal", JSON.stringify(2000));
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // this is the format to call google id from googleUser --> currentUser["providerData"][0].uid
      setGoogleUser(currentUser);
      console.log("currentUser", currentUser);
      console.log("user provider", currentUser["providerData"][0]);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    // pass all props down in this AuthContex.Provider so you can call it to user any where by import { UserAuth } from "../context/AuthContext";
    // then put this line into your code --> const { googleUser, existUser, eachUserRecordData, fetchUserRecord } = UserAuth();
    // put all props that you want to use into {} infront of UserAuth()
    <AuthContext.Provider
      value={{
        googleSignIn,
        logOut,
        googleUser,
        existUser,
        eachUserRecordData,
        fetchUserRecord,
        responseFoodData,
        setResponseFoodData,
        oauthUser,
        caloriesGoal,
        setCaloriesGoal,
        inTakeCalories,
        logDateList,
        foodListRecord,
        userURL,
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

// // createContext is for instance of provider
// // useContext is the way we access the value of provider so it take provider's name as argument
// import { useContext, createContext, useEffect, useState } from "react";
// // import this line when we want to use google Oauth
// // onAuthStateChanged going to wrap in a useEffect and
// // whenever we run this we're going to check to see if a user is authenticated or not
// import {
//   GoogleAuthProvider,
//   signInWithPopup,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { auth } from "../firebase-config";
// import axios from "axios";

// // create a instance of context
// const AuthContext = createContext();

// // create a function that return the context provider and value that will access as global variable for any component
// export const AuthContextProvider = ({ children }) => {
//   // keep tracking user login from google (google user info)
//   const [googleUser, setGoogleUser] = useState({});
//   // keep tracking user login by id in database
//   const [existUser, setExistUser] = useState(
//     JSON.parse(localStorage.getItem("existUser")) || {}
//   );
//   // hold all users in database in state
//   //const [userDBData, setUserDBData] = useState([]);
//   // keep tracking record belong to each user
//   const [eachUserRecordData, setEachUserRecordData] = useState([]);
//   // keep tracking response food from request
//   const [responseFoodData, setResponseFoodData] = useState([]);
//   // URL for users route at backend
//   const userURL = "http://127.0.0.1:5000/users";
//   // URL for calling food api from backend
//   const foodURL = "http://127.0.0.1:5000/foods";

//   // sign in function
//   const googleSignIn = () => {
//     // create instance of Google provider
//     const provider = new GoogleAuthProvider();
//     // pass in auth which is our firebase-config and provider which is instance of Google provider
//     //const { user } = await signInWithPopup(auth, provider);
//     signInWithPopup(auth, provider);
//   };

//   const logOut = () => {
//     signOut(auth);
//   };

//   // fetch all users from DB and store in state
//   // const fetchAllUserDb = () => {
//   //   axios
//   //     .get(userURL)
//   //     .then((response) => {
//   //       const users = [...response.data];
//   //       setUserDBData(users);
//   //     })
//   //     .catch((err) => {});
//   // };

//   // fetch each user by id
//   const fetchUserById = (user_id) => {
//     console.log("user id", user_id);
//     axios
//       .get(`${userURL}/${user_id}`)
//       .then((resp) => {
//         console.log("exist user", resp);

//         const user = { ...resp.data };
//         localStorage.setItem("existUser", JSON.stringify(user));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   // ceate new user in DB when they first login
//   const createLogInUser = (newUser) => {
//     axios
//       .post(userURL, newUser)
//       .then((res) => {
//         updateExistUser();
//         alert("User was sucessfully created");
//       })
//       .catch((er) => {
//         console.log(er);
//       });
//   };

//   const oauthUser = (loginUser) => {
//     axios
//       .get(userURL)
//       .then((response) => {
//         const userData = [...response.data];
//         console.log("user Data", userData);
//         if (userData.length === 0) {
//           const newUser = {
//             email: loginUser?.email,
//             name: loginUser?.displayName,
//             picture: loginUser?.photoURL,
//             login_id: loginUser["providerData"][0].uid,
//           };
//           createLogInUser(newUser);
//         }

//         let confirmUser = false;
//         for (let user of userData) {
//           if (
//             user.login_id === loginUser["providerData"][0].uid &&
//             user.email === loginUser?.email
//           ) {
//             updateExistUser();
//             confirmUser = !confirmUser;
//             alert("Login sucessful");
//           }
//         }
//         if (confirmUser === false) {
//           const newUser = {
//             email: loginUser?.email,
//             name: loginUser?.displayName,
//             picture: loginUser?.photoURL,
//             login_id: loginUser["providerData"][0].uid,
//           };
//           createLogInUser(newUser);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const updateExistUser = () => {
//     axios
//       .get(userURL)
//       .then((resp) => {
//         const userData = [...resp.data];
//         for (let user of userData) {
//           if (
//             user.login_id === googleUser["providerData"][0].uid &&
//             user.email === googleUser?.email
//           ) {
//             fetchUserById(user.id);
//             alert("exist user was updated in state");
//           }
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   //fetch user records from database
//   const fetchUserRecord = (user_id) => {
//     axios
//       .get(`${userURL}/${user_id}/records`)
//       .then((response) => {
//         const recordData = [...response.data];
//         const newRecords = recordData.map((record) => {
//           return {
//             id: record.id,
//             register_at: record.register_at,
//             log_date: record.log_date,
//             meal_type: record.meal_type,
//             serving_qty: record.serving_qty,
//             item_name: record.item_name,
//             brand_name: record.brand_name,
//             total_cals: record.total_cals,
//             total_fat: record.total_fat,
//             user_id: record.user_id,
//           };
//         });
//         setEachUserRecordData(newRecords);
//       })
//       .catch((error) => {
//         console.log("fetch user record error", error);
//         alert("Oop! could not fetch record for this user");
//       });
//   };

//   // useEffect(() => {
//   //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//   //     // this is the format to call google id from googleUser --> currentUser["providerData"][0].uid
//   //     setGoogleUser(currentUser);
//   //     console.log("currentUser", currentUser);
//   //   });
//   //   return () => {
//   //     unsubscribe();
//   //   };
//   // }, []);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       // this is the format to call google id from googleUser --> currentUser["providerData"][0].uid
//       setGoogleUser(currentUser);
//     });
//     return () => (currentUser) => {
//       axios
//         .get(userURL)
//         .then((response) => {
//           const userData = [...response.data];
//           console.log("user Data", userData);
//           if (userData.length === 0) {
//             const newUser = {
//               email: currentUser?.email,
//               name: currentUser?.displayName,
//               picture: currentUser?.photoURL,
//               login_id: currentUser["providerData"][0].uid,
//             };
//             createLogInUser(newUser);
//           }

//           let confirmUser = false;
//           for (let user of userData) {
//             if (
//               user.login_id === currentUser["providerData"][0].uid &&
//               user.email === currentUser?.email
//             ) {
//               localStorage.setItem("existUser", JSON.stringify(user));
//               //setExistUser(user);
//               confirmUser = !confirmUser;
//               alert("Login sucessful");
//             }
//           }
//           if (confirmUser === false) {
//             const newUser = {
//               email: currentUser?.email,
//               name: currentUser?.displayName,
//               picture: currentUser?.photoURL,
//               login_id: currentUser["providerData"][0].uid,
//             };
//             createLogInUser(newUser);
//           }
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//       unsubscribe();
//     };
//   }, []);

//   //useEffect(fetchUserRecord, []);
//   return (
//     <AuthContext.Provider
//       value={{
//         googleSignIn,
//         logOut,
//         googleUser,
//         existUser,
//         eachUserRecordData,
//         fetchUserRecord,
//         responseFoodData,
//         setResponseFoodData,
//       }}
//     >
//       {/* children will replace by all components that want to access the value of AuthContext provider */}
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // making the values in AuthContext provider as global variable that can access to everywhere
// export const UserAuth = () => {
//   return useContext(AuthContext); // this line is access the values in AuthContext provider
// };
