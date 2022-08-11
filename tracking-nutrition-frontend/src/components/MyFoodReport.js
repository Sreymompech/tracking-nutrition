import React from "react";
import "./myfoodlistreport.css";

const MyFoodReport = (props) => {
  return (
    <div className="myfood-list-container">
      <div className="myfood-list-content">
        <div className="myfood-list-date"></div>
        <div className="myfood-list-meal">{props.meal}</div>
        <div className="myfood-list-amount">{props.amount}</div>
        <div className="myfood-list-item">
          {props.item} ({props.brand})
        </div>
        <div className="myfood-list-cal">{props.calories}</div>
        <div className="myfood-list-fat">{props.fats}</div>
      </div>
    </div>
  );
};

export default MyFoodReport;
