import React, { useEffect } from "react";
import "./record.css";
// import { UserAuth } from "../context/AuthContext";

const Record = (props) => {
  // const { eachUserRecordData, googleUser, fetchUserRecord } = UserAuth();
  // useEffect(fetchUserRecord, [googleUser]);
  return (
    <div className="record-list">
      <div className="record-content">{props.log_date}</div>
      <div className="record-content">{props.meal_type}</div>
      <div className="record-content">{props.serving_qty}</div>
      <div className="record-content">{props.brand_name}</div>
      <div className="record-content">{props.item_name}</div>
      <div className="record-content">{props.total_cals}</div>
      <div className="record-content">{props.total_fat}</div>
    </div>
  );
};

export default Record;
