import React, { useState } from "react";
import "../components/nutritionassessment.css";
import { UserAuth } from "../context/AuthContext";
import MyFoodListReport from "../components/MyFoodListReport";
import NutritionAssessementList from "../components/NutritionAssessementList";
import "../components/profileheader.css";

const Report = () => {
  const [reporType, setReportType] = useState("");
  return (
    <div className="select-report-container">
      <div className="report-type">
        <select
          id="report-select"
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="" key="">
            Report Type
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
    </div>
  );
};

export default Report;

// onChange={(e) => setReportType(e.target.value)}
