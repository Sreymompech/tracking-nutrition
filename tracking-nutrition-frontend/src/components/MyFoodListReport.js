import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import FoodReport from "./FoodReport";
import NutritionAssessementList from "../components/NutritionAssessementList";
import ProfileHeader from "../components/ProfileHeader";

const MyFoodListReport = (props) => {
  const {
    existUser,
    inTakeCalories,
    logDateList,
    caloriesGoal,
    fetchUserRecord,
    foodListRecord,
  } = UserAuth();
  // fetchUserRecord(existUser.id);
  useEffect(() => {
    fetchUserRecord(existUser.id);
  }, []);
  console.log("foodListRecord", foodListRecord);
  const foodListRecordComponent = foodListRecord.map((record, index) => () => {
    record["foodList"][index].map((food, i) => {
      return (
        <FoodReport
          key={i}
          date={foodListRecord.date}
          meal={food[i].meal_type}
          // item={record["foodList"].item_name}
          // brand={record["foodList"].brand_name}
          // amount={record["foodList"].serving_qty}
          // calories={record["foodList"].total_cals}
          // fats={record.total_fat}
          totalCals={foodListRecord.totalCals}
          totalFats={foodListRecord.totalFats}
          totalRecords={foodListRecord.totalRecord}
        />
      );
    });
  });

  // useEffect(() => {
  //   fetchUserRecord(existUser.id);
  // }, [existUser.id]);
  return (
    <div>
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
      <div>{foodListRecordComponent}</div>
    </div>
  );
};

export default MyFoodListReport;
