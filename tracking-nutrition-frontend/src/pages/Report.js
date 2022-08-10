import React from "react";
import "../components/nutritionassessment.css";

// import MyFoodListReport from "../components/MyFoodListReport";
import NutritionAssessementList from "../components/NutritionAssessementList";

const Report = () => {
  return (
    <div>
      {/* <MyFoodListReport /> */}
      <div className="report-type">
        <select id="report-select">
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
      {/* {reporType === "myFoodList" ? <MyFoodListReport /> : ""}
      {reporType === "NutritionAssessment" && <NutritionAssessementList />} */}
      {/* <ProfileHeader /> */}
      <NutritionAssessementList />
    </div>
  );
};

export default Report;

// onChange={(e) => setReportType(e.target.value)}
