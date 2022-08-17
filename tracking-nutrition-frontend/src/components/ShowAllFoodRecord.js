import React from "react";
import { UserAuth } from "../context/AuthContext";
import "./ShowAllFoodRecord.css";
import moment from "moment";

const ShowAllFoodRecord = (props) => {
  const { googleUser, existUser, fetchUserRecord, deleteFood } = UserAuth();
  // convert log_date to string
  const stringDatelog = props.log_date;
  // convert log_date to format we want to display
  const formatedlogdate = moment(
    stringDatelog,
    "ddd, DD MMM YYYY HH:mm:ss z"
  ).format("MM/DD/YYYY");

  const onDeleteFoodRecord = () => {
    if (googleUser["providerData"][0].uid === existUser.login_id) {
      deleteFood(props.id);
      fetchUserRecord(existUser.id);
    }
  };
  return (
    <div className="show-food-container">
      <div className="show-food-delete">
        <button className="show-food-btn-delete" onClick={onDeleteFoodRecord}>
          Delete
        </button>
      </div>
      <div className="show-food-date">{formatedlogdate}</div>
      <div className="show-food-meal">{props.meal_type}</div>
      <div className="show-food-amount">{props.serving_qty}</div>
      <div className="show-food-item">{`${props.item_name} (${props.brand_name})`}</div>
    </div>
  );
};

export default ShowAllFoodRecord;
