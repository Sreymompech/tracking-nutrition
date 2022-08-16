import React from "react";
import { UserAuth } from "../context/AuthContext";
import ShowAllFoodRecordByDate from "./ShowAllFoodRecordByDate";

const ShowAllFoodRecordsByDateList = () => {
  const { reviewFoodRecordByDate } = UserAuth();

  const allFoodRecordComponent = reviewFoodRecordByDate.map((record, ind) => {
    return (
      <ShowAllFoodRecordByDate
        key={ind}
        id={record.id}
        register_at={record.register_at}
        log_date={record.log_date}
        meal_type={record.meal_type}
        serving_qty={record.serving_qty}
        item_name={record.item_name}
        brand_name={record.brand_name}
        total_cals={record.total_cals}
        total_fat={record.total_fat}
        user_id={record.user_id}
      />
    );
  });
  return (
    <div className="tb-list-container">
      <div className="tb-des">Daily Food Records By Date</div>
      <div className="tb-list">
        <div className="tb-del">Delete</div>
        <div className="tb-date">Log Date</div>
        <div className="tb-meal">Meal</div>
        <div className="tb-amount">Amount</div>
        <div className="tb-item">Item</div>
      </div>
      <div className="list-records">{allFoodRecordComponent}</div>
    </div>
  );
};

export default ShowAllFoodRecordsByDateList;
