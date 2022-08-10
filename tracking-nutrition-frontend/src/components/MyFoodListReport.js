import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import NutritionAssessementList from "../components/NutritionAssessementList";
import ProfileHeader from "../components/ProfileHeader";

const MyFoodListReport = () => {
  const {
    existUser,
    inTakeCalories,
    logDateList,
    caloriesGoal,
    fetchUserRecord,
  } = UserAuth();

  // keep tracking report type
  const [reporType, setReportType] = useState("");
  // useEffect(() => {
  //   fetchUserRecord(existUser.id);
  // }, [existUser.id]);
  return (
    <div>
      {/* <div className="report-type">
        <select id="report-select">
          <option value="" key="">
            Repor Type
          </option>
          <option
            value="myFoodList"
            key="myFoodList"
            onChange={(e) => setReportType(e.target.value)}
          >
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
      {/* <NutritionAssessementList /> */}
    </div>
  );
};

export default MyFoodListReport;
