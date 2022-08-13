import axios from "axios";
import { useState } from "react";
import "./foodintakesearch.css";
import FoodsList from "./FoodsList";
import { UserAuth } from "../context/AuthContext";
import FoodRecordList from "./FoodRecordList";
import FoodInTakeSearchWelcome from "./FoodInTakeSearchWelcome";
import FoodInTakeSearchError from "./FoodInTakeSearchError";

const FoodInTakeSearch = () => {
  // keep tracking the what type of food that user want to search
  const [foodSearchForm, setFoodSearchForm] = useState("");
  // keep tracking response food from request
  const [responseFoodData, setResponseFoodData] = useState([]);
  // keep tracking log date
  const [logDate, setLogDate] = useState("");
  // keep tracking visible record form
  const [visibleRecordForm, setVisibleRecordForm] = useState(false);
  //keep tracking state to show welcome page
  const [showIntakeFoodWelcome, setShowIntakeFoodWelcome] = useState(true);
  // keep tracking state to show Error page
  const [showIntakeFoodError, setShowIntakeFoodError] = useState(false);
  // URL for calling food api from backend
  const foodURL = "http://127.0.0.1:5000/foods";
  // URL for adding user record of food
  const recordFoodURL = "http://127.0.0.1:5000/users";

  const { existUser, fetchUserRecord } = UserAuth();

  // function to update food when user input
  const updateSearchFood = (event) => {
    setFoodSearchForm(event.target.value);
  };

  // function to update log date
  const selectLogDate = (event) => {
    setLogDate(event.target.value);
  };

  const searchFood = (foodQuery) => {
    axios
      .get(`${foodURL}/${foodQuery}`)
      .then((response) => {
        const responseFood = [...response.data.hits];
        if (responseFood.length === 0) {
          setShowIntakeFoodError(true);
        }
        console.log("responseFood", responseFood);
        const foodData = responseFood.map((food) => {
          return {
            item_id: food["fields"].item_id,
            brand_name: food["fields"].brand_name,
            item_name: food["fields"].item_name,
            total_cals: food["fields"].nf_calories,
            total_fat: food["fields"].nf_total_fat,
          };
        });
        setResponseFoodData(foodData);
      })
      .catch((error) => {
        console.log(error);
        alert("Oops! Could not search the food!");
      });
  };

  // search food function
  const onSearchFood = () => {
    searchFood(foodSearchForm);
    setFoodSearchForm("");
    setVisibleRecordForm(false);
    setShowIntakeFoodWelcome(false);
    setShowIntakeFoodError(false);
  };

  // adding selected food in our database
  const addFood = (newFood) => {
    axios
      .post(`${recordFoodURL}/${existUser.id}/records`, newFood)
      .then((response) => {
        fetchUserRecord(existUser.id);
        setResponseFoodData([]);
        setVisibleRecordForm(true);
        // setShowIntakeFoodWelcome(false);
        alert("Food record was successfully created");
      })
      .catch((error) => {
        console.log(error);
        alert("Oop could not add food record");
      });
  };

  return (
    <div className="food-search-container">
      <div className="food-search-form">
        <div>
          <label htmlFor="logdate" className="log-date">
            Log Date:
          </label>
          <input
            type="date"
            name="logdate"
            value={logDate}
            onChange={selectLogDate}
            className="log-date-input"
          />
        </div>
        <div>
          <label htmlFor="food-search" className="food-search-content"></label>
          <input
            type="text"
            name="food-search"
            value={foodSearchForm}
            onChange={updateSearchFood}
            className="food-search-input"
            placeholder="Enter Food"
          />
        </div>
        <div className="search-btn-container">
          <button className="food-search-btn btn" onClick={onSearchFood}>
            Search
          </button>
        </div>
      </div>
      {responseFoodData.length > 0 && (
        <FoodsList
          foodSearchData={responseFoodData}
          dateLog={logDate}
          addFoodCallback={addFood}
        />
      )}
      {visibleRecordForm && <FoodRecordList recordFoodURL={recordFoodURL} />}
      {showIntakeFoodWelcome && <FoodInTakeSearchWelcome />}
      {showIntakeFoodError && <FoodInTakeSearchError />}
    </div>
  );
};

export default FoodInTakeSearch;

// import axios from "axios";
// import React, { useEffect, useMemo } from "react";
// import { useState } from "react";
// import "./foodintakesearch.css";
// //import FoodsList from "./FoodsList";
// import { UserAuth } from "../context/AuthContext";
// import FoodRecordList from "./FoodRecordList";
// import Food from "./Food";
// import FoodsList from "./FoodsList";

// const FoodInTakeSearch = () => {
//   // keep tracking the what type of food that user want to search
//   const [foodSearchForm, setFoodSearchForm] = useState("");
//   // keep tracking response food from request
//   // const [responseFoodData, setResponseFoodData] = useState([]);
//   // keep tracking log date
//   const [logDate, setLogDate] = useState("");

//   // // URL for calling food api from backend
//   // const foodURL = "http://127.0.0.1:5000/foods";
//   // URL for adding user record of food
//   const recordFoodURL = "http://127.0.0.1:5000/users";

//   const {
//     existUser,
//     fetchUserRecord,
//     searchFood,
//     responseFoodData,
//     setResponseFoodData,
//     updateExistUser,
//   } = UserAuth();

//   // function to update food when user input
//   const updateSearchFood = (event) => {
//     setFoodSearchForm(event.target.value);
//   };

//   // function to update log date
//   const selectLogDate = (event) => {
//     setLogDate(event.target.value);
//   };

//   // // call api food from back end
//   // const searchFood = (foodQuery) => {
//   //   axios
//   //     .get(`${foodURL}/${foodQuery}`)
//   //     .then((response) => {
//   //       const responseFood = [...response.data.hits];
//   //       console.log("resopnse", response);
//   //       const foodData = responseFood.map((food) => {
//   //         return {
//   //           item_id: food["fields"].item_id,
//   //           brand_name: food["fields"].brand_name,
//   //           item_name: food["fields"].item_name,
//   //           total_cals: food["fields"].nf_calories,
//   //           total_fat: food["fields"].nf_total_fat,
//   //         };
//   //       });
//   //       setResponseFoodData(foodData);
//   //       alert("responseFoodData was update");
//   //     })
//   //     .catch((error) => {
//   //       console.log(error);
//   //       alert("Oops! Could not search the food!");
//   //     });
//   // };

//   // search food function
//   const onSearchFood = () => {
//     searchFood(foodSearchForm);
//     console.log("exist user", existUser);
//     setFoodSearchForm("");
//   };

//   // adding selected food in our database
//   const addFood = (newFood) => {
//     console.log("Im here");
//     axios
//       .post(`${recordFoodURL}/${existUser.id}/records`, newFood)
//       .then((response) => {
//         fetchUserRecord(existUser.id);
//         console.log(response);
//         alert("Food record was successfully created");
//         setResponseFoodData([]);
//       })
//       .catch((error) => {
//         console.log(error);
//         alert("Oop could not add food record");
//       });
//   };

//   //working on how to display api call in table by using react table
//   //creating column header for food search api table
//   const columns = useMemo(
//     () => [
//       {
//         Header: "Brand",
//         accessor: "brand_name",
//       },
//       {
//         Header: "Item",
//         accessor: "item_name",
//       },
//     ],
//     []
//   );

//   //create column header for user record

//   // create food component
//   const foodComponents = responseFoodData.map((foodData) => {
//     return (
//       <Food
//         key={foodData.item_id}
//         // foodData={foodData}
//         item_id={foodData.item_id}
//         brand_name={foodData.brand_name}
//         item_name={foodData.item_name}
//         total_cals={foodData.total_cals}
//         total_fat={foodData.total_fat}
//         dateLog={logDate}
//         columns={columns}
//         addFoodCallback={addFood}
//       />
//     );
//   });
//   return (
//     <div className="food-search-container">
//       <div className="food-search-form">
//         <div>
//           <label htmlFor="logdate" className="log-date">
//             Log Date:
//           </label>
//           <input
//             type="date"
//             name="logdate"
//             value={logDate}
//             onChange={selectLogDate}
//             className="log-date-input"
//           />
//         </div>
//         <div>
//           <label htmlFor="food-search" className="food-search-content"></label>
//           <input
//             type="text"
//             name="food-search"
//             value={foodSearchForm}
//             onChange={updateSearchFood}
//             className="food-search-input"
//           />
//         </div>
//         <div>
//           <button className="food-search-btn" onClick={onSearchFood}>
//             Search
//           </button>
//         </div>
//       </div>
//       {responseFoodData.length > 0 ? (
//         //   <div>{foodComponents}</div>
//         // ) : (
//         <Food
//           columns={columns}
//           foodData={responseFoodData}
//           dateLog={logDate}
//           addFoodCallback={addFood}
//         />
//       ) : (
//         <FoodRecordList />
//       )}
//     </div>
//   );
// };

// export default FoodInTakeSearch;
