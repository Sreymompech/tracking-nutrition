import React, { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import Record from "./Record";

const FoodRecordList = () => {
  const { eachUserRecordData } = UserAuth();

  const recordDataComponent = eachUserRecordData.map((record) => {
    return (
      <Record
        key={record.id}
        id={record.id}
        register_at={record.register_at}
        log_date={record.log_date}
        meal_type={record.meal_type}
        serving_qty={record.serving_qty}
        item_name={record.item_name}
        brand_name={record.brand_name}
        total_cals={record.total_cals}
        total_fat={record.total_fat}
        user_id={record.user_id}
      />
    );
  });
  return <div>{recordDataComponent}</div>;
};

export default FoodRecordList;
