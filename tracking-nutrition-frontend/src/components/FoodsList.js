import React from "react";
import Food from "./Food";
import "./record.css";

const FoodsList = (props) => {
  const foodComponents = props.foodSearchData.map((foodData, index) => {
    return (
      <Food
        key={foodData.item_id}
        // foodData={foodData}
        item_id={foodData.item_id}
        brand_name={foodData.brand_name}
        item_name={foodData.item_name}
        total_cals={foodData.total_cals}
        total_fat={foodData.total_fat}
        dateLog={props.dateLog}
        addFoodCallback={props.addFoodCallback}
      />
    );
  });
  return (
    <div>
      <div className="search-food">
        <div className="food-action">Action</div>
        <div className="response-item">Item</div>
      </div>
      <div>{foodComponents}</div>
    </div>
  );
};

export default FoodsList;
