import React from "react";
import FoodInTakeSearch from "../components/FoodInTakeSearch";
import "./foodintake.css";

const FoodInTake = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white relative food-container">
      {/* <img
        className="absolute top-0 left-0 w-screen h-screen object-cover"
        src="https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=1200"
        alt="bg-img"
      ></img> */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-0">
        <FoodInTakeSearch />
      </div>
    </div>
  );
};

export default FoodInTake;
