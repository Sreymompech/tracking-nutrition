import axios from "axios";
import { useState, useEffect } from "react";
import "./foodintakesearch.css";
import FoodsList from "./FoodsList";
import { UserAuth } from "../context/AuthContext";
import FoodRecordList from "./FoodRecordList";
import FoodInTakeSearchWelcome from "./FoodInTakeSearchWelcome";
import FoodInTakeSearchError from "./FoodInTakeSearchError";
import FoodInTakeSearchLogDateMissingError from "./FoodInTakeSearchLogDateMissingError";
import ShowAllFoodRecordsList from "./ShowAllFoodRecordsList";
import ShowAllFoodRecordsByDateList from "./ShowAllFoodRecordsByDateList";

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
  // keep tracking state to show error when log date is empty
  const [showLogDateMissing, setShowLogDateMissing] = useState(false);
  // keep tracking review record date
  const [reviewRecordByDate, setReviewRecordByDate] = useState("");
  // keep tracing showing all food records of user
  const [showAllFoodRecord, setShowAllFoodRecord] = useState(false);
  // URL for calling food api from backend
  const foodURL = "http://127.0.0.1:5000/foods";
  // URL for adding user record of food
  const recordFoodURL = "http://127.0.0.1:5000/users";

  const { existUser, fetchUserRecord, googleUser, fetchShowFoodRecordByDate } =
    UserAuth();

  // function to update food when user input
  const updateSearchFood = (event) => {
    setFoodSearchForm(event.target.value);
  };

  // function to update reviewRecordeByDate
  const updateReviewRecordDate = (e) => {
    setReviewRecordByDate(e.target.value);
    fetchShowFoodRecordByDate(existUser.id, e.target.value);
    setVisibleRecordForm(false);
    setShowIntakeFoodWelcome(false);
    setShowIntakeFoodError(false);
    setShowAllFoodRecord(false);
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
        if (responseFood.length === 0 || !foodSearchForm) {
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
    if (!logDate) {
      setShowLogDateMissing(true);
    } else {
      searchFood(foodSearchForm);
      setShowLogDateMissing(false);
      setShowAllFoodRecord(false);
    }
    setFoodSearchForm("");
    setVisibleRecordForm(false);
    setShowIntakeFoodWelcome(false);
    setShowIntakeFoodError(false);
    setShowAllFoodRecord(false);
    setReviewRecordByDate("");
  };

  // adding selected food in our database
  const addFood = (newFood) => {
    if (googleUser["providerData"][0].uid === existUser.login_id) {
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
    }
  };

  // show all record food of user
  const onClickAllRecord = () => {
    setShowAllFoodRecord(true);
    fetchUserRecord(existUser.id);
    setVisibleRecordForm(false);
    setShowIntakeFoodWelcome(false);
    setShowIntakeFoodError(false);
    setReviewRecordByDate("");
  };

  useEffect(() => {
    fetchUserRecord(existUser.id);
  }, []);

  useEffect(() => {
    fetchShowFoodRecordByDate(existUser.id, reviewRecordByDate);
  });

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
      <div>
        <div className="review-record-container">
          <label htmlFor="review-date" className="review-record">
            Review Record:
          </label>
          <input
            type="date"
            name="review-date"
            value={reviewRecordByDate}
            onChange={updateReviewRecordDate}
            className="review-record-input"
          ></input>
          <button className="all-record-btn" onClick={onClickAllRecord}>
            All
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
      {visibleRecordForm && (
        <FoodRecordList
          recordFoodURL={recordFoodURL}
          selectedDateLog={logDate}
        />
      )}
      {showIntakeFoodWelcome && <FoodInTakeSearchWelcome />}
      {showIntakeFoodError && <FoodInTakeSearchError />}
      {showLogDateMissing && <FoodInTakeSearchLogDateMissingError />}
      {showAllFoodRecord && (
        <ShowAllFoodRecordsList reviewRecordByDate={reviewRecordByDate} />
      )}
      {reviewRecordByDate && <ShowAllFoodRecordsByDateList />}
    </div>
  );
};

export default FoodInTakeSearch;
