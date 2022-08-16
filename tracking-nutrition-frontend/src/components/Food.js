import React from "react";
import "./food.css";
import { UserAuth } from "../context/AuthContext";
import moment from "moment";

const Food = (props) => {
  const { googleUser, existUser, fetchFoodRecordByDate } = UserAuth();

  const formatedlogdate = moment(props.dateLog, "YYYY-MM-DD").format(
    "MM/DD/YYYY"
  );

  const addFood = () => {
    const newFood = {
      log_date: formatedlogdate,
      item_name: props.item_name,
      brand_name: props.brand_name,
      total_cals: props.total_cals,
      total_fat: props.total_fat,
    };
    if (googleUser["providerData"][0].uid === existUser.login_id) {
      props.addFoodCallback(newFood);
      fetchFoodRecordByDate(existUser.id, props.dateLog);
      alert("Food added");
    }
  };

  return (
    <div className="container-food">
      <div className="food-list">
        <div>
          <button className="btn-add-food add-btn" onClick={addFood}>
            Add
          </button>
        </div>
        <div className="food-content">
          {`${props.item_name} (${props.brand_name})`}{" "}
        </div>
      </div>
    </div>
  );
};

export default Food;
