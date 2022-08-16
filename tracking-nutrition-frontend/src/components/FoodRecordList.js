import React, { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import Record from "./Record";
import "./record.css";

const FoodRecordList = (props) => {
  const {
    eachUserRecordData,
    foodRecordByDate,
    fetchFoodRecordByDate,
    existUser,
  } = UserAuth();

  // useEffect(() => {
  //   fetchFoodRecordByDate(existUser.id, props.selectedDateLog);
  // }, [existUser.id, props.selectedDateLog]);

  const recordDataComponent = eachUserRecordData.map((record, index) => {
    return (
      <Record
        key={index}
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
        recordFoodURL={props.recordFoodURL}
        selectedDateLog={props.selectedDateLog}
      />
    );
  });
  return (
    <div className="tb-list-container">
      <div className="tb-des">Please complete all the empty column.</div>
      <div className="tb-list">
        <div className="tb-del">Delete</div>
        <div className="tb-update">Update</div>
        <div className="tb-date">Log Date</div>
        <div className="tb-meal">Meal</div>
        <div className="tb-amount">Amount</div>
        <div className="tb-item">Item</div>
      </div>
      <div className="list-records">{recordDataComponent}</div>
    </div>
  );
};

export default FoodRecordList;
