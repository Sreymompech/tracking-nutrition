import React from "react";
import "./food.css";
import { UserAuth } from "../context/AuthContext";
import moment from "moment";

const Food = (props) => {
  const { googleUser, existUser, fetchUserRecord } = UserAuth();
  const formatedlogdate = moment(props.dateLog, "YYYY-MM-DD").format(
    "MM/DD/YYYY"
  );
  // const formatedlogdate = moment(props.dateLog, "YYYY-MM-DD").format(
  //   "%Y-%m-%dT%H:%M:%S.%fZ"
  // );

  const addFood = () => {
    console.log("log date convert", formatedlogdate);
    const newFood = {
      log_date: formatedlogdate,
      item_name: props.item_name,
      brand_name: props.brand_name,
      total_cals: props.total_cals,
      total_fat: props.total_fat,
    };
    if (googleUser["providerData"][0].uid === existUser.login_id) {
      props.addFoodCallback(newFood);
      fetchUserRecord(existUser.id);
      alert("Food added");
    }
  };

  return (
    <div className="container-food">
      <div className="food-list">
        <div>
          <button className="btn-add-food add-btn" onClick={addFood}>
            Add
          </button>
        </div>
        <div className="food-content">
          {`${props.item_name} (${props.brand_name})`}{" "}
        </div>
      </div>
    </div>
  );
};

export default Food;

// import React from "react";
// // import "./food.css";
// import { UserAuth } from "../context/AuthContext";
// import moment from "moment";
// import { useTable, useRowSelect } from "react-table";
// import CheckBox from "./CheckBox";

// const Food = ({
//   columns,
//   brand_name,
//   item_name,
//   total_cals,
//   total_fat,
//   addFoodCallback,
//   dateLog,
// }) => {
//   const { googleUser, existUser, responseFoodData } = UserAuth();
//   const formatedlogdate = moment(dateLog, "YYYY-MM-DD").format("MM/DD/YYYY");
//   const newFood = {
//     log_date: formatedlogdate,
//     item_name: item_name,
//     brand_name: brand_name,
//     total_cals: total_cals,
//     total_fat: total_fat,
//   };

//   const addFood = () => {
//     console.log("Im herere");
//     console.log("responseFoodData", responseFoodData);
//     console.log("log date", dateLog);
//     console.log("new food", newFood);
//     console.log("exist user", existUser);
//     console.log("googleUser", googleUser);
//     if (googleUser["providerData"][0].uid === existUser.login_id) {
//       console.log("Im log in");
//       console.log("google id", googleUser["providerData"][0].uid);
//       console.log("exist user login ", existUser.login_id);
//       const selectedRow = JSON.stringify(
//         {
//           selectedFlatRows: selectedFlatRows.map((row) => row.original),
//         },
//         null,
//         2
//       );
//       addFoodCallback(newFood);
//     }
//   };
//   // create custome column in our table
//   const tableHooks = (hooks) => {
//     hooks.visibleColumns.push((columns) => [
//       ...columns,
//       {
//         id: "selection",
//         Header: ({ getToggleAllRowsSelectedProps }) => (
//           <CheckBox {...getToggleAllRowsSelectedProps()} />
//         ),
//         Cell: ({ row }) => <CheckBox {...row.gettoggleRowSelectedProps()} />,
//       },
//     ]);
//   };
//   // create instance of use table hook
//   const tableInstance = useTable(
//     { columns: columns, data: responseFoodData },
//     useRowSelect,
//     tableHooks
//   );
//   // destruct functions and prop that need to use from useTable instance to set up in our table
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//     selectedFlatRows,
//   } = tableInstance;
//   return (
//     <div className="">
//       <table {...getTableProps()}>
//         <thead>
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map((column) => (
//                 <th {...column.getHeaderProps()}>{column.render("Header")}</th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map((row) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map((cell, idx) => {
//                   return (
//                     <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Food;
