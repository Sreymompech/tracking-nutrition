import React from "react";
// import "./food.css";
// import { UserAuth } from "../context/AuthContext";
// import moment from "moment";
import { useTable } from "react-table";

const Food = ({ columns, foodData, addFoodCallback }) => {
  // const { googleUser, existUser } = UserAuth();
  // const formatedlogdate = moment(props.dateLog, "YYYY-MM-DD").format(
  //   "MM/DD/YYYY"
  // );
  // const newFood = {
  //   log_date: formatedlogdate,
  //   item_name: props.item_name,
  //   brand_name: props.brand_name,
  //   total_cals: props.total_cals,
  //   total_fat: props.total_fat,
  // };

  // const addFood = () => {
  //   console.log("Im herere");
  //   console.log("log date", props.dateLog);
  //   console.log("new food", newFood);
  //   console.log("exist user", existUser);
  //   if (googleUser["providerData"][0].uid === existUser.login_id) {
  //     console.log("google id", googleUser?.uid);
  //     console.log("exist user login ", existUser.login_id);
  //     props.addFoodCallback(newFood);
  //     props.updateFormCallback();
  //   }
  // };
  const tableInstance = useTable({ columns: columns, data: foodData });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <div className="">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, idx) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <div className="food-list">
        <div className="food-brand">Brand: {props.brand_name}</div>
        <div className="food-name">Item: {props.item_name}</div>
        <div>
          <button className="btn-add-food" onClick={addFood}>
            Add
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Food;
