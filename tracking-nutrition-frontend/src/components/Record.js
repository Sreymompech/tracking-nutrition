import React, { useEffect } from "react";
import "./record.css";
import axios from "axios";
import { UserAuth } from "../context/AuthContext";
import { useState } from "react";
import Moment from "moment";

const Record = (props) => {
  const { googleUser, existUser, fetchUserRecord } = UserAuth();
  const [mealType, setMealType] = useState("");
  const [amount, setAmount] = useState("");

  // updated food by call backend route
  const updateFood = (newFood) => {
    axios
      .patch(
        `${props.recordFoodURL}/${existUser.id}/records/${props.id}`,
        newFood
      )
      .then((response) => {
        console.log("update food", response);
        fetchUserRecord(existUser.id);
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
    }
  };

  // delete food by call backend route
  const deleteFood = (record_id) => {
    axios
      .delete(`${props.recordFoodURL}/${existUser.id}/records/${record_id}`)
      .then((response) => {
        console.log("update food", response);
        fetchUserRecord(existUser.id);
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
    }
  };

  return (
    <div className="record-list">
      <div>
        <button className="btn-delete" onClick={onDeleteFood}>
          Delete
        </button>
      </div>
      <div>
        <button className="btn-update" onClick={onUpdateFood}>
          Update
        </button>
      </div>
      <div className="datelog">
        {Moment(props.log_date).format("MM/DD/YYYY")}
      </div>
      <div className="record-meal">
        <select id="sort-button" onChange={(e) => setMealType(e.target.value)}>
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
  );
};

export default Record;
