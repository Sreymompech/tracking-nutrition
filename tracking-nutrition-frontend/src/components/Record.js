import React from "react";
import "./record.css";
import axios from "axios";
import { UserAuth } from "../context/AuthContext";
import { useState } from "react";
import moment from "moment";

// intake page for food record
const Record = (props) => {
  const { googleUser, existUser, fetchUserRecord, fetchFoodRecordByDate } =
    UserAuth();
  const [mealType, setMealType] = useState("");
  const [amount, setAmount] = useState("");
  // convert log_date to string
  const stringDatelog = props.log_date;
  // convert log_date to format we want to display
  const formatedlogdate = moment(
    stringDatelog,
    "ddd, DD MMM YYYY HH:mm:ss z"
  ).format("MM/DD/YYYY");

  // updated food by call backend route
  const updateFood = (newFood) => {
    axios
      .patch(
        `${props.recordFoodURL}/${existUser.id}/records/${props.id}`,
        newFood
      )
      .then((response) => {
        console.log("update food", response);

        alert("Food record was successfully updated");
      })
      .catch((error) => {
        console.log(error);
        alert("Oop! could not update food in databse.");
      });
  };

  // updated food in dabase after they click update btn
  const onUpdateFood = () => {
    const foodInfo = {
      meal_type: mealType,
      serving_qty: amount,
      total_cals: parseInt(props.total_cals) * parseInt(amount),
      total_fat: parseInt(props.total_fat) * parseInt(amount),
    };
    if (googleUser["providerData"][0].uid === existUser.login_id) {
      updateFood(foodInfo);
      fetchUserRecord(existUser.id);
      // fetchFoodRecordByDate(existUser.id, props.selectedDateLog);
    }
  };

  // delete food by call backend route
  const deleteFood = (record_id) => {
    axios
      .delete(`${props.recordFoodURL}/${existUser.id}/records/${record_id}`)
      .then((response) => {
        console.log("update food", response);
        // fetchUserRecord(existUser.id);
        alert("Food record was successfully deleted");
      })
      .catch((error) => {
        console.log(error);
        alert("Oop! could not delete food in databse.");
      });
  };

  //delete food in database afther they click delete btn
  const onDeleteFood = () => {
    if (googleUser["providerData"][0].uid === existUser.login_id) {
      deleteFood(props.id);
      fetchUserRecord(existUser.id);
      // fetchFoodRecordByDate(existUser.id, props.selectedDateLog);
    }
  };

  return (
    <div className="record-list-container">
      <div>
        <div className="record-list-content">
          <div>
            <button className="btn-delete" onClick={onDeleteFood}>
              Delete
            </button>
          </div>
          <div>
            <button className="btn-update" onClick={onUpdateFood}>
              Update
            </button>
          </div>{" "}
          <div className="datelog">{formatedlogdate}</div>
          <div className="record-meal">
            <select
              id="sort-button"
              onChange={(e) => setMealType(e.target.value)}
            >
              <option value="" key="">
                select
              </option>
              <option value="Breakfast" key="">
                Breakfast
              </option>
              <option value="Lunch" key="">
                Lunch
              </option>
              <option value="Dinner" key="">
                Dinner
              </option>
              <option value="Snacks" key="">
                Snacks
              </option>
            </select>
          </div>
          <input
            type="text"
            className="record-amount"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
          <div className="record-item">
            {`${props.item_name} (${props.brand_name})`}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Record;

//Moment(props.log_date).format("MM/DD/YYYY")
