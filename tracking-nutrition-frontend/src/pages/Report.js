import React, { useEffect, useState } from "react";
import "../components/nutritionassessment.css";
import MyFoodListReport from "../components/MyFoodListReport";
import NutritionAssessementList from "../components/NutritionAssessementList";
import "../components/profileheader.css";
import "./report.css";
import ReportWelcome from "../components/ReportWelcome";
import { UserAuth } from "../context/AuthContext";
import axios from "axios";
import moment from "moment";
import ReportByDateList from "../components/ReportByDateList";
import ReportError from "../components/ReportError";

const Report = () => {
  // keep tracking type of report they want to search
  const [reportType, setReportType] = useState("");
  // keep tracking the date the want to see report
  const [selectedDate, setSelectedDate] = useState("");
  // keep tracking record by selected date
  const [selectedRecordDate, setSelectedRecordDate] = useState({});
  // keep tracking form state to show report by date
  const [showReportByDate, setShowReportByDate] = useState(false);
  // keep tracking to show error when selected date is invalid
  const [showReportError, setShowReportError] = useState(false);
  // keep tracking to show report welcome
  const [showReportWelcome, setShowReportWelcome] = useState(true);
  const { existUser, userURL, updateExistUser } = UserAuth();

  // update reportType
  const updateReportType = (e) => {
    setReportType(e.target.value);
    setShowReportError(false);
    setShowReportWelcome(false);
    setShowReportByDate(false);
  };
  //update selectedDate
  const updateSelectedDate = (e) => {
    setSelectedDate(e.target.value);
  };

  // fetch each user by id
  const fetchRecordUserByDate = (user_id, date) => {
    axios
      .get(`${userURL}/${user_id}/records`)
      .then((resp) => {
        const recordList = [...resp.data];
        const recordByDate = [];
        let totalCalories = 0;
        let totalFat = 0;
        let recordCount = 0;

        for (let record of recordList) {
          // convert log_date to string
          const stringDatelog = record.log_date.toString();
          // convert log_date to format we want to display
          const formatedlogdate = moment(
            stringDatelog,
            "ddd, DD MMM YYYY HH:mm:ss z"
          ).format("MM/DD/YYYY");
          if (formatedlogdate === date) {
            recordByDate.push(record);
            totalCalories += record.total_cals;
            totalFat += record.total_fat;
            recordCount += 1;
          }
        }

        // calculate cal diff, fat diff, cal asses, fat assess
        const calDiff = Number(totalCalories - existUser.cal_goal).toFixed(2);
        const fatDiff = Number(totalFat - existUser.fat_goal).toFixed(2);
        let caloriesAss = "";
        if (totalCalories > existUser.cal_goal + 10) {
          caloriesAss = "Above Goal";
        } else if (totalCalories < existUser.cal_goal - 10) {
          caloriesAss = "Below Goal";
        } else {
          caloriesAss = "In Range";
        }

        let fatAss = "";
        if (totalFat > existUser.fat_goal + 5) {
          fatAss = "Above Goal";
        } else if (totalFat < existUser.fat_goal - 5) {
          fatAss = "Below Goal";
        } else {
          fatAss = "In Range";
        }

        if (recordByDate.length === 0) {
          setShowReportError(true);
          setShowReportWelcome(false);
          setShowReportByDate(false);
        } else {
          const newRecord = {
            date: date,
            records: recordByDate,
            totalCals: Number(totalCalories).toFixed(2),
            totalFats: Number(totalFat).toFixed(2),
            totalRecords: recordCount,
            calsDiff: calDiff,
            fatsDiff: fatDiff,
            calsAss: caloriesAss,
            fatsAss: fatAss,
          };
          setSelectedRecordDate(newRecord);
          setShowReportByDate(true);
          setShowReportError(false);
          setShowReportWelcome(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSearchReportDate = () => {
    fetchRecordUserByDate(existUser.id, selectedDate);
    setSelectedDate("");
    setReportType("");
  };

  useEffect(() => {
    updateExistUser();
  }, []);

  return (
    <div className="w-screen flex justify-center items-center bg-white relative report-container">
      <div className="bg-gray-500 bg-opacity-20 report-content">
        <div className="report-type">
          <button
            className="report-date-search-btn"
            onClick={onSearchReportDate}
          >
            Search
          </button>
          <label htmlFor="date"></label>
          <input
            type="text"
            value={selectedDate}
            name="date"
            onChange={updateSelectedDate}
            className="report-date"
            placeholder="MM/DD/YYYY"
          />
          <div></div>
          <select id="report-select" onChange={updateReportType}>
            <option value="" key="">
              Report Type
            </option>
            <option value="myFoodList" key="myFoodList">
              All MyFoodList
            </option>
            <option value="nutritionAsscessment" key="nutritionAsscessment">
              All Nutrition Asscessment
            </option>
          </select>
        </div>
      </div>
      <div className="report-component">
        {showReportWelcome && <ReportWelcome />}
        {(reportType === "myFoodList" && <MyFoodListReport />) ||
          (reportType === "nutritionAsscessment" && (
            <NutritionAssessementList />
          ))}
        {showReportByDate && (
          <ReportByDateList recordByDate={selectedRecordDate} />
        )}
        {showReportError && <ReportError />}
      </div>
    </div>
  );
};

export default Report;
