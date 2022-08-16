import React from "react";
import ReportByDate from "./ReportByDate";
import ProfileHeader from "../components/ProfileHeader";
import { UserAuth } from "../context/AuthContext";
import "./reportbydate.css";

const ReportByDateList = (props) => {
  const { caloriesGoal, existUser } = UserAuth();
  const recordByDateComponent = props.recordByDate["records"].map(
    (record, index) => {
      return (
        <ReportByDate
          key={index}
          item={record.item_name}
          brand={record.brand_name}
          caloriers={record.total_cals}
          fats={record.total_fat}
          amount={record.serving_qty}
          meal={record.meal_type}
          totalCals={props.recordByDate.totalCals}
          totalFats={props.recordByDate.totalFats}
          date={props.recordByDate.date}
          totalRecords={props.recordByDate.totalRecords}
        />
      );
    }
  );
  return (
    <div className="selected-date-container">
      <div className="reportdate-report">MyFoodList Report By Date</div>
      <div className="reportdate-des">
        A intake food list, Calories and Fat consumed by selected date.
      </div>
      {/* <div className="myfood-report">MyFoodList Report</div>
      <div className="myfood-des">
        A intake food list, Calories and Fat consumed.
      </div> */}
      <ProfileHeader />
      <div className="th-selecteddate-record-title">
        Calories and Fats Asscessment
      </div>
      <div className="th-selecteddate-asses-container">
        <div className="th-selecteddate-asses-date">Date</div>
        <div className="th-selecteddate-asses-nutri">Nutrition Type</div>
        <div className="th-selecteddate-asses-intake">InTake</div>
        <div className="th-selecteddate-asses-goal">Goal</div>
        <div className="th-selecteddate-asses-diff">Diff</div>
        <div className="th-selecteddate-asses-assessement">Asscessment</div>
      </div>

      <div className="selecteddate-report-content">
        <div className="selecteddate-report-date">
          {props.recordByDate.date}
        </div>
        <div className="selecteddate-report-nutri">
          <div className="selecteddate-cal-container">
            <div className="empty"></div>
            <div className="selecteddate-nutri-cal">Total Calories</div>
            <div className="selecteddate-report-cal">
              {props.recordByDate.totalCals}
            </div>
            <div className="selecteddate-cal-goal">
              {Number(existUser.cal_goal).toFixed(2)}
            </div>
            <div
              className={
                props.calsAss === "In Range"
                  ? "selecteddate-cal-diff"
                  : "selecteddate-cal-red"
              }
            >
              {props.recordByDate.calsDiff}
            </div>
            <div className="selecteddate-cal-asses">
              {props.recordByDate.calsAss}
            </div>
          </div>
          <div className="selecteddate-fat-content">
            <div className="empty"></div>
            <div className="selecteddate-nutri-fat">Total Fats</div>
            <div className="selecteddate-report-fat">
              {" "}
              {props.recordByDate.totalFats}
            </div>
            <div className="selecteddate-fat-goal">
              {/* {props.recordByDate.fatsGoal} */}
              {existUser.fat_goal}
            </div>
            <div
              className={
                props.fatsAss === "In Range"
                  ? "selecteddate-fat-diff"
                  : "selecteddate-fat-diff-red"
              }
            >
              {props.recordByDate.fatsDiff}
            </div>
            <div className="selecteddate-fat-asses">
              {props.recordByDate.fatsAss}
            </div>
          </div>
        </div>
      </div>
      <div className="th-selecteddate-record-title">My Food List a Day</div>
      <div className="th-selecteddate-record-container">
        <div className="th-selecteddate-record-date">Date</div>
        <div className="th-selecteddate-record-meal">Meal</div>
        <div className="th-selecteddate-record-amount">Amount</div>
        <div className="th-selecteddate-record-item">item</div>
        <div className="th-selecteddate-record-cal">Calories</div>
        <div className="th-selecteddate-record-fat">Fat</div>
      </div>
      <div className="selectedrecord-date">{props.recordByDate.date}</div>
      <div className="report-list-compo">{recordByDateComponent}</div>
    </div>
  );
};

export default ReportByDateList;
