import React, { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import "./nutritionassessment.css";

const NutritionAssessementRecord = (props) => {
  const {
    existUser,
    inTakeCalories,
    logDateList,
    caloriesGoal,
    fetchUserRecord,
  } = UserAuth();

  return (
    <div className="asses-report-container">
      <div className="asses-report-date">{props.date}</div>
      <div className="asses-report-nutri">
        <div className="asses-cal-container">
          <div className="empty"></div>
          <div className="asses-nutri-cal">Total Calories</div>
          <div className="asses-report-cal">{props.totalCals}</div>
          <div className="asses-cal-goal">
            {Number(caloriesGoal).toFixed(2)}
          </div>
          <div
            className={
              props.calsAss === "In Range"
                ? "asses-cal-diff"
                : "asses-cal-diff-red"
            }
          >
            {props.calsDiff}
          </div>
          <div className="asses-cal-asses">{props.calsAss}</div>
        </div>
        <div className="asses-fat-container">
          <div className="empty"></div>
          <div className="asses-nutri-fat">Total Fats</div>
          <div className="asses-report-fat"> {props.totalFats}</div>
          <div className="asses-fat-goal">{props.fatsGoal}</div>
          <div
            className={
              props.fatsAss === "In Range"
                ? "asses-fat-diff"
                : "asses-fat-diff-red"
            }
          >
            {props.fatsDiff}
          </div>
          <div className="asses-fat-asses">{props.fatsAss}</div>
        </div>
      </div>
    </div>
  );
};

export default NutritionAssessementRecord;
