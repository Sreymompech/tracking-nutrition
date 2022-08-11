import React, { useEffect } from "react";
import MyFoodReport from "./MyFoodReport";
import { UserAuth } from "../context/AuthContext";
import myfoodlistreport from "./myfoodlistreport.css";

const MyFoodReportList = (props) => {
  const { fetchUserRecord, existUser, eachUserRecordData } = UserAuth();
  // fetchUserRecord(existUser.id);
  useEffect(() => {
    fetchUserRecord(existUser.id);
  }, []);

  const foodRecordsComponent = props.myFoodRecords.map((report, i) => {
    return (
      <MyFoodReport
        key={i}
        date={props.date}
        meal={report.meal_type}
        item={report.item_name}
        brand={report.brand_name}
        amount={report.serving_qty}
        calories={report.total_cals}
        fats={report.total_fat}
        totalCals={props.totalCals}
        totalFats={props.totalFats}
        totalRecords={props.totalRecords}
      />
    );
  });

  return (
    <div>
      <div className="total-date">{props.date}</div>
      {foodRecordsComponent}
      <div className="total-nutri-container">
        <div className="total-nutrition">Total:</div>
        <div className="total-cal">{props.totalCals}</div>
        <div className="total-fat">{props.totalFats}</div>
      </div>
    </div>
  );
};

export default MyFoodReportList;
