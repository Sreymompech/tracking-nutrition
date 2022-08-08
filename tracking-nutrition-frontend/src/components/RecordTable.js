import React from "react";
import FoodRecordList from "./FoodRecordList";
import "./record.css";

const RecordTable = (props) => {
  return (
    <div>
      <div className="title-list">
        <div className="title-del">Delete</div>
        <div className="title-update">Update</div>
        <div className="title-meal">Meal</div>
        <div className="title-amount">Amount</div>
        <div className="title-item">Item</div>
      </div>
      <FoodRecordList />
    </div>
  );
};

export default RecordTable;
