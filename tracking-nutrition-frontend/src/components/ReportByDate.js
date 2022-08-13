import React from "react";
import "./reportbydate.css";

const ReportByDate = (props) => {
  return (
    <div className="selecteddate-list-container">
      <div className="selecteddate-list-date"></div>
      <div className="selecteddate-list-meal">{props.meal}</div>
      <div className="selecteddate-list-amount">{props.amount}</div>
      <div className="selecteddate-list-item">
        {props.item} ({props.brand})
      </div>
      <div className="selecteddate-list-cal">{props.caloriers}</div>
      <div className="selecteddate-list-fat">{props.fats}</div>
    </div>
  );
};

export default ReportByDate;
