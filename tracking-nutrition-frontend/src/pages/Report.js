import React, { useState } from "react";
import "../components/nutritionassessment.css";
import { UserAuth } from "../context/AuthContext";
import MyFoodListReport from "../components/MyFoodListReport";
import NutritionAssessementList from "../components/NutritionAssessementList";

const Report = () => {
  // const {
  //   existUser,
  //   inTakeCalories,
  //   logDateList,
  //   caloriesGoal,
  //   fetchUserRecord,
  //   foodListRecord,
  // } = UserAuth();
  // fetchUserRecord(existUser.id);
  // keep tracking report type
  const [reporType, setReportType] = useState("");
  return (
    <div>
      {/* <MyFoodListReport /> */}
      <div className="report-type">
        <select
          id="report-select"
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="" key="">
            Repor Type
          </option>
          <option value="myFoodList" key="myFoodList">
            MyFoodList
          </option>
          <option value="nutritionAsscessment" key="nutritionAsscessment">
            Nutrition Asscessment
          </option>
        </select>
      </div>
      {(reporType === "myFoodList" && <MyFoodListReport />) ||
        (reporType === "nutritionAsscessment" && <NutritionAssessementList />)}
      {/* {reporType === "NutritionAssessment" ? <NutritionAssessementList /> : ""} */}
      {/* <ProfileHeader /> */}
      {/* <NutritionAssessementList /> */}
      {/* <MyFoodListReport /> */}
    </div>
  );
};

export default Report;

// onChange={(e) => setReportType(e.target.value)}
