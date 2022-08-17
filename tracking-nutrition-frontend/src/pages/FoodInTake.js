import React, { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import FoodInTakeSearch from "../components/FoodInTakeSearch";
import "./foodintake.css";

const FoodInTake = () => {
  const { googleUser, existUser, fetchUserRecord } = UserAuth();

  useEffect(() => {
    fetchUserRecord(existUser.id);
  }, []);
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white relative food-container">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-0">
        <FoodInTakeSearch />
      </div>
    </div>
  );
};

export default FoodInTake;
