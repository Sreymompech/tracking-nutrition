import React from "react";
import "./food.css";
import { UserAuth } from "../context/AuthContext";
import moment from "moment";

const Food = (props) => {
  const { googleUser, existUser } = UserAuth();
  const formatedlogdate = moment(props.dateLog, "YYYY-MM-DD").format(
    "MM/DD/YYYY"
  );
  const newFood = {
    log_date: formatedlogdate,
    item_name: props.item_name,
    brand_name: props.brand_name,
    total_cals: props.total_cals,
    total_fat: props.total_fat,
  };

  const addFood = () => {
    console.log("Im herere");
    console.log("log date", props.dateLog);
    console.log("new food", newFood);
    console.log("exist user", existUser);
    if (googleUser["providerData"][0].uid === existUser.login_id) {
      console.log("google id", googleUser?.uid);
      console.log("exist user login ", existUser.login_id);
      props.addFoodCallback(newFood);
      alert("Food added");
    }
  };
  return (
    <div className="">
      {/* <div>
        <span>Brand: {props.brand_name}</span>
        <span>Item: {props.item_name}</span>
        <span>
          <button className="btn-add-food">Add</button>
        </span>
      </div> */}
      <div className="food-list">
        <div className="food-brand">Brand: {props.brand_name}</div>
        <div className="food-name">Item: {props.item_name}</div>
        <div>
          <button className="btn-add-food" onClick={addFood}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Food;
