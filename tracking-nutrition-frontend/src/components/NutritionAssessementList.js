import React from "react";
import ProfileHeader from "./ProfileHeader";
import { UserAuth } from "../context/AuthContext";
import NutritionAssessementRecord from "./NutritionAssessementRecord";
import "./nutritionassessment.css";

const NutritionionAssessementList = (props) => {
  const {
    existUser,
    inTakeCalories,
    logDateList,
    caloriesGoal,
    fetchUserRecord,
  } = UserAuth();
  fetchUserRecord(existUser.id);
  console.log("inTakeCalories", inTakeCalories);
  const nutritionComponent = inTakeCalories.map((record, index) => {
    return (
      <NutritionAssessementRecord
        key={index}
        date={record.date}
        totalCals={record.totalCals}
        totalFats={record.totalFats}
        calsDiff={record.calsDiff}
        fatsDiff={record.fatsDiff}
        fatsGoal={record.fatsGoal}
        calsAss={record.calsAss}
        fatsAss={record.fatsAss}
      />
    );
  });

  return (
    <div>
      <div className="nutri-asses-report">Nutrion Assessement Report</div>
      <div className="nutri-asses-des">
        A close-up picture of the Calories and Fat consumed.
      </div>
      <ProfileHeader />
      <div className="asses-title">Dialy Nutrution </div>
      <div className="asse-head-container">
        <div className="asse-date">Date</div>
        <div className="asse-nutrition">Nutrion Type</div>
        <div className="asse-intake">InTake</div>
        <div className="asse-goal">Goal</div>
        <div className="asse-diff">Diff</div>
        <div className="asse-assessement">Assessement</div>
      </div>
      <div>{nutritionComponent}</div>
    </div>
  );
};

export default NutritionionAssessementList;