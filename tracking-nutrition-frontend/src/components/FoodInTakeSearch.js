import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import "./foodintakesearch.css";
import FoodsList from "./FoodsList";
import { UserAuth } from "../context/AuthContext";

const FoodInTakeSearch = () => {
  // keep tracking the what type of food that user want to search
  const [foodSearchForm, setFoodSearchForm] = useState("");
  // keep tracking response food from request
  const [responseFoodData, setResponseFoodData] = useState([]);
  // keep tracking log date
  const [logDate, setLogDate] = useState("");
  // URL for calling food api from backend
  const foodURL = "http://127.0.0.1:5000/foods";
  // URL for adding user record of food
  const recordFoodURL = "http://127.0.0.1:5000/users";

  const { googleUser, existUser } = UserAuth();

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
  };

  // adding selected food in our database
  const addFood = (newFood) => {
    console.log("Im here");
    axios
      .post(`${recordFoodURL}/${existUser.id}/records`, newFood)
      .then((response) => {
        console.log(response);
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
          />
        </div>
        <div>
          <button className="food-search-btn" onClick={onSearchFood}>
            Search
          </button>
        </div>
      </div>
      <FoodsList
        foodSearchData={responseFoodData}
        dateLog={logDate}
        addFoodCallback={addFood}
      />
    </div>
  );
};

export default FoodInTakeSearch;
