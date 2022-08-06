import React from "react";
import Food from "./Food";

const FoodsList = (props) => {
  const foodComponents = props.foodSearchData.map((foodData) => {
    return (
      <Food
        // key={foodData.item_id}
        // item_id={foodData.item_id}
        // brand_name={foodData.brand_name}
        // item_name={foodData.item_name}
        // total_cals={foodData.total_cals}
        // total_fat={foodData.total_fat}
        dateLog={props.dateLog}
        addFoodCallback={props.addFoodCallback}
        updateFormCallback={props.updateFormCallback}
      />
    );
  });
  return (
    <div>
      {/* {foodComponents.map((food) => (
        <Food />
      ))} */}
      {foodComponents}
    </div>
  );
};

export default FoodsList;
