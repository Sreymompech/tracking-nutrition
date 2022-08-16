import React, { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import ProfileHeader from "../components/ProfileHeader";
import "./myfoodlistreport.css";
import MyFoodReportList from "./MyFoodReportList";

const MyFoodListReport = (props) => {
  const { fetchUserRecord, existUser, foodListRecord } = UserAuth();
  useEffect(() => {
    fetchUserRecord(existUser.id);
  }, []);
  console.log("foodListRecord", foodListRecord);
  const foodListRecordComponent = foodListRecord.map((record, index) => {
    return (
      <MyFoodReportList
        key={index}
        date={record.date}
        myFoodRecords={record["foodList"]}
        totalCals={record.totalCals}
        totalFats={record.totalFats}
        totalRecords={record.totalRecord}
      />
    );
  });

  return (
    <div className="myfood-container">
      <div className="myfood-report">MyFoodList Report</div>
      <div className="myfood-des">
        A intake food list, Calories and Fat consumed.
      </div>
      <ProfileHeader />
      <div className="food-list-title">Dialy Food and Nutrition Records </div>
      <div className="food-list-container">
        <div className="food-list-date">Date</div>
        <div className="food-list-meal">Meal</div>
        <div className="food-list-amount">Amount</div>
        <div className="food-list-item">item</div>
        <div className="food-list-cal">Calories</div>
        <div className="food-list-fat">Fat</div>
      </div>
      <div className="foot-list-compo">{foodListRecordComponent}</div>;
    </div>
  );
};

export default MyFoodListReport;
